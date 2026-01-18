import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',

  // In Next.js 15, this moved to the top level
  outputFileTracingRoot: path.join(__dirname, "../../"),

  experimental: {
    // Other experimental flags go here
  },
};

export default nextConfig;