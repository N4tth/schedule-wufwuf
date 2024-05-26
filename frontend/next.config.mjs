/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: '/service-dates',
    rewrites() {
        return [
        { source: '/service-dates/_next/:path*', destination: '/_next/:path*' }
        ]
    }
};

export default nextConfig;