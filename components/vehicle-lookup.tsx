"use client"

import Script from "next/script"
import { MessageCircle } from "lucide-react"
import { whatsappUrl } from "@/lib/site-config"
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
  const vehicleName = useBenskyVehicle()
  const waText = vehicleName
    ? `Zdravo! Zanima me chiptuning za ${vehicleName}. Možemo li dogovoriti termin?`
    : ""

  return (
    <section
      id="vehicle-lookup"
      className="relative overflow-hidden bg-background px-5 pb-12 pt-6 sm:px-8 lg:px-12 lg:pb-16"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="relative isolate overflow-hidden rounded-xl border border-white/25 bg-card shadow-[0_16px_50px_rgba(0,0,0,.27)]">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-[position:center_55%]"
            style={{ backgroundImage: 'url("/images/electronics-after-hd.jpg")' }}
            aria-hidden="true"
          />
          <div className="lookup-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 grid items-start gap-5 px-5 py-6 lg:grid-cols-[minmax(265px,0.36fr)_minmax(0,0.64fr)] lg:gap-6 lg:px-9 lg:py-8">
            <div className="lg:border-r lg:border-white/25 lg:pr-6">
              <span className="mb-3 block h-[3px] w-12 bg-[var(--brand)]" aria-hidden="true" />
              <p className="mb-2 text-[10px] font-mono uppercase tracking-[.16em] text-white/60">Chiptuning kalkulator</p>
              <h2 className="font-sans text-2xl font-black italic tracking-tight text-white sm:text-3xl">
                Koliko snage dobijaš?
              </h2>
              <p className="mt-3 max-w-[350px] text-sm leading-6 text-white/75">
                Pronađi marku, model i motor. Pogledaj procenjene rezultate snage i obrtnog momenta.
              </p>
            </div>
            <div className="min-w-0">
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[.16em] text-[var(--cool-accent)]">
                Izaberi svoje vozilo
              </p>
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
              <Script
                src={`${BENSKY_ORIGIN}/assets/js/iframeResizer.min.js`}
                strategy="afterInteractive"
                onReady={() => window.iFrameResize?.(false, `#${IFRAME_ID}`)}
              />
            </div>
          </div>
          <div
            className="relative z-10 grid transition-[grid-template-rows] duration-300"
            style={{ gridTemplateRows: vehicleName ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden" inert={!vehicleName}>
              <div className="flex flex-col items-start justify-between gap-4 border-t-2 border-[var(--brand)] bg-card px-6 py-6 sm:flex-row sm:items-center lg:px-9">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[.16em] text-[var(--brand)]">Tvoje vozilo</p>
                  <p className="text-lg font-semibold text-white">{vehicleName}</p>
                  <p className="mt-1 text-xs text-white/60">Pošalji nam upit — javljamo se sa terminom i cenom.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl(waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={17} aria-hidden="true" /> Zakaži preko WhatsApp-a
                  </a>
                  <a href="#contact" className="btn btn-secondary">Popuni formu</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/50">
          * Procenjene vrednosti. Konačni rezultati zavise od stanja vozila.
        </p>
      </div>
    </section>
  )
}
