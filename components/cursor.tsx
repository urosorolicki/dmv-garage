"use client"

import { useEffect, useRef } from "react"

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on devices with a real pointer (not touch)
    if (window.matchMedia("(hover: none)").matches) return

    document.documentElement.classList.add("custom-cursor-active")

    const state = {
      mouse: { x: -200, y: -200 },
      ring:  { x: -200, y: -200 },
      scale: 1,
      targetScale: 1,
    }

    const onMouseMove = (e: MouseEvent) => {
      state.mouse.x = e.clientX
      state.mouse.y = e.clientY

      const el = document.elementFromPoint(e.clientX, e.clientY)
      state.targetScale = el?.closest("a, button, [role='button'], input, select, textarea, label")
        ? 2
        : 1
    }

    let rafId: number
    const animate = () => {
      // Ring follows with spring lag
      state.ring.x += (state.mouse.x - state.ring.x) * 0.1
      state.ring.y += (state.mouse.y - state.ring.y) * 0.1
      // Scale lerps smoothly
      state.scale += (state.targetScale - state.scale) * 0.1

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${state.mouse.x}px, ${state.mouse.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${state.ring.x}px, ${state.ring.y}px) translate(-50%, -50%) scale(${state.scale})`
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove("custom-cursor-active")
    }
  }, [])

  return (
    <>
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-foreground pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground/50 pointer-events-none z-[9998]"
        style={{ willChange: "transform" }}
      />
    </>
  )
}
