"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"

const configOptions = [
  {
    id: "led",
    label: "LED svetla",
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
    id: "electronics",
    label: "Elektronika",
    description: "Napredna dijagnostika i ugradnja kompleksnih elektronskih sistema.",
    beforeImage: "/images/electronics-before-hd.jpg",
    afterImage: "/images/electronics-after-hd.jpg",
  },
]

// ─── Drag-to-compare slider ──────────────────────────────────────────────────
// Built on the fluid-interface rules: the divider follows the finger 1:1 and
// keeps the offset from where it was grabbed, every animation is a spring that
// starts from the on-screen value (so it can be grabbed mid-flight), and the
// edges resist progressively instead of stopping dead.

interface CompareSliderProps {
  beforeSrc: string
  afterSrc: string
  label: string
  resetSignal: number // increments when option changes → springs back to the middle
}

const MIN = 2 // keeps the handle on screen at either end
const MAX = 98
const EDGE_GIVE_PX = 40 // the most the divider can be pulled past an edge
const HANDLE_HIT_PX = 32 // grabbing within this distance of the divider keeps the grab offset
const DRAG_THRESHOLD_PX = 6

// Critically damped spring (damping ratio 1, no overshoot), response in seconds
function springStep(x: number, v: number, target: number, dt: number, response = 0.35) {
  const omega = (2 * Math.PI) / response
  const a = -omega * omega * (x - target) - 2 * omega * v
  const nv = v + a * dt
  return { x: x + nv * dt, v: nv }
}

// Further past the edge, less follow-through — real things slow before they stop
function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

const clampPos = (v: number) => Math.max(MIN, Math.min(MAX, v))

function CompareSlider({ beforeSrc, afterSrc, label, resetSignal }: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const pos = useRef(50) // presentation value, in % of width
  const vel = useRef(0) // %/s
  const frame = useRef<number | null>(null)
  const drag = useRef<{
    id: number
    startX: number
    offset: number // pos − pointer%, captured from the live value
    active: boolean
    history: { t: number; p: number }[]
  } | null>(null)
  const [hintVisible, setHintVisible] = useState(true)

  const render = useCallback((value: number) => {
    pos.current = value
    containerRef.current?.style.setProperty("--pos", String(value))
    const handle = handleRef.current
    if (handle) {
      const rounded = String(Math.round(clampPos(value)))
      handle.setAttribute("aria-valuenow", rounded)
      handle.setAttribute("aria-valuetext", `${rounded}% posle`)
    }
  }, [])

  const stop = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
  }

  const animateTo = useCallback((target: number, initialVelocity = vel.current) => {
    stop()
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      vel.current = 0
      render(target)
      return
    }
    vel.current = initialVelocity
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30)
      last = now
      const next = springStep(pos.current, vel.current, target, dt)
      vel.current = next.v
      if (Math.abs(next.x - target) < 0.05 && Math.abs(next.v) < 0.5) {
        vel.current = 0
        render(target)
        frame.current = null
        return
      }
      render(next.x)
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [render])

  useEffect(() => stop, [])

  // New option: spring back to the middle from wherever the divider is now
  const firstReset = useRef(true)
  useEffect(() => {
    if (firstReset.current) {
      firstReset.current = false
      render(50)
      return
    }
    setHintVisible(true)
    animateTo(50, 0)
  }, [resetSignal, animateTo, render])

  const toPercent = (clientX: number) => {
    const rect = containerRef.current!.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  // Raw drag value → on-screen value, rubber-banded outside 0–100
  const banded = (raw: number) => {
    const width = containerRef.current?.getBoundingClientRect().width ?? 1
    if (raw >= MIN && raw <= MAX) return raw
    const edge = raw < MIN ? MIN : MAX
    const overshootPx = ((raw - edge) / 100) * width
    return edge + (rubberband(overshootPx, EDGE_GIVE_PX) / width) * 100
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const el = containerRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    setHintVisible(false)
    stop() // grab it mid-flight: the live value becomes the starting point
    const rect = el.getBoundingClientRect()
    const pointer = toPercent(e.clientX)
    const nearHandle = Math.abs(((pointer - pos.current) / 100) * rect.width) <= HANDLE_HIT_PX
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      offset: nearHandle ? pos.current - pointer : 0,
      active: nearHandle, // on the handle, track immediately
      history: [{ t: e.timeStamp, p: pos.current }],
    }
    // Tapped away from the divider: glide there; a drag that follows takes over from the live value
    if (!nearHandle) animateTo(clampPos(pointer), 0)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.active) {
      if (Math.abs(e.clientX - d.startX) < DRAG_THRESHOLD_PX) return
      stop()
      d.active = true
      d.offset = pos.current - toPercent(e.clientX)
    }
    const value = banded(toPercent(e.clientX) + d.offset)
    render(value)
    d.history.push({ t: e.timeStamp, p: value })
    if (d.history.length > 5) d.history.shift()
  }

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    if (!d.active) return // a tap: its glide is already running
    // Release velocity from recent history, handed to the spring so there is no seam
    const first = d.history[0]
    const last = d.history[d.history.length - 1]
    const dt = (last.t - first.t) / 1000
    const v = dt > 0 ? (last.p - first.p) / dt : 0
    if (pos.current < MIN || pos.current > MAX) animateTo(clampPos(pos.current), v)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 }
    let target: number | null = null
    if (e.key in steps) target = clampPos(pos.current + steps[e.key])
    if (e.key === "Home") target = MIN
    if (e.key === "End") target = MAX
    if (target === null) return
    e.preventDefault()
    setHintVisible(false)
    animateTo(target, 0)
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] overflow-hidden rounded-sm bg-secondary/30 select-none cursor-col-resize [container-type:inline-size] [touch-action:pan-y] [-webkit-tap-highlight-color:transparent]"
      style={{ "--pos": 50 } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
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

      {/* After image — clipped from the left at the divider */}
      <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 clamp(0%, calc(var(--pos) * 1%), 100%))" }}>
        <Image
          src={afterSrc}
          alt={`${label} - posle`}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 60vw"
          draggable={false}
        />
      </div>

      {/* Divider and handle move with a transform (no layout per frame) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[1.5px] bg-white/85"
        style={{ translate: "calc(var(--pos) * 1cqw - 50%) 0" }}
      />
      <div
        ref={handleRef}
        role="slider"
        aria-label="Poređenje pre i posle"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={50}
        aria-orientation="horizontal"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute left-0 top-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_4px_20px_rgba(0,0,0,0.4)] cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
        style={{ translate: "calc(var(--pos) * 1cqw - 50%) -50%" }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M6 9H12M6 9L4 7M6 9L4 11M12 9L14 7M12 9L14 11" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Before / After labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-sm font-medium text-white bg-[#141517]/85 px-2.5 py-1">Pre</span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-sm font-medium text-white bg-[#141517]/85 px-2.5 py-1">Posle</span>
      </div>

      {/* Drag hint — fades on the first touch, returns when the photo changes */}
      <div
        className={`absolute inset-x-0 bottom-5 z-10 flex justify-center pointer-events-none transition-opacity duration-300 ${
          hintVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="flex items-center gap-3 bg-[#141517]/85 px-4 py-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-white">Prevuci</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Configurator() {
  const [activeOption, setActiveOption] = useState(0)
  const [resetSignal, setResetSignal] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const handleOptionClick = useCallback((index: number) => {
    if (index === activeOption) return
    setActiveOption(index)
    setResetSignal((s) => s + 1)
  }, [activeOption])

  const option = configOptions[activeOption]

  return (
    <section
      ref={sectionRef}
      id="pre-posle"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="section-alt absolute inset-0" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 60% 50%, var(--accent), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <SectionHeading title="Pre i posle" intro="Prevuci klizač i pogledaj razliku na pravim autima iz radionice." className="mb-12 md:mb-16" />

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-16">
          {/* Left panel */}
          <div className="lg:w-[300px] flex-shrink-0">
            <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible" role="group" aria-label="Izaberi primer">
              {configOptions.map((opt, index) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(index)}
                  aria-pressed={activeOption === index}
                  className={`press group shrink-0 text-left min-h-11 px-3.5 py-2.5 border lg:border-0 lg:px-5 lg:py-4 transition-[background-color,border-color,transform] duration-200 ${
                    activeOption === index ? "bg-background border-[var(--brand)]" : "border-border hover:bg-background/60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`hidden lg:block mt-1 w-[2px] rounded-full flex-shrink-0 transition-all duration-500 ${
                        activeOption === index
                          ? "h-5 bg-[var(--brand)]"
                          : "h-3 bg-border group-hover:bg-muted-foreground/50"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-[15px] lg:text-base font-semibold transition-colors duration-300 ${
                          activeOption === index
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </p>
                      <div
                        className="hidden lg:grid transition-all duration-500 ease-in-out"
                        style={{ gridTemplateRows: activeOption === index ? "1fr" : "0fr" }}
                      >
                        <p className="text-[15px] text-muted-foreground leading-relaxed overflow-hidden pt-1">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel — compare slider */}
          <div className="flex-1">
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
