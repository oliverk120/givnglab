/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.gq.com'],
  },
  // basePath and assetPrefix are omitted, so they default to '/'
};

module.exports = nextConfig;
