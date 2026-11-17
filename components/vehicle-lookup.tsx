"use client"

import Script from "next/script"
import { MessageCircle } from "lucide-react"
import { whatsappUrl } from "@/lib/site-config"
import { BENSKY_ORIGIN, useBenskyVehicle } from "@/hooks/use-bensky-vehicle"

const WIDGET_ID = "1977"

// Widget look — Bensky reads these from the URL (hex without "#")
const WIDGET_THEME = new URLSearchParams({
  theme: "dark",
  color: "fcd805",          // accent — the logo yellow, same as the rest of the site
  textcolor: "b8b3ad",      // labels / body text
  buttontext: "141517",     // dark text on yellow buttons, as on the rest of the site
  differencecolor: "fcd805", // performance gain figures
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
      className="section-alt relative overflow-hidden px-5 py-16 sm:px-8 md:py-24 lg:px-12"
    >
      {/* Engine bay under the calculator, kept dark so the widget stays the focus */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-[position:center_55%] opacity-35"
        style={{ backgroundImage: 'url("/images/electronics-after-hd.jpg")' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, var(--card) 0%, rgb(32 34 37 / .9) 45%, rgb(32 34 37 / .6) 100%)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)] lg:gap-14">
            <div>
              <h2 className="section-title">Koliko snage dobijaš</h2>
              <p className="section-intro">
                Izaberi marku, model i motor. Kalkulator pokazuje procenu snage i obrtnog momenta posle remapa.
              </p>
            </div>
            <div className="min-w-0 bg-background p-4 md:p-6">
              <p className="mb-3 text-[15px] font-medium text-muted-foreground">
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
            className="grid transition-[grid-template-rows] duration-300"
            style={{ gridTemplateRows: vehicleName ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden" inert={!vehicleName}>
              <div className="mt-6 flex flex-col items-start justify-between gap-4 border-l-4 border-[var(--brand)] bg-background px-6 py-6 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-1 text-[15px] font-medium text-muted-foreground">Tvoje vozilo</p>
                  <p className="signage text-3xl text-heading">{vehicleName}</p>
                  <p className="mt-2 text-[15px] text-muted-foreground">Pošalji upit i javljamo se sa terminom i cenom.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl(waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={17} aria-hidden="true" /> Pošalji na WhatsApp
                  </a>
                  <a href="#contact" className="btn btn-secondary">Popuni formu</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          * Procenjene vrednosti. Konačni rezultati zavise od stanja vozila.
        </p>
      </div>
    </section>
  )
}
