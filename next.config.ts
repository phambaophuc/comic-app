import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'truyenqq.com.vn',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
