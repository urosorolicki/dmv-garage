const items = [
  "Chiptuning",
  "LED Ugradnja",
  "Auto Elektronika",
  "ECU Remap",
  "Enterijer",
  "Dijagnostika",
  "WinOLS 4",
  "Launch X431",
]

// Quadruple for seamless infinite loop
const repeated = [...items, ...items, ...items, ...items]

export function Marquee() {
  return (
    <div className="relative overflow-hidden py-3 border-y select-none" style={{ borderColor: "var(--brand-dim)" }}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, oklch(0.08 0 0), transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, oklch(0.08 0 0), transparent)" }} />
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-[10px] tracking-[0.4em] uppercase font-mono"
            style={{ color: "oklch(0.52 0.006 65)" }}
          >
            {item}
            <span className="w-1 h-1 flex-shrink-0" style={{ background: "var(--brand)", opacity: 0.7 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
