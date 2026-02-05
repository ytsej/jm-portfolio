"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminProjectsPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    shortDescription: "",
    role: "",
    longDescription: "",
    keyFeatures: "",
    technologies: "",
    status: "In Progress",
    links: {
      github: "",
      demo: "",
      figma: "",
      apk: "",
    },
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedJSON, setGeneratedJSON] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [uploadedImagePaths, setUploadedImagePaths] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("shortDescription", formData.shortDescription);
      data.append("role", formData.role);
      data.append("longDescription", formData.longDescription);
      data.append("status", formData.status);
      data.append("keyFeatures", formData.keyFeatures);
      data.append("technologies", formData.technologies);
      data.append("links", JSON.stringify(formData.links));

      images.forEach((image) => {
        data.append("images", image);
      });

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create project");
      }

      const result = await res.json();
      
      // Generate formatted JSON for manual addition
      const json = JSON.stringify(result.project, null, 2);
      setGeneratedJSON(json);
      setUploadedImagePaths(result.project.images);
      setShowResult(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON);
    alert("JSON copied to clipboard! Now paste it into src/data/portfolio.ts");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      shortDescription: "",
      role: "",
      longDescription: "",
      keyFeatures: "",
      technologies: "",
      status: "In Progress",
      links: { github: "", demo: "", figma: "", apk: "" },
    });
    setImages([]);
    setGeneratedJSON("");
    setShowResult(false);
    setUploadedImagePaths([]);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
            Add Project
          </h1>
          <p className="text-gray-400">Images auto-upload + JSON generated for portfolio.ts</p>
        </motion.div>

        {showResult ? (
          <div className="space-y-4">
            {/* Success Message */}
            <div className="p-6 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
              <h2 className="font-display text-2xl uppercase mb-2 text-emerald-400">✓ Images Uploaded!</h2>
              <p className="text-sm text-gray-300">
                {uploadedImagePaths.length} image{uploadedImagePaths.length !== 1 ? "s" : ""} copied to public folder
              </p>
            </div>

            {/* Generated JSON */}
            <div className="p-6 rounded-lg bg-white/5 border border-white/20">
              <h2 className="font-display text-2xl uppercase mb-4">Copy This JSON</h2>
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 overflow-x-auto max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-300 font-mono">{generatedJSON}</pre>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h3 className="font-display text-xl uppercase mb-3 text-blue-400">Next Steps</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <span>Click "Copy JSON" button below</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span>Open <code className="text-emerald-400 bg-black/30 px-1 rounded">src/data/portfolio.ts</code></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <span>Find the <code className="text-emerald-400 bg-black/30 px-1 rounded">projects: [</code> array</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">4.</span>
                  <span>Paste the JSON object inside the array (add comma if needed)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-bold">5.</span>
                  <span>Save the file and refresh your site!</span>
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={copyToClipboard}
                className="px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded font-display uppercase tracking-wider transition-colors"
              >
                📋 Copy JSON
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors"
              >
                ➕ Add Another Project
              </button>
              <a
                href="/"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors inline-block"
              >
                🏠 Back to Home
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-display uppercase tracking-wider mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-display uppercase tracking-wider mb-2">
                  Type *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Web App, Mobile App, Game"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Short Description *
              </label>
              <input
                type="text"
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Role *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Frontend Developer, Full-Stack Developer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Long Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors resize-none text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Key Features <span className="text-gray-500 text-xs normal-case">(one per line)</span>
              </label>
              <textarea
                rows={5}
                value={formData.keyFeatures}
                onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                placeholder="Built responsive frontend&#10;Integrated REST APIs&#10;Implemented real-time updates"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors resize-none text-white font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Technologies <span className="text-gray-500 text-xs normal-case">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-display uppercase tracking-wider mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  value={formData.links.github}
                  onChange={(e) =>
                    setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-display uppercase tracking-wider mb-2">
                  Demo Link
                </label>
                <input
                  type="url"
                  value={formData.links.demo}
                  onChange={(e) =>
                    setFormData({ ...formData, links: { ...formData.links, demo: e.target.value } })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-display uppercase tracking-wider mb-2">
                  Figma Link
                </label>
                <input
                  type="url"
                  value={formData.links.figma}
                  onChange={(e) =>
                    setFormData({ ...formData, links: { ...formData.links, figma: e.target.value } })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-display uppercase tracking-wider mb-2">
                  APK Link
                </label>
                <input
                  type="url"
                  value={formData.links.apk}
                  onChange={(e) =>
                    setFormData({ ...formData, links: { ...formData.links, apk: e.target.value } })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Project Images (unlimited)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-500/20 file:text-emerald-300 file:cursor-pointer text-white"
              />
              {images.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-emerald-400">
                    ✓ {images.length} image{images.length !== 1 ? "s" : ""} ready - will auto-copy to public folder!
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded font-display uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "🚀 Generate & Upload"}
              </button>
              <a
                href="/"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors inline-block"
              >
                Back to Home
              </a>
            </div>
          </form>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mt-8"
          >
            {/* Success Status */}
            <div className="p-6 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
              <h2 className="font-display text-2xl uppercase mb-3 text-emerald-400">✓ Success!</h2>
              <div className="space-y-2 text-sm text-gray-300">
                <p>✅ {uploadedImagePaths.length} images uploaded to public folder</p>
                <p>✅ JSON generated below (ready to copy)</p>
                <p className="text-emerald-400 font-semibold">Images location: public/images/projects/...</p>
              </div>
            </div>

            {/* Generated JSON */}
            <div className="p-6 rounded-lg bg-white/5 border border-white/20">
              <h2 className="font-display text-2xl uppercase mb-4">📋 Copy This JSON</h2>
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 overflow-x-auto max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">{generatedJSON}</pre>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h3 className="font-display text-xl uppercase mb-3 text-blue-400">📝 How to Add to Site</h3>
              <ol className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold min-w-[1.5rem]">1.</span>
                  <span>Click <strong>"Copy JSON"</strong> button below</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold min-w-[1.5rem]">2.</span>
                  <span>Open <code className="text-emerald-400 bg-black/30 px-2 py-0.5 rounded">src/data/portfolio.ts</code></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold min-w-[1.5rem]">3.</span>
                  <span>Find the <code className="text-emerald-400 bg-black/30 px-2 py-0.5 rounded">projects: [...]</code> array at the bottom</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold min-w-[1.5rem]">4.</span>
                  <span>Paste the JSON inside the array (add a comma after previous project if needed)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold min-w-[1.5rem]">5.</span>
                  <span>Save the file and <strong>refresh the browser</strong> - your project will appear!</span>
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={copyToClipboard}
                className="px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded font-display uppercase tracking-wider transition-colors text-lg"
              >
                📋 Copy JSON to Clipboard
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors"
              >
                Add Another Project
              </button>
              <a
                href="/"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors inline-block"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
