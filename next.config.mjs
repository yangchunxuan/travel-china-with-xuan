/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  devIndicators: false,
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: [640, 1024, 1280, 1600],
    imageSizes: [],
  },
};

export default nextConfig;
