"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  url: string;
}

export default function PhoneGalleryAdmin() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [showPasswordInput, setShowPasswordInput] = useState(true);

  // Load gallery on mount (auth is handled server-side)
  useEffect(() => {
    // Check if password is stored
    if (typeof window !== "undefined") {
      const storedPassword = localStorage.getItem("admin_password");
      if (storedPassword) {
        setAdminPassword(storedPassword);
        setShowPasswordInput(false);
        loadGallery();
      }
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim()) {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_password", adminPassword);
      }
      setShowPasswordInput(false);
      loadGallery();
    }
  };

  const loadGallery = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      // Add cache-busting query param to ensure fresh data
      const cacheBuster = `?t=${Date.now()}`;
      const res = await fetch(`/api/phone/gallery${cacheBuster}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        // Ensure images is an array
        const imageUrls = Array.isArray(data.images) ? data.images : [];
        setGalleryImages(imageUrls.map((url: string) => ({ url })));
      } else {
        console.error("Failed to load gallery:", res.status, res.statusText);
        setMessage({ type: "error", text: "Failed to load gallery images" });
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
      // Retry once after a short delay if it fails (in case blob is still propagating)
      if (retryCount < 1) {
        setTimeout(() => loadGallery(retryCount + 1), 1000);
        return;
      }
      setMessage({ 
        type: "error", 
        text: `Error loading gallery: ${error instanceof Error ? error.message : "Unknown error"}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const getAuthHeader = (): string | null => {
    if (adminPassword) {
      return `Bearer ${adminPassword}`;
    }
    return null;
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

      const headers: HeadersInit = {};
      const authHeader = getAuthHeader();
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      const res = await fetch("/api/phone/gallery/upload", {
        method: "POST",
        headers,
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to upload images");
      }

      const result = await res.json();
      setMessage({ 
        type: "success", 
        text: `${result.images.length} image(s) uploaded successfully!` 
      });
      
      setImages([]);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      // Wait a bit for blob to propagate, then reload gallery
      setTimeout(() => {
        loadGallery();
      }, 500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload images",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    setDeletingUrl(imageUrl);
    setMessage(null);

    try {
      const headers: HeadersInit = {};
      const authHeader = getAuthHeader();
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      const res = await fetch(`/api/phone/gallery/delete?url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete image");
      }

      setMessage({ type: "success", text: "Image deleted successfully!" });
      // Wait a bit for blob to propagate, then reload gallery
      setTimeout(() => {
        loadGallery();
      }, 500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to delete image",
      });
    } finally {
      setDeletingUrl(null);
    }
  };


  // Password input screen
  if (showPasswordInput) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-8 rounded-lg bg-white/5 border border-white/10"
        >
          <h1 className="font-display text-3xl tracking-wider uppercase mb-4">
            Admin Access
          </h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-display uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded focus:border-emerald-400 focus:outline-none text-white"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded font-display uppercase tracking-wider transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
                Phone Gallery Admin
              </h1>
              <p className="text-gray-400">Manage images in JM.EXE Phone Gallery</p>
            </div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("admin_password");
                }
                setShowPasswordInput(true);
                setAdminPassword("");
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              message.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                : "bg-red-500/20 border border-red-500/50 text-red-300"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-6 rounded-lg bg-white/5 border border-white/10"
        >
          <h2 className="font-display text-2xl tracking-wider uppercase mb-4">
            Upload New Images
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="submit"
              disabled={isUploading}
              className="px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded font-display uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Images"}
            </button>
          </form>
        </motion.div>

        {/* Gallery Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-2xl tracking-wider uppercase mb-6">
            Gallery Images ({galleryImages.length})
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12 text-gray-400">Loading gallery...</div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12 text-gray-400 border border-white/10 rounded-lg">
              No images in gallery yet. Upload some images above!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {galleryImages.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10"
                  >
                    <Image
                      src={item.url}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      unoptimized={item.url.startsWith("http")}
                      onError={(e) => {
                        console.error("Image failed to load:", item.url);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(item.url)}
                        disabled={deletingUrl === item.url}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded font-display uppercase tracking-wider text-sm transition-colors disabled:opacity-50"
                      >
                        {deletingUrl === item.url ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded font-display uppercase tracking-wider transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
