import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Configurator } from "@/components/configurator"
import { VehicleLookup } from "@/components/vehicle-lookup"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { CtaBand } from "@/components/cta-band"
import { Process } from "@/components/process"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getGallery } from "@/lib/instagram"

// Re-render at most hourly so new Instagram posts show up
export const revalidate = 3600

export default async function Page() {
  const gallery = await getGallery()
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <VehicleLookup />
      <Services />
      <Configurator />
      <Process />
      <About />
      <Gallery gallery={gallery} />
      <CtaBand />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
