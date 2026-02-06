/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Faster loading for local development
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'blob.vercel-storage.com',
      },
    ],
  },
}

module.exports = nextConfig
