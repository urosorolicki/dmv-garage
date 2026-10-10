"use client"

import { useCallback, useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import useEmblaCarousel from "embla-carousel-react"
import { cdnSrcSet, cdnWidth, type GalleryImage } from "@/lib/gallery-data"

interface GalleryLightboxProps {
  images: GalleryImage[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
  onCloseAutoFocus?: (e: Event) => void
}

// Only slides this close to the current one get an image src
const PRELOAD_RADIUS = 1

export function GalleryLightbox({ images, index, onIndexChange, onClose, onCloseAutoFocus }: GalleryLightboxProps) {
  const open = index !== null

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          className="fixed inset-0 z-[61] flex flex-col bg-black/95 backdrop-blur-xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none"
          aria-describedby={undefined}
          onCloseAutoFocus={onCloseAutoFocus}
        >
          {open && (
            <LightboxCarousel
              images={images}
              index={index}
              onIndexChange={onIndexChange}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function LightboxCarousel({
  images,
  index,
  onIndexChange,
}: {
  images: GalleryImage[]
  index: number
  onIndexChange: (index: number) => void
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: index, loop: images.length > 1 })
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})

  // Carousel → parent
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => onIndexChange(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onIndexChange])

  // Parent → carousel (e.g. browser back/forward between images)
  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== index) emblaApi.scrollTo(index, true)
  }, [emblaApi, index])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  const current = images[index]
  const near = (i: number) => {
    const d = Math.abs(i - index)
    return Math.min(d, images.length - d) <= PRELOAD_RADIUS
  }
  const waText = `Zdravo! Video sam u galeriji: ${current.alt}. Zanima me slična ugradnja za moje vozilo.`

  return (
    <>
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
        <p className="text-xs tracking-[0.25em] uppercase font-mono text-muted-foreground tabular-nums" aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <Dialog.Close
          className="w-11 h-11 -mr-2 flex items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
          aria-label="Zatvori"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Dialog.Close>
      </div>

      {/* Slides */}
      <div className="relative flex-1 min-h-0">
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center px-2 md:px-20"
                role="group"
                aria-roledescription="slika"
                aria-label={`${i + 1} od ${images.length}`}
              >
                {!loaded[img.id] && near(i) && (
                  <div className="absolute w-8 h-8 rounded-full border-2 border-white/15 border-t-[var(--brand)] animate-spin motion-reduce:animate-none" aria-hidden="true" />
                )}
                {near(i) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cdnWidth(img.id, 1600)}
                    srcSet={cdnSrcSet(img.id, [800, 1200, 1600, 2400])}
                    sizes="100vw"
                    alt={img.alt}
                    draggable={false}
                    onLoad={() => setLoaded((l) => ({ ...l, [img.id]: true }))}
                    className={`max-h-full max-w-full object-contain select-none transition-opacity duration-300 ${
                      loaded[img.id] ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <NavButton side="left" label="Prethodna slika" onClick={prev} />
            <NavButton side="right" label="Sledeća slika" onClick={next} />
          </>
        )}
      </div>

      {/* Caption + CTA */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 md:px-8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.3em] uppercase font-mono mb-1" style={{ color: "var(--brand)" }}>
            {current.category}
          </p>
          <Dialog.Title className="text-sm md:text-base text-foreground truncate">{current.alt}</Dialog.Title>
        </div>
        <a
          href={`https://wa.me/381628727274?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center justify-center px-5 py-3 text-xs tracking-[0.12em] uppercase font-medium hover:opacity-85 transition-opacity"
          style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
        >
          Želim isto
        </a>
      </div>
    </>
  )
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-4" : "right-4"} w-12 h-12 items-center justify-center rounded-full bg-black/50 border border-white/10 text-foreground/80 hover:text-foreground hover:bg-black/70 transition-colors backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {side === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}
