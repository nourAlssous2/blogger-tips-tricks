/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000'
            },
            {
                protocol: 'http',
                hostname: 'blogger-tips-tricks.c1.is',
                pathname: 'blogger-tips-tricks/public'
            }
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
