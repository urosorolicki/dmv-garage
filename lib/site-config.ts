// Single source for business details — used by metadata, JSON-LD and components
export const SITE_URL = "https://www.garagedmv.com"

export const business = {
  name: "DMV Garage",
  phone: "+381628727274",
  phoneDisplay: "062 872 7274",
  instagram: "https://instagram.com/dmv__garage",
  street: "Ugrinovački put 19. deo 31",
  city: "Beograd",
  postalCode: "11080",
  geo: { lat: 44.85585268309917, lng: 20.3525775137743 },
  mapsUrl: "https://www.google.com/maps?q=44.85585268309917,20.3525775137743",
}

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${business.phone.replace("+", "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`

export const OG_IMAGE =
  "https://res.cloudinary.com/dd9xjzu8c/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/dmv-garage/IMG_0654"
