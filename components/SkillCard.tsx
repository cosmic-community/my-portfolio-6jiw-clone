import type { Skill } from '@/types'
import { getImageUrl, getMetafieldValue, proficiencyToPercent } from '@/lib/utils'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  if (!skill) return null

  const name = getMetafieldValue(skill.metadata?.name) || skill.title
  const proficiencyLabel = getMetafieldValue(skill.metadata?.proficiency)
  const percent = proficiencyToPercent(skill.metadata?.proficiency)
  const years = getMetafieldValue(skill.metadata?.years_experience)
  const iconUrl = getImageUrl(skill.metadata?.icon)
  const iconText = iconUrl ? '' : getMetafieldValue(skill.metadata?.icon)

  return (
    <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-accent-400/40 hover:bg-white/[0.08]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-slate-900 text-lg">
          {iconUrl ? (
            <img
              src={`${iconUrl}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={name}
              width={40}
              height={40}
              loading="lazy"
              className="h-full w-full object-contain p-1.5"
            />
          ) : iconText ? (
            <span aria-hidden="true">{iconText}</span>
          ) : (
            <span aria-hidden="true">🛠️</span>
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
            {proficiencyLabel && <span>{proficiencyLabel}</span>}
            {proficiencyLabel && years && <span aria-hidden="true">•</span>}
            {years && (
              <span className="font-mono">
                {years} {Number(years) === 1 ? 'yr' : 'yrs'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-400 to-fuchsia-400 transition-all duration-700"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency`}
        />
      </div>
    </div>
  )
}