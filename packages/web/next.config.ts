import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@holdmyclaw/core"],
  // Include templates and content in serverless bundle (fs.readFileSync at runtime).
  // Required for Vercel: deploy/config-template read templates; guide reads content.
  experimental: {
    outputFileTracingIncludes: {
      "/api/deploy": ["./templates/**/*"],
      "/api/config-template": ["./templates/**/*"],
      "/guide": ["./content/**/*"],
    },
  },
};

export default nextConfig;
