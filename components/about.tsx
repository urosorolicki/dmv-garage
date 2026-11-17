import { SectionHeading } from "@/components/section-heading"

const carBrands = [
  "BMW", "Audi", "Volkswagen", "Mercedes-Benz",
  "Škoda", "Seat", "Opel", "Hyundai", "Toyota", "Ford",
]

const equipment = [
  { name: "WinOLS 4",         desc: "ECU remap softver" },
  { name: "ECM Titanium",     desc: "Chiptuning platforma" },
  { name: "Launch X431 Pro",  desc: "Dijagnostika" },
  { name: "VCDS",             desc: "VAG dijagnostika" },
]

export function About() {
  return (
    <section id="about" className="section-alt relative py-16 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="max-w-[640px]">
            <SectionHeading title="Radionica u Zemunu" />
            <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
              DMV Garage radi chiptuning, LED ugradnju, auto elektroniku i enterijer na Ugrinovačkom putu.
              Za više od pet godina kroz radionicu je prošlo preko 300 vozila, a radove objavljujemo na
              Instagramu, gde nas prati više od 4.400 ljudi.
            </p>
            <p className="subhead mt-8">Marke sa kojima najčešće radimo</p>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              {carBrands.join(", ")} i većina drugih sa elektronskom kontrolom motora.
            </p>
          </div>

          <div>
            <p className="subhead mb-4">Oprema i softver</p>
            <ul className="divide-y divide-border border-y border-border">
              {equipment.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-6 py-4">
                  <span className="text-xl font-semibold text-heading">{item.name}</span>
                  <span className="text-right text-[15px] text-muted-foreground">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
