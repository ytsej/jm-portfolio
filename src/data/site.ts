// Server-only: Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build and run time.
// It switches to the custom domain automatically once one is added.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jm-portfolio-two.vercel.app";

export const siteName = "JM.EXE";
export const ownerName = "John Mark Dela Cruz";
