"use client"

import { useEffect, useRef, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

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
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
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

const dynoData = [
  { rpm: "1000", original: 52,  remap: 62  },
  { rpm: "1500", original: 105, remap: 128 },
  { rpm: "2000", original: 148, remap: 183 },
  { rpm: "2500", original: 175, remap: 218 },
  { rpm: "3000", original: 190, remap: 235 },
  { rpm: "3500", original: 185, remap: 228 },
  { rpm: "4000", original: 168, remap: 208 },
  { rpm: "4500", original: 145, remap: 183 },
]

const carExamples = [
  { model: "BMW 320d (B47)", before: 190, after: 235 },
  { model: "VW Golf 2.0 TDI", before: 150, after: 185 },
  { model: "Audi A4 2.0 TFSI", before: 190, after: 240 },
]

const stats = [
  { label: "Konjske snage", value: 45, prefix: "+", suffix: " KS", bar: 75 },
  { label: "Obrtni moment",  value: 80, prefix: "+", suffix: " Nm", bar: 85 },
  { label: "Odziv gasa",     value: 35, prefix: "+", suffix: "%",   bar: 65 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[oklch(0.13_0_0)] border border-border/60 rounded-sm px-4 py-3 text-xs">
      <p className="text-muted-foreground mb-2 tracking-[0.1em] uppercase">{label} RPM</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="mb-1">
          {p.name}: <span className="font-mono">{p.value} KS</span>
        </p>
      ))}
    </div>
  )
}

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
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
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Chiptuning rezultati
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground text-balance">
            Otključajte puni potencijal
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
            Profesionalni ECU remap prilagođen vašem vozilu. Rezultati mereni na
            dinamometru sa garantovanim poboljšanjima performansi.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Dyno chart */}
          <div
            className={`w-full lg:w-3/5 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Kriva snage — dinamometar (KS / RPM)
            </p>
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dynoData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.22 0 0)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="rpm"
                    tick={{ fill: "oklch(0.45 0 0)", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "RPM",
                      position: "insideBottomRight",
                      offset: -4,
                      fill: "oklch(0.40 0 0)",
                      fontSize: 9,
                    }}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0 0)", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 280]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: "12px" }}
                    formatter={(value) => (
                      <span style={{ color: "oklch(0.55 0 0)" }}>{value}</span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="original"
                    name="Original"
                    stroke="oklch(0.40 0 0)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "oklch(0.40 0 0)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="remap"
                    name="Remap"
                    stroke="oklch(0.88 0 0)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "oklch(0.88 0 0)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Car examples */}
            <div className="mt-8 flex flex-col gap-3">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                Primeri rezultata
              </p>
              {carExamples.map((car) => (
                <div
                  key={car.model}
                  className="flex items-center justify-between border-b border-border/30 pb-3"
                >
                  <span className="text-xs text-muted-foreground font-mono">{car.model}</span>
                  <span className="text-xs font-mono">
                    <span className="text-muted-foreground/50">{car.before} KS</span>
                    <span className="text-muted-foreground/30 mx-2">→</span>
                    <span className="text-foreground">{car.after} KS</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div
            className={`w-full lg:w-2/5 transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Prosečna poboljšanja
            </p>
            <div className="flex flex-col gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
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
                        transitionDelay: `${600 + index * 200}ms`,
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
