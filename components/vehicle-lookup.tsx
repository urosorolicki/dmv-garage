"use client"

import { useState, useRef, useEffect } from "react"
import Script from "next/script"
import { BENSKY_ORIGIN, useBenskyVehicle } from "@/hooks/use-bensky-vehicle"

const WIDGET_ID = "1977"
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[oklch(0.14_0_0)]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.20 0 0), transparent)",
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
            Chiptuning kalkulator
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Koliko možeš dobiti?
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-lg leading-relaxed">
            Pronađi svoje vozilo i pogledaj procenjene vrednosti snage i obrtnog momenta nakon chiptuning remapa.
          </p>
        </div>

        {/* Widget */}
        <div
          className={`border border-border rounded-sm overflow-hidden bg-background/40 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <iframe
            id={IFRAME_ID}
            src={`${BENSKY_ORIGIN}/w.php?id=${WIDGET_ID}`}
            title="Pretraga vozila — chiptuning"
            referrerPolicy="origin"
            width="100%"
            height={200}
            className="block w-full border-0"
            style={{ transition: "height 0.5s", colorScheme: "normal" }}
          />
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

        <p className="mt-4 text-xs text-muted-foreground/60 leading-relaxed max-w-xl">
          * Procenjene vrednosti. Konačni rezultati zavise od stanja vozila.
        </p>
      </div>
    </section>
  )
}
