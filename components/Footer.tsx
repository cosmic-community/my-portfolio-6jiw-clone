import Link from 'next/link'
import SocialLinks from '@/components/SocialLinks'
import type { SocialLink } from '@/types'

interface FooterProps {
  name: string
  headline?: string
  email?: string
  socialLinks: SocialLink[]
}

export default function Footer({ name, headline, email, socialLinks }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/60">
      <div className="container-page py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold text-white">{name}</p>
            {headline && <p className="mt-2 text-sm text-slate-400">{headline}</p>}
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-4 inline-block text-sm font-medium text-accent-300 hover:text-accent-200"
              >
                {email}
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-3">Explore</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/projects" className="text-slate-400 hover:text-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/skills" className="text-slate-400 hover:text-white">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="/experience" className="text-slate-400 hover:text-white">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {socialLinks.length > 0 && (
              <div className="col-span-2 sm:col-span-2">
                <p className="eyebrow mb-3">Elsewhere</p>
                <SocialLinks links={socialLinks} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {name}. All rights reserved.
          </p>
          <p className="font-mono">Content managed with Cosmic</p>
        </div>
      </div>
    </footer>
  )
}