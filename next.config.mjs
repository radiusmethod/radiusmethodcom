/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // GitHub Pages deployment configuration
  basePath: process.env.GITHUB_ACTIONS ? '/radiusmethodcom' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/radiusmethodcom/' : '',
  
  // Properly handle images in production
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    domains: [],
    remotePatterns: [],
  },
};

export default nextConfig; 