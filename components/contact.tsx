"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2, "Unesite ime i prezime"),
  phone: z.string().min(6, "Unesite broj telefona"),
  car: z.string().min(2, "Unesite model vozila"),
  service: z.string().min(1, "Izaberite uslugu"),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const serviceOptions = [
  { value: "led", label: "LED Ugradnja" },
  { value: "chiptuning", label: "ECU Chiptuning" },
  { value: "elektronika", label: "Auto Elektronika" },
  { value: "enterijer", label: "Enterijer" },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const onSubmit = (data: FormData) => {
    const serviceLabel =
      serviceOptions.find((s) => s.value === data.service)?.label ?? data.service
    const text = [
      `Zahtev za termin — DMV Garage`,
      `Ime: ${data.name}`,
      `Telefon: ${data.phone}`,
      `Vozilo: ${data.car}`,
      `Usluga: ${serviceLabel}`,
      data.message ? `Napomena: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n")

    window.open(`https://wa.me/381628727274?text=${encodeURIComponent(text)}`, "_blank")
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-transparent border border-border/60 rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors duration-200"
  const errorClass = "text-[11px] text-red-400/80 mt-1"

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left — info */}
          <div
            className={`lg:w-2/5 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground mb-6">
              Zakažite termin
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10">
              Popunite formu i kontaktiraćemo vas putem WhatsApp-a. Dostupni smo
              radnim danima 09–18h i subotom 09–15h.
            </p>

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Telefon
                </p>
                <a
                  href="tel:+381628727274"
                  className="text-xl font-sans font-light text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  062 872 7274
                </a>
              </div>

              {/* Instagram */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/dmv__garage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-sans font-light text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  @dmv__garage
                </a>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Adresa
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ugrinovački+put+19+Beograd+11080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/80 font-light leading-relaxed hover:text-foreground transition-colors duration-300 group inline-flex flex-col"
                >
                  Ugrinovački put 19. deo 31
                  <span className="text-muted-foreground group-hover:text-foreground/60 transition-colors duration-300">
                    Beograd 11080
                  </span>
                </a>
              </div>

              {/* Working hours */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Radno vreme
                </p>
                <p className="text-sm text-foreground/80 font-light leading-relaxed">
                  Pon – Pet: 09:00 – 18:00
                  <br />
                  Sub: 09:00 – 15:00
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`lg:w-3/5 w-full transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-foreground font-light text-lg">Zahtev poslat</p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  WhatsApp poruka je pripremljena. Kontaktiraćemo vas u najkraćem roku.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Novi zahtev
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Ime i prezime"
                      className={inputClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      {...register("phone")}
                      placeholder="Broj telefona"
                      type="tel"
                      className={inputClass}
                    />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Car */}
                  <div>
                    <input
                      {...register("car")}
                      placeholder="Model vozila (npr. BMW 320d)"
                      className={inputClass}
                    />
                    {errors.car && <p className={errorClass}>{errors.car.message}</p>}
                  </div>

                  {/* Service */}
                  <div>
                    <select
                      {...register("service")}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-background">
                        Izaberite uslugu
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-background">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className={errorClass}>{errors.service.message}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Napomena (opciono)"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-[0.1em] uppercase bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 rounded-sm w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Zakaži putem WhatsApp-a
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
