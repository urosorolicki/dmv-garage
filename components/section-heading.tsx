type SectionHeadingProps = {
  title: string
  intro?: string
  id?: string
  as?: "h1" | "h2"
  size?: "default" | "sm"
  className?: string
}

// Section heading in signage type, with an optional one-line intro. No eyebrow label.
export function SectionHeading({ title, intro, id, as: Tag = "h2", size = "default", className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Tag id={id} className={`section-title${size === "sm" ? " section-title-sm" : ""}`}>{title}</Tag>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}
