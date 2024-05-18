// next-sitemap.js
module.exports = {
  siteUrl: 'https://groupify.dev',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
