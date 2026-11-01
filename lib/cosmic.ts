import { createBucketClient } from '@cosmicjs/sdk'
import type { Profile, Project, Skill, WorkExperience } from '@/types'
import { isTruthy, toTimestamp } from '@/lib/utils'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Re-exported so components can import the safe metafield renderer from either module
export { getMetafieldValue } from '@/lib/utils'

/** Simple error helper for Cosmic SDK */
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

/** 👤 Fetch the singleton profile object */
export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'profile' }).depth(1)
    const profile = response.object as Profile | undefined
    return profile ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch profile')
  }
}

/** 🚀 Fetch all projects, newest completion date first */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const projects = (response.objects ?? []) as Project[]

    return [...projects].sort((a, b) => {
      const dateA = toTimestamp(a.metadata?.completion_date) || toTimestamp(a.created_at)
      const dateB = toTimestamp(b.metadata?.completion_date) || toTimestamp(b.created_at)
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch projects')
  }
}

/** 🚀 Featured projects (falls back to the most recent projects) */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects()
  const featured = projects.filter((project) => isTruthy(project.metadata?.featured))
  const source = featured.length > 0 ? featured : projects
  return source.slice(0, limit)
}

/** 🚀 Fetch a single project by slug */
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'projects', slug }).depth(1)
    const project = response.object as Project | undefined
    return project ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch project')
  }
}

/** 🛠️ Fetch all skills */
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return (response.objects ?? []) as Skill[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch skills')
  }
}

/** 💼 Fetch work experience, most recent first */
export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const roles = (response.objects ?? []) as WorkExperience[]

    return [...roles].sort((a, b) => {
      const currentA = isTruthy(a.metadata?.current_role) ? 1 : 0
      const currentB = isTruthy(b.metadata?.current_role) ? 1 : 0
      if (currentA !== currentB) return currentB - currentA
      return toTimestamp(b.metadata?.start_date) - toTimestamp(a.metadata?.start_date)
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch work experience')
  }
}