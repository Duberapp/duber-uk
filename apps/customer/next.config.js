/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "ui",
  "duber-maps",
  "global-constants",
]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["serving.photos.photobox.com"],
  },
  env: {
    NEXT_MAPBOX_TOKEN: process.env.NEXT_MAPBOX_TOKEN,
  },
  productionBrowserSourceMaps: true,
});

module.exports = nextConfig;
