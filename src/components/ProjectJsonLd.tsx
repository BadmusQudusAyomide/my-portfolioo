import { urlFor } from '@/lib/sanity'
import { Project } from '@/types/project'

interface ProjectJsonLdProps {
  project: Project
}

export default function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const baseUrl = 'https://badmusqudusayomide.vercel.app'
  const projectUrl = `${baseUrl}/projects/${project.slug.current}`
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(1200).height(630).url()
    : `${baseUrl}/placeholder-project.svg`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': projectUrl,
    name: project.title,
    description: project.summary,
    url: projectUrl,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: project.heroImage?.alt || project.title
    },
    author: {
      '@type': 'Person',
      name: 'Badmus Qudus Ayomide',
      url: baseUrl,
      sameAs: [
        'https://github.com/BadmusQudusAyomide',
        'https://ng.linkedin.com/in/qudus-ayomide-badmus',
        'https://x.com/AyomideQud49713'
      ]
    },
    creator: {
      '@type': 'Person',
      name: 'Badmus Qudus Ayomide'
    },
    dateCreated: project._createdAt,
    dateModified: project._updatedAt,
    datePublished: project._createdAt,
    keywords: project.technologies.join(', '),
    genre: project.category,
    workExample: project.liveUrl ? {
      '@type': 'WebSite',
      url: project.liveUrl,
      name: `${project.title} - Live Demo`
    } : undefined,
    codeRepository: project.githubUrl,
    programmingLanguage: project.technologies,
    applicationCategory: project.category === 'web' ? 'WebApplication' : 
                        project.category === 'mobile' ? 'MobileApplication' : 
                        'SoftwareApplication',
    operatingSystem: project.category === 'web' ? 'Web Browser' : 
                    project.category === 'mobile' ? 'Android, iOS' : 
                    'Cross Platform',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    mainEntity: {
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.description,
      programmingLanguage: project.technologies,
      codeRepository: project.githubUrl,
      author: {
        '@type': 'Person',
        name: 'Badmus Qudus Ayomide'
      },
      dateCreated: project._createdAt,
      dateModified: project._updatedAt
    }
  }

  // Remove undefined fields
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
    />
  )
}
