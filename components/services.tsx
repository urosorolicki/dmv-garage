"use client"

import { useEffect, useRef, useState } from "react"

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
      "Promena boja table kao i svih dugmica",
    image: "/images/interior-after.jpg",
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
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
            <div
              key={service.number}
              className={`group bg-background p-8 transition-all duration-700 hover:bg-secondary/40 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <span className="text-muted-foreground/40 text-xs font-mono tracking-wider block mb-6">
                {service.number}
              </span>
              <div className="w-full aspect-[4/3] mb-4 rounded overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
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
          ))}
        </div>
      </div>
    </section>
  )
}
