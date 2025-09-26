import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

// GROQ queries for projects
export const projectsQuery = `*[_type == "project"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  slug,
  summary,
  description,
  role,
  timeline,
  team,
  technologies[],
  features[],
  challenges,
  solutions,
  outcomes,
  metrics,
  category,
  featured,
  status,
  heroImage,
  gallery[],
  liveUrl,
  githubUrl,
  _createdAt,
  _updatedAt
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  summary,
  description,
  role,
  timeline,
  team,
  technologies[],
  features[],
  challenges,
  solutions,
  outcomes,
  metrics,
  category,
  featured,
  status,
  heroImage,
  gallery[],
  liveUrl,
  githubUrl,
  _createdAt,
  _updatedAt
}`

export const projectSlugsQuery = `*[_type == "project" && defined(slug.current)][].slug.current`
