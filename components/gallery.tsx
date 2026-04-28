"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cdnThumb, previewImages, galleryImages } from "@/lib/gallery-data"

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const animate = (delay: number) =>
    reducedMotion
      ? "opacity-100 translate-y-0"
      : `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-10 ${reducedMotion ? "" : "transition-all duration-1000"} ${isVisible || reducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Galerija
          </h2>
        </div>

        {/* Preview grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {previewImages.map((image, index) => (
            <Link
              key={image.id}
              href="/galerija"
              className={`group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer ${
                reducedMotion ? "opacity-100 translate-y-0" : `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
              }`}
              style={reducedMotion ? undefined : { transitionDelay: `${200 + index * 80}ms` }}
              aria-label={image.alt}
            >
              <Image
                src={cdnThumb(image.id)}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 flex items-center gap-6 ${
            reducedMotion ? "" : `transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
          }`}
        >
          <Link
            href="/galerija"
            className="inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-sm"
          >
            Vidi sve radove
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <span className="text-muted-foreground text-xs tracking-[0.1em]">
            {previewImages.length} od {galleryImages.length} radova
          </span>
        </div>
      </div>
    </section>
  )
}
