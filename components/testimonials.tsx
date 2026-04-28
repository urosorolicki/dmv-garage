"use client"

import { useEffect, useRef, useState } from "react"

type Testimonial = {
  name: string
  car: string
  service: string
  text: string
  rating: 5
  initials: string
}

const testimonials: Testimonial[] = [
  {
    name: "Marko Jovanović",
    car: "BMW 320d F30",
    service: "Chiptuning",
    text: "Nakon remapa osećaj je kao da vozim potpuno drugi auto. +42 KS, bolji odziv, manja potrošnja na autoputu. Profesionalna ekipa, sve urađeno za dva sata.",
    rating: 5,
    initials: "MJ",
  },
  {
    name: "Stefan Nikolić",
    car: "VW Golf 7 GTI",
    service: "LED Ugradnja",
    text: "Ugradili su mi laser/LED farove i ambijentalno osvetljenje u kabini. Razlika je dan i noć — bukalno. Vidljivost je drastično bolja, a auto izgleda premium.",
    rating: 5,
    initials: "SN",
  },
  {
    name: "Jovana Petrović",
    car: "Audi A4 B9",
    service: "Enterijer",
    text: "Promenili su boje ambijentnog osvetljenja i redizajnirali tablu. Izgleda kao fabričko iz higher-end modela. Svaki detalj je perfektan, preporučujem svima.",
    rating: 5,
    initials: "JP",
  },
  {
    name: "Nikola Đorđević",
    car: "Mercedes C220d",
    service: "Auto Elektronika",
    text: "Imao sam problem koji tri servisa nisu uspela da dijagnostikuju. DMV je pronašao kvar za sat vremena. Stručnost na visokom nivou, cena fer.",
    rating: 5,
    initials: "NĐ",
  },
  {
    name: "Aleksandar Milić",
    car: "BMW 530d G30",
    service: "Chiptuning",
    text: "Stage 1 remap na dizelaš — rezultati su izvanredni. Prolazak sa 190 na 270 KS bez gubitka pouzdanosti. Svaki evro uložen se oseti za volanom.",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Dragan Savić",
    car: "Škoda Octavia RS",
    service: "LED Ugradnja",
    text: "Matrix LED ugradnja plus kompletna izmena unutrašnjeg osvetljenja. Ekipa je transparentna u komunikaciji, nema skrivenih troškova, posao urađen precizno.",
    rating: 5,
    initials: "DS",
  },
  {
    name: "Miloš Kovačević",
    car: "Porsche Macan S",
    service: "Enterijer",
    text: "Tražio sam nešto specifično — beli ambijent sa zlatnim akcentima. Isporučili su tačno to, čak i bolje nego što sam zamišljao. Apsolutno top.",
    rating: 5,
    initials: "MK",
  },
  {
    name: "Ivan Lazarević",
    car: "Toyota GR Yaris",
    service: "Auto Elektronika",
    text: "Ugradnja launch control sistema i Stage 2 elektronike. Bez kompromisa na pouzdanosti. Osetno brži nultić, servis je sve dokumentovao i objasnio.",
    rating: 5,
    initials: "IL",
  },
]

// split into two rows going in opposite directions
const row1 = testimonials.slice(0, 4)
const row2 = testimonials.slice(4, 8)

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 od 5 zvezda">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--brand)" }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 w-80 p-5 flex flex-col gap-4 select-none"
      style={{
        background: "oklch(0.11 0 0)",
        border: "1px solid var(--border)",
        borderRadius: "0.125rem",
      }}
    >
      {/* top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div
            className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-xs font-medium"
            style={{
              background: "var(--brand-subtle)",
              border: "1px solid var(--brand-dim)",
              borderRadius: "0.125rem",
              color: "var(--brand)",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.05em",
            }}
          >
            {t.initials}
          </div>
          <div>
            <p className="text-sm font-medium leading-tight" style={{ color: "var(--foreground)", fontFamily: "var(--font-barlow)" }}>
              {t.name}
            </p>
            <p className="text-xs leading-tight mt-0.5" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.04em" }}>
              {t.car}
            </p>
          </div>
        </div>
        {/* service tag */}
        <span
          className="text-[9px] px-2 py-0.5 flex-shrink-0"
          style={{
            background: "var(--brand-subtle)",
            border: "1px solid var(--brand-dim)",
            borderRadius: "0.125rem",
            color: "var(--brand)",
            fontFamily: "var(--font-dm-mono)",
            letterSpacing: "0.12em",
          }}
        >
          {t.service.toUpperCase()}
        </span>
      </div>

      <StarRating />

      {/* quote */}
      <p
        className="text-sm leading-relaxed"
        style={{
          color: "oklch(0.70 0.006 65)",
          fontFamily: "var(--font-barlow)",
          fontWeight: 300,
        }}
      >
        &ldquo;{t.text}&rdquo;
      </p>
    </div>
  )
}

function MarqueeRow({ items, direction = "left", speed = 28 }: { items: Testimonial[]; direction?: "left" | "right"; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={rowRef}
        className="flex gap-4"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${direction}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" aria-label="Utisci klijenata">
      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.65 0.22 40 / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-left"], [style*="marquee-right"] {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 mb-14">
        {/* label */}
        <div
          className="flex items-center gap-3 mb-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--brand)", fontFamily: "var(--font-dm-mono)" }}
          >
            Utisci Klijenata
          </span>
          <span className="h-px flex-1 max-w-[40px]" style={{ background: "var(--brand-dim)" }} />
        </div>

        {/* heading */}
        <h2
          className="text-5xl md:text-7xl leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            color: "var(--foreground)",
            letterSpacing: "0.02em",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Šta kažu{" "}
          <span style={{ color: "var(--brand)" }}>naši klijenti</span>
        </h2>
      </div>

      {/* rows */}
      <div
        className="flex flex-col gap-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.25s",
        }}
      >
        <MarqueeRow items={row1} direction="left" speed={32} />
        <MarqueeRow items={row2} direction="right" speed={28} />
      </div>

      {/* bottom fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to right, oklch(0.08 0 0), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to left, oklch(0.08 0 0), transparent)" }}
      />
    </section>
  )
}
