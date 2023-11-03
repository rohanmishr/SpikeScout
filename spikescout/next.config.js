/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                port: '',
                pathname: '/attachments/1061391170678296736/1162504720271814779/image.png',
            }
        ]
    }
}

module.exports = nextConfig
