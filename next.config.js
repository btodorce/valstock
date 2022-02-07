/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        outputStandalone: true
    },
    images: {
        domains: ["*"]
    },
    flags: {
        DEV_SSR: false
    }
};

module.exports = nextConfig;
