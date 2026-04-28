"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { cdnThumb, cdnFull, galleryImages, categories, type Category } from "@/lib/gallery-data"

export function GalleryFull() {
  const [activeCategory, setActiveCategory] = useState<Category>("Sve")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const filtered =
    activeCategory === "Sve"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  // Lock body scroll and focus close button when lightbox opens
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden"
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % filtered.length : null)
  }, [filtered.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null)
  }, [filtered.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 items-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightboxIndex(null) }}
            className={`px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-muted-foreground text-xs">
          {filtered.length} radova
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filtered.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer"
            aria-label={`Otvori sliku: ${image.alt}`}
          >
            <Image
              src={cdnThumb(image.id)}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs tracking-[0.1em] uppercase text-foreground/80">{image.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl ${reducedMotion ? "" : "animate-in fade-in duration-300"}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIndex].alt}
        >
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
            aria-label="Zatvori"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 md:left-8 text-muted-foreground hover:text-foreground transition-colors p-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
            aria-label="Prethodna slika"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className={`relative w-[90vw] max-w-[1000px] aspect-[16/10] ${reducedMotion ? "" : "animate-in zoom-in-95 duration-300"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={cdnFull(filtered[lightboxIndex].id)}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 md:right-8 text-muted-foreground hover:text-foreground transition-colors p-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
            aria-label="Sledeća slika"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground text-xs tracking-widest" aria-live="polite">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </div>
  )
}
