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
    <div className="relative overflow-hidden py-4 border-y border-border/20 bg-secondary/10 select-none">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-[10px] tracking-[0.35em] uppercase text-muted-foreground/50"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
