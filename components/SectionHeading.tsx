import Link from 'next/link'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  actionHref?: string
  actionLabel?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = 'left',
}: SectionHeadingProps) {
  const isCentered = align === 'center'

  return (
    <div
      className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        isCentered ? 'text-center sm:flex-col sm:items-center sm:text-center' : ''
      }`}
    >
      <div className={isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-slate-400">{description}</p>}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
        >
          {actionLabel}
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      )}
    </div>
  )
}