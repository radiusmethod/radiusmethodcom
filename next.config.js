/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // For static export in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  
  // Configure for GitHub Pages
  ...(process.env.GITHUB_ACTIONS && {
    basePath: '/radiusmethodcom',
    assetPrefix: '/radiusmethodcom/',
  }),
  
  // Always set unoptimized images to true to avoid the Image Optimization API error
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 