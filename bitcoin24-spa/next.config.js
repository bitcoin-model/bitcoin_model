const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Static export for Cloudflare Pages
  output: 'export',
  distDir: 'out',
  
  reactStrictMode: true,
  
  // CRITICAL: Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  
  experimental: {
    typedRoutes: true,
  },
  
  // Ensure CSS is properly handled
  transpilePackages: ['next-intl'],
  
  // Performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
