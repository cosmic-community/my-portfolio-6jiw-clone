interface ContactCardProps {
  label: string
  value: string
  href?: string
  icon: 'mail' | 'phone' | 'location'
}

function CardIcon({ icon }: { icon: ContactCardProps['icon'] }) {
  if (icon === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    )
  }
  if (icon === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
        <path d="M4 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 5a2 2 0 0 1 2-2z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export default function ContactCard({ label, value, href, icon }: ContactCardProps) {
  if (!value) return null

  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-accent-400/40 hover:bg-white/[0.08]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/25 to-fuchsia-500/20 text-accent-200">
        <CardIcon icon={icon} />
      </span>
      <div className="min-w-0">
        <p className="eyebrow mb-1.5">{label}</p>
        <p className="break-words text-base font-medium text-white">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}