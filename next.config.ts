import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allows any path on this hostname
      },
      {
        protocol: 'https',
        hostname: '"i.ibb.co"',
        port: '',
        pathname: '/**', // Allows any path on this hostname
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Single hostname here
        port: '',
        pathname: '/**',
      },
    ],
  
  },
};

export default nextConfig;
