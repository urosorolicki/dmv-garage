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
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-border bg-background"
          : "border-transparent bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <nav className="garage-navigation flex items-center justify-between gap-4 px-6 lg:px-12 py-2 max-w-[1540px] mx-auto">
        <Link href="/" className="flex min-h-11 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="DMV Garage" width={640} height={280} className="h-11 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-foreground/90 hover:text-foreground text-[15px] transition-colors duration-300"
              >
                {link.label}
                <span
                  className="absolute -bottom-4 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--brand)" }}
                />
              </Link>
            </li>
          ))}
        </ul>

        <a href={`tel:${business.phone}`} className="hidden xl:inline-flex items-center gap-2 text-[15px] text-foreground/90 hover:text-foreground"><Phone size={16} aria-hidden="true" />{business.phoneDisplay}</a>
        <a
          href="/#contact"
          className="btn btn-primary hidden min-h-11 px-5 lg:inline-flex"
        >
          <CalendarDays size={17} aria-hidden="true" /> Zakaži termin
        </a>

        <a href="/#contact" className="mobile-booking" aria-label="Zakaži termin" title="Zakaži termin" onClick={() => setMenuOpen(false)}>
          <CalendarDays size={19} aria-hidden="true" />
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-3 -mr-2 min-w-11 min-h-11 items-center justify-center"
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

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          menuOpen ? "max-h-[calc(100dvh-60px)] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 bg-background border-b border-border">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground hover:text-[var(--brand)] text-lg transition-colors duration-300 block py-3"
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
