import Link from 'next/link'
import TechBadge from '@/components/TechBadge'
import type { Project } from '@/types'
import {
  excerpt,
  formatMonthYear,
  getImageUrl,
  getMetafieldValue,
  isTruthy,
  normalizeList,
} from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  if (!project) return null

  const imageUrl = getImageUrl(project.metadata?.featured_image)
  const description = excerpt(project.metadata?.description, 140)
  const techStack = normalizeList(project.metadata?.tech_stack).slice(0, 4)
  const completion = formatMonthYear(project.metadata?.completion_date)
  const liveUrl = getMetafieldValue(project.metadata?.live_url)
  const githubUrl = getMetafieldValue(project.metadata?.github_url)
  const isFeatured = featured || isTruthy(project.metadata?.featured)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:shadow-2xl hover:shadow-accent-500/10">
      <Link href={`/projects/${project.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=1200&h=750&fit=crop&auto=format,compress`}
              alt={project.title}
              width={600}
              height={375}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-3xl">
              🚀
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          {isFeatured && (
            <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-200 backdrop-blur">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          {completion && <p className="font-mono text-xs text-slate-500">{completion}</p>}
          <div className="flex items-center gap-3 text-slate-500">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.95c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent-200">
            {project.title}
          </Link>
        </h3>

        {description && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
        )}

        {techStack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
        >
          View case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}