import Link from "next/link"

// A link, not router.back(): visitors who land here from Google or a shared
// link have no on-site history, and back() would take them off the site.
export function BackButton() {
  return (
    <Link
      href="/#gallery"
      className="inline-flex items-center gap-2 -ml-2 px-2 py-2 text-muted-foreground text-xs tracking-[0.15em] uppercase hover:text-foreground transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Nazad
    </Link>
  )
}
