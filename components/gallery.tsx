"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

type Category = "Sve" | "LED" | "Chiptuning" | "Enterijer" | "Elektronika"

const galleryImages: { src: string; alt: string; category: Category }[] = [
  // LED
  { src: "/images/IMG_0056.jpeg", alt: "VW Golf cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_0116.jpeg", alt: "Opel Astra cluster – zeleni LED", category: "LED" },
  { src: "/images/IMG_0432.jpeg", alt: "Noćni enterijer – LED dashboard", category: "LED" },
  { src: "/images/IMG_0654.jpeg", alt: "Opel cluster – crveni/plavi LED", category: "LED" },
  { src: "/images/IMG_0881.jpeg", alt: "BMW cluster – narandžasti LED", category: "LED" },
  { src: "/images/IMG_0884.jpeg", alt: "BMW cluster – ljubičasti LED", category: "LED" },
  { src: "/images/IMG_0919.jpeg", alt: "VW Jetta cluster – crveni LED", category: "LED" },
  { src: "/images/IMG_0925.jpeg", alt: "VW Jetta cluster – plave igle", category: "LED" },
  { src: "/images/IMG_0947.jpeg", alt: "VW Touran cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_0971.jpeg", alt: "BMW E46 cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1075.jpeg", alt: "VW Golf – plavi paddles + cluster", category: "LED" },
  { src: "/images/IMG_1078.jpeg", alt: "VW Golf – plavi paddles noć", category: "LED" },
  { src: "/images/IMG_1302.jpeg", alt: "VW Tiguan cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1342.jpeg", alt: "Peugeot cluster – zeleni LED", category: "LED" },
  { src: "/images/IMG_1504.jpeg", alt: "VW Jetta cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1507.jpeg", alt: "VW A3 cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1540.jpeg", alt: "Opel Astra radio – plavi LED", category: "LED" },
  { src: "/images/IMG_1544.jpeg", alt: "Opel Astra cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1609.jpeg", alt: "VW cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1623.jpeg", alt: "VW Golf cluster – bijeli/plavi LED", category: "LED" },
  { src: "/images/IMG_1624.jpeg", alt: "VW Golf cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1654.jpeg", alt: "VW A3 cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_1671.jpeg", alt: "Opel Vectra cluster – crveni LED", category: "LED" },
  { src: "/images/IMG_5939.jpeg", alt: "Skoda cluster – zeleni LED", category: "LED" },
  { src: "/images/IMG_6040.jpeg", alt: "Audi A6 cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_6093.jpeg", alt: "BMW E46 cluster – narandžasti LED", category: "LED" },
  { src: "/images/IMG_6096.jpeg", alt: "BMW E46 cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_6252.jpeg", alt: "Audi A6 enterijer – crveni LED", category: "LED" },
  { src: "/images/IMG_6311.jpeg", alt: "Audi A4 cluster – bijeli LED", category: "LED" },
  { src: "/images/IMG_6349.jpeg", alt: "Enterijer – crveni/plavi LED", category: "LED" },
  { src: "/images/IMG_6459.jpeg", alt: "VW Passat CC cluster – ljubičasti LED", category: "LED" },
  { src: "/images/IMG_6573.jpeg", alt: "Peugeot cluster – narandžasti LED", category: "LED" },
  { src: "/images/IMG_6579.jpeg", alt: "Peugeot cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_6612.jpeg", alt: "BMW E46 cluster – bijeli LED", category: "LED" },
  { src: "/images/IMG_6758.jpeg", alt: "BMW cluster – bijeli LED", category: "LED" },
  { src: "/images/IMG_6762.jpeg", alt: "VW Caddy cluster – crveni/plavi LED", category: "LED" },
  { src: "/images/IMG_6876.jpeg", alt: "BMW E90 cluster – narandžasti LED", category: "LED" },
  { src: "/images/IMG_6877.jpeg", alt: "BMW E90 cluster – bijeli LED", category: "LED" },
  { src: "/images/IMG_7168.jpeg", alt: "Audi A3 cluster – crveni LED", category: "LED" },
  { src: "/images/IMG_7773.jpeg", alt: "VW cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_7776.jpeg", alt: "BMW E90 cluster – narandžasti LED", category: "LED" },
  { src: "/images/IMG_7777.jpeg", alt: "BMW E90 cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_8122.jpeg", alt: "VW Golf stop svetlo – LED ring crveni", category: "LED" },
  { src: "/images/IMG_8123.jpeg", alt: "VW Golf stop svetlo – LED ring narandžasti", category: "LED" },
  { src: "/images/IMG_8163.jpeg", alt: "BMW cluster – plavi LED", category: "LED" },
  { src: "/images/IMG_8360.jpeg", alt: "BMW F30 klima + radio – plavi LED", category: "LED" },
  { src: "/images/IMG_9868.jpeg", alt: "VW Golf 6 cluster – plavi LED", category: "LED" },
  { src: "/images/04C8C134-1382-4848-A3D2-D9467CD25DA9.JPG", alt: "VW Golf stop svetlo – LED", category: "LED" },
  // Enterijer
  { src: "/images/IMG_1541.jpeg", alt: "Opel Astra enterijer – plavi LED", category: "Enterijer" },
  { src: "/images/IMG_5947.jpeg", alt: "BMW E90 – plavo ambijentalno", category: "Enterijer" },
  { src: "/images/IMG_5952.jpeg", alt: "BMW E90 enterijer – plavi ambijent", category: "Enterijer" },
  { src: "/images/IMG_6306.jpeg", alt: "Audi Q7 enterijer – crveni LED", category: "Enterijer" },
  { src: "/images/IMG_6308.jpeg", alt: "Audi Q7 klima – LED", category: "Enterijer" },
  { src: "/images/IMG_7778.jpeg", alt: "BMW E90 – plavi ambijent + iDrive", category: "Enterijer" },
  { src: "/images/IMG_8358.jpeg", alt: "BMW F30 – plavi ambijent", category: "Enterijer" },
  { src: "/images/IMG_8361.jpeg", alt: "BMW F30 enterijer – noćna vožnja", category: "Enterijer" },
  { src: "/images/IMG_8364.jpeg", alt: "BMW F30 – volan, plavi ambijent", category: "Enterijer" },
  { src: "/images/f5804bcc-0dc9-46a6-aff1-0c4293fb44f5.jpg", alt: "Opel Astra OPC – Android + LED", category: "Enterijer" },
  // Elektronika
  { src: "/images/IMG_0051.jpeg", alt: "VW Golf cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_0113.jpeg", alt: "Opel Astra cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_0433.jpeg", alt: "Android multimedija ugradnja", category: "Elektronika" },
  { src: "/images/IMG_0579.jpeg", alt: "ECU – motorna komora", category: "Elektronika" },
  { src: "/images/IMG_0946.jpeg", alt: "VW Touran cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_0967.jpeg", alt: "BMW E46 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1124.jpeg", alt: "BMW E46 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1300.jpeg", alt: "VW Tiguan cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1341.jpeg", alt: "Peugeot cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1515.jpeg", alt: "Opel Astra cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1516.jpeg", alt: "Opel Astra radio – originalni", category: "Elektronika" },
  { src: "/images/IMG_1517.jpeg", alt: "Opel Astra radio – plavi LED", category: "Elektronika" },
  { src: "/images/IMG_1533.jpeg", alt: "VW A3 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1650.jpeg", alt: "VW A3 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_1670.jpeg", alt: "Opel Vectra cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_5920.jpeg", alt: "BMW E90 + Android ekran", category: "Elektronika" },
  { src: "/images/IMG_5921.jpeg", alt: "BMW E90 – stock enterijer", category: "Elektronika" },
  { src: "/images/IMG_5922.jpeg", alt: "BMW E90 – Android ugradnja", category: "Elektronika" },
  { src: "/images/IMG_5937.jpeg", alt: "Skoda cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_6034.jpeg", alt: "Audi A6 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_6454.jpeg", alt: "VW Passat CC cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_6650.jpeg", alt: "Skoda Columbus navigacija", category: "Elektronika" },
  { src: "/images/IMG_6755.jpeg", alt: "BMW cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_6759.jpeg", alt: "VW Caddy cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_6760.jpeg", alt: "JVC radio ugradnja – dnevni prikaz", category: "Elektronika" },
  { src: "/images/IMG_6763.jpeg", alt: "JVC radio ugradnja – noćni prikaz", category: "Elektronika" },
  { src: "/images/IMG_7164.jpeg", alt: "Audi A3 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_7634.jpeg", alt: "Servis instrument ploče", category: "Elektronika" },
  { src: "/images/IMG_8159.jpeg", alt: "BMW cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_9860.jpeg", alt: "VW Golf 6 cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/IMG_9922.jpeg", alt: "VW cluster – dijagnostika", category: "Elektronika" },
  { src: "/images/copy_44830833-4CDA-456D-AF05-70F5666CC2F1.PNG", alt: "Elektronika – servis", category: "Elektronika" },
  // Chiptuning
  { src: "/images/gallery-2.jpg", alt: "Chiptuning remap", category: "Chiptuning" },
  { src: "/images/gallery-6.jpg", alt: "ECU remap rezultat", category: "Chiptuning" },
  { src: "/images/chiptuning-after.jpg", alt: "Chiptuning – rezultat", category: "Chiptuning" },
  { src: "/images/chiptuning-before.jpg", alt: "Chiptuning – before", category: "Chiptuning" },
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
