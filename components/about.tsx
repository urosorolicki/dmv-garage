"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "300+", label: "Vozila" },
  { value: "5+",   label: "Godina iskustva" },
  { value: "4",    label: "Specijalnosti" },
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-secondary/20" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.25 0 0), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Quote */}
        <div
          className={`text-center max-w-[900px] mx-auto mb-20 transition-all duration-[1500ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-6 font-mono" style={{ color: "var(--brand)" }}>
            O nama
          </p>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-sans font-light leading-relaxed text-foreground/90 text-balance">
            {'"DMV Garage je specijalizovana radionica za unapređenje performansi i vizuelnog identiteta vozila. Preciznost, tehnologija i kvalitet su temelj svakog projekta."'}
          </blockquote>
          <div className="mt-10 w-16 h-[2px] mx-auto" style={{ background: "var(--brand)" }} />
          <p className="mt-6 text-muted-foreground text-sm tracking-[0.1em] uppercase font-mono">
            DMV Garage
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-[1px] bg-border/30 mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-secondary/10 py-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: "var(--brand)" }} />
              <span className="font-display text-4xl md:text-5xl tracking-wide" style={{ color: "var(--brand)" }}>
                {stat.value}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2 font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Car brands */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-6 font-mono" style={{ color: "var(--brand)" }}>
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
            <p className="text-xs tracking-[0.4em] uppercase mb-6 font-mono" style={{ color: "var(--brand)" }}>
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
