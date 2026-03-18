"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

type Category = "Sve" | "LED" | "Chiptuning" | "Enterijer" | "Elektronika"

const galleryImages: { src: string; alt: string; category: Category }[] = [
  { src: "/images/gallery-1.jpg", alt: "LED ugradnja", category: "LED" },
  { src: "/images/gallery-2.jpg", alt: "Chiptuning remap", category: "Chiptuning" },
  { src: "/images/gallery-3.jpg", alt: "Enterijer redizajn", category: "Enterijer" },
  { src: "/images/gallery-4.jpg", alt: "LED svetla", category: "LED" },
  { src: "/images/gallery-5.jpg", alt: "Auto elektronika", category: "Elektronika" },
  { src: "/images/gallery-6.jpg", alt: "ECU remap rezultat", category: "Chiptuning" },
]

const categories: Category[] = ["Sve", "LED", "Chiptuning", "Enterijer", "Elektronika"]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>("Sve")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === "Sve"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    )
  }, [filtered.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    )
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
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Galerija
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setLightboxIndex(null)
              }}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filtered.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setLightboxIndex(index)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              aria-label={`Otvori sliku: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-xs tracking-[0.1em] uppercase text-foreground/80">
                  {image.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Pregled slike"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Zatvori"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 md:left-8 text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Prethodna slika"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="relative w-[90vw] max-w-[1000px] aspect-[16/10] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 md:right-8 text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Sledeća slika"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === lightboxIndex ? "bg-foreground w-6" : "bg-muted-foreground/30 w-2"
                }`}
                aria-label={`Slika ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
