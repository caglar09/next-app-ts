/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    BASE_URL: process.env.BASE_URL,
    PAGE_INDEX: process.env.PAGE_INDEX,
    PAGE_COUNT: process.env.PAGE_COUNT,
  },
  // experimental: {
  //   runtime: "nodejs",
  //   swcFileReading: true,
  //   serverComponents: true,
  // },
};

module.exports = nextConfig;
