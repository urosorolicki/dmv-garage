"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import {
  cdnSrcSet,
  cdnThumb,
  categories,
  galleryImages,
  galleryImagesAll,
  type Category,
} from "@/lib/gallery-data"

const BATCH = 24
const EAGER_TILES = 8

// URL is the source of truth: ?cat=LED&img=IMG_0654
// Opening an image pushes a history entry, so the browser / phone Back button
// closes the lightbox instead of leaving the page. Native history calls are
// synced into useSearchParams by Next.
function buildUrl(cat: Category, img: string | null) {
  const params = new URLSearchParams()
  if (cat !== "Sve") params.set("cat", cat)
  if (img) params.set("img", img)
  const qs = params.toString()
  return qs ? `?${qs}` : window.location.pathname
}

export function GalleryFull() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get("cat")
  const activeCategory: Category = categories.includes(catParam as Category) ? (catParam as Category) : "Sve"
  const imgParam = searchParams.get("img")

  const filtered = useMemo(
    () =>
      activeCategory === "Sve"
        ? galleryImagesAll
        : galleryImages.filter((img) => img.category === activeCategory),
    [activeCategory]
  )

  const foundIndex = imgParam ? filtered.findIndex((img) => img.id === imgParam) : -1
  const lightboxIndex = foundIndex >= 0 ? foundIndex : null

  // Whether the open lightbox added its own history entry (vs. a deep link)
  const pushedRef = useRef(false)

  const openImage = (index: number) => {
    pushedRef.current = true
    window.history.pushState(null, "", buildUrl(activeCategory, filtered[index].id))
  }

  const changeImage = useCallback(
    (index: number) => {
      const id = filtered[index]?.id
      if (!id || id === imgParam) return
      window.history.replaceState(null, "", buildUrl(activeCategory, id))
    },
    [filtered, imgParam, activeCategory]
  )

  const closeImage = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false
      window.history.back()
    } else {
      window.history.replaceState(null, "", buildUrl(activeCategory, null))
    }
  }, [activeCategory])

  // Return focus to the tile of the last image viewed (it may differ from the
  // one that opened the lightbox after swiping)
  const lastViewedRef = useRef<string | null>(null)
  if (imgParam && lightboxIndex !== null) lastViewedRef.current = imgParam
  const restoreFocus = (e: Event) => {
    const id = lastViewedRef.current
    const tile = id ? document.querySelector<HTMLElement>(`[data-image-id="${id}"]`) : null
    if (tile) {
      e.preventDefault()
      tile.focus({ preventScroll: false })
    }
  }

  const selectCategory = (cat: Category) => {
    window.history.replaceState(null, "", buildUrl(cat, null))
    setVisible(BATCH)
  }

  // Progressive rendering — load the next batch as the sentinel nears the viewport
  const [visible, setVisible] = useState(BATCH)
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible((v) => v + BATCH) },
      { rootMargin: "800px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible, filtered.length])

  const shown = filtered.slice(0, visible)

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-16">
      {/* Filters — sticky under the navbar */}
      <div className="sticky top-[88px] md:top-[96px] z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-3 mb-6 bg-background/85 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar" role="group" aria-label="Filtriraj po kategoriji">
          {categories.map((cat) => {
            const count = cat === "Sve" ? galleryImages.length : galleryImages.filter((i) => i.category === cat).length
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                aria-pressed={active}
                className={`flex-shrink-0 px-4 py-2.5 text-xs tracking-[0.15em] uppercase rounded-sm transition-colors duration-300 ${
                  active
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
                <span className={`ml-2 font-mono ${active ? "opacity-60" : "opacity-50"}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid — portrait tiles match the 3:4 photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
        {shown.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openImage(index)}
            data-image-id={image.id}
            className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
            aria-label={`Otvori sliku: ${image.alt}`}
          >
            <Tile id={image.id} alt={image.alt} eager={index < EAGER_TILES} />
            <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-left md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
              <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-mono" style={{ color: "var(--brand)" }}>
                {image.category}
              </p>
              <p className="text-[11px] md:text-xs text-white/90 leading-snug line-clamp-2">{image.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {visible < filtered.length && <div ref={sentinelRef} className="h-px" aria-hidden="true" />}

      <GalleryLightbox
        images={filtered}
        index={lightboxIndex}
        onIndexChange={changeImage}
        onClose={closeImage}
        onCloseAutoFocus={restoreFocus}
      />
    </div>
  )
}

function Tile({ id, alt, eager }: { id: string; alt: string; eager: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Cached images can finish loading before hydration attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={cdnThumb(id)}
      srcSet={cdnSrcSet(id, [400, 600, 800, 1200])}
      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}
