import type { WorkExperience } from '@/types'
import {
  formatDuration,
  formatMonthYear,
  getImageUrl,
  getMetafieldValue,
  isTruthy,
} from '@/lib/utils'

interface ExperienceItemProps {
  role: WorkExperience
  isLast?: boolean
}

export default function ExperienceItem({ role, isLast = false }: ExperienceItemProps) {
  if (!role) return null

  const jobTitle = getMetafieldValue(role.metadata?.job_title) || role.title
  const company = getMetafieldValue(role.metadata?.company_name)
  const location = getMetafieldValue(role.metadata?.location)
  const description = getMetafieldValue(role.metadata?.description)
  const isCurrent = isTruthy(role.metadata?.current_role)
  const start = formatMonthYear(role.metadata?.start_date)
  const end = isCurrent ? 'Present' : formatMonthYear(role.metadata?.end_date)
  const duration = formatDuration(role.metadata?.start_date, role.metadata?.end_date, isCurrent)
  const logoUrl = getImageUrl(role.metadata?.company_logo)
  const isHtml = description.includes('<')

  return (
    <li className="relative pl-14 sm:pl-20">
      {!isLast && (
        <span
          className="absolute left-5 top-14 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-white/20 to-transparent sm:left-7"
          aria-hidden="true"
        />
      )}

      <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-slate-900 sm:h-14 sm:w-14">
        {logoUrl ? (
          <img
            src={`${logoUrl}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={company || jobTitle}
            width={56}
            height={56}
            loading="lazy"
            className="h-full w-full object-contain p-1.5"
          />
        ) : (
          <span className="text-lg" aria-hidden="true">
            💼
          </span>
        )}
      </span>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-white/20 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white">{jobTitle}</h3>
            <p className="mt-1 text-sm text-accent-200">
              {company}
              {location && <span className="text-slate-500"> · {location}</span>}
            </p>
          </div>

          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Current
            </span>
          )}
        </div>

        {(start || end) && (
          <p className="mt-3 font-mono text-xs uppercase tracking-wider text-slate-500">
            {start}
            {start && end && ' — '}
            {end}
            {duration && <span className="normal-case tracking-normal"> · {duration}</span>}
          </p>
        )}

        {description && (
          <div className="mt-4 text-sm leading-relaxed text-slate-400">
            {isHtml ? (
              <div
                className="prose prose-sm prose-invert max-w-none prose-p:text-slate-400 prose-li:text-slate-400 prose-strong:text-slate-200"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="whitespace-pre-line">{description}</p>
            )}
          </div>
        )}
      </div>
    </li>
  )
}