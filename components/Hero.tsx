import Link from 'next/link'
import SocialLinks from '@/components/SocialLinks'
import type { Profile } from '@/types'
import { getImageUrl, getMetafieldValue, isTruthy, parseSocialLinks } from '@/lib/utils'

interface HeroProps {
  profile: Profile | null
  projectCount: number
  skillCount: number
  yearsExperience: number
}

export default function Hero({ profile, projectCount, skillCount, yearsExperience }: HeroProps) {
  const fullName = getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'My Portfolio'
  const headline = getMetafieldValue(profile?.metadata?.headline)
  const bio = getMetafieldValue(profile?.metadata?.bio)
  const location = getMetafieldValue(profile?.metadata?.location)
  const avatarUrl = getImageUrl(profile?.metadata?.avatar)
  const resumeUrl = getImageUrl(profile?.metadata?.resume)
  const available = isTruthy(profile?.metadata?.available_for_work)
  const socialLinks = parseSocialLinks(profile?.metadata?.social_links)
  const isBioHtml = bio.includes('<')

  const stats = [
    { label: 'Projects shipped', value: projectCount },
    { label: 'Technologies', value: skillCount },
    { label: 'Years experience', value: yearsExperience },
  ].filter((stat) => stat.value > 0)

  return (
    <section className="relative overflow-hidden pt-16 sm:pt-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div className="animate-fade-up">
            {available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
            )}

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Hi, I&apos;m <span className="text-gradient">{fullName}</span>
            </h1>

            {headline && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                {headline}
              </p>
            )}

            {bio && (
              <div className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
                {isBioHtml ? (
                  <div
                    className="prose prose-invert max-w-none prose-p:text-slate-400"
                    dangerouslySetInnerHTML={{ __html: bio }}
                  />
                ) : (
                  <p className="whitespace-pre-line">{bio}</p>
                )}
              </div>
            )}

            {location && (
              <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {location}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary">
                View my work
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in touch
              </Link>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
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
                  Resume
                </a>
              )}
            </div>

            {socialLinks.length > 0 && <SocialLinks links={socialLinks} className="mt-8" />}
          </div>

          <div className="relative animate-fade-in lg:justify-self-end">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div
                className="absolute -inset-6 rounded-full bg-gradient-to-tr from-accent-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900">
                {avatarUrl ? (
                  <img
                    src={`${avatarUrl}?w=1000&h=1000&fit=crop&auto=format,compress`}
                    alt={fullName}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-600/40 via-slate-900 to-fuchsia-600/30 text-6xl">
                    🎨
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {stats.length > 0 && (
          <dl className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                  <span className="text-accent-400">+</span>
                </dd>
                <dt className="mt-1 text-sm text-slate-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}