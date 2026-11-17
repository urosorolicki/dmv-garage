import { SectionHeading } from "@/components/section-heading"

// Facts come from the FAQ answers (archive of the original software, durations, restore time).
const steps = [
  { title: "Pošalji model vozila", text: "Preko forme ili WhatsApp-a: marka, model, godište i šta želiš da uradimo." },
  { title: "Arhiviramo originalni softver", text: "Pre svakog projekta čuvamo kopiju fabričkog softvera tvog vozila." },
  { title: "Radimo remap ili ugradnju", text: "Remap traje 2–4 sata, LED ugradnja 3–6 sati, zavisno od vozila." },
  { title: "Vraćamo fabričko po potrebi", text: "Povratak na originalne vrednosti traje 30–60 minuta, bez tragova." },
]

export function Process() {
  return (
    <section id="proces" className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-background glow-tl" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading kicker="Kako radimo" title="Od upita do gotovog auta" className="mb-12" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-xl border border-white/15 bg-card p-6">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] font-display text-lg font-extrabold italic text-[#0b1216]" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-heading">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
