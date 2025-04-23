/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  // Configure for GitHub Pages
  ...(process.env.GITHUB_ACTIONS && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || `/${process.env.REPOSITORY_NAME || ''}`,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || `/${process.env.REPOSITORY_NAME || ''}`,
    images: {
      unoptimized: true,
    },
  }),
}

module.exports = nextConfig 