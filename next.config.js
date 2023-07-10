/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://lh3.googleusercontent.com/a/AAcHTtcT6oc-kh5Aay5i51q8-V9kCXfcdwfkYBJCKg9gHbzA2g=s96-c
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
}

module.exports = nextConfig
