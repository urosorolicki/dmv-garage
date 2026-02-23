"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"

const configOptions = [
  {
    id: "led",
    label: "LED Svetla",
    description: "Premium LED sistem za maksimalnu vidljivost i vizuelni identitet.",
    beforeImage: "/images/led-before.jpg",
    afterImage: "/images/led-after.jpg",
    lightPosition: "top-[20%] left-[25%]",
  },
  {
    id: "interior",
    label: "Enterijer",
    description: "Promena boja table kao i svih dugmica",
    beforeImage: "/images/interior-before.jpg",
    afterImage: "/images/interior-after.jpg",
    lightPosition: "top-[40%] left-[50%]",
  },
  {
    id: "chiptuning",
    label: "ECU / Chiptuning",
    description: "Custom remap softvera za optimalan balans snage i potrošnje.",
    beforeImage: "/images/chiptuning-before.jpg",
    afterImage: "/images/chiptuning-after.jpg",
    lightPosition: "top-[50%] left-[40%]",
  },
  {
    id: "electronics",
    label: "Elektronika",
    description: "Napredna dijagnostika i ugradnja elektronskih sistema.",
    beforeImage: "/images/electronics-before.png",
    afterImage: "/images/electronics-after.png",
    lightPosition: "top-[35%] left-[60%]",
  },
]

export function Configurator() {
  const [activeOption, setActiveOption] = useState(0)
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)
  const [showAfter, setShowAfter] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const currentDisplay = hoveredOption !== null ? hoveredOption : activeOption
  const option = configOptions[currentDisplay]

  const handleOptionClick = useCallback((index: number) => {
    setActiveOption(index)
    setShowAfter(false)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="configurator"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section background */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 60% 50%, oklch(0.16 0 0), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Interaktivni konfigurator
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Izaberite paket
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left panel - options */}
          <div
            className={`lg:w-[320px] flex-shrink-0 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-col gap-1">
              {configOptions.map((opt, index) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(index)}
                  onMouseEnter={() => setHoveredOption(index)}
                  onMouseLeave={() => setHoveredOption(null)}
                  className={`group text-left px-5 py-4 rounded-sm transition-all duration-500 ${
                    activeOption === index
                      ? "bg-secondary/80"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-[3px] h-8 rounded-full transition-all duration-500 ${
                        activeOption === index
                          ? "bg-foreground"
                          : "bg-border group-hover:bg-muted-foreground/50"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm tracking-[0.06em] uppercase transition-colors duration-300 ${
                          activeOption === index
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </p>
                      <p
                        className={`text-xs text-muted-foreground/70 mt-1 leading-relaxed transition-all duration-500 ${
                          activeOption === index
                            ? "max-h-20 opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        {opt.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Toggle switch */}
            <div className="mt-8 flex items-center gap-4 px-5">
              <span
                className={`text-xs tracking-[0.1em] uppercase transition-colors duration-300 ${
                  !showAfter ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Pre
              </span>
              <button
                onClick={() => setShowAfter(!showAfter)}
                className="relative w-12 h-6 rounded-full bg-secondary border border-border transition-colors duration-300"
                aria-label="Toggle pre/posle prikaz"
              >
                <div
                  className={`absolute top-[2px] w-5 h-5 rounded-full bg-foreground transition-all duration-500 ease-out ${
                    showAfter ? "left-[calc(100%-22px)]" : "left-[2px]"
                  }`}
                />
              </button>
              <span
                className={`text-xs tracking-[0.1em] uppercase transition-colors duration-300 ${
                  showAfter ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Posle
              </span>
            </div>
          </div>

          {/* Right panel - car image */}
          <div
            className={`flex-1 relative transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-secondary/30">
              {/* Dynamic lighting effect based on hovered option */}
              <div
                className={`absolute w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ease-out z-10 ${option.lightPosition}`}
                style={{
                  background: "oklch(0.30 0 0 / 0.4)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Before image */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  showAfter ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={option.beforeImage}
                  alt={`${option.label} - pre`}
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* After image */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  showAfter ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={option.afterImage}
                  alt={`${option.label} - posle`}
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/80 to-transparent">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {showAfter ? "Posle" : "Pre"} — {option.label}
                </p>
              </div>
            </div>

            {/* Option index indicator */}
            <div className="mt-4 flex gap-2">
              {configOptions.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                    i === currentDisplay ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
