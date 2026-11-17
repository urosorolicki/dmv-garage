"use client"

import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { cdnThumb, previewImages, galleryImages } from "@/lib/gallery-data"

export function Gallery() {
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
          {previewImages.map((image, index) => (
            <Link
              key={image.id}
              href={`/galerija?img=${image.id}`}
              className={`group relative overflow-hidden cursor-pointer ${index === 0 ? "col-span-2 row-span-2" : ""} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}
              aria-label={image.alt}
            >
              <Image
                src={cdnThumb(image.id)}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
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
          <span className="text-muted-foreground text-[15px]">
            {previewImages.length} od {galleryImages.length} radova
          </span>
        </div>
      </div>
    </section>
  )
}
