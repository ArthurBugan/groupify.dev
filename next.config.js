/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Matcher ignoring `/_next/` and `/api/`
        source: '/((?!api|_next/static|_next/image|images|ads.txt|favicon.ico).*)',
        destination: '/$1',
      },
    ];
  },
}

module.exports = nextConfig
