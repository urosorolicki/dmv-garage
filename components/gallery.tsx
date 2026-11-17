import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { business } from "@/lib/site-config"
import type { Gallery as GalleryData } from "@/lib/instagram"

export function Gallery({ gallery }: { gallery: GalleryData }) {
  const { preview, images, source } = gallery
  return (
    <section
      id="gallery"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <SectionHeading title="Galerija" />
        </div>

        {/* Preview grid */}
        <div className="grid grid-cols-2 auto-rows-[170px] gap-2 sm:auto-rows-[220px] lg:grid-cols-4 lg:auto-rows-[230px] lg:gap-3">
          {preview.map((image, index) => (
            <Link
              key={image.id}
              href={`/galerija?img=${image.id}`}
              className={`group relative overflow-hidden cursor-pointer ${index === 0 ? "col-span-2 row-span-2" : ""} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}
              aria-label={image.alt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.thumb}
                srcSet={image.thumbSrcSet}
                sizes={image.thumbSrcSet ? (index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw") : undefined}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <Link
            href="/galerija"
            className="btn btn-secondary"
          >
            Vidi sve radove
          </Link>
          {source === "instagram" ? (
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-[15px] hover:text-foreground transition-colors"
            >
              Pratite nas na Instagramu @dmv__garage
            </a>
          ) : (
            <span className="text-muted-foreground text-[15px]">
              {preview.length} od {images.length} radova
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
