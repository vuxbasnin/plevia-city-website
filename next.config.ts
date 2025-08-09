import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Cho phép tất cả domain HTTPS
        pathname: "/**",
      },
    ],
  },
  // Optimization for memory usage
  experimental: {
    // Giảm memory usage khi build
    memoryBasedWorkersCount: true,
    workerThreads: false,
    // Tối ưu cho VPS với RAM thấp
    cpus: 1, // Chỉ dùng 1 CPU core
  },
  // Webpack optimizations cho low memory
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Giảm memory usage cho production build
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };
    }
    return config;
  },
  // SEO optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Headers for better SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
