export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
    _type: 'slug'
  }
  summary: string
  description: string
  role?: string
  timeline?: string
  team?: string
  technologies: string[]
  features: string[]
  challenges?: string
  solutions?: string
  outcomes?: string
  metrics?: string
  category: 'web' | 'mobile' | 'dashboard' | 'api'
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  heroImage: SanityImage
  gallery: SanityImage[]
  liveUrl?: string
  githubUrl?: string
  _createdAt: string
  _updatedAt: string
}

export interface ProjectMeta {
  title: string
  description: string
  image: string
  url: string
  publishedTime: string
  modifiedTime: string
  tags: string[]
}
