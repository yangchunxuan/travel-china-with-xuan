/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  devIndicators: false,
  experimental: {
    // Next 15's default ("loose") CSS chunking merges page-specific module CSS
    // into shared files of up to 100 KB, so every page linked ~300 KB of CSS
    // it mostly never used (tour, guide and planner styles on unrelated pages).
    // One CSS file per webpack chunk keeps each page to the styles it imports.
    cssChunking: false,
  },
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: [640, 1024, 1280, 1600],
    imageSizes: [],
  },
};

export default nextConfig;
