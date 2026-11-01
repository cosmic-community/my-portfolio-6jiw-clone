'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error.message)
  }, [error])

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl" aria-hidden="true">
        ⚠️
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
        We couldn&apos;t load this content. This is usually a temporary issue with the content API —
        please try again.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-ghost">
          Back home
        </Link>
      </div>
    </div>
  )
}