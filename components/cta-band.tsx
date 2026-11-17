import { CalendarDays, Gauge } from "lucide-react"

// Full-width orange band: the one loud moment between proof (gallery) and questions.
export function CtaBand() {
  return (
    <section id="cta" aria-labelledby="cta-band-title" className="orange-surface relative overflow-hidden">
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-14 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[#0b1216]/70">DMV Garage, Zemun</p>
          <h2 id="cta-band-title" className="section-title mt-2 text-[#0b1216]">Više snage. Bolji izgled.</h2>
          <p className="mt-4 text-base leading-relaxed text-[#0b1216]/80">
            Pošalji model vozila na WhatsApp — javićemo ti se sa procenom i slobodnim terminom.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#contact" className="btn bg-[#0b1216] text-white hover:bg-black focus-visible:outline-[#0b1216]">
            <CalendarDays size={18} aria-hidden="true" /> Zakaži termin
          </a>
          <a href="#vehicle-lookup" className="btn border-2 border-[#0b1216] text-[#0b1216] hover:bg-[#0b1216]/10 focus-visible:outline-[#0b1216]">
            <Gauge size={18} aria-hidden="true" /> Izračunaj snagu
          </a>
        </div>
      </div>
    </section>
  )
}
