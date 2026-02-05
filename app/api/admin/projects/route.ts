import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const role = formData.get("role") as string;
    const longDescription = formData.get("longDescription") as string;
    const status = formData.get("status") as string;
    const keyFeaturesText = formData.get("keyFeatures") as string;
    const technologiesText = formData.get("technologies") as string;
    const linksJSON = formData.get("links") as string;
    
    // Parse features (one per line)
    const keyFeatures = keyFeaturesText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
    
    // Parse technologies (comma-separated)
    const technologies = technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    
    const links = JSON.parse(linksJSON);
    
    // Get all images
    const images = formData.getAll("images") as File[];
    
    // Create project ID (slug + timestamp)
    const projectId = `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    
    // Create upload directory in public
    const uploadDir = path.join(process.cwd(), "public", "images", "projects", projectId);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Save images and collect paths
    const imagePaths: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const ext = path.extname(image.name);
      const filename = `img-${String(i + 1).padStart(3, "0")}${ext}`;
      const filepath = path.join(uploadDir, filename);
      
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);
      
      imagePaths.push(`/images/projects/${projectId}/${filename}`);
    }
    
    // Create project object
    const project = {
      id: projectId,
      title,
      subtitle: type,
      role,
      status,
      shortDescription,
      description: longDescription,
      bullets: keyFeatures,
      links: Object.fromEntries(
        Object.entries(links).filter(([_, v]) => v && String(v).trim().length > 0)
      ),
      tags: technologies,
      images: imagePaths,
    };
    
    // Read existing projects
    const projectsPath = path.join(process.cwd(), "src", "data", "projects.json");
    let projects: any[] = [];
    
    if (existsSync(projectsPath)) {
      const data = await readFile(projectsPath, "utf-8");
      projects = JSON.parse(data);
    }
    
    // Add new project
    projects.push(project);
    
    // Save updated projects
    await writeFile(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create project" },
      { status: 500 }
    );
  }
}
