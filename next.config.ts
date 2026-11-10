import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  // The old multi-page site is now one page; keep its URLs working.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/work", destination: "/#projects", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/b", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
