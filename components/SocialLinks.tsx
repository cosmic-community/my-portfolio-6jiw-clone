import type { SocialLink } from '@/types'
import { socialLabel } from '@/lib/utils'

interface SocialLinksProps {
  links: SocialLink[]
  variant?: 'inline' | 'buttons'
  className?: string
}

function Icon({ name }: { name: string }) {
  const key = name.toLowerCase()

  if (key.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.95c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
      </svg>
    )
  }

  if (key.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.42 4.78 5.57V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4z" />
      </svg>
    )
  }

  if (key.includes('twitter') || key === 'x') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.9 2H22l-6.77 7.73L23 22h-6.9l-4.6-6.1L5.9 22H2.8l7.2-8.2L1.6 2h6.9l4.3 5.7zM17.3 20h1.9L7.1 3.9H5.1z" />
      </svg>
    )
  }

  if (key.includes('dribbble')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.9 5.5a9.5 9.5 0 0 1 2.2 5.9c-.9-.2-3.2-.6-5.6-.3-.1-.3-.3-.7-.4-1 2.2-.9 3.4-2.3 3.8-4.6zM12 1.9c2.4 0 4.6.9 6.3 2.4-.3 2-1.4 3.2-3.4 4a34 34 0 0 0-3.6-5.6c.2 0 .5-.1.7-.1zM9.2 2.6a37 37 0 0 1 3.6 5.5c-3 .8-6 .8-7.4.8a10.1 10.1 0 0 1 3.8-6.3zM1.9 12v-.3c1.4 0 5 .1 8.5-1 .3.6.6 1.2.8 1.8-2.7.8-5.1 2.7-6.7 5.4A10.1 10.1 0 0 1 1.9 12zm10.1 10.1c-2.3 0-4.4-.8-6.1-2.1 1.3-2.5 3.6-4.2 6.3-4.9a29 29 0 0 1 1.6 6.5c-.6.3-1.2.5-1.8.5zm3.6-1.3a31 31 0 0 0-1.5-6.1c2.2-.3 4.2.2 5 .4a10.1 10.1 0 0 1-3.5 5.7z" />
      </svg>
    )
  }

  if (key.includes('mail') || key.includes('email')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z" />
    </svg>
  )
}

export default function SocialLinks({ links, variant = 'inline', className }: SocialLinksProps) {
  if (!links || links.length === 0) {
    return null
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-3 ${className ?? ''}`}>
        {links.map((link) => (
          <a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-accent-400/50 hover:bg-white/10 hover:text-white"
          >
            <Icon name={link.key} />
            {socialLabel(link.key)}
          </a>
        ))}
      </div>
    )
  }

  return (
    <ul className={`flex flex-wrap items-center gap-4 ${className ?? ''}`}>
      {links.map((link) => (
        <li key={link.key}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            aria-label={socialLabel(link.key)}
          >
            <Icon name={link.key} />
            <span>{socialLabel(link.key)}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}