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
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading kicker="FAQ" title="Česta pitanja" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,800px)_minmax(280px,1fr)] lg:gap-16">
        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border-b border-border/40 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span
                  className={`text-sm md:text-base font-sans font-light leading-relaxed transition-colors duration-300 ${
                    openIndex === i
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
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
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="text-muted-foreground text-sm leading-relaxed pb-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fills the empty right column with the next step */}
        <div className="self-start rounded-xl border border-white/20 bg-card p-6 lg:sticky lg:top-28">
          <span className="mb-3 block h-[3px] w-10 bg-[var(--brand)]" aria-hidden="true" />
          <p className="text-lg font-semibold text-white">Nisi našao odgovor?</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Pošalji model vozila i pitanje — javićemo ti se u radnom vremenu (pon–pet 09–18, sub 09–15).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={whatsappUrl("Zdravo! Imam pitanje:")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={17} aria-hidden="true" /> Piši na WhatsApp
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
