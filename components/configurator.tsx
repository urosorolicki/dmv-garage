"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"

const configOptions = [
  {
    id: "led",
    label: "LED Svetla",
    description: "Premium LED sistem za maksimalnu vidljivost i vizuelni identitet vozila.",
    beforeImage: "/images/led-before.jpg",
    afterImage: "/images/led-after.jpg",
  },
  {
    id: "interior",
    label: "Enterijer",
    description: "Kompletan redizajn enterijera — promena boja table i dugmica, ambijentalno osvetljenje i materijalni detalji po meri.",
    beforeImage: "/images/interior-before.jpg",
    afterImage: "/images/interior-after.jpg",
  },
  {
    id: "chiptuning",
    label: "ECU / Chiptuning",
    description: "Custom remap softvera za optimalan balans snage, potrošnje i pouzdanosti.",
    beforeImage: "/images/chiptuning-before.jpg",
    afterImage: "/images/chiptuning-after.jpg",
  },
  {
    id: "electronics",
    label: "Elektronika",
    description: "Napredna dijagnostika i ugradnja kompleksnih elektronskih sistema.",
    beforeImage: "/images/electronics-before.png",
    afterImage: "/images/electronics-after.png",
  },
]

// ─── Drag-to-compare slider ──────────────────────────────────────────────────

interface CompareSliderProps {
  beforeSrc: string
  afterSrc: string
  label: string
  resetSignal: number // increments when option changes → triggers reset animation
}

function CompareSlider({ beforeSrc, afterSrc, label, resetSignal }: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [animating, setAnimating] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const isDragging = useRef(false)
  const hasInteracted = useRef(false)

  // Reset to center when option changes
  useEffect(() => {
    setAnimating(true)
    setPosition(50)
    setHintVisible(true)
    hasInteracted.current = false
    const t = setTimeout(() => setAnimating(false), 500)
    return () => clearTimeout(t)
  }, [resetSignal])

  const clamp = (v: number) => Math.max(2, Math.min(98, v))

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  // Mouse
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    if (!hasInteracted.current) {
      hasInteracted.current = true
      setHintVisible(false)
    }
    updateFromClientX(e.clientX)
  }

  // Also allow dragging from anywhere on the container
  const onContainerMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    if (!hasInteracted.current) {
      hasInteracted.current = true
      setHintVisible(false)
    }
    updateFromClientX(e.clientX)
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      updateFromClientX(e.clientX)
    }
    const onMouseUp = () => { isDragging.current = false }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [updateFromClientX])

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true
    if (!hasInteracted.current) {
      hasInteracted.current = true
      setHintVisible(false)
    }
    updateFromClientX(e.touches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    updateFromClientX(e.touches[0].clientX)
  }

  // Keyboard accessibility
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  setPosition((p) => clamp(p - 5))
    if (e.key === "ArrowRight") setPosition((p) => clamp(p + 5))
    if (!hasInteracted.current) {
      hasInteracted.current = true
      setHintVisible(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] rounded-sm overflow-hidden bg-secondary/30 select-none"
      style={{ cursor: isDragging.current ? "ew-resize" : "col-resize" }}
      onMouseDown={onContainerMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* Before image — full width base */}
      <Image
        src={beforeSrc}
        alt={`${label} - pre`}
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 768px) 100vw, 60vw"
        draggable={false}
      />

      {/* After image — clipped from left by slider position */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 0 0 ${position}%)`,
          transition: animating ? "clip-path 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
        }}
      >
        <Image
          src={afterSrc}
          alt={`${label} - posle`}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 60vw"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[1.5px] bg-white/80 z-20 pointer-events-none"
        style={{
          left: `${position}%`,
          transition: animating ? "left 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
        }}
      />

      {/* Drag handle */}
      <div
        role="slider"
        aria-label="Prevuci za poređenje pre/posle"
        aria-valuenow={Math.round(position)}
        aria-valuemin={2}
        aria-valuemax={98}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-white/50"
        style={{
          left: `${position}%`,
          transition: animating ? "left 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6 9H12M6 9L4 7M6 9L4 11M12 9L14 7M12 9L14 11" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Before / After labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-sm">
          Pre
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-sm">
          Posle
        </span>
      </div>

      {/* Drag hint — fades out after first interaction */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
          hintVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-sm px-4 py-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">Prevuci</span>
        </div>
      </div>

      {/* Active option label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10">
        <p className="text-xs tracking-[0.2em] uppercase text-white/60">{label}</p>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Configurator() {
  const [activeOption, setActiveOption] = useState(0)
  const [resetSignal, setResetSignal] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleOptionClick = useCallback((index: number) => {
    if (index === activeOption) return
    setActiveOption(index)
    setResetSignal((s) => s + 1)
  }, [activeOption])

  const option = configOptions[activeOption]

  return (
    <section
      ref={sectionRef}
      id="configurator"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 60% 50%, oklch(0.16 0 0), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
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
          {/* Left panel */}
          <div
            className={`lg:w-[300px] flex-shrink-0 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-col gap-1">
              {configOptions.map((opt, index) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(index)}
                  className={`group text-left px-5 py-4 rounded-sm transition-all duration-300 ${
                    activeOption === index ? "bg-secondary/80" : "hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-1 w-[2px] rounded-full flex-shrink-0 transition-all duration-500 ${
                        activeOption === index
                          ? "h-5 bg-foreground"
                          : "h-3 bg-border group-hover:bg-muted-foreground/50"
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
                      <div
                        className="grid transition-all duration-500 ease-in-out"
                        style={{ gridTemplateRows: activeOption === index ? "1fr" : "0fr" }}
                      >
                        <p className="text-xs text-muted-foreground/70 leading-relaxed overflow-hidden pt-1">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Step indicator */}
            <div className="mt-8 px-5 flex gap-2">
              {configOptions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(i)}
                  className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                    i === activeOption ? "bg-foreground" : "bg-border hover:bg-muted-foreground/40"
                  }`}
                  aria-label={configOptions[i].label}
                />
              ))}
            </div>
          </div>

          {/* Right panel — compare slider */}
          <div
            className={`flex-1 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <CompareSlider
              beforeSrc={option.beforeImage}
              afterSrc={option.afterImage}
              label={option.label}
              resetSignal={resetSignal}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
