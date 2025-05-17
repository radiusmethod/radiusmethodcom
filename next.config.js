/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // For static export in production only
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  
  // Configure for GitHub Pages in production environment
  ...(process.env.GITHUB_ACTIONS && {
    basePath: '',
    assetPrefix: '',
  }),
  
  // Always set images to unoptimized to avoid the Image Optimization API error
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 