import { CalendarDays, Gauge } from "lucide-react"

// The one bold moment of the page: the workshop photograph edge to edge and the
// headline set as workshop signage. Everything below it stays quiet.
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-background lg:flex lg:min-h-[100svh] lg:items-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/garage-dmv-hero.webp"
        alt="Crni Audi u DMV Garage radionici"
        width={1672}
        height={941}
        fetchPriority="high"
        className="hero-photo block aspect-[4/3.4] w-full object-cover object-[66%_50%] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:object-[62%_50%]"
      />
      {/* Darkens the photo only where the text sits */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/3.4] lg:inset-0 lg:aspect-auto"
        style={{ background: "linear-gradient(0deg, var(--background) 0%, rgb(20 21 23 / 0) 32%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: "linear-gradient(90deg, rgb(20 21 23 / .92) 0%, rgb(20 21 23 / .55) 42%, rgb(20 21 23 / 0) 70%), linear-gradient(0deg, rgb(20 21 23 / .95) 0%, rgb(20 21 23 / 0) 38%)" }}
        aria-hidden="true"
      />

      <div className="hero-enter relative z-10 mx-auto -mt-16 w-full max-w-[1440px] px-5 pb-12 sm:px-8 lg:mt-0 lg:px-12 lg:pb-20">
        <h1 id="hero-title" className="signage text-[clamp(56px,10.5vw,172px)] text-heading">
          Chiptuning<br />i LED ugradnja<br />
          <span className="text-[var(--brand)]">u Zemunu<span aria-hidden="true" className="ml-[.12em]">///</span></span>
        </h1>
        <p className="mt-7 max-w-[34rem] text-lg leading-[1.55] text-foreground md:text-xl">
          Stage 1–3 remap, LED farovi, ambijentalno svetlo, kodiranje i dijagnostika u radionici na Ugrinovačkom putu.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn btn-primary">
            <CalendarDays size={18} aria-hidden="true" /> Zakaži termin
          </a>
          <a href="#vehicle-lookup" className="btn btn-secondary">
            <Gauge size={18} aria-hidden="true" /> Izračunaj snagu
          </a>
        </div>
        <p className="mt-7 text-[15px] text-muted-foreground">
          <span className="whitespace-nowrap">Pon–pet 9–18,</span> <span className="whitespace-nowrap">subotom 9–15</span>
        </p>
      </div>
    </section>
  )
}
