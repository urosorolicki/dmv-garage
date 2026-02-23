"use client"

import { useEffect, useRef, useState } from "react"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left side */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground mb-6">
              Zakažite termin
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Kontaktirajte nas i zakazite konsultacije za vaš projekat.
              Dostupni smo za sve informacije o našim uslugama.
            </p>
          </div>

          {/* Right side - contact info */}
          <div
            className={`lg:w-1/2 w-full transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col gap-8">
              {/* Phone */}
              <div className="group">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Telefon
                </p>
                <a
                  href="tel:+381628727274"
                  className="text-2xl md:text-3xl font-sans font-light text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  062 872 7274
                </a>
              </div>

              {/* Instagram */}
              <div className="group">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/dmv__garage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl font-sans font-light text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-3"
                >
                  @dmv__garage
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* Separator */}
              <div className="w-full h-[1px] bg-border my-2" />

              {/* CTA */}
              <a
                href="tel:+381628727274"
                className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.1em] uppercase bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 rounded-sm w-fit"
              >
                Zakaži Termin
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
