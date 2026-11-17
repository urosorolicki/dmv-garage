"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarDays, Phone } from "lucide-react"
import { business } from "@/lib/site-config"

// Logo links home, so no separate "Početna" item.
const navLinks = [
  { label: "Chiptuning", href: "/#vehicle-lookup" },
  { label: "Usluge", href: "/#services" },
  { label: "Pre i posle", href: "/#pre-posle" },
  { label: "Galerija", href: "/#gallery" },
  { label: "O nama", href: "/#about" },
  { label: "Kontakt", href: "/#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)

  // Wayfinding: mark the section currently in view, so the bar answers "where am I"
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.split("#")[1]))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`/#${entry.target.id}`)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || menuOpen ? "material scroll-edge" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <nav className="garage-navigation flex items-center justify-between gap-4 px-6 lg:px-12 py-2 max-w-[1540px] mx-auto">
        <Link href="/" className="flex min-h-11 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="DMV Garage" width={640} height={280} className="h-11 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = activeHref === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "location" : undefined}
                  className={`group relative inline-flex min-h-11 items-center text-[0.9375rem] transition-colors duration-200 ${
                    active ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {/* Underline grows from the left with a transform, not a width animation */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1.5 left-0 h-[2px] w-full origin-left transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ background: "var(--brand)" }}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <a href={`tel:${business.phone}`} className="hidden xl:inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-foreground/90 hover:text-foreground"><Phone size={16} aria-hidden="true" />{business.phoneDisplay}</a>
        <a
          href="/#contact"
          className="btn btn-primary hidden min-h-11 px-5 lg:inline-flex"
        >
          <CalendarDays size={17} aria-hidden="true" /> Zakaži termin
        </a>

        <a href="/#contact" className="mobile-booking press" aria-label="Zakaži termin" title="Zakaži termin" onClick={() => setMenuOpen(false)}>
          <CalendarDays size={19} aria-hidden="true" />
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="press lg:hidden flex flex-col gap-1.5 p-3 -mr-2 min-w-11 min-h-11 items-center justify-center"
          aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span
            className={`w-6 h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Dims the page behind the open menu; tapping it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`lg:hidden fixed inset-x-0 top-full bottom-0 h-[100dvh] bg-black/55 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile menu: drops down from the bar and goes back up the same way.
          Only transform and opacity animate, and a CSS transition retargets
          from wherever it is, so tapping again mid-way reverses smoothly. */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-60px)] overflow-y-auto origin-top transition-[transform,opacity,visibility] duration-300 ease-out motion-reduce:transition-opacity ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0 motion-reduce:translate-y-0"
        }`}
      >
        {/* Solid, not a second translucent layer stacked on the bar */}
        <div className="scroll-edge bg-background px-6 pb-6 pt-2">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeHref === link.href ? "location" : undefined}
                  className={`block py-3 text-lg transition-colors duration-200 hover:text-[var(--brand)] ${
                    activeHref === link.href ? "text-[var(--brand)]" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary mt-4 w-full"
          >
            <CalendarDays size={17} aria-hidden="true" /> Zakaži termin
          </a>
        </div>
      </div>
    </header>
  )
}
