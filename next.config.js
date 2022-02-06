/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        outputStandalone: true
    },
    images: {
        domains: ["images.unsplash.com", "public"]
    },
    flags: {
        DEV_SSR: false
    }
};

module.exports = nextConfig;
