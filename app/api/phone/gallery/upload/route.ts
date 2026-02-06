import { NextRequest, NextResponse } from "next/server";
import { put, head } from "@vercel/blob";
import { writeFile, readFile, mkdir } from "fs/promises";
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

export async function POST(request: NextRequest) {
  try {
    // Basic authentication check
    const authHeader = request.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (adminPassword && authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];
    
    if (images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }
    
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    const existingImages = await getGalleryData();
    const newImageUrls: string[] = [];
    const timestamp = Date.now();
    
    // Upload to Vercel Blob if token is available, otherwise use local filesystem
    if (blobToken) {
      // Use Vercel Blob Storage
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image || !image.name) {
          console.warn(`Skipping invalid image at index ${i}`);
          continue;
        }
        
        const ext = path.extname(image.name) || ".jpg";
        const filename = `phone-gallery/gallery-${timestamp}-${String(i + 1).padStart(3, "0")}${ext}`;
        
        try {
          const blob = await put(filename, image, {
            access: "public",
            token: blobToken,
          });
          
          newImageUrls.push(blob.url);
        } catch (error) {
          console.error(`Error uploading image ${i + 1}:`, error);
          throw new Error(`Failed to upload image ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    } else {
      // Fallback to local filesystem (for development)
      const galleryDir = path.join(process.cwd(), "public", "images", "phone-gallery");
      if (!existsSync(galleryDir)) {
        await mkdir(galleryDir, { recursive: true });
      }
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image || !image.name) {
          console.warn(`Skipping invalid image at index ${i}`);
          continue;
        }
        
        const ext = path.extname(image.name) || ".jpg";
        const filename = `gallery-${timestamp}-${String(i + 1).padStart(3, "0")}${ext}`;
        const filepath = path.join(galleryDir, filename);
        
        try {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filepath, buffer);
          
          newImageUrls.push(`/images/phone-gallery/${filename}`);
        } catch (error) {
          console.error(`Error saving image ${i + 1}:`, error);
          throw new Error(`Failed to save image ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    }
    
    // Update gallery JSON with new images
    const allImages = [...existingImages, ...newImageUrls];
    await saveGalleryData(allImages);
    
    return NextResponse.json({ success: true, images: newImageUrls }, { status: 201 });
  } catch (error) {
    console.error("Error uploading gallery images:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload images" },
      { status: 500 }
    );
  }
}
