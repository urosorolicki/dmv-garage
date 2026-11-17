import { CalendarDays, Gauge } from "lucide-react"

// Closing band in the logo yellow; near-black text on it (13:1).
export function CtaBand() {
  return (
    <section id="cta" aria-labelledby="cta-band-title" className="yellow-band relative">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 sm:px-8 md:py-20 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="max-w-3xl">
          <h2 id="cta-band-title" className="signage text-[clamp(52px,7vw,112px)] text-[#141517]">Više snage.<br />Bolji izgled.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#141517]">
            Pošalji model vozila i javićemo ti se sa procenom i slobodnim terminom.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn bg-[#141517] text-[#ecebe4] hover:bg-black focus-visible:outline-[#141517]">
            <CalendarDays size={18} aria-hidden="true" /> Zakaži termin
          </a>
          <a href="#vehicle-lookup" className="btn border-[1.5px] border-[#141517] text-[#141517] hover:bg-[#141517]/10 focus-visible:outline-[#141517]">
            <Gauge size={18} aria-hidden="true" /> Izračunaj snagu
          </a>
        </div>
      </div>
    </section>
  )
}
