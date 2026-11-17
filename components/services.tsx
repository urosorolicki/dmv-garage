"use client"

import { useEffect, useRef, useState } from "react"
import { cdnWidth } from "@/lib/gallery-data"
import { SectionHeading } from "@/components/section-heading"
import { requestService, type ServiceValue } from "@/lib/prefill"

const services = [
  {
    number: "01",
    value: "led" as ServiceValue,
    title: "LED Ugradnja",
    spec: "12V · CANbus · garancija",
    description:
      "Premium LED svetlosni sistemi za potpunu transformaciju vizuelnog identiteta tvog vozila.",
    image: "/images/led-after.jpg",
  },
  {
    number: "02",
    value: "elektronika" as ServiceValue,
    title: "Auto Elektronika",
    spec: "Dijagnostika · Ugradnja · Servis",
    description:
      "Napredna dijagnostika, ugradnja i popravka kompleksnih elektronskih sistema.",
    image: "/images/electronics-after-hd.jpg",
  },
  {
    number: "03",
    value: "chiptuning" as ServiceValue,
    title: "ECU Chiptuning",
    spec: "Stage 1–3 · OBD / Bench",
    description:
      "Custom remap softvera za optimalan balans performansi, potrošnje i pouzdanosti.",
    // Prava fotka ECU-a iz galerije umesto AI rendera
    image: cdnWidth("IMG_0579", 800),
  },
  {
    number: "04",
    value: "enterijer" as ServiceValue,
    title: "Enterijer",
    spec: "Boje · Ambijent · Materijali",
    description:
      "Kompletan redizajn enterijera — promena boja table i dugmica, ambijentalno osvetljenje i materijalni detalji po meri.",
    image: "/images/interior-after.jpg",
  },
]

export function Services() {
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
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      {/* Tehnicki blueprint grid — suptilan, "inženjering" osecaj */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading kicker="Šta nudimo" title="Usluge" />
        </div>

        {/* Spec-sheet kartice — hairline grid, mono podaci, bez tilt-a */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border/30">
          {services.map((service, index) => (
            <article
              key={service.number}
              className={`group relative bg-background p-7 flex flex-col transition-all duration-500 hover:bg-secondary/40 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + index * 120}ms` }}
            >
              {/* Top redline — iscrtava se na hover (igla tahometra) */}
              <div
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "var(--brand)" }}
              />

              {/* Header red: broj + spec, kao part-number / data sheet */}
              <div className="flex items-baseline justify-between mb-5 font-mono text-[11px] tracking-wider">
                <span style={{ color: "var(--brand)" }}>{service.number}</span>
                <span className="text-muted-foreground">{service.spec}</span>
              </div>

              <div className="w-full aspect-[4/3] mb-5 overflow-hidden rounded-sm bg-secondary/30">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              <h3 className="text-foreground text-lg font-sans tracking-wide uppercase mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              <a
                href="#contact"
                onClick={() => requestService(service.value)}
                className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Pitaj za svoj auto <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
