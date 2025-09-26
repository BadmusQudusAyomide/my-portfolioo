import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, User, Clock, CheckCircle } from 'lucide-react'
import { client, projectBySlugQuery, projectSlugsQuery, urlFor } from '@/lib/sanity'
import { Project } from '@/types/project'
import ProjectGallery from '@/components/ProjectGallery'
import ProjectJsonLd from '@/components/ProjectJsonLd'

interface Props {
  params: { slug: string }
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await client.fetch(projectSlugsQuery)
  return slugs.map((slug: string) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project: Project = await client.fetch(projectBySlugQuery, { slug })
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  const baseUrl = 'https://badmusqudusayomide.vercel.app'
  const projectUrl = `${baseUrl}/projects/${project.slug.current}`
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(1200).height(630).url()
    : `${baseUrl}/placeholder-project.svg`

  return {
    title: `${project.title} | Badmus Qudus Ayomide`,
    description: project.summary,
    keywords: [
      project.title,
      ...(project.technologies || []),
      project.category,
      'Badmus Qudus Ayomide',
      'portfolio',
      'project case study'
    ],
    authors: [{ name: 'Badmus Qudus Ayomide' }],
    openGraph: {
      title: project.title,
      description: project.summary,
      url: projectUrl,
      siteName: 'Badmus Qudus Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.heroImage?.alt || project.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: project._createdAt,
      modifiedTime: project._updatedAt,
      tags: project.technologies || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      creator: '@AyomideQud49713',
      images: [imageUrl],
    },
    alternates: {
      canonical: projectUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project: Project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      
      <div className="min-h-screen bg-[#0b0a1f] text-gray-100">
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
          
          <div className="container mx-auto px-6 relative z-10">
            {/* Navigation */}
            <div className="flex items-center gap-4 mb-8">
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">{project.title}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {project.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-medium">
                      Featured Project
                    </span>
                  )}
                  <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs font-medium capitalize">
                    {project.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent leading-tight">
                  {project.title}
                </h1>

                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {project.summary}
                </p>

                {/* Meta Information */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {project.role && (
                    <div>
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Role</span>
                      </div>
                      <p className="text-gray-300">{project.role}</p>
                    </div>
                  )}
                  {project.timeline && (
                    <div>
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-gray-300">{project.timeline}</p>
                    </div>
                  )}
                  {project.team && (
                    <div>
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Team</span>
                      </div>
                      <p className="text-gray-300">{project.team}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-purple-400/70 text-purple-300 rounded-lg font-medium hover:bg-purple-400/10 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={project.heroImage ? urlFor(project.heroImage).width(800).height(600).url() : '/placeholder-project.svg'}
                    alt={project.heroImage?.alt || project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 border-t border-gray-800/50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {(project.technologies || []).map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800/50 rounded-full text-purple-300 border border-gray-700/50 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-purple-400">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Key Features</h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-8">
                  {project.challenges && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Challenges</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}

                  {project.solutions && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Solutions</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.solutions}
                      </p>
                    </div>
                  )}

                  {project.outcomes && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Outcomes</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.outcomes}
                      </p>
                    </div>
                  )}

                  {project.metrics && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Metrics</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.metrics}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 border-t border-gray-800/50">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-bold mb-8 text-center">Project Gallery</h2>
              <ProjectGallery images={project.gallery} projectTitle={project.title} />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 border-t border-gray-800/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I&apos;m always open to discussing new opportunities and interesting projects.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              Get In Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
