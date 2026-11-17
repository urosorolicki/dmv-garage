// Decorative orange ticker between sections; echoes the /// mark in the logo.
const items = ["Chiptuning", "Stage 1–3", "LED ugradnja", "Auto elektronika", "Enterijer", "Kodiranje", "Dijagnostika"]

export function ServiceTicker() {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-5 font-display text-xl font-extrabold italic uppercase md:text-2xl">{item}</span>
          <span className="font-display text-xl font-extrabold italic opacity-60 md:text-2xl">///</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="orange-surface relative overflow-hidden py-3 md:py-4" aria-hidden="true">
      <div className="ticker-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}
