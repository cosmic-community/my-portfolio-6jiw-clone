import type { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import SkillCard from '@/components/SkillCard'
import { getSkills } from '@/lib/cosmic'
import { getMetafieldValue, proficiencyToPercent } from '@/lib/utils'
import type { Skill } from '@/types'

export const metadata: Metadata = {
  title: 'Skills — My Portfolio',
  description: 'Languages, frameworks and tools grouped by category with proficiency levels.',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  const grouped: Record<string, Skill[]> = {}
  for (const skill of skills) {
    const category = getMetafieldValue(skill.metadata?.category).trim() || 'Other'
    const bucket = grouped[category]
    if (bucket) {
      bucket.push(skill)
    } else {
      grouped[category] = [skill]
    }
  }

  const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b))

  return (
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & technologies"
        description={
          skills.length > 0
            ? `${skills.length} skill${skills.length === 1 ? '' : 's'} across ${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}, with proficiency and years of hands-on experience.`
            : 'Skills will appear here once they are added in Cosmic.'
        }
      />

      {skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center">
          <p className="text-4xl" aria-hidden="true">
            🛠️
          </p>
          <h2 className="mt-4 text-xl font-semibold text-white">No skills yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Add skills to your Cosmic bucket and they will be grouped by category here.
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {categories.map((category) => {
            const categorySkills = grouped[category]

            if (!categorySkills || categorySkills.length === 0) {
              return null
            }

            const sorted = [...categorySkills].sort(
              (a, b) =>
                proficiencyToPercent(b.metadata?.proficiency) -
                proficiencyToPercent(a.metadata?.proficiency)
            )

            return (
              <section key={category}>
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-white">{category}</h2>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  <span className="font-mono text-xs text-slate-500">
                    {sorted.length} skill{sorted.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sorted.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}