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
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.20 0 0), transparent)",
        }}
      />

      {/* Animated fog */}
      <div
        ref={fogRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          background:
            "radial-gradient(ellipse 100% 40% at 50% 80%, oklch(0.18 0 0 / 0.8), transparent)",
          willChange: "opacity",
        }}
      />

      {/* Subtle moving light effect */}
      <div
        className="absolute top-[20%] left-[30%] w-[500px] h-[300px] pointer-events-none rounded-full blur-[120px] opacity-[0.04] hero-light-move"
        style={{ background: "oklch(0.95 0 0)", willChange: "transform" }}
      />

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{ willChange: "transform" }}
      >
        <p
          className={`text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 transition-all duration-[1500ms] delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          DMV Garage
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-[-0.03em] text-foreground leading-[1.15]">
          {["Performanse bez", "kompromisa."].map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden">
              {line.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="inline-block transition-all duration-700"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transitionDelay: `${500 + lineIdx * 350 + charIdx * 32}ms`,
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
        <p
          className={`mt-6 text-muted-foreground text-sm md:text-base max-w-md leading-relaxed transition-all duration-[1500ms] delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          LED ugradnja, auto elektronika, dijagnostika
          <br className="hidden md:block" /> i custom chiptuning rešenja.
        </p>
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center gap-4 transition-all duration-[1500ms] delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#configurator"
            className="px-8 py-3 text-sm tracking-[0.1em] uppercase bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 rounded-sm"
          >
            Konfiguriši
          </a>
          <a
            href="#gallery"
            className="px-8 py-3 text-sm tracking-[0.1em] uppercase border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 rounded-sm"
          >
            Naši Radovi
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-[1500ms] delay-[1500ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-muted-foreground/50 text-[10px] tracking-[0.3em] uppercase">
          Skroluj
        </span>
        <div className="w-[1px] h-8 bg-muted-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-muted-foreground/60 hero-scroll-line" />
        </div>
      </div>
    </section>
  )
}
