"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const navLinks = [
  { label: "Početna", href: "/#hero" },
  { label: "Usluge", href: "/#services" },
  { label: "Konfigurator", href: "/#vehicle-lookup" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/15 transition-all duration-300 ${
        scrolled
          ? "bg-[#061017]/95 backdrop-blur-xl"
          : "bg-[#061017]/85 backdrop-blur-md"
      }`}
    >
      <nav className="flex items-center justify-between gap-4 px-6 lg:px-12 py-2.5 max-w-[1540px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="DMV Garage" width={112} height={56} className="h-10 md:h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-muted-foreground hover:text-foreground text-sm tracking-[0.08em] uppercase transition-colors duration-300"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--brand)" }}
                />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden lg:inline-flex items-center justify-center rounded-[4px] px-5 py-2.5 text-sm tracking-[0.04em] font-semibold transition-opacity hover:opacity-85"
          style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
        >
          Zakaži Termin
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
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 bg-background/95 backdrop-blur-xl border-b border-border/30">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-sm tracking-[0.08em] uppercase transition-colors duration-300 block py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm tracking-[0.06em] uppercase font-medium w-full"
            style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
          >
            Zakaži Termin
          </a>
        </div>
      </div>
    </header>
  )
}
