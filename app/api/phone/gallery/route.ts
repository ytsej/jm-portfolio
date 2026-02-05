import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "src", "data", "phone-gallery.json");
    
    if (!existsSync(galleryPath)) {
      return NextResponse.json({ images: [] });
    }
    
    const data = await readFile(galleryPath, "utf-8");
    const images = JSON.parse(data);
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error loading gallery:", error);
    return NextResponse.json({ images: [] });
  }
}
