/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN ? process.env.IMAGE_DOMAIN : "127.0.0.1"],
  },
};

module.exports = nextConfig;
