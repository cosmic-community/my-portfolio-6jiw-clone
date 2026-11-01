// app/projects/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TechBadge from '@/components/TechBadge'
import ProjectCard from '@/components/ProjectCard'
import ScreenshotGallery from '@/components/ScreenshotGallery'
import { getProject, getProjects } from '@/lib/cosmic'
import {
  excerpt,
  formatFullDate,
  getImageList,
  getImageUrl,
  getMetafieldValue,
  isTruthy,
  normalizeList,
} from '@/lib/utils'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: 'Project not found — My Portfolio' }
  }

  return {
    title: `${project.title} — My Portfolio`,
    description: excerpt(project.metadata?.description, 155),
    other: {
      'cosmic-context': JSON.stringify({ object_id: project.id, object_type: 'projects' }),
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const allProjects = await getProjects()
  const related = allProjects.filter((item) => item.slug !== project.slug).slice(0, 3)

  const description = getMetafieldValue(project.metadata?.description)
  const content = getMetafieldValue(project.metadata?.content)
  const isContentHtml = content.includes('<')
  const heroImage = getImageUrl(project.metadata?.featured_image)
  const screenshots = getImageList(project.metadata?.screenshots)
  const techStack = normalizeList(project.metadata?.tech_stack)
  const liveUrl = getMetafieldValue(project.metadata?.live_url)
  const githubUrl = getMetafieldValue(project.metadata?.github_url)
  const completion = formatFullDate(project.metadata?.completion_date)
  const featured = isTruthy(project.metadata?.featured)

  return (
    <article className="pb-8">
      <div className="container-page pt-12 sm:pt-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            {featured && (
              <span className="rounded-full border border-accent-400/30 bg-accent-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-200">
                Featured
              </span>
            )}
            {completion && (
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
                {completion}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>

          {description && (
            <p className="mt-5 text-lg leading-relaxed text-slate-400">{description}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Visit live site
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.95c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
                Source code
              </a>
            )}
          </div>
        </header>
      </div>

      {heroImage && (
        <div className="container-page mt-12">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <img
              src={`${heroImage}?w=2400&h=1350&fit=crop&auto=format,compress`}
              alt={project.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="container-page mt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0">
            {content ? (
              isContentHtml ? (
                <div
                  className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-white prose-p:text-slate-300 prose-a:text-accent-300 prose-strong:text-white prose-code:text-accent-200 prose-li:text-slate-300 prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="whitespace-pre-line text-base leading-relaxed text-slate-300">
                  {content}
                </div>
              )
            ) : (
              <p className="text-base text-slate-400">
                {description || 'No additional details for this project yet.'}
              </p>
            )}

            {screenshots.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">Screenshots</h2>
                <ScreenshotGallery images={screenshots} title={project.title} />
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {techStack.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="eyebrow mb-4">Tech stack</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <TechBadge key={tech} label={tech} size="md" />
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="eyebrow mb-4">Project details</h2>
              <dl className="space-y-4 text-sm">
                {completion && (
                  <div>
                    <dt className="text-slate-500">Completed</dt>
                    <dd className="mt-0.5 font-medium text-white">{completion}</dd>
                  </div>
                )}
                {liveUrl && (
                  <div>
                    <dt className="text-slate-500">Live URL</dt>
                    <dd className="mt-0.5">
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all font-medium text-accent-300 hover:text-accent-200"
                      >
                        {liveUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                )}
                {githubUrl && (
                  <div>
                    <dt className="text-slate-500">Repository</dt>
                    <dd className="mt-0.5">
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all font-medium text-accent-300 hover:text-accent-200"
                      >
                        {githubUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-slate-500">Screenshots</dt>
                  <dd className="mt-0.5 font-medium text-white">{screenshots.length}</dd>
                </div>
              </dl>
            </div>

            <Link href="/contact" className="btn-primary w-full">
              Work with me
            </Link>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-page mt-24">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">Other projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}