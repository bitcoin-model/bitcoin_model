// CLOUDFLARE PAGES FIX: Use this configuration for successful deployment
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // CRITICAL: Enable static export for Cloudflare Pages
  output: 'export',
  
  // CRITICAL: Output to 'out' directory (not '.next')
  distDir: 'out',
  
  // Optional: Add trailing slash for better compatibility
  trailingSlash: true,
  
  // CRITICAL: Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withNextIntl(nextConfig);

/*
CLOUDFLARE PAGES SETTINGS:

Build command: npm run build
Build output directory: out
Root directory: (leave empty)
Node version: 18 or higher

DEPLOYMENT STEPS:
1. Replace your next.config.js with this file
2. Commit and push to GitHub
3. Cloudflare Pages will automatically rebuild
4. Deployment should succeed

VERIFICATION:
- Check build logs for "Export successful"
- Verify out/ directory contains all files
- Test deployed site at your-site.pages.dev
*/

