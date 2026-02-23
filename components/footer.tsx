export function Footer() {
  return (
    <footer className="relative py-8 border-t border-border/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground/50 text-xs tracking-[0.1em]">
          {"© DMV Garage"}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="tel:+381628727274"
            className="text-muted-foreground/50 hover:text-muted-foreground text-xs tracking-[0.05em] transition-colors duration-300"
          >
            062 872 7274
          </a>
          <a
            href="https://instagram.com/dmv__garage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-muted-foreground text-xs tracking-[0.05em] transition-colors duration-300"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
