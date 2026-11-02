import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Current artwork is local; retain only the historical screenshot endpoint.
      { protocol: "https", hostname: "api.microlink.io", pathname: "/" },
    ],
  },
};

export default nextConfig;
