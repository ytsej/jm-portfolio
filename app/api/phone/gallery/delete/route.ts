import { NextRequest, NextResponse } from "next/server";
import { del, head, put } from "@vercel/blob";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const GALLERY_JSON_PATH = "phone-gallery/gallery.json";

// Helper to get gallery data from Blob Storage or filesystem
async function getGalleryData(): Promise<string[]> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  
  // Try Blob Storage first if token is available
  if (blobToken) {
    try {
      const blob = await head(GALLERY_JSON_PATH, { token: blobToken }).catch(() => null);
      if (blob) {
        const response = await fetch(blob.url);
        if (response.ok) {
          const data = await response.text();
          if (data && data.trim()) {
            const images = JSON.parse(data);
            return Array.isArray(images) ? images : [];
          }
        }
      }
    } catch (error) {
      console.error("Error reading gallery from Blob Storage:", error);
    }
  }
  
  // Fallback to local filesystem (for development)
  const galleryPath = path.join(process.cwd(), "src", "data", "phone-gallery.json");
  if (existsSync(galleryPath)) {
    try {
      const data = await readFile(galleryPath, "utf-8");
      if (data && data.trim()) {
        const images = JSON.parse(data);
        return Array.isArray(images) ? images : [];
      }
    } catch (error) {
      console.error("Error reading gallery JSON:", error);
    }
  }
  
  return [];
}

// Helper to save gallery data to Blob Storage or filesystem
async function saveGalleryData(images: string[]): Promise<void> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  const jsonContent = JSON.stringify(images, null, 2);
  
  // Save to Blob Storage if token is available
  if (blobToken) {
    try {
      await put(GALLERY_JSON_PATH, jsonContent, {
        access: "public",
        token: blobToken,
        contentType: "application/json",
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      console.error("Error saving gallery to Blob Storage:", error);
      throw error;
    }
  }
  
  // Fallback to local filesystem (for development)
  const galleryPath = path.join(process.cwd(), "src", "data", "phone-gallery.json");
  const galleryDir = path.dirname(galleryPath);
  
  if (!existsSync(galleryDir)) {
    await mkdir(galleryDir, { recursive: true });
  }
  
  await writeFile(galleryPath, jsonContent);
}

// Helper to extract blob path from blob URL
function extractBlobPath(blobUrl: string): string | null {
  try {
    // Blob URL format: https://[account].public.blob.vercel-storage.com/phone-gallery/gallery-123-001.jpg
    // We need to extract: phone-gallery/gallery-123-001.jpg
    const url = new URL(blobUrl);
    // Remove leading slash from pathname
    const blobPath = url.pathname.startsWith("/") ? url.pathname.slice(1) : url.pathname;
    return blobPath || null;
  } catch (error) {
    console.error("Error extracting blob path from URL:", error);
    return null;
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Basic authentication check
    const authHeader = request.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (adminPassword && authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");
    
    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }
    
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    const existingImages = await getGalleryData();
    
    // Check if image exists in the gallery
    if (!existingImages.includes(imageUrl)) {
      return NextResponse.json({ error: "Image not found in gallery" }, { status: 404 });
    }
    
    // Remove from array
    const updatedImages = existingImages.filter((url) => url !== imageUrl);
    
    // Delete from Vercel Blob if it's a blob URL
    if (blobToken && imageUrl.includes("blob.vercel-storage.com")) {
      try {
        // Extract blob path from the full URL
        const blobPath = extractBlobPath(imageUrl);
        if (blobPath) {
          await del(blobPath, { token: blobToken });
          console.log(`Successfully deleted blob: ${blobPath}`);
        } else {
          console.warn(`Could not extract blob path from URL: ${imageUrl}`);
        }
      } catch (error) {
        console.error("Error deleting blob:", error);
        // Continue even if blob deletion fails (might already be deleted)
        // We still want to remove it from the JSON
      }
    } else if (imageUrl.startsWith("/images/phone-gallery/")) {
      // Delete local file if it exists
      const filepath = path.join(process.cwd(), "public", imageUrl);
      if (existsSync(filepath)) {
        const { unlink } = await import("fs/promises");
        try {
          await unlink(filepath);
          console.log(`Successfully deleted local file: ${filepath}`);
        } catch (err) {
          console.error("Error deleting local file:", err);
          // Continue to update JSON even if file deletion fails
        }
      }
    }
    
    // Update gallery JSON (always do this, even if blob/file deletion failed)
    await saveGalleryData(updatedImages);
    
    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete image" },
      { status: 500 }
    );
  }
}
