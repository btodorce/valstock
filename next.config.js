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
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    }
};

module.exports = nextConfig;
