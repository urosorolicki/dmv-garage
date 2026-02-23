"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.3
  const fogOpacity = Math.min(0.6, 0.3 + scrollY * 0.0005)


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/13127448_1920_1080_60fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-car.jpg"
      />

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
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: fogOpacity,
          background:
            "radial-gradient(ellipse 100% 40% at 50% 80%, oklch(0.18 0 0 / 0.8), transparent)",
        }}
      />

      {/* Subtle moving light effect */}
      <div
        className="absolute top-[20%] left-[30%] w-[500px] h-[300px] pointer-events-none rounded-full blur-[120px] opacity-[0.04]"
        style={{
          background: "oklch(0.95 0 0)",
          animation: "lightMove 12s ease-in-out infinite alternate",
        }}
      />

      {/* Content overlay */}
      <div
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{
          transform: `translateY(${-parallaxOffset * 0.15}px)`,
        }}
      >
        <p
          className={`text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 transition-all duration-[1500ms] delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          DMV Garage
        </p>
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-[-0.03em] text-foreground leading-[1.1] text-balance transition-all duration-[1500ms] delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Performanse bez
          <br />
          kompromisa.
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
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-muted-foreground/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-3 bg-muted-foreground/60"
            style={{ animation: "scrollLine 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes lightMove {
          0% {
            transform: translateX(-50px) translateY(0);
          }
          100% {
            transform: translateX(50px) translateY(-30px);
          }
        }
        @keyframes scrollLine {
          0% {
            transform: translateY(-12px);
          }
          50% {
            transform: translateY(32px);
          }
          100% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  )
}
