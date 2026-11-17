"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
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
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="section-alt absolute inset-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-10 ${reducedMotion ? "" : "transition-all duration-1000"} ${isVisible || reducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeading kicker="Portfolio" title="Galerija" />
        </div>

        {/* Preview grid */}
        <div className="grid grid-cols-2 auto-rows-[170px] gap-2 sm:auto-rows-[220px] lg:grid-cols-4 lg:auto-rows-[230px] lg:gap-3">
          {previewImages.map((image, index) => (
            <Link
              key={image.id}
              href={`/galerija?img=${image.id}`}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${index === 0 ? "col-span-2 row-span-2" : ""} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
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
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                <p className="text-xs font-medium text-white sm:text-sm" aria-hidden="true">{image.alt}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 flex flex-wrap items-center gap-4 sm:gap-6 ${
            reducedMotion ? "" : `transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
          }`}
        >
          <Link
            href="/galerija"
            className="btn btn-secondary"
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
