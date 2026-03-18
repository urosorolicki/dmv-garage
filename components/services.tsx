"use client"

import { useEffect, useRef, useState } from "react"
import type { MouseEvent } from "react"

const services = [
  {
    number: "01",
    title: "LED Ugradnja",
    description:
      "Premium LED svetlosni sistemi za potpunu transformaciju vizuelnog identiteta vašeg vozila.",
    image: "/images/led-after.jpg",
  },
  {
    number: "02",
    title: "Auto Elektronika",
    description:
      "Napredna dijagnostika, ugradnja i popravka kompleksnih elektronskih sistema.",
    image: "/images/electronics-after.png",
  },
  {
    number: "03",
    title: "ECU Chiptuning",
    description:
      "Custom remap softvera za optimalan balans performansi, potrošnje i pouzdanosti.",
    image: "/images/chiptuning-after.jpg",
  },
  {
    number: "04",
    title: "Enterijer",
    description:
      "Kompletan redizajn enterijera — promena boja table i dugmica, ambijentalno osvetljenje i materijalni detalji po meri.",
    image: "/images/interior-after.jpg",
  },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -6
    const rotateY = ((x - cx) / cx) * 6
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    card.style.transition = "transform 0.08s ease-out"
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    card.style.transition = "transform 0.5s ease-out"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}

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

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Šta nudimo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Usluge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border/30">
          {services.map((service, index) => (
            <TiltCard
              key={service.number}
              className={`group bg-background p-8 transition-colors duration-700 hover:bg-secondary/40 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className={`transition-all duration-700`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <span className="text-muted-foreground/40 text-xs font-mono tracking-wider block mb-6">
                  {service.number}
                </span>
                <div className="w-full aspect-[4/3] mb-4 rounded overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-foreground text-lg font-sans font-light tracking-[-0.01em] mb-3 group-hover:translate-x-1 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 w-8 h-[1px] bg-border group-hover:w-16 group-hover:bg-foreground/30 transition-all duration-500" />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
