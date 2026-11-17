"use client"

import { useState } from "react"
import { ChevronRight, Play, Cpu, Gauge, Lightbulb, Armchair, SlidersHorizontal, Laptop } from "lucide-react"

type ServiceID = "performance" | "lighting" | "interior" | "electronics"

const services = [
  { id: "performance" as const, label: "Performanse", detail: "Chiptuning / ECU remap", href: "#vehicle-lookup", icon: Cpu, className: "left-[40%] top-[12%]", point: { x: 805, y: 195 }, line: { x: 738, y: 113 } },
  { id: "lighting" as const, label: "Svetla", detail: "LED ugradnja i retrofit", href: "#services", icon: Lightbulb, className: "left-[47%] top-[77%]", point: { x: 1020, y: 255 }, line: { x: 844, y: 333 } },
  { id: "interior" as const, label: "Enterijer", detail: "Ambijentalno osvetljenje", href: "#services", icon: Armchair, className: "right-[0%] top-[4%]", point: { x: 1195, y: 163 }, line: { x: 1260, y: 85 } },
  { id: "electronics" as const, label: "Elektronika", detail: "Kodiranje i dijagnostika", href: "#services", icon: Laptop, className: "right-[0%] top-[77%]", point: { x: 1212, y: 285 }, line: { x: 1295, y: 333 } },
]

const links = [
  { label: "Chiptuning", description: "Više snage i obrtnog momenta", href: "#vehicle-lookup", icon: Cpu },
  { label: "LED ugradnja", description: "Moderniji izgled i bolja vidljivost", href: "#services", icon: Lightbulb },
  { label: "Auto elektronika", description: "Kodiranje, aktivacije i servis", href: "#services", icon: Laptop },
  { label: "Pre / posle", description: "Pogledaj razliku na pravim autima", href: "#pre-posle", icon: SlidersHorizontal },
]

export function Hero() {
  const [active, setActive] = useState<ServiceID>("lighting")

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#061017]">
      {/* One stationary image, never a faux 3D configurator. The licensed Bensky
          selection tool remains in its own section immediately below. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/garage-dmv-hero.webp"
        alt=""
        width={1672}
        height={941}
        fetchPriority="high"
        className="hero-bg pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hero-scrim pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "linear-gradient(90deg,rgba(3,11,16,.78),rgba(3,11,16,.4) 33%,rgba(3,11,16,.04) 67%),linear-gradient(0deg,#061017 0%,transparent 30%,rgba(3,9,13,.17) 100%)",
        }}
      />

      <div className="hero-shell relative mx-auto max-w-[1540px] px-5 pb-7 pt-[107px] sm:px-8 lg:px-12 lg:pb-[22px] lg:pt-[100px]">
        <div className="hero-stage relative min-h-[475px] lg:min-h-0 lg:h-[390px]">
          <div className="hero-copy relative z-10 max-w-[600px]">
            <p className="hero-kicker mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[.02em] text-[#e3e2df]/80 sm:text-xs">
              <span className="mr-1 h-5 w-1 skew-x-[-17deg] bg-[var(--brand)]" aria-hidden="true" />
              Chiptuning <span className="text-[var(--brand)]">/</span> LED ugradnja <span className="text-[var(--brand)]">/</span> Auto elektronika
            </p>
            <h1 id="hero-title" className="max-w-[620px] text-[clamp(2rem,3.1vw,3.4rem)] font-black italic uppercase leading-[1.08] tracking-[-.025em] text-[#f4f4f2]">
              <span className="block whitespace-nowrap">Više snage.</span>
              <span className="block whitespace-nowrap">Bolji izgled.</span>
              <span className="block text-[var(--brand)] sm:whitespace-nowrap">Potpuna kontrola.</span>
            </h1>
            <p className="hero-description mt-6 max-w-[415px] text-sm leading-6 text-[#d9dddf] md:text-base md:leading-7">
              Specijalizovani za chiptuning, LED ugradnju i napredna elektronska rešenja za vaše vozilo.
            </p>
            <div className="hero-actions mt-6 flex flex-wrap gap-3">
              <a href="#vehicle-lookup" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[5px] bg-[var(--brand)] px-6 text-sm font-bold text-[#0b1216] transition-colors hover:bg-[var(--brand-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <Gauge size={18} aria-hidden="true" /> Proveri snagu
              </a>
              <a href="#gallery" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[5px] border border-white/50 bg-[#09141a]/70 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <Play size={18} aria-hidden="true" /> Pogledaj radove
              </a>
            </div>
            {/* No fabricated gain claims, customer totals or review scores. */}
            <div className="hero-meta mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tracking-[.08em] text-white/75">
              <span>ECU remap</span>
              <span className="border-l border-white/30 pl-5">LED / Enterijer</span>
              <span className="border-l border-white/30 pl-5">Zemun, Beograd</span>
            </div>
          </div>

          <div className="hero-mobile-scene" role="group" aria-label="Usluge na vozilu">
            {/* The same approved photograph, framed to show the whole car on phones. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/garage-dmv-hero.webp" alt="Crni Audi u Garage DMV radionici" width={1672} height={941} fetchPriority="high" />
            <svg className="mobile-callout-wires" viewBox="0 0 390 234" preserveAspectRatio="none" aria-hidden="true">
              {[
                { id: "performance", x: 119, y: 131, fromX: 60, fromY: 90 },
                { id: "lighting", x: 216, y: 153, fromX: 140, fromY: 212 },
                { id: "interior", x: 263, y: 103, fromX: 330, fromY: 90 },
                { id: "electronics", x: 285, y: 175, fromX: 326, fromY: 195 },
              ].map((point) => (
                <g key={point.id}>
                  <line x1={point.fromX} y1={point.fromY} x2={point.x} y2={point.y} stroke="white" strokeOpacity=".75" strokeWidth="1" />
                  <circle cx={point.x} cy={point.y} r="7" style={{ fill: "var(--brand)", stroke: "var(--brand)" }} fillOpacity=".16" strokeOpacity=".7" />
                  <circle cx={point.x} cy={point.y} r="3.5" style={{ fill: "var(--brand)" }} stroke="white" strokeWidth="1" />
                </g>
              ))}
            </svg>
            {services.map((service) => {
              const Icon = service.icon
              return (
                <a key={service.id} href={service.href} className={"mobile-callout mobile-callout-" + service.id} aria-label={service.label + ": " + service.detail}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{service.label}</span>
                </a>
              )
            })}
          </div>

          {/* Connector lines + points are bound to the same 1440×433 stage as
              their descriptive hotspots. Hide them at tablet widths rather
              than pretend they align with a cropped photograph. */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block"
            viewBox="0 0 1440 433"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {services.map((s) => (
              <g key={s.id}>
                <line x1={s.line.x} y1={s.line.y} x2={s.point.x} y2={s.point.y} style={{ stroke: active === s.id ? "var(--brand)" : "#f4f6f4" }} strokeOpacity=".9" strokeWidth="1.5" />
                <circle cx={s.point.x} cy={s.point.y} r="7" style={{ fill: "var(--brand)" }} stroke="#f4f5f3" strokeWidth="2" />
                <circle cx={s.point.x} cy={s.point.y} r="14" fill="none" style={{ stroke: "var(--brand)" }} strokeOpacity=".6" />
              </g>
            ))}
          </svg>
          {services.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.id}
                href={s.href}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                aria-label={s.label + ": " + s.detail}
                className={"absolute z-20 hidden min-w-[180px] gap-3 rounded-[6px] border px-4 py-3 text-left text-white shadow-[0_14px_25px_rgba(0,0,0,.55)] backdrop-blur-md transition-colors hover:border-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white xl:flex " + s.className + (active === s.id ? " border-[var(--brand)] bg-[#07151c]/95" : " border-white/55 bg-[#060c10]/90")}
              >
                <Icon size={22} strokeWidth={1.6} className="mt-1 shrink-0 text-[var(--brand)]" aria-hidden="true" />
                <span>
                  <strong className="block text-sm leading-4">{s.label}</strong>
                  <small className="mt-1 block text-[11px] leading-4 text-white/75">{s.detail}</small>
                </span>
              </a>
            )
          })}
        </div>

        {/* Directly below the car, like the approved reference. */}
        <nav aria-label="Usluge" className="mt-7 grid grid-cols-2 gap-5 lg:mt-[22px] lg:grid-cols-4">
          {links.map((link, index) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                className={"service-link " + (index === 1 ? "service-link-light " : "") + "group flex min-h-[76px] items-center gap-3 rounded-[12px] border border-white/25 bg-[#091116]/90 px-4 transition-all hover:border-[var(--brand)] hover:bg-[#11232b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5"}
              >
                <Icon size={25} strokeWidth={1.6} className={"shrink-0 " + (index === 1 ? "text-[var(--cool-accent)]" : "text-[var(--brand)]")} aria-hidden="true" />
                <span className="min-w-0 border-l border-white/20 pl-3">
                  <strong className="block text-sm font-semibold text-white sm:text-base">{link.label}</strong>
                  <span className="mt-1 block text-[11px] leading-4 text-white/65">{link.description}</span>
                </span>
                <ChevronRight className="ml-auto hidden shrink-0 text-white/55 group-hover:text-white sm:block" size={15} aria-hidden="true" />
              </a>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
