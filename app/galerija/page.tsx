import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryFull } from "@/components/gallery-full"
import { WhatsAppButton } from "@/components/whatsapp-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galerija — DMV Garage",
  description: "Galerija radova DMV Garage — LED ugradnja, chiptuning, auto elektronika i enterijer. Beograd.",
  openGraph: {
    title: "Galerija radova — DMV Garage",
    description: "Pogledajte naše radove: LED ugradnja, chiptuning, Android multimedija, ambijentalno osvetljenje.",
    url: "https://dmv-garage.rs/galerija",
    images: [{ url: `https://res.cloudinary.com/dd9xjzu8c/image/upload/q_auto,f_auto,w_1200/dmv-garage/IMG_0654` }],
  },
}

export default function GalerijaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-4 max-w-[1440px] mx-auto px-6 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground text-xs tracking-[0.15em] uppercase hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Nazad
        </Link>

        <div className="mt-8">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Galerija radova
          </h1>
        </div>
      </div>

      <GalleryFull />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
