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
      <div className="absolute inset-0 bg-background" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title="Kako radimo" intro="Od prve poruke do gotovog auta, u četiri koraka." className="mb-12" />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative border-t border-border pt-6">
              <span className="signage mb-4 block text-[64px] text-[var(--brand)]" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold text-heading">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
