import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import SkillCard from '@/components/SkillCard'
import ExperienceItem from '@/components/ExperienceItem'
import {
  getFeaturedProjects,
  getProfile,
  getProjects,
  getSkills,
  getWorkExperience,
} from '@/lib/cosmic'
import { getMetafieldValue, isTruthy, proficiencyToPercent } from '@/lib/utils'

export default async function HomePage() {
  const [profile, allProjects, featuredProjects, skills, experience] = await Promise.all([
    getProfile(),
    getProjects(),
    getFeaturedProjects(3),
    getSkills(),
    getWorkExperience(),
  ])

  const topSkills = [...skills]
    .sort((a, b) => proficiencyToPercent(b.metadata?.proficiency) - proficiencyToPercent(a.metadata?.proficiency))
    .slice(0, 8)

  const recentRoles = experience.slice(0, 3)

  const yearsExperience = skills.reduce((max, skill) => {
    const years = Number.parseFloat(getMetafieldValue(skill.metadata?.years_experience))
    if (Number.isNaN(years)) return max
    return Math.max(max, Math.round(years))
  }, 0)

  const email = getMetafieldValue(profile?.metadata?.email)
  const available = isTruthy(profile?.metadata?.available_for_work)

  return (
    <>
      <Hero
        profile={profile}
        projectCount={allProjects.length}
        skillCount={skills.length}
        yearsExperience={yearsExperience}
      />

      {featuredProjects.length > 0 && (
        <section className="container-page mt-24 sm:mt-32">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            description="A handful of things I've designed, built and shipped — with the tech behind each one."
            actionHref="/projects"
            actionLabel="All projects"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {topSkills.length > 0 && (
        <section className="container-page mt-24 sm:mt-32">
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills & technologies"
            description="The languages, frameworks and tools I reach for most often."
            actionHref="/skills"
            actionLabel="Full skill set"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {recentRoles.length > 0 && (
        <section className="container-page mt-24 sm:mt-32">
          <SectionHeading
            eyebrow="Career"
            title="Where I've worked"
            description="Recent roles and the teams I've built with."
            actionHref="/experience"
            actionLabel="Full timeline"
          />
          <ol className="space-y-8">
            {recentRoles.map((role, index) => (
              <ExperienceItem
                key={role.id}
                role={role}
                isLast={index === recentRoles.length - 1}
              />
            ))}
          </ol>
        </section>
      )}

      <section className="container-page mt-24 sm:mt-32">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent-600/20 via-slate-900/60 to-fuchsia-600/20 p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl"
            aria-hidden="true"
          />
          <p className="eyebrow">{available ? 'Available for new work' : 'Say hello'}</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have a project in mind? Let&apos;s build something great together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            I&apos;m always happy to talk about product ideas, engineering challenges, or
            collaboration opportunities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Contact me
            </Link>
            {email && (
              <a href={`mailto:${email}`} className="btn-ghost">
                {email}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}