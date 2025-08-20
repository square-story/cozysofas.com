import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://asembleindia.com/wp-content/uploads/**'), new URL("https://res.cloudinary.com/dfyip7lpv/image/upload/**")]
  }
};

export default nextConfig;
