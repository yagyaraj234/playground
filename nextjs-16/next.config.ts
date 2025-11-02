import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    domains: ["fakestoreapi.com"],
  },
};

export default nextConfig;
