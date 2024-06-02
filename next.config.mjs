import { config } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization"
          }
        ]
      }
    ]
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      net: false,
    };
    return config
  },
  
  crossOrigin: 'anonymous',
};

export default nextConfig;
