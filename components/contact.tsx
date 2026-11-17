"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MapPin } from "lucide-react"
import { useBenskyVehicle } from "@/hooks/use-bensky-vehicle"
import { SectionHeading } from "@/components/section-heading"
import { PREFILL_SERVICE_EVENT, type ServiceValue } from "@/lib/prefill"
import { business, whatsappUrl } from "@/lib/site-config"

const schema = z.object({
  name: z.string().min(2, "Unesi ime i prezime"),
  phone: z.string().min(6, "Unesi broj telefona"),
  car: z.string().min(2, "Unesi model vozila"),
  service: z.string().min(1, "Izaberi uslugu"),
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
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  // Prefill from the chiptuning widget once a vehicle is selected
  useBenskyVehicle((vehicleName) => {
    setValue("car", vehicleName, { shouldValidate: true })
    setValue("service", "chiptuning", { shouldValidate: true })
  })

  // Prefill from "Pitaj za svoj auto" links on the service cards
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const service = (event as CustomEvent<ServiceValue>).detail
      setValue("service", service, { shouldValidate: true })
    }
    window.addEventListener(PREFILL_SERVICE_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_SERVICE_EVENT, onPrefill)
  }, [setValue])

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

    // Popup blockers (and iOS Safari after the async validation) can block
    // window.open — fall back to navigating in the same tab
    const url = whatsappUrl(text)
    const win = window.open(url, "_blank")
    if (!win) window.location.href = url
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-background border border-[var(--input)] px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 focus:[border-color:var(--brand)] focus:[box-shadow:0_0_0_1px_var(--brand-subtle)]"
  const errorClass = "text-sm text-[var(--destructive)] mt-1"
  const labelClass = "mb-1.5 block text-[15px] font-medium text-foreground"

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 md:py-32 overflow-hidden"
    >
      <div className="section-alt absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left — info */}
          <div
            className={`lg:w-2/5 transition-all duration-1000`}
          >
            <SectionHeading title="Zakaži termin" intro="Popuni formu i otvoriće se WhatsApp sa tvojim upitom. Javljamo se sa terminom i cenom." className="mb-6" />

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div>
                <p className="subhead mb-1">
                  Telefon
                </p>
                <a
                  href="tel:+381628727274"
                  className="inline-flex min-h-11 items-center text-2xl font-semibold text-foreground hover:text-[var(--brand)] transition-colors duration-300"
                >
                  062 872 7274
                </a>
              </div>

              {/* Instagram */}
              <div>
                <p className="subhead mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/dmv__garage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-2xl font-semibold text-foreground hover:text-[var(--brand)] transition-colors duration-300"
                >
                  @dmv__garage
                </a>
                <p className="mt-1 text-[15px] text-muted-foreground">4.4K+ pratilaca, radovi i novosti iz radionice</p>
              </div>

              {/* Address */}
              <div>
                <p className="subhead mb-1">
                  Adresa
                </p>
                <a
                  href="https://www.google.com/maps?q=44.85585268309917,20.3525775137743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground leading-relaxed hover:text-[var(--brand)] transition-colors duration-300 group inline-flex flex-col"
                >
                  Ugrinovački put 19. deo 31
                  <span className="text-muted-foreground group-hover:text-foreground/60 transition-colors duration-300">
                    Beograd 11080
                  </span>
                </a>
                <div className="mt-3">
                  <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary min-h-11 px-4 text-xs">
                    <MapPin size={15} aria-hidden="true" /> Otvori u Google Maps
                  </a>
                </div>
              </div>

              {/* Working hours */}
              <div>
                <p className="subhead mb-1">
                  Radno vreme
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  Pon – Pet: 09:00 – 18:00
                  <br />
                  Sub: 09:00 – 15:00
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`lg:w-3/5 w-full transition-all duration-1000 delay-200`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-foreground font-normal text-lg">Još jedan korak</p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Otvorili smo WhatsApp sa tvojom porukom — pritisni „Pošalji“ da potvrdiš termin. Ako se WhatsApp nije otvorio, pozovi nas na 062 872 7274.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 min-h-11 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Novi zahtev
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="f-name" className={labelClass}>Ime i prezime</label>
                    <input
                      {...register("name")}
                      id="f-name"
                      placeholder="npr. Marko Marković"
                      aria-describedby={errors.name ? "f-name-error" : undefined}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      className={inputClass}
                      suppressHydrationWarning
                    />
                    {errors.name && <p id="f-name-error" className={errorClass}>{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="f-phone" className={labelClass}>Broj telefona</label>
                    <input
                      {...register("phone")}
                      id="f-phone"
                      placeholder="06x xxx xxxx"
                      aria-describedby={errors.phone ? "f-phone-error" : undefined}
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={!!errors.phone}
                      type="tel"
                      className={inputClass}
                      suppressHydrationWarning
                    />
                    {errors.phone && <p id="f-phone-error" className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Car */}
                  <div>
                    <label htmlFor="f-car" className={labelClass}>Model vozila</label>
                    <input
                      {...register("car")}
                      id="f-car"
                      placeholder="npr. BMW 320d, 2015"
                      aria-describedby={errors.car ? "f-car-error" : undefined}
                      aria-invalid={!!errors.car}
                      className={inputClass}
                      suppressHydrationWarning
                    />
                    {errors.car && <p id="f-car-error" className={errorClass}>{errors.car.message}</p>}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="f-service" className={labelClass}>Usluga</label>
                    <select
                      {...register("service")}
                      id="f-service"
                      aria-describedby={errors.service ? "f-service-error" : undefined}
                      aria-invalid={!!errors.service}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      defaultValue=""
                      suppressHydrationWarning
                    >
                      <option value="" disabled className="bg-background">
                        Izaberi uslugu
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-background">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p id="f-service-error" className={errorClass}>{errors.service.message}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="f-message" className={labelClass}>Napomena <span className="text-muted-foreground">(opciono)</span></label>
                  <textarea
                    {...register("message")}
                    id="f-message"
                    placeholder="npr. želim Stage 1, ili koje LED svetlo"
                    rows={4}
                    className={`${inputClass} resize-none`}
                    suppressHydrationWarning
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Zakaži termin
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
