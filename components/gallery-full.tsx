"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { categories, type Category, type GalleryImage } from "@/lib/gallery-data"

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

export function GalleryFull({ images }: { images: GalleryImage[] }) {
  const searchParams = useSearchParams()
  const catParam = searchParams.get("cat")
  // Only offer filters that have at least one image
  const counts = useMemo(() => {
    const m = new Map<Category, number>([["Sve", images.length]])
    for (const img of images) if (img.category) m.set(img.category, (m.get(img.category) ?? 0) + 1)
    return m
  }, [images])
  const shownCategories = categories.filter((c) => counts.has(c))
  const activeCategory: Category = shownCategories.includes(catParam as Category) ? (catParam as Category) : "Sve"
  const imgParam = searchParams.get("img")

  const filtered = useMemo(
    () =>
      activeCategory === "Sve" ? images : images.filter((img) => img.category === activeCategory),
    [activeCategory, images]
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
          {shownCategories.length > 1 && shownCategories.map((cat) => {
            const count = counts.get(cat) ?? 0
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                aria-pressed={active}
                className={`flex-shrink-0 px-4 py-2.5 text-xs rounded-sm transition-colors duration-300 ${
                  active
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
                <span className={`ml-2 ${active ? "opacity-60" : "opacity-50"}`}>{count}</span>
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
            <Tile image={image} eager={index < EAGER_TILES} />
            {image.isVideo && (
              <span className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-left md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
              {image.category && (
                <p className="text-[13px]" style={{ color: "var(--brand)" }}>
                  {image.category}
                </p>
              )}
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

function Tile({ image, eager }: { image: GalleryImage; eager: boolean }) {
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
      src={image.thumb}
      srcSet={image.thumbSrcSet}
      sizes={image.thumbSrcSet ? "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" : undefined}
      alt={image.alt}
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
