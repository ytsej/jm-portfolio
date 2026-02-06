import { NextResponse } from "next/server";
import { head } from "@vercel/blob";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const GALLERY_JSON_PATH = "phone-gallery/gallery.json";

// Helper to get gallery data from Blob Storage or filesystem
async function getGalleryData(): Promise<string[]> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  
  // Try Blob Storage first if token is available
  if (blobToken) {
    try {
      // Check if the file exists
      const blob = await head(GALLERY_JSON_PATH, { token: blobToken }).catch(() => null);
      
      if (blob) {
        // Fetch the JSON file with cache-busting to ensure fresh data
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(blob.url + cacheBuster, {
          cache: 'no-store',
        });
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
      // Fall through to filesystem fallback
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

export async function GET() {
  try {
    const images = await getGalleryData();
    return NextResponse.json(
      { images },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error("Error loading gallery:", error);
    return NextResponse.json(
      { images: [] },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  }
}
