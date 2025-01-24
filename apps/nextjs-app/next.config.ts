import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      module: false
    };
    return config;
  },
};

export default nextConfig;
