// Gallery data. The site shows the Instagram feed when INSTAGRAM_ACCESS_TOKEN is
// set (see lib/instagram.ts); the Cloudinary photos below are the fallback.
// This file is imported by client components, so it must not touch the token.

export const CDN = "https://res.cloudinary.com/dd9xjzu8c/image/upload"
export const cdnThumb = (id: string) => `${CDN}/q_auto,f_auto,w_800/dmv-garage/${id}`
export const cdnFull = (id: string) => `${CDN}/q_auto,f_auto,w_1920/dmv-garage/${id}`
export const cdnWidth = (id: string, w: number) => `${CDN}/q_auto,f_auto,w_${w}/dmv-garage/${id}`
// Responsive srcset — next/image runs with `unoptimized`, so Cloudinary does the resizing
export const cdnSrcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${cdnWidth(id, w)} ${w}w`).join(", ")

export type Category = "Sve" | "LED" | "Chiptuning" | "Enterijer" | "Elektronika"
export const categories: Category[] = ["Sve", "LED", "Chiptuning", "Enterijer", "Elektronika"]

export interface GalleryImage {
  id: string
  /** Short title — tile overlay, lightbox heading, alt text */
  alt: string
  /** Full description (Instagram caption); falls back to alt */
  caption?: string
  /** null = shows only under "Sve" */
  category: Exclude<Category, "Sve"> | null
  thumb: string
  thumbSrcSet?: string
  full: string
  fullSrcSet?: string
  /** Link to the Instagram post */
  permalink?: string
  isVideo?: boolean
}

type LocalImage = { id: string; alt: string; category: Exclude<Category, "Sve"> }

const localImages: LocalImage[] = [
  // LED
  { id: "IMG_0056", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_0116", alt: "Instrument tabla – zeleni LED", category: "LED" },
  { id: "IMG_0432", alt: "Noćni enterijer – LED dashboard", category: "LED" },
  { id: "IMG_0654", alt: "Instrument tabla – crveni/plavi LED", category: "LED" },
  { id: "IMG_0881", alt: "Instrument tabla – narandžasti LED", category: "LED" },
  { id: "IMG_0884", alt: "Instrument tabla – ljubičasti LED", category: "LED" },
  { id: "IMG_0919", alt: "Instrument tabla – crveni LED", category: "LED" },
  { id: "IMG_0925", alt: "Instrument tabla – plave igle", category: "LED" },
  { id: "IMG_0947", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_0971", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1075", alt: "Plavi LED – paddles i instrument tabla", category: "LED" },
  { id: "IMG_1078", alt: "Plavi LED paddles – noću", category: "LED" },
  { id: "IMG_1302", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1342", alt: "Instrument tabla – zeleni LED", category: "LED" },
  { id: "IMG_1504", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1507", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1540", alt: "Radio – plavi LED", category: "LED" },
  { id: "IMG_1544", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1609", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1623", alt: "Instrument tabla – beli/plavi LED", category: "LED" },
  { id: "IMG_1624", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1654", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_1671", alt: "Instrument tabla – crveni LED", category: "LED" },
  { id: "IMG_5939", alt: "Instrument tabla – zeleni LED", category: "LED" },
  { id: "IMG_6040", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_6093", alt: "Instrument tabla – narandžasti LED", category: "LED" },
  { id: "IMG_6096", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_6252", alt: "Enterijer – crveni LED", category: "LED" },
  { id: "IMG_6311", alt: "Instrument tabla – beli LED", category: "LED" },
  { id: "IMG_6349", alt: "Enterijer – crveni/plavi LED", category: "LED" },
  { id: "IMG_6459", alt: "Instrument tabla – ljubičasti LED", category: "LED" },
  { id: "IMG_6573", alt: "Instrument tabla – narandžasti LED", category: "LED" },
  { id: "IMG_6579", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_6612", alt: "Instrument tabla – beli LED", category: "LED" },
  { id: "IMG_6758", alt: "Instrument tabla – beli LED", category: "LED" },
  { id: "IMG_6762", alt: "Instrument tabla – crveni/plavi LED", category: "LED" },
  { id: "IMG_6876", alt: "Instrument tabla – narandžasti LED", category: "LED" },
  { id: "IMG_6877", alt: "Instrument tabla – beli LED", category: "LED" },
  { id: "IMG_7168", alt: "Instrument tabla – crveni LED", category: "LED" },
  { id: "IMG_7773", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_7776", alt: "Instrument tabla – narandžasti LED", category: "LED" },
  { id: "IMG_7777", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_8122", alt: "Stop svetlo – LED ring crveni", category: "LED" },
  { id: "IMG_8123", alt: "Stop svetlo – LED ring narandžasti", category: "LED" },
  { id: "IMG_8163", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "IMG_8360", alt: "Klima + radio – plavi LED", category: "LED" },
  { id: "IMG_9868", alt: "Instrument tabla – plavi LED", category: "LED" },
  { id: "04C8C134-1382-4848-A3D2-D9467CD25DA9", alt: "Stop svetlo – LED", category: "LED" },
  // Enterijer
  { id: "IMG_1541", alt: "Enterijer – plavi LED", category: "Enterijer" },
  { id: "IMG_5947", alt: "Ambijentalno osvetljenje – plavo", category: "Enterijer" },
  { id: "IMG_5952", alt: "Enterijer – plavi ambijent", category: "Enterijer" },
  { id: "IMG_6306", alt: "Enterijer – crveni LED", category: "Enterijer" },
  { id: "IMG_6308", alt: "Klima – LED", category: "Enterijer" },
  { id: "IMG_7778", alt: "Ambijentalno osvetljenje + ekran", category: "Enterijer" },
  { id: "IMG_8358", alt: "Ambijentalno osvetljenje – plavo", category: "Enterijer" },
  { id: "IMG_8361", alt: "Enterijer – noćna vožnja", category: "Enterijer" },
  { id: "IMG_8364", alt: "Volan i ambijentalno osvetljenje", category: "Enterijer" },
  { id: "f5804bcc-0dc9-46a6-aff1-0c4293fb44f5", alt: "Android multimedija + LED", category: "Enterijer" },
  // Elektronika
  { id: "IMG_0051", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_0113", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_0433", alt: "Android multimedija ugradnja", category: "Elektronika" },
  { id: "IMG_0579", alt: "ECU – motorna komora", category: "Elektronika" },
  { id: "IMG_0946", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_0967", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1124", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1300", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1341", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1515", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1516", alt: "Radio – originalni", category: "Elektronika" },
  { id: "IMG_1517", alt: "Radio – plavi LED", category: "Elektronika" },
  { id: "IMG_1533", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1650", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_1670", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_5920", alt: "Android ekran", category: "Elektronika" },
  { id: "IMG_5921", alt: "Fabrički enterijer, pre ugradnje", category: "Elektronika" },
  { id: "IMG_5922", alt: "Android multimedija ugradnja", category: "Elektronika" },
  { id: "IMG_5937", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_6034", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_6454", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_6650", alt: "Fabrička navigacija", category: "Elektronika" },
  { id: "IMG_6755", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_6759", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_6760", alt: "Radio ugradnja – dnevni prikaz", category: "Elektronika" },
  { id: "IMG_6763", alt: "Radio ugradnja – noćni prikaz", category: "Elektronika" },
  { id: "IMG_7164", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_7634", alt: "Servis instrument ploče", category: "Elektronika" },
  { id: "IMG_8159", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_9860", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "IMG_9922", alt: "Instrument tabla – dijagnostika", category: "Elektronika" },
  { id: "copy_44830833-4CDA-456D-AF05-70F5666CC2F1", alt: "Elektronika – servis", category: "Elektronika" },
  // Chiptuning
  { id: "gallery-2", alt: "Chiptuning remap", category: "Chiptuning" },
  { id: "gallery-6", alt: "ECU remap rezultat", category: "Chiptuning" },
  { id: "chiptuning-after", alt: "Chiptuning – rezultat", category: "Chiptuning" },
  { id: "chiptuning-before", alt: "Chiptuning – pre", category: "Chiptuning" },
]

export const localGallery: GalleryImage[] = localImages.map((img) => ({
  ...img,
  thumb: cdnThumb(img.id),
  thumbSrcSet: cdnSrcSet(img.id, [400, 600, 800, 1200]),
  full: cdnWidth(img.id, 1600),
  fullSrcSet: cdnSrcSet(img.id, [800, 1200, 1600, 2400]),
}))

// Evenly spread categories across the "Sve" view so the grid shows variety
// instead of all LED clusters first and chiptuning shots last. Each category's
// items are distributed proportionally across [0,1] and merged by position —
// deterministic (no shuffle), so SSR and client render identically.
// Instagram items keep their date order (newest first).
export function spreadEvenly(images: GalleryImage[]) {
  const counts = new Map<string, number>()
  for (const img of images) counts.set(img.category ?? "", (counts.get(img.category ?? "") ?? 0) + 1)

  const seen = new Map<string, number>()
  return images
    .map((img, i) => {
      const key = img.category ?? ""
      const idx = seen.get(key) ?? 0
      seen.set(key, idx + 1)
      const total = counts.get(key) ?? 1
      return { img, pos: (idx + 0.5) / total, i }
    })
    .sort((a, b) => a.pos - b.pos || a.i - b.i)
    .map((x) => x.img)
}

const PREVIEW_IDS = [
  "IMG_0654", "IMG_7777", "IMG_8358", "IMG_5920", "IMG_6252",
  "chiptuning-after", "IMG_7778", "IMG_6650", "IMG_6877",
]

const _byId = new Map(localGallery.map((img) => [img.id, img]))
export const localPreview = PREVIEW_IDS.map((id) => _byId.get(id)).filter(Boolean) as GalleryImage[]
