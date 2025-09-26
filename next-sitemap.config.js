// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://badmusqudusayomide.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => {
    const result = []
    
    try {
      // Try to fetch project slugs from Sanity
      const { createClient } = require('@sanity/client')
      
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: '2024-01-01',
        useCdn: true,
      })
      
      const slugs = await client.fetch(`*[_type == "project" && defined(slug.current)][].slug.current`)
      
      // Add projects index page
      result.push({
        loc: '/projects',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
      
      // Add individual project pages
      slugs.forEach((slug) => {
        result.push({
          loc: `/projects/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      })
    } catch (error) {
      console.log('Could not fetch project slugs for sitemap, skipping dynamic routes')
      
      // Fallback: add projects index page only
      result.push({
        loc: '/projects',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    }
    
    return result
  },
};
