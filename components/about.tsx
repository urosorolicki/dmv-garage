"use client"

import { useEffect, useRef, useState } from "react"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 bg-secondary/20" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.25 0 0), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <div
          className={`transition-all duration-[1500ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">
            O nama
          </p>
          <blockquote
            className="text-xl md:text-2xl lg:text-3xl font-sans font-light leading-relaxed text-foreground/90 tracking-[-0.01em] text-balance"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 2000) * 0.02)}px)`,
            }}
          >
            {'"DMV Garage je specijalizovana radionica za unapređenje performansi i vizuelnog identiteta vozila. Preciznost, tehnologija i kvalitet su temelj svakog projekta."'}
          </blockquote>
          <div className="mt-10 w-16 h-[1px] bg-border mx-auto" />
          <p className="mt-6 text-muted-foreground text-sm tracking-[0.1em] uppercase">
            DMV Garage
          </p>
        </div>
      </div>
    </section>
  )
}
