/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    deviceSizes: [750, 1200, 1920],
    imageSizes: [64, 128], // Example: supporting just one thumbnail and one mid size
    formats: ['image/webp'],
    minimumCacheTTL: 86400, // Cache images for 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
