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
  // https://trailblazers.salesforce.com/img/userprofile/default_profile_200_v2.png
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trailblazers.salesforce.com',
        port: '',
        pathname: '/ncsphoto/**',
      },
      {
        protocol: 'https',
        hostname: 'trailblazers.salesforce.com',
        port: '',
        pathname: '/img/userprofile/**',
      },
      {
        protocol: 'https',
        hostname: 'developer.salesforce.com',
        port: '',
        pathname: '/resource/images/trailhead/badges/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/hy4kyit2a/**',
      },
      {
        protocol: 'https',
        hostname: 'dfc-static-production.s3.amazonaws.com',
        port: '',
        pathname: '/resource/images/trailhead/badges/**',
      },
    ],
  },
};
// https://trailblazers.salesforce.com/profileView?u=0053A00000DBm9uQAD


export default config;
