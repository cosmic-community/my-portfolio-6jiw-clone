import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import ContactCard from '@/components/ContactCard'
import SocialLinks from '@/components/SocialLinks'
import { getProfile } from '@/lib/cosmic'
import { getImageUrl, getMetafieldValue, isTruthy, parseSocialLinks } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact — My Portfolio',
  description: 'Get in touch about projects, roles and collaborations.',
}

export default async function ContactPage() {
  const profile = await getProfile()

  const fullName = getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'me'
  const email = getMetafieldValue(profile?.metadata?.email)
  const phone = getMetafieldValue(profile?.metadata?.phone)
  const location = getMetafieldValue(profile?.metadata?.location)
  const available = isTruthy(profile?.metadata?.available_for_work)
  const avatarUrl = getImageUrl(profile?.metadata?.avatar)
  const resumeUrl = getImageUrl(profile?.metadata?.resume)
  const socialLinks = parseSocialLinks(profile?.metadata?.social_links)

  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined

  return (
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description={`The fastest way to reach ${fullName} is by email. I read everything and reply to serious enquiries within a couple of days.`}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-4">
          <ContactCard
            label="Email"
            value={email}
            href={email ? `mailto:${email}` : undefined}
            icon="mail"
          />
          <ContactCard label="Phone" value={phone} href={phoneHref} icon="phone" />
          <ContactCard label="Location" value={location} icon="location" />

          {!email && !phone && !location && (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center">
              <p className="text-4xl" aria-hidden="true">
                📬
              </p>
              <h2 className="mt-4 text-xl font-semibold text-white">No contact details yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Add email, phone or location to the Profile object in Cosmic to populate this page.
              </p>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="eyebrow mb-4">Find me online</h2>
              <SocialLinks links={socialLinks} variant="buttons" />
            </div>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {avatarUrl ? (
              <img
                src={`${avatarUrl}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={fullName}
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-accent-600/40 via-slate-900 to-fuchsia-600/30 text-5xl">
                🎨
              </div>
            )}
            <div className="p-6">
              <p className="text-lg font-semibold text-white">{fullName}</p>
              {available ? (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Open to opportunities
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-400">
                  Currently focused on existing commitments, but always happy to chat.
                </p>
              )}

              <div className="mt-6 space-y-3">
                {email && (
                  <a href={`mailto:${email}`} className="btn-primary w-full">
                    Send an email
                  </a>
                )}
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full"
                  >
                    Download resume
                  </a>
                )}
                <Link href="/projects" className="btn-ghost w-full">
                  Browse projects
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}