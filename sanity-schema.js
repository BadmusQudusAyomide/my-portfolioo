// This is the schema for your Sanity Studio
// Copy this to your Sanity Studio project's schema folder

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief description for project cards (150-200 chars)',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text',
      description: 'Detailed project description for the project page',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., "Full Stack Developer", "Lead Frontend Engineer"'
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'e.g., "3 months", "Jan 2024 - Mar 2024"'
    },
    {
      name: 'team',
      title: 'Team Size',
      type: 'string',
      description: 'e.g., "Solo project", "Team of 4"'
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of main features/capabilities'
    },
    {
      name: 'challenges',
      title: 'Challenges',
      type: 'text',
      description: 'What problems did you solve?'
    },
    {
      name: 'solutions',
      title: 'Solutions',
      type: 'text',
      description: 'How did you solve the challenges?'
    },
    {
      name: 'outcomes',
      title: 'Outcomes',
      type: 'text',
      description: 'What was the result/impact?'
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'text',
      description: 'Quantifiable results (users, performance, etc.)'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Application', value: 'web'},
          {title: 'Mobile Application', value: 'mobile'},
          {title: 'Dashboard/Admin', value: 'dashboard'},
          {title: 'API/Backend', value: 'api'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project prominently',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Archived', value: 'archived'}
        ]
      },
      initialValue: 'completed'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required()
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        }
      ]
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to the live project'
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to the GitHub repository'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      category: 'category',
      featured: 'featured'
    },
    prepare(selection) {
      const {title, media, category, featured} = selection
      return {
        title: title,
        subtitle: `${category}${featured ? ' • Featured' : ''}`,
        media: media
      }
    }
  }
}
