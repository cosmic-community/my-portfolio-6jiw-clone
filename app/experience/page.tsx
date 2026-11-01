import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import ExperienceItem from '@/components/ExperienceItem'
import { getProfile, getWorkExperience } from '@/lib/cosmic'
import { getImageUrl, getMetafieldValue } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Experience — My Portfolio',
  description: 'A chronological timeline of roles, companies and responsibilities.',
}

export default async function ExperiencePage() {
  const [experience, profile] = await Promise.all([getWorkExperience(), getProfile()])
  const resumeUrl = getImageUrl(profile?.metadata?.resume)

  const companies = new Set(
    experience
      .map((role) => getMetafieldValue(role.metadata?.company_name).trim())
      .filter((name) => name.length > 0)
  )

  return (
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Career"
        title="Work experience"
        description={
          experience.length > 0
            ? `${experience.length} role${experience.length === 1 ? '' : 's'} across ${companies.size} compan${companies.size === 1 ? 'y' : 'ies'} — most recent first.`
            : 'Work experience will appear here once it is added in Cosmic.'
        }
        actionHref={resumeUrl ? undefined : '/contact'}
        actionLabel={resumeUrl ? undefined : 'Get in touch'}
      />

      {resumeUrl && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mb-12 inline-flex"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Download resume
        </a>
      )}

      {experience.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center">
          <p className="text-4xl" aria-hidden="true">
            💼
          </p>
          <h2 className="mt-4 text-xl font-semibold text-white">No experience entries yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Add roles to the Work Experience object type in Cosmic to build out this timeline.
          </p>
          <Link href="/" className="btn-ghost mt-6">
            Back home
          </Link>
        </div>
      ) : (
        <ol className="space-y-8">
          {experience.map((role, index) => (
            <ExperienceItem key={role.id} role={role} isLast={index === experience.length - 1} />
          ))}
        </ol>
      )}
    </div>
  )
}