# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your portfolio project management.

## 1. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Choose a project name (e.g., "my-portfolio-cms")
4. Select "Blog" template or start from scratch
5. Note your **Project ID** and **Dataset** (usually "production")

## 2. Set up Sanity Studio

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create a new Sanity studio in a separate folder
sanity init

# Or add to existing project
cd sanity-studio
sanity init
```

## 3. Configure Environment Variables

Create `.env.local` in your project root:

```env
# Copy from .env.local.example and fill in your values
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
SANITY_WEBHOOK_SECRET=your_webhook_secret_here
```

### Getting your API Token:
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to Settings → API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token to your `.env.local`

## 4. Add Project Schema to Sanity Studio

Copy the schema from `sanity-schema.js` to your Sanity Studio:

1. In your Sanity Studio project, create `schemas/project.js`
2. Copy the content from `sanity-schema.js`
3. Add to your `schemas/index.js`:

```javascript
import project from './project'

export default [project]
```

## 5. Deploy Sanity Studio

```bash
# In your Sanity Studio folder
sanity deploy
```

Choose a studio hostname (e.g., `my-portfolio-cms`)

## 6. Set up Webhook for Live Updates

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project → Settings → Webhooks
3. Create new webhook:
   - **URL**: `https://your-domain.vercel.app/api/revalidate?secret=your_webhook_secret`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "project"`

## 7. Add Your First Project

1. Go to your Sanity Studio (e.g., `my-portfolio-cms.sanity.studio`)
2. Click "Project" to create a new project
3. Fill in all the fields:
   - **Title**: "Social Media Mesh"
   - **Slug**: Auto-generated from title
   - **Summary**: Brief description for cards
   - **Full Description**: Detailed project description
   - **Role**: "Full Stack Developer"
   - **Timeline**: "3 months"
   - **Technologies**: ["Node.js", "Express", "MongoDB", "React", "JWT"]
   - **Features**: List key features
   - **Category**: "web"
   - **Featured**: true
   - **Hero Image**: Upload main project image
   - **Gallery**: Upload additional screenshots
   - **Live URL**: https://mesh-blush.vercel.app/
   - **GitHub URL**: https://github.com/BadmusQudusAyomide/mesh

## 8. Test the Integration

1. Start your Next.js development server: `npm run dev`
2. Visit your homepage - you should see projects from Sanity
3. Visit `/projects` - you should see the projects index
4. Visit `/projects/social-media-mesh` - you should see the detailed case study

## 9. SEO Features Included

✅ **Dynamic metadata** for each project page
✅ **JSON-LD structured data** for better search engine understanding
✅ **Open Graph tags** for social media sharing
✅ **Twitter Card tags** for Twitter sharing
✅ **Canonical URLs** to prevent duplicate content
✅ **ISR (Incremental Static Regeneration)** for fast loading
✅ **Webhook revalidation** for instant updates

## 10. Image Optimization

- Images are automatically optimized via Sanity's CDN
- Next.js Image component handles responsive loading
- Gallery includes lightbox functionality
- Alt text support for accessibility

## 11. Content Management Workflow

1. **Add new project**: Create in Sanity Studio
2. **Update existing**: Edit in Sanity Studio  
3. **Publish changes**: Changes go live automatically via webhook
4. **SEO**: Metadata is generated automatically from project data

## Troubleshooting

### Projects not loading?
- Check environment variables in `.env.local`
- Verify Sanity project ID and dataset
- Check browser console for errors

### Images not displaying?
- Ensure `cdn.sanity.io` is in `next.config.ts` remote patterns
- Check image URLs in browser network tab
- Verify images are published in Sanity

### Webhook not working?
- Check webhook URL includes correct secret
- Verify webhook is triggered on project changes
- Check Vercel function logs

## Migration from Static Data

Your existing projects are preserved as fallback data. Once Sanity is configured:

1. Projects will load from Sanity if available
2. Falls back to static data if Sanity is unavailable
3. Gradually migrate projects to Sanity Studio
4. Remove fallback data once migration is complete

## Next Steps

1. Set up Sanity project and studio
2. Configure environment variables
3. Add your first project in Sanity Studio
4. Test the integration
5. Migrate remaining projects
6. Customize the schema as needed
