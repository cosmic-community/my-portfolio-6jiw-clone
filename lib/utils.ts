import type { SocialLink } from '@/types'

/**
 * Safely convert any Cosmic metafield value into a renderable string.
 * Handles strings, numbers, booleans and legacy `{ key, value }` objects.
 */
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    const value = (field as { value: unknown }).value
    if (value === null || value === undefined) return ''
    return String(value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    const key = (field as { key: unknown }).key
    if (key === null || key === undefined) return ''
    return String(key)
  }
  return ''
}

/** Truthy check for boolean-ish metafields (switch fields can be booleans or strings) */
export function isTruthy(field: unknown): boolean {
  if (field === true) return true
  const value = getMetafieldValue(field).trim().toLowerCase()
  return value === 'true' || value === 'yes' || value === '1'
}

/** Extract an imgix url from a Cosmic file metafield (returns null when absent) */
export function getImageUrl(field: unknown): string | null {
  if (!field || typeof field !== 'object') return null
  if ('imgix_url' in field) {
    const url = (field as { imgix_url?: unknown }).imgix_url
    if (typeof url === 'string' && url.length > 0) return url
  }
  if ('url' in field) {
    const url = (field as { url?: unknown }).url
    if (typeof url === 'string' && url.length > 0) return url
  }
  return null
}

/** Extract a list of imgix urls from a Cosmic "files" metafield */
export function getImageList(field: unknown): string[] {
  if (!Array.isArray(field)) return []
  const urls: string[] = []
  for (const item of field) {
    const url = getImageUrl(item)
    if (url) urls.push(url)
  }
  return urls
}

/**
 * Normalize a multi-select / comma separated text field into a string array.
 */
export function normalizeList(field: unknown): string[] {
  if (field === null || field === undefined) return []
  if (Array.isArray(field)) {
    const items: string[] = []
    for (const entry of field) {
      const value = getMetafieldValue(entry).trim()
      if (value.length > 0) items.push(value)
    }
    return items
  }
  const raw = getMetafieldValue(field)
  if (!raw) return []
  return raw
    .split(/[,•|\n]/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

/** Parse the social_links metafield into a list of { key, url } pairs */
export function parseSocialLinks(field: unknown): SocialLink[] {
  if (!field) return []
  let raw: unknown = field
  if (typeof field === 'string') {
    const trimmed = field.trim()
    if (!trimmed.startsWith('{')) return []
    try {
      raw = JSON.parse(trimmed) as unknown
    } catch {
      return []
    }
  }
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return []
  const links: SocialLink[] = []
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const url = typeof value === 'string' ? value.trim() : getMetafieldValue(value).trim()
    if (url.length > 0) {
      links.push({ key, url })
    }
  }
  return links
}

/** Format an ISO-ish date string into "Mar 2023" */
export function formatMonthYear(field: unknown): string {
  const raw = getMetafieldValue(field).trim()
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

/** Format an ISO-ish date string into "March 12, 2023" */
export function formatFullDate(field: unknown): string {
  const raw = getMetafieldValue(field).trim()
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Get a millisecond timestamp for sorting (0 when invalid) */
export function toTimestamp(field: unknown): number {
  const raw = getMetafieldValue(field).trim()
  if (!raw) return 0
  const time = new Date(raw).getTime()
  return Number.isNaN(time) ? 0 : time
}

/** Human readable duration between two dates, e.g. "2 yrs 3 mos" */
export function formatDuration(start: unknown, end: unknown, isCurrent: boolean): string {
  const startRaw = getMetafieldValue(start).trim()
  if (!startRaw) return ''
  const startDate = new Date(startRaw)
  if (Number.isNaN(startDate.getTime())) return ''

  let endDate = new Date()
  if (!isCurrent) {
    const endRaw = getMetafieldValue(end).trim()
    if (endRaw) {
      const parsed = new Date(endRaw)
      if (!Number.isNaN(parsed.getTime())) endDate = parsed
    }
  }

  let months =
    (endDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
    (endDate.getUTCMonth() - startDate.getUTCMonth())
  if (months < 0) months = 0
  const years = Math.floor(months / 12)
  const remaining = months % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years === 1 ? '' : 's'}`)
  if (remaining > 0) parts.push(`${remaining} mo${remaining === 1 ? '' : 's'}`)
  if (parts.length === 0) return '1 mo'
  return parts.join(' ')
}

/** Convert a proficiency value (label or number) into a 0-100 percentage */
export function proficiencyToPercent(field: unknown): number {
  const raw = getMetafieldValue(field).trim().toLowerCase()
  if (!raw) return 60

  if (raw.includes('expert') || raw.includes('master')) return 95
  if (raw.includes('advanced')) return 82
  if (raw.includes('proficient')) return 75
  if (raw.includes('intermediate')) return 62
  if (raw.includes('beginner') || raw.includes('novice') || raw.includes('learning')) return 38

  const numeric = Number.parseFloat(raw.replace('%', ''))
  if (!Number.isNaN(numeric)) {
    if (numeric <= 5) return Math.round((numeric / 5) * 100)
    if (numeric <= 10) return Math.round((numeric / 10) * 100)
    return Math.min(Math.round(numeric), 100)
  }
  return 60
}

/** Strip HTML tags and truncate for previews */
export function excerpt(field: unknown, length = 160): string {
  const raw = getMetafieldValue(field).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (raw.length <= length) return raw
  return `${raw.slice(0, length).trimEnd()}…`
}

/** Optimized imgix url helper */
export function imgix(url: string, params: string): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${params}`
}

/** Nice label for a social link key */
export function socialLabel(key: string): string {
  const cleaned = key.replace(/[_-]+/g, ' ').trim()
  if (!cleaned) return 'Link'
  return cleaned
    .split(' ')
    .map((word) => (word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}