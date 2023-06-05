/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['images.unsplash.com', 'tailwindui.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
