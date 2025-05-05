// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://badmusqudusayomide.vercel.app', // ✅ Replace with your actual domain
  generateRobotsTxt: true, // ✅ This also creates a robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
};
