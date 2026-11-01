'use client'

import { useState } from 'react'

interface ScreenshotGalleryProps {
  images: string[]
  title: string
}

export default function ScreenshotGallery({ images, title }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const safeIndex = activeIndex >= 0 && activeIndex < images.length ? activeIndex : 0
  const activeImage = images[safeIndex] ?? images[0]

  if (!activeImage) {
    return null
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        <img
          src={`${activeImage}?w=2000&h=1250&fit=crop&auto=format,compress`}
          alt={`${title} screenshot ${safeIndex + 1}`}
          width={1000}
          height={625}
          className="h-full w-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur transition-colors hover:bg-slate-950"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur transition-colors hover:bg-slate-950"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 font-mono text-xs text-slate-300 backdrop-blur">
              {safeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View screenshot ${index + 1}`}
              aria-current={index === safeIndex}
              className={`overflow-hidden rounded-lg border transition-all duration-200 ${
                index === safeIndex
                  ? 'border-accent-400 opacity-100 ring-1 ring-accent-400/50'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={`${image}?w=400&h=250&fit=crop&auto=format,compress`}
                alt={`${title} thumbnail ${index + 1}`}
                width={200}
                height={125}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}