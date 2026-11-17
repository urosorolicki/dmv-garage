"use client"

import { useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Gauge,
  Lightbulb,
  Armchair,
  MoveUpRight,
} from "lucide-react"

type Feature = {
  id: string
  label: string
  detail: string
  href: string
  coordinates: { left: string; top: string }
  icon: typeof Gauge
}

const features: Feature[] = [
  {
    id: "performance",
    label: "Performanse",
    detail: "ECU remap i optimizacija motora, prilagođeni konkretnom vozilu.",
    href: "#vehicle-lookup",
    coordinates: { left: "44%", top: "34%" },
    icon: Gauge,
  },
  {
    id: "lighting",
    label: "Svetla",
    detail: "LED ugradnja i precizne promene osvetljenja.",
    href: "#gallery",
    coordinates: { left: "60%", top: "55%" },
    icon: Lightbulb,
  },
  {
    id: "interior",
    label: "Enterijer",
    detail: "Ambijentalna svetla i personalizacija unutrašnjosti.",
    href: "#services",
    coordinates: { left: "77%", top: "29%" },
    icon: Armchair,
  },
  {
    id: "electronics",
    label: "Elektronika",
    detail: "Dijagnostika, kodiranje i ugradnja elektronskih sistema.",
    href: "#services",
    coordinates: { left: "84%", top: "68%" },
    icon: Cpu,
  },
]

const quickLinks = [
  { title: "Chiptuning", caption: "Snaga i obrtni moment", href: "#vehicle-lookup", icon: Gauge },
  { title: "LED ugradnja", caption: "Osvetljenje po meri", href: "#gallery", icon: Lightbulb },
  { title: "Auto elektronika", caption: "Dijagnostika i kodiranje", href: "#services", icon: Cpu },
  { title: "Konfigurator", caption: "Proveri svoje vozilo", href: "#vehicle-lookup", icon: MoveUpRight },
]

export function Hero() {
  const [selected, setSelected] = useState("lighting")
  const active = features.find((feature) => feature.id === selected) ?? features[0]
  const ActiveIcon = active.icon

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#080e13]"
    >
      {/* Existing approved site imagery remains in use until the cinematic
          photo asset can be committed independently. No paid widget affected. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[position:63%_center] opacity-75 lg:bg-[position:center_34%]"
        style={{ backgroundImage: 'url("/video/hero-poster.jpg")' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,rgba(4,10,14,.97) 0%,rgba(5,12,16,.89) 30%,rgba(5,12,16,.28) 68%,rgba(5,12,16,.45) 100%),linear-gradient(0deg,#080e13 0%,transparent 32%,rgba(4,9,13,.3) 95%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-12 h-[500px] w-[500px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "var(--cool-accent)" }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pb-10 pt-32 sm:px-6 lg:px-12 lg:pb-14 lg:pt-40">
        <div className="grid min-h-[570px] flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="relative z-20 max-w-[660px] pb-6">
            <p className="mb-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.26em] text-white/70 sm:text-xs">
              <span className="h-[2px] w-8 bg-[var(--brand)]" aria-hidden="true" />
              Chiptuning <span className="text-[var(--brand)]">/</span> LED ugradnja <span className="text-[var(--brand)]">/</span> Auto elektronika
            </p>
            <h1 id="hero-title" className="font-display text-[clamp(3.45rem,7.3vw,7.5rem)] uppercase leading-[0.9] tracking-[0.005em] text-[#f1f0ed]">
              <span className="block">Više snage.</span>
              <span className="block">Bolji izgled.</span>
              <span className="mt-1 block text-[var(--brand)]">Potpuna kontrola.</span>
            </h1>
            <p className="mt-8 max-w-[440px] text-sm leading-7 text-[#d2d5d6] sm:text-base">
              Chiptuning, LED ugradnja i elektronika. Sve što radimo,
              pokazujemo kroz konkretne projekte — bez praznih obećanja.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex min-h-12 items-center justify-center gap-4 bg-[var(--brand)] px-6 text-sm font-semibold text-[#111315] transition-colors hover:bg-[var(--brand-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
              >
                Istraži usluge <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href="#gallery"
                className="inline-flex min-h-12 items-center justify-center gap-4 border border-white/35 bg-[#080e13]/30 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Pogledaj radove <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-[11px] uppercase tracking-[0.17em] text-white/65">
              <span>Stage 1–3 / ECU</span>
              <span>LED / Enterijer</span>
              <span>Beograd / Zemun</span>
            </div>
          </div>

          <div className="relative z-10 hidden min-h-[540px] lg:block" aria-label="Interaktivno istraživanje usluga na automobilu">
            {features.map((feature) => {
              const Icon = feature.icon
              const isActive = selected === feature.id
              return (
                <button
                  key={feature.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={"Prikaži uslugu: " + feature.label}
                  onClick={() => setSelected(feature.id)}
                  style={{ left: feature.coordinates.left, top: feature.coordinates.top }}
                  className={
                    "absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-[#071218]/85 shadow-[0_0_0_7px_rgba(6,15,20,.35)] backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " +
                    (isActive ? "border-[var(--brand)] text-[var(--brand)]" : "border-white/50 text-white")
                  }
                >
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </button>
              )
            })}
            <div className="absolute bottom-8 right-0 w-[320px] border-l-2 border-[var(--brand)] bg-[#081116]/90 p-5 backdrop-blur-xl">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cool-accent)]">Istraži deo vozila</p>
              <div className="flex items-center gap-2 text-xl font-semibold text-white">
                <ActiveIcon size={20} aria-hidden="true" />
                {active.label}
              </div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-white/70">{active.detail}</p>
              <a href={active.href} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[var(--brand)] hover:underline">
                Saznaj više <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Touch-friendly alternative to on-image hotspot placement. */}
        <div className="mb-7 grid grid-cols-2 gap-2 lg:hidden" aria-label="Usluge koje možete istražiti">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => setSelected(feature.id)}
                aria-pressed={selected === feature.id}
                className={"flex min-h-12 items-center gap-2 border px-3 text-left text-xs transition-colors " +
                  (selected === feature.id ? "border-[var(--brand)] bg-[#1d2428] text-white" : "border-white/20 bg-black/35 text-white/75")}
              >
                <Icon size={16} className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                {feature.label}
              </button>
            )
          })}
          <div className="col-span-2 flex items-center justify-between gap-4 bg-[#0b171d]/90 p-4 text-sm text-white/80">
            <span>{active.detail}</span>
            <a href={active.href} className="shrink-0 text-[var(--brand)]" aria-label={"Saznaj više: " + active.label}>
              <ArrowUpRight size={21} />
            </a>
          </div>
        </div>

        <nav aria-label="Istražite usluge" className="grid grid-cols-2 gap-px border border-white/20 bg-white/15 md:grid-cols-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <a
                href={link.href}
                key={link.title}
                className="group flex min-h-[112px] items-center gap-3 bg-[#0b1115]/95 px-4 py-5 transition-colors hover:bg-[#16232a] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--brand)] sm:gap-4 sm:px-6"
              >
                <Icon size={25} strokeWidth={1.5} className={index === 1 ? "shrink-0 text-[var(--cool-accent)]" : "shrink-0 text-[var(--brand)]"} aria-hidden="true" />
                <span className="min-w-0">
                  <strong className="block text-sm font-semibold text-white sm:text-base">{link.title}</strong>
                  <span className="mt-1 block text-[11px] leading-4 text-white/55 sm:text-xs">{link.caption}</span>
                </span>
                <ArrowDownRight size={16} className="ml-auto hidden shrink-0 text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" aria-hidden="true" />
              </a>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
