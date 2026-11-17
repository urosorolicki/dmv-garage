// Server-only: reads the workshop's Instagram posts for the gallery.
// Never import this from a "use client" component — it reads the access token.
//
// Setup: README.md → "Instagram galerija". In short, set INSTAGRAM_ACCESS_TOKEN
// (a long-lived token from the "Instagram API with Instagram Login" for the
// @dmv__garage professional account). Without it, or if Instagram fails, the
// site falls back to the Cloudinary photos in lib/gallery-data.ts.

import { localGallery, localPreview, type Category, type GalleryImage } from "@/lib/gallery-data"

const API = "https://graph.instagram.com/v22.0"
const FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}"
const MAX_PAGES = 4 // 4 × 50 = up to 200 posts
const REVALIDATE = 3600 // seconds — new posts show up within an hour

interface IgChild {
  media_type: "IMAGE" | "VIDEO"
  media_url?: string
  thumbnail_url?: string
}

interface IgMedia {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
  children?: { data: IgChild[] }
}

interface IgPage {
  data: IgMedia[]
  paging?: { next?: string }
}

export interface Gallery {
  images: GalleryImage[]
  preview: GalleryImage[]
  source: "instagram" | "local"
}

const LOCAL: Gallery = { images: localGallery, preview: localPreview, source: "local" }

export async function getGallery(): Promise<Gallery> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return LOCAL

  keepTokenAlive(token)

  try {
    const posts: IgMedia[] = []
    let url: string | undefined =
      `${API}/me/media?fields=${encodeURIComponent(FIELDS)}&limit=50&access_token=${token}`

    for (let page = 0; url && page < MAX_PAGES; page++) {
      const res = await fetch(url, { next: { revalidate: REVALIDATE, tags: ["instagram"] } })
      if (!res.ok) throw new Error(`Instagram API ${res.status}: ${await res.text()}`)
      const json = (await res.json()) as IgPage
      posts.push(...json.data)
      url = json.paging?.next
    }

    const images = posts.map(toGalleryImage).filter((x): x is GalleryImage => x !== null)
    if (images.length === 0) return LOCAL
    return { images, preview: images.slice(0, 9), source: "instagram" }
  } catch (err) {
    console.error("[instagram] falling back to local gallery:", err)
    return LOCAL
  }
}

// Long-lived tokens expire after 60 days unless refreshed. Refreshing is allowed
// once the token is 24 h old and extends it to 60 days from now. The fetch is
// cached for a day, so this runs at most once a day while the site gets traffic.
function keepTokenAlive(token: string) {
  fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`, {
    next: { revalidate: 86400, tags: ["instagram-refresh"] },
  }).catch(() => {})
}

function toGalleryImage(post: IgMedia): GalleryImage | null {
  // Cover image: the photo itself, a video's thumbnail, or a carousel's first item
  const first = post.children?.data[0]
  const src =
    post.media_type === "VIDEO"
      ? post.thumbnail_url
      : post.media_type === "CAROUSEL_ALBUM" && first
        ? first.media_type === "VIDEO" ? first.thumbnail_url : first.media_url
        : post.media_url
  if (!src) return null

  const caption = cleanCaption(post.caption ?? "")
  const title = titleFrom(caption)
  // The lightbox shows the title, then this — so skip the line already used as the title
  const rest = title.endsWith("…") ? caption : caption.replace(/^\s*.*(\n|$)/, "").trim()
  return {
    id: post.id,
    alt: title,
    caption: rest || undefined,
    category: categorize(post.caption ?? ""),
    thumb: src,
    full: src,
    permalink: post.permalink,
    isVideo: post.media_type === "VIDEO" || (post.media_type === "CAROUSEL_ALBUM" && first?.media_type === "VIDEO"),
  }
}

/** Drops the trailing block of hashtags most posts end with */
function cleanCaption(caption: string) {
  return caption
    .split("\n")
    .filter((line) => !/^\s*([#@][\p{L}\p{N}_.]+\s*)+$/u.test(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

/** First line of the caption, without hashtags, cut at a word boundary */
function titleFrom(caption: string) {
  const line = (caption.split("\n").find((l) => l.trim()) ?? "")
    .replace(/#[\p{L}\p{N}_]+/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim()
  if (!line) return "Rad iz DMV Garage radionice"
  if (line.length <= 90) return line
  return line.slice(0, 90).replace(/\s+\S*$/, "") + "…"
}

// Keyword → category. First match wins, so the more specific services come first.
// Posts that match nothing still show under "Sve".
const RULES: [Exclude<Category, "Sve">, RegExp][] = [
  ["Chiptuning", /chip|remap|stage ?[12]|\becu\b|tuning|\b\d{2,3} ?(ks|hp|nm)\b|dpf|egr|adblue/],
  ["Elektronika", /android|multimedij|carplay|radio|navigacij|kamer|dijagnost|ekran|displej|elektronik|kodiranj/],
  ["Enterijer", /ambijent|enterijer|interijer|interior|kozn|koza|volan|plafon|zvezdano|starlight|presvlac/],
  ["LED", /\bled\b|instrument|tabl|cluster|kilometar|sat(ov)?\b|farov|stop svetl|svetl|sijalic|xenon|angel/],
]

function categorize(caption: string): Exclude<Category, "Sve"> | null {
  const text = caption
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "dj")
  for (const [cat, re] of RULES) if (re.test(text)) return cat
  return null
}
