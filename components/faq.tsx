"use client"

import { useEffect, useRef, useState } from "react"

const faqs = [
  {
    q: "Da li chiptuning poništava fabrička garancija?",
    a: "Kod većine proizvođača, remap softvera koji nije fabrički odobren može uticati na garanciju. Međutim, remap je uvek moguće ukloniti — vaš automobil se može vratiti na originalne fabričke vrednosti pre svakog servisnog pregleda. Mi uvek arhiviramo originalnu kopiju softvera pre bilo kakvog projekta.",
  },
  {
    q: "Da li je chiptuning bezbedan za motor?",
    a: "Profesionalni remap koji ne premašuje bezbedne vrednosti pritiska goriva, temperature i timing-a potpuno je bezbedan. Radimo isključivo sa proverenim parametrima u okviru tolerancije originalne opreme. Svaki remap je prilagođen konkretnom vozilu, stanju motora i kvalitetu goriva.",
  },
  {
    q: "Za koje marke vozila radite remap?",
    a: "Radimo remap za BMW, Audi, Volkswagen, Mercedes-Benz, Škoda, Seat, Opel, Hyundai, Toyota i većinu ostalih marki sa elektronskom kontrolom motora. Kontaktirajte nas sa modelom, godinom i tipom motora vašeg vozila za potvrdu dostupnosti.",
  },
  {
    q: "Koliko traje chiptuning procedura?",
    a: "Standardna remap procedura traje 2–4 sata, uključujući pripremu, dijagnostiku, pisanje softvera i testiranje. LED ugradnja zavisi od tipa sistema i kompleksnosti vozila i može trajati 3–6 sati. Zakazivanjem termina garantujemo posvećenost isključivo vašem vozilu.",
  },
  {
    q: "Da li se remap može ukloniti?",
    a: "Da, u svakom trenutku. Pre svakog projekta arhiviramo originalnu kopiju fabričkog softvera. Vraćanje na originalne vrednosti traje svega 30–60 minuta i vozilo postaje identično fabričkom stanju bez ikakvih tragova modifikacije.",
  },
  {
    q: "Koje LED svetlosne sisteme ugradujete?",
    a: "Ugradujemo premium bi-LED i laser LED sisteme za dnevna svetla (DRL), kratka i duga, kao i ambijentalno i unutrašnje osvetljenje. Koristimo isključivo proverene sisteme sa adekvatnom homologacijom i garantujemo profesionalnu ugradnju bez modifikacije originalnog kabliranja.",
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
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Česta pitanja
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            FAQ
          </h2>
        </div>

        <div className="max-w-[800px]">
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
                  className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-muted-foreground/60 transition-transform duration-300 ${
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
      </div>
    </section>
  )
}
