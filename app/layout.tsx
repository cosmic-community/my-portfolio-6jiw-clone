import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getProfile } from '@/lib/cosmic'
import { getImageUrl, getMetafieldValue, parseSocialLinks } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'My Portfolio — Developer Portfolio',
  description:
    'A developer portfolio showcasing projects, skills, work experience and contact information.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getProfile()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  const fullName = getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'My Portfolio'
  const headline = getMetafieldValue(profile?.metadata?.headline)
  const email = getMetafieldValue(profile?.metadata?.email)
  const avatarUrl = getImageUrl(profile?.metadata?.avatar)
  const socialLinks = parseSocialLinks(profile?.metadata?.social_links)

  return (
    <html lang="en">
      <head>
        {/* Emoji favicon */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>"
        />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a65baf69c05ffa1ada030fd"></script>
      </head>
      <body className="min-h-screen">
        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none fixed inset-0 -z-10 grid-glow" aria-hidden="true" />
          <Header name={fullName} avatarUrl={avatarUrl} />
          <main className="flex-1">{children}</main>
          <Footer
            name={fullName}
            headline={headline}
            email={email}
            socialLinks={socialLinks}
          />
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}