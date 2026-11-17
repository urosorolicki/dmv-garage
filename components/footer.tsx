export function Footer() {
  return (
    <footer className="relative border-t border-border py-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="DMV Garage" width={640} height={280} loading="lazy" className="h-12 w-auto" />
          <p className="text-muted-foreground text-sm">© DMV Garage</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-0">
          <a
            href="https://www.google.com/maps?q=44.85585268309917,20.3525775137743"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 sm:min-h-0"
          >
            Ugrinovački put 19. deo 31, Beograd
          </a>
          <a
            href="tel:+381628727274"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 sm:min-h-0"
          >
            062 872 7274
          </a>
          <a
            href="https://instagram.com/dmv__garage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 sm:min-h-0"
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
          className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-[13px] transition-colors duration-300"
        >
          Sajt izradio <span className="font-semibold">Foldnine</span>
        </a>
      </div>
    </footer>
  )
}
