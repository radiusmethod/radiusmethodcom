/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // // GitHub Pages deployment configuration
  basePath: process.env.GITHUB_ACTIONS ?? '',
  assetPrefix: process.env.GITHUB_ACTIONS ?? '',
  
  // Properly handle images in production
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    domains: [],
    remotePatterns: [],
  },
  
  // Configure webpack to handle video files
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

export default nextConfig; 