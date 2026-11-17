"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { business, whatsappUrl } from "@/lib/site-config"

const faqs = [
  {
    q: "Da li chiptuning poništava fabrička garancija?",
    a: "Kod većine proizvođača, remap softvera koji nije fabrički odobren može uticati na garanciju. Međutim, remap je uvek moguće ukloniti — tvoj automobil se može vratiti na originalne fabričke vrednosti pre svakog servisnog pregleda. Mi uvek arhiviramo originalnu kopiju softvera pre bilo kakvog projekta.",
  },
  {
    q: "Da li je chiptuning bezbedan za motor?",
    a: "Profesionalni remap koji ne premašuje bezbedne vrednosti pritiska goriva, temperature i timing-a potpuno je bezbedan. Radimo isključivo sa proverenim parametrima u okviru tolerancije originalne opreme. Svaki remap je prilagođen konkretnom vozilu, stanju motora i kvalitetu goriva.",
  },
  {
    q: "Za koje marke vozila radite remap?",
    a: "Radimo remap za BMW, Audi, Volkswagen, Mercedes-Benz, Škoda, Seat, Opel, Hyundai, Toyota i većinu ostalih marki sa elektronskom kontrolom motora. Pošalji nam model, godište i tip motora svog vozila za potvrdu dostupnosti.",
  },
  {
    q: "Koliko traje chiptuning procedura?",
    a: "Standardna remap procedura traje 2–4 sata, uključujući pripremu, dijagnostiku, pisanje softvera i testiranje. LED ugradnja zavisi od tipa sistema i kompleksnosti vozila i može trajati 3–6 sati. Zakazivanjem termina garantujemo posvećenost isključivo tvom vozilu.",
  },
  {
    q: "Da li se remap može ukloniti?",
    a: "Da, u svakom trenutku. Pre svakog projekta arhiviramo originalnu kopiju fabričkog softvera. Vraćanje na originalne vrednosti traje svega 30–60 minuta i vozilo postaje identično fabričkom stanju bez ikakvih tragova modifikacije.",
  },
  {
    q: "Koje LED svetlosne sisteme ugrađujete?",
    a: "Ugrađujemo premium bi-LED i laser LED sisteme za dnevna svetla (DRL), kratka i duga, kao i ambijentalno i unutrašnje osvetljenje. Koristimo isključivo proverene sisteme sa adekvatnom homologacijom i garantujemo profesionalnu ugradnju bez modifikacije originalnog kabliranja.",
  },
]

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)


  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title="Česta pitanja" className="mb-12 md:mb-16" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,800px)_minmax(280px,1fr)] lg:gap-16">
        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-border"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group [-webkit-tap-highlight-color:transparent] active:opacity-70 transition-opacity duration-100"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span
                  className={`text-[17px] md:text-lg font-medium leading-snug transition-colors duration-300 ${
                    openIndex === i
                      ? "text-foreground"
                      : "text-foreground group-hover:text-[var(--brand)]"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-muted-foreground transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="7" y1="1" x2="7" y2="13" />
                    <line x1="1" y1="7" x2="13" y2="7" />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                inert={openIndex !== i}
                className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="text-muted-foreground text-base leading-relaxed pb-6 max-w-[64ch]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fills the empty right column with the next step */}
        <div className="self-start border-l-4 border-[var(--brand)] bg-card p-6 lg:sticky lg:top-28">
          <p className="signage text-[2.5rem] text-heading">Pitaj nas direktno</p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Pošalji model vozila i pitanje — javićemo ti se u radnom vremenu (pon–pet 09–18, sub 09–15).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={whatsappUrl("Zdravo! Imam pitanje:")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={17} aria-hidden="true" /> Pošalji na WhatsApp
            </a>
            <a href={`tel:${business.phone}`} className="btn btn-secondary">
              <Phone size={16} aria-hidden="true" /> Pozovi
            </a>
          </div>
        </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  )
}
