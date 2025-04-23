/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  // Configure for GitHub Pages
  ...(process.env.GITHUB_ACTIONS && {
    basePath: '/radiusmethodcom',
    assetPrefix: '/radiusmethodcom/',
    images: {
      unoptimized: true,
    },
  }),
}

module.exports = nextConfig 