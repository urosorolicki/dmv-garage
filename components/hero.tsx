"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { HERO_3D_ENABLED } from "@/lib/hero-3d"

// three.js is client-only and heavy — load it lazily, never during SSR
const HeroCar3D = dynamic(() => import("@/components/hero-car-3d"), { ssr: false })

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const [videoReady, setVideoReady] = useState(false)
  const [use3D, setUse3D] = useState(false)
  const [carReady, setCarReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showVideo, setShowVideo] = useState(false)


  // Video only after hydration, and not for reduced-motion / data-saver users —
  // the poster stays as a still. Enable the 3D car only on desktop, and only
  // when the model is shipped.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReducedMotion(reduced)
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    setShowVideo(!reduced && !conn?.saveData)
    if (!HERO_3D_ENABLED || window.innerWidth < 1024 || conn?.saveData) return
    setUse3D(true)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY
        if (contentRef.current)
          contentRef.current.style.transform = `translateY(${-(y * 0.3 * 0.15)}px)`
        if (fogRef.current)
          fogRef.current.style.opacity = String(Math.min(0.6, 0.3 + y * 0.0005))
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero - DMV Garage"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[oklch(0.08_0_0)]"
    >
      {/* Poster — paints immediately, video fades in over it */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/video/hero-poster-mobile.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/video/hero-poster.jpg"
          alt=""
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            carReady ? "opacity-25" : "opacity-100"
          }`}
        />
      </picture>

      {/* Video background — 720p30 desktop, portrait crop on phones */}
      {showVideo && (
        <video
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            !videoReady ? "opacity-0" : carReady ? "opacity-25" : "opacity-100"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
        >
          <source media="(max-width: 767px)" src="/video/hero-mobile.mp4" type="video/mp4" />
          <source src="/video/hero-720.webm" type="video/webm" />
          <source src="/video/hero-720.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrim — keeps the copy and the transparent navbar readable over the footage */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.08 0 0 / 0.6), oklch(0.08 0 0 / 0.25) 35%, oklch(0.08 0 0 / 0.35) 65%, oklch(0.08 0 0 / 0.85))",
        }}
      />

      {/* Radial ambient light */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.14 0 0), transparent)",
        }}
      />

      {/* Animated fog */}
      <div
        ref={fogRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.45,
          background:
            "radial-gradient(ellipse 100% 50% at 50% 100%, oklch(0.08 0 0), transparent)",
          willChange: "opacity",
        }}
      />

      {/* 3D car — right half on desktop, copy moves to the left */}
      {use3D && (
        <div
          className={`absolute inset-y-0 right-0 w-[58%] z-[5] pointer-events-none transition-opacity duration-1000 ${
            carReady ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <HeroCar3D reducedMotion={reducedMotion} onReady={() => setCarReady(true)} />
        </div>
      )}

      {/* Content overlay */}
      <div
        ref={contentRef}
        className={`relative z-10 px-6 flex flex-col ${
          use3D
            ? "w-full max-w-[1440px] lg:px-12 items-start text-left"
            : "text-center items-center"
        }`}
        style={{ willChange: "transform" }}
      >
        <p
          className="hero-rise text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--brand)", animationDelay: "200ms" }}
        >
          Chiptuning & LED ugradnja — Beograd
        </p>
        <h1 aria-label="Performanse bez kompromisa" className="font-display text-[72px] md:text-[100px] lg:text-[130px] leading-[0.92] tracking-[0.02em] text-foreground uppercase">
          {["Performanse", "bez", "kompromisa"].map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden" aria-hidden="true">
              {line.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="hero-char"
                  style={{ animationDelay: `${300 + lineIdx * 240 + charIdx * 22}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        {/* Thin brand accent line */}
        <div
          className={`mt-6 ${use3D ? "self-start" : "self-center"}`}
        >
          <div
            className="hero-line h-[2px] w-16"
            style={{ background: "var(--brand)", animationDelay: "900ms" }}
          />
        </div>
        <p
          className="hero-rise mt-5 text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed tracking-wide"
          style={{ animationDelay: "350ms" }}
        >
          ECU remap, Stage 1–3 chiptuning, LED ugradnja,
          <br className="hidden md:block" /> auto elektronika i enterijer po meri.
        </p>
        <div
          className="hero-rise mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ animationDelay: "700ms" }}
        >
          <a
            href="#configurator"
            className="px-8 py-3 text-sm tracking-[0.12em] uppercase font-medium transition-all duration-300"
            style={{
              background: "var(--brand)",
              color: "oklch(0.08 0 0)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Konfiguriši
          </a>
          <a
            href="#gallery"
            className="px-8 py-3 text-sm tracking-[0.12em] uppercase border border-foreground/40 text-foreground hover:bg-foreground/10 hover:border-foreground/60 transition-all duration-300"
          >
            Naši Radovi
          </a>
        </div>
      </div>

    </section>
  )
}
