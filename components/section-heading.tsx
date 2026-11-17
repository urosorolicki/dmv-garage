type SectionHeadingProps = {
  kicker: string
  title: string
  id?: string
  as?: "h1" | "h2"
  size?: "default" | "sm"
  className?: string
}

// One heading treatment for every section, matching the hero.
export function SectionHeading({ kicker, title, id, as: Tag = "h2", size = "default", className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <span className="mb-3 block h-[3px] w-12 bg-[var(--brand)]" aria-hidden="true" />
      <p className="section-kicker">{kicker}</p>
      <Tag id={id} className={`section-title${size === "sm" ? " section-title-sm" : ""}`}>{title}</Tag>
    </div>
  )
}
