"use client"

import { useState, useRef, useEffect } from "react"
import Script from "next/script"
import { BENSKY_ORIGIN, useBenskyVehicle } from "@/hooks/use-bensky-vehicle"

const WIDGET_ID = "1977"

// Widget look — Bensky reads these from the URL (hex without "#")
const WIDGET_THEME = new URLSearchParams({
  theme: "dark",
  color: "f64b00",          // accent — brand orange
  textcolor: "b8b3ad",      // labels / body text
  buttontext: "141414",     // dark text on orange buttons, as on the rest of the site
  differencecolor: "f64b00", // performance gain figures
}).toString()
const IFRAME_ID = "dmv-tuning-widget"

declare global {
  interface Window {
    iFrameResize?: (options: unknown, target: string) => void
  }
}

// ─── Main section ─────────────────────────────────────────────────────────────
// Embeds the Bensky / Tuning Database vehicle widget. The vendor snippet uses
// document.write, which does not work in React, so the iframe is rendered
// directly and iframeResizer is loaded via next/script.
// Note: the widget is domain-locked (referrer check) — on localhost it shows
// a "no permission" notice; it works on the registered production domain.

export function VehicleLookup() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const vehicleName = useBenskyVehicle()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const waText = vehicleName
    ? `Zdravo! Zanima me chiptuning za ${vehicleName}. Možemo li dogovoriti termin?`
    : ""

  return (
    <section
      ref={sectionRef}
      id="vehicle-lookup"
      className="relative py-20 md:py-28 overflow-hidden bg-[#081218]"
    >
      <div className="absolute inset-0 bg-[#081218]" />
      <div
        className="absolute right-0 top-0 h-[370px] w-full bg-cover bg-[position:center_45%] opacity-35 md:w-[72%]"
        style={{
          backgroundImage: 'url("/images/electronics-after-hd.jpg")',
          maskImage: "linear-gradient(to right, transparent, black 55%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(8,18,24,.15), #081218 67%),radial-gradient(ellipse 80% 60% at 20% 50%, rgba(120,197,213,.07), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            PROVERI POTENCIJAL
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Konfigurator tuninga
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-lg leading-relaxed">
            Izaberi marku, model i motor. Pogledaj procenjene rezultate remapa za svoje vozilo.
          </p>
        </div>

        {/* Widget */}
        <div
          className={`border border-white/20 rounded-sm overflow-hidden bg-[#070c0f]/90 shadow-[0_18px_70px_rgba(0,0,0,.25)] transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="px-3 pt-3 md:px-5 md:pt-5">
            <iframe
              id={IFRAME_ID}
              src={`${BENSKY_ORIGIN}/w.php?id=${WIDGET_ID}&${WIDGET_THEME}`}
              title="Pretraga vozila — chiptuning"
              referrerPolicy="origin"
              width="100%"
              height={200}
              className="block w-full border-0"
              style={{ transition: "height 0.5s", colorScheme: "normal" }}
            />
          </div>
          <Script
            src={`${BENSKY_ORIGIN}/assets/js/iframeResizer.min.js`}
            strategy="afterInteractive"
            onReady={() => window.iFrameResize?.(false, `#${IFRAME_ID}`)}
          />

          {/* CTA — appears once the widget reports a selected vehicle */}
          <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: vehicleName ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="bg-secondary/60 border-t border-border px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-mono" style={{ color: "var(--brand)" }}>
                    Izabrano vozilo
                  </p>
                  <p className="text-sm text-foreground">{vehicleName}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="px-6 py-3 text-xs tracking-[0.12em] uppercase border border-border text-foreground hover:bg-accent transition-colors duration-300"
                  >
                    Popuni formu
                  </a>
                  <a
                    href={`https://wa.me/381628727274?text=${encodeURIComponent(waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 text-xs tracking-[0.12em] uppercase transition-opacity duration-300 hover:opacity-85 font-medium"
                    style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
                  >
                    Zakaži chiptuning
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground leading-relaxed max-w-xl">
          * Procenjene vrednosti. Konačni rezultati zavise od stanja vozila.
        </p>
      </div>
    </section>
  )
}
