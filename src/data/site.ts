// Server-only: Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build and run time,
// and it follows the custom domain once one is the production domain.
// The fallback is only used when that variable is missing (local builds).
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jmdc.tech";

export const siteName = "JM.EXE";
export const ownerName = "John Mark Dela Cruz";
