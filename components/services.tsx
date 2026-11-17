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


  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background glow-tl" />
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
          className={`mb-16 transition-all duration-1000`}
        >
          <SectionHeading kicker="Šta nudimo" title="Usluge" />
        </div>

        {/* Phones: one swipeable row with the next card peeking; md+: grid */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:p-0 lg:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.number}
              className={`group relative flex min-h-[440px] w-[82%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl border border-white/15 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand)] md:w-auto lg:min-h-[500px]`}
              >
              <img
                src={service.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-110 transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, var(--background) 4%, rgb(6 16 23 / .78) 30%, rgb(6 16 23 / .25) 58%, transparent 80%)" }}
                aria-hidden="true"
              />
              <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[11px] tracking-wider">
                <span className="rounded-full bg-[var(--brand)] px-2.5 py-1 font-medium text-[#0b1216]">{service.number}</span>
                <span className="hidden rounded-full bg-black/45 px-2.5 py-1 text-white/85 backdrop-blur-sm sm:inline">{service.spec}</span>
              </div>

              <div className="relative p-6">
                <h3 className="font-display text-2xl font-extrabold italic uppercase leading-tight text-heading">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  onClick={() => requestService(service.value)}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Pitaj za svoj auto <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
