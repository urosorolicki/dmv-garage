import { Navbar } from "@/components/navbar"
import { SectionHeading } from "@/components/section-heading"
import { BackButton } from "@/components/back-button"
import { Footer } from "@/components/footer"
import { GalleryFull } from "@/components/gallery-full"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Suspense } from "react"
import type { Metadata } from "next"
import { getGallery } from "@/lib/instagram"
import { spreadEvenly } from "@/lib/gallery-data"

// Re-render at most hourly so new Instagram posts show up
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Galerija radova — LED, chiptuning, enterijer",
  description: "Galerija radova DMV Garage — LED ugradnja, chiptuning, auto elektronika i enterijer. Beograd.",
  alternates: { canonical: "/galerija" },
  openGraph: {
    title: "Galerija radova — DMV Garage",
    description: "Pogledajte naše radove: LED ugradnja, chiptuning, Android multimedija, ambijentalno osvetljenje.",
    url: "/galerija",
    locale: "sr_RS",
    siteName: "DMV Garage",
    images: [{ url: `https://res.cloudinary.com/dd9xjzu8c/image/upload/q_auto,f_auto,w_1200/dmv-garage/IMG_0654` }],
  },
}

export default async function GalerijaPage() {
  const { images, source } = await getGallery()
  // Instagram stays newest-first; the local set is spread out by category
  const ordered = source === "local" ? spreadEvenly(images) : images

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 md:pt-32 pb-6 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <BackButton />

        <div className="mt-8">
          <SectionHeading as="h1" title="Galerija radova" />
          <p className="mt-3 text-muted-foreground text-sm max-w-lg leading-relaxed">
            LED ugradnja, chiptuning, auto elektronika i enterijer — radovi iz naše radionice u Beogradu.
          </p>
        </div>
      </div>

      <Suspense>
        <GalleryFull images={ordered} />
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
