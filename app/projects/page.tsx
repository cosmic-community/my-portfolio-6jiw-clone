import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/lib/cosmic'
import { isTruthy, normalizeList } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Projects — My Portfolio',
  description: 'A collection of projects with screenshots, tech stacks and live links.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const featured = projects.filter((project) => isTruthy(project.metadata?.featured))
  const others = projects.filter((project) => !isTruthy(project.metadata?.featured))

  const techCount = new Set(
    projects.flatMap((project) => normalizeList(project.metadata?.tech_stack))
  ).size

  return (
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Portfolio"
        title="Projects"
        description={
          projects.length > 0
            ? `${projects.length} project${projects.length === 1 ? '' : 's'} built with ${techCount} different technologies. Click into any project for the full case study.`
            : 'Projects will appear here once they are added in Cosmic.'
        }
      />

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center">
          <p className="text-4xl" aria-hidden="true">
            🚀
          </p>
          <h2 className="mt-4 text-xl font-semibold text-white">No projects yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Add a project in your Cosmic bucket and it will show up here automatically.
          </p>
          <Link href="/" className="btn-ghost mt-6">
            Back home
          </Link>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          )}

          {others.length > 0 && (
            <div className={featured.length > 0 ? 'mt-16' : ''}>
              {featured.length > 0 && (
                <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  More projects
                </h2>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}