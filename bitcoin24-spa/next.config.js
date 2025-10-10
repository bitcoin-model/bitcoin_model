const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com'],
  },
  experimental: {
    typedRoutes: true,
  },
  // 效能優化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 優化 bundle
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
