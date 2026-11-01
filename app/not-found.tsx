import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent-300">404</p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/projects" className="btn-ghost">
          View projects
        </Link>
      </div>
    </div>
  )
}