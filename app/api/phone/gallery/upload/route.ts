import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];
    
    if (images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }
    
    // Create gallery directory
    const galleryDir = path.join(process.cwd(), "public", "images", "phone-gallery");
    if (!existsSync(galleryDir)) {
      await mkdir(galleryDir, { recursive: true });
    }
    
    // Read existing gallery data
    const galleryJSONPath = path.join(process.cwd(), "src", "data", "phone-gallery.json");
    let existingImages: string[] = [];
    
    if (existsSync(galleryJSONPath)) {
      const data = await readFile(galleryJSONPath, "utf-8");
      existingImages = JSON.parse(data);
    }
    
    // Save new images
    const newImagePaths: string[] = [];
    const timestamp = Date.now();
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const ext = path.extname(image.name);
      const filename = `gallery-${timestamp}-${String(i + 1).padStart(3, "0")}${ext}`;
      const filepath = path.join(galleryDir, filename);
      
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);
      
      newImagePaths.push(`/images/phone-gallery/${filename}`);
    }
    
    // Update gallery JSON
    const allImages = [...existingImages, ...newImagePaths];
    await writeFile(galleryJSONPath, JSON.stringify(allImages, null, 2));
    
    return NextResponse.json({ success: true, images: newImagePaths }, { status: 201 });
  } catch (error) {
    console.error("Error uploading gallery images:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload images" },
      { status: 500 }
    );
  }
}
