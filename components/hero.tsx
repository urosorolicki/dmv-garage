"use client"

import { useEffect, useRef, useState } from "react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const [isVisible, setIsVisible] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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
      {/* Video background */}
      <video
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
      >
        <source src="/13127448_1920_1080_60fps.webm" type="video/webm" />
        <source src="/13127448_1920_1080_60fps.mp4" type="video/mp4" />
      </video>

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

      {/* Brand orange glow — bottom-left ember */}
      <div
        className="absolute bottom-0 left-[-10%] w-[600px] h-[400px] pointer-events-none blur-[140px] opacity-[0.18]"
        style={{ background: "var(--brand)" }}
      />

      {/* Subtle moving light effect */}
      <div
        className="absolute top-[20%] left-[30%] w-[500px] h-[300px] pointer-events-none rounded-full blur-[120px] opacity-[0.05] hero-light-move"
        style={{ background: "oklch(0.95 0 0)", willChange: "transform" }}
      />

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{ willChange: "transform" }}
      >
        <p
          className={`text-xs tracking-[0.4em] uppercase mb-4 transition-all duration-[1500ms] delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ color: "var(--brand)" }}
        >
          DMV Garage — Beograd
        </p>
        <h1 className="font-display text-[72px] md:text-[100px] lg:text-[130px] leading-[0.92] tracking-[0.02em] text-foreground uppercase">
          {["Performanse", "bez", "kompromisa"].map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden">
              {line.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="inline-block transition-all duration-700"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${400 + lineIdx * 280 + charIdx * 22}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(110%)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        {/* Thin brand accent line */}
        <div
          className={`mt-6 self-start transition-all duration-[1200ms] delay-[900ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-[2px] transition-all duration-[1000ms] delay-[1000ms]"
            style={{
              background: "var(--brand)",
              width: isVisible ? "64px" : "0px",
            }}
          />
        </div>
        <p
          className={`mt-5 text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed tracking-wide transition-all duration-[1500ms] delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          ECU remap, Stage 1–3 chiptuning, LED ugradnja,
          <br className="hidden md:block" /> auto elektronika i enterijer po meri.
        </p>
        <div
          className={`mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-[1500ms] delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
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
            className="px-8 py-3 text-sm tracking-[0.12em] uppercase border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
          >
            Naši Radovi
          </a>
        </div>
      </div>

    </section>
  )
}
