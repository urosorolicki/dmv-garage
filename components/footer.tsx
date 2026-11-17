export function Footer() {
  return (
    <footer className="relative py-8 border-t" style={{ borderTopColor: "var(--brand)", borderTopWidth: "1px" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-xs tracking-[0.1em]">
          {"© DMV Garage"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-0">
          <a
            href="https://www.google.com/maps?q=44.85585268309917,20.3525775137743"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-xs tracking-[0.05em] transition-colors duration-300 sm:min-h-0"
          >
            Ugrinovački put 19. deo 31, Beograd
          </a>
          <a
            href="tel:+381628727274"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-xs tracking-[0.05em] transition-colors duration-300 sm:min-h-0"
          >
            062 872 7274
          </a>
          <a
            href="https://instagram.com/dmv__garage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-xs tracking-[0.05em] transition-colors duration-300 sm:min-h-0"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-6 flex justify-center">
        <a
          href="https://foldnine.dev"
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
        >
          Sajt izradio <span className="font-semibold">Foldnine</span>
        </a>
      </div>
    </footer>
  )
}
