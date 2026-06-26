import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Tránh Turbopack chọn nhầm root monorepo (gây lỗi _buildManifest ENOENT trên Windows).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
