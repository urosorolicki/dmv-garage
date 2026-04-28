"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { label: "Početna", href: "#hero" },
  { label: "Konfigurator", href: "#configurator" },
  { label: "Usluge", href: "#services" },
  { label: "Galerija", href: "#gallery" },
  { label: "Kontakt", href: "#contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-[1440px] mx-auto">
        <a href="#hero" className="flex items-center gap-2">
          <img src="/logo.png" alt="DMV Garage logo" className="h-20 w-auto" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-muted-foreground hover:text-foreground text-sm tracking-[0.08em] uppercase transition-colors duration-300"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--brand)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm tracking-[0.06em] uppercase font-medium transition-all duration-300 hover:opacity-85"
          style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
        >
          Zakaži Termin
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
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
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 bg-background/95 backdrop-blur-xl border-b border-border/30">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-sm tracking-[0.08em] uppercase transition-colors duration-300 block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 text-sm tracking-[0.06em] uppercase font-medium w-full"
            style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
          >
            Zakaži Termin
          </a>
        </div>
      </div>
    </header>
  )
}
