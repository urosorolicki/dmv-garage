"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  isVisible: boolean
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  isVisible,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, target, duration])

  return (
    <span className="tabular-nums font-mono">
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  {
    label: "Konjske snage",
    value: 45,
    prefix: "+",
    suffix: " KS",
    bar: 75,
  },
  {
    label: "Obrtni moment",
    value: 80,
    prefix: "+",
    suffix: " Nm",
    bar: 85,
  },
  {
    label: "Bolji odziv gasa",
    value: 35,
    prefix: "+",
    suffix: "%",
    bar: 65,
  },
]

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-secondary/30" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 30% 50%, oklch(0.18 0 0), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div
            className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
              Chiptuning rezultati
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground text-balance">
              Otključajte puni potencijal
            </h2>
            <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
              Profesionalni ECU remap prilagođen vašem vozilu.
              Rezultati mereni na dinamometru sa garantovanim poboljšanjima performansi.
            </p>
          </div>

          {/* Stats side */}
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-light text-foreground">
                      <AnimatedCounter
                        target={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        isVisible={isVisible}
                        duration={2000 + index * 300}
                      />
                    </span>
                  </div>
                  <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground/60 rounded-full transition-all duration-[2000ms] ease-out"
                      style={{
                        width: isVisible ? `${stat.bar}%` : "0%",
                        transitionDelay: `${500 + index * 200}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
