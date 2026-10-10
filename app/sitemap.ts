import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/galerija`, changeFrequency: "weekly", priority: 0.7 },
  ]
}
