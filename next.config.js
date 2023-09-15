/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{hostname: "images.unsplash.com"}],
        domains: ['unsplash.com']
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
