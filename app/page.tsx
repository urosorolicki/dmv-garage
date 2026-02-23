import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Configurator } from "@/components/configurator"
import { Performance } from "@/components/performance"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Configurator />
      <Performance />
      <Services />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
