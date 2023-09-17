/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{hostname: "images.unsplash.com"}],
        domains: ['lh3.googleusercontent.com']
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
