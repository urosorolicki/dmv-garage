"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeading } from "@/components/section-heading"

const stats = [
  { value: "300+", label: "Vozila" },
  { value: "5+",   label: "Godina iskustva" },
  { value: "4.4K+", label: "Na Instagramu" },
]

const carBrands = [
  "BMW", "Audi", "Volkswagen", "Mercedes-Benz",
  "Škoda", "Seat", "Opel", "Hyundai", "Toyota", "Ford",
]

const equipment = [
  { name: "WinOLS 4",         desc: "ECU remap softver" },
  { name: "ECM Titanium",     desc: "Chiptuning platforma" },
  { name: "Launch X431 Pro",  desc: "Dijagnostika" },
  { name: "VCDS",             desc: "VAG dijagnostika" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background glow-br" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, var(--accent), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Quote */}
        <div
          className={`max-w-[900px] mb-16 transition-all duration-[1500ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionHeading kicker="O nama" title="Radionica u Zemunu" />
          <p className="mt-6 text-lg md:text-xl font-sans font-normal leading-relaxed text-foreground/85 text-balance">
            DMV Garage je specijalizovana radionica za unapređenje performansi i vizuelnog identiteta vozila. Preciznost, tehnologija i kvalitet su temelj svakog projekta.
          </p>
        </div>

        {/* Stats */}
        <div
          className={`orange-surface grid grid-cols-3 divide-x divide-black/15 overflow-hidden rounded-xl mb-12 md:mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 md:py-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 bg-[#0b1216] group-hover:w-full transition-all duration-500" />
              <span className="font-display text-5xl md:text-6xl font-extrabold italic text-[#0b1216]">
                {stat.value}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-[#0b1216]/75 mt-2 font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
          {/* Car brands */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="subhead mb-6">
              Kompatibilne marke
            </p>
            <div className="flex flex-wrap gap-2">
              {carBrands.map((brand) => (
                <span
                  key={brand}
                  className="px-3 py-1.5 border border-border/40 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:border-brand hover:text-foreground transition-all duration-300 font-mono"
                  style={{ ["--tw-border-opacity" as any]: 1 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)"; (e.currentTarget as HTMLElement).style.color = "var(--brand)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="subhead mb-6">
              Oprema i softver
            </p>
            <div className="grid grid-cols-2 gap-3">
              {equipment.map((item) => (
                <div
                  key={item.name}
                  className="border-l-2 border border-border/30 px-4 py-3 bg-secondary/10"
                  style={{ borderLeftColor: "var(--brand)" }}
                >
                  <p className="text-sm font-mono text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
