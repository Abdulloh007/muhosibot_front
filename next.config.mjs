/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // images: { unoptimized: true } ,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // destination: 'http://31.128.39.113/api/:path*' // Proxy to Backend
                destination: 'http://31.128.39.113/api/:path*' // Proxy to Backend
            },
            {
                source: '/wp-json/wp/v2/:path*',
                // destination: 'http://31.128.39.113/api/:path*' // Proxy to Backend
                destination: 'https://muhosib.tj/wp-json/wp/v2/:path*' // Proxy to Backend
            },
            // {
            //     source: '/static/:path*',
            //     // destination: 'http://45.84.227.13/static/:path*' // Proxy to Backend
            //     destination: 'http://localhost:3020/static/:path*' // Proxy to Backend
            // }
        ]
    }
};

export default nextConfig;
