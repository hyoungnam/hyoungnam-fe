/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    reactRoot: 'concurrent',
    scrollRestoration: true,
  },
  images: {
    domains: ['contents.sixshop.com'],
  },
};

module.exports = nextConfig;
