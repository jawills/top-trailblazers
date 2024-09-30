/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trailblazers.salesforce.com',
        port: '',
        pathname: '/ncsphoto/**',
      },
    ],
  },
};
// https://trailblazers.salesforce.com/profileView?u=0053A00000DBm9uQAD


export default config;
