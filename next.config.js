
const withMDX = require('@next/mdx')({
  experimental: {
    mdxRs: {
      mdxType: 'gfm' // Configure what kind of mdx syntax will be used to parse & transform
    },
  },
  extension: /\.mdx?$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = withMDX(nextConfig)
