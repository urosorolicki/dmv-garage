"use client"

import { cdnWidth } from "@/lib/gallery-data"
import { SectionHeading } from "@/components/section-heading"
import { requestService, type ServiceValue } from "@/lib/prefill"

const services = [
  {
    number: "01",
    value: "chiptuning" as ServiceValue,
    title: "Chiptuning",
    spec: "Stage 1–3, OBD i bench",
    // Prava fotka ECU-a iz galerije umesto AI rendera
    image: cdnWidth("IMG_0579", 1200),
  },
  {
    number: "02",
    value: "led" as ServiceValue,
    title: "LED ugradnja",
    spec: "Farovi, DRL, CANbus, garancija",
    image: "/images/led-after.jpg",
  },
  {
    number: "03",
    value: "elektronika" as ServiceValue,
    title: "Auto elektronika",
    spec: "Kodiranje, dijagnostika i servis",
    image: "/images/electronics-after-hd.jpg",
  },
  {
    number: "04",
    value: "enterijer" as ServiceValue,
    title: "Enterijer",
    spec: "Ambijentalno svetlo, tabla, materijali",
    image: "/images/interior-after.jpg",
  },
]

export function Services() {


  return (
    <section id="services" className="relative bg-background py-16 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="Usluge" intro="Četiri stvari radimo svaki dan. Za sve ostalo pitaj na WhatsApp." className="mb-12" />

        <div className="grid gap-1 md:grid-cols-2">
          {services.map((service) => (
            <a
              key={service.value}
              href="#contact"
              onClick={() => requestService(service.value)}
              aria-label={`${service.title}: pitaj za svoj auto`}
              className="group relative block aspect-[16/11] overflow-hidden bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] md:aspect-[16/10]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Name plate, like a number plate on the car */}
              <div className="absolute bottom-0 left-0 max-w-[85%] bg-background px-5 py-4 md:px-7 md:py-5">
                <h3 className="signage text-[32px] text-heading md:text-[40px]">{service.title}</h3>
                <p className="mt-1.5 text-[15px] text-muted-foreground">{service.spec}</p>
                <p className="mt-2 text-[15px] font-semibold text-[var(--brand)] group-hover:underline">Pitaj za svoj auto</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
