interface TechBadgeProps {
  label: string
  size?: 'sm' | 'md'
}

export default function TechBadge({ label, size = 'sm' }: TechBadgeProps) {
  if (!label) return null

  const sizeClasses =
    size === 'md' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center rounded-md border border-accent-400/25 bg-accent-500/10 font-mono font-medium text-accent-200 ${sizeClasses}`}
    >
      {label}
    </span>
  )
}