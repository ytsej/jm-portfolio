"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PhoneGalleryAdmin() {
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      setMessage({ type: "error", text: "Please select images to upload" });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const data = new FormData();
      images.forEach((image) => {
        data.append("images", image);
      });

      const res = await fetch("/api/phone/gallery/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to upload images");
      }

      const result = await res.json();
      setMessage({ 
        type: "success", 
        text: `${result.images.length} image(s) uploaded successfully! Check the phone gallery.` 
      });
      
      setImages([]);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload images",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
            Phone Gallery Upload
          </h1>
          <p className="text-gray-400">Add images to JM.EXE Phone Gallery</p>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              message.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                : "bg-red-500/20 border border-red-500/50 text-red-300"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-display uppercase tracking-wider mb-2">
              Select Images (unlimited)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-500/20 file:text-emerald-300 file:cursor-pointer text-white"
            />
            {images.length > 0 && (
              <p className="mt-2 text-sm text-emerald-400">
                ✓ {images.length} image{images.length !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-gray-300">
              Images will be copied to <code className="text-emerald-400">public/images/phone-gallery/</code> and added to the phone's Gallery app.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isUploading}
              className="px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded font-display uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Images"}
            </button>
            <a
              href="/"
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors inline-block"
            >
              Back to Home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
