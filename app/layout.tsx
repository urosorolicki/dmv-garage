import type { Metadata, Viewport } from 'next'
import { Barlow, Bebas_Neue, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { business, OG_IMAGE, SITE_URL } from '@/lib/site-config'

const _barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
})

const _bebas = Bebas_Neue({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-bebas',
})

const _dmMono = DM_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

const description =
  'Chiptuning u Beogradu: ECU remap Stage 1–3, LED ugradnja, auto elektronika i enterijer po meri. DMV Garage, Ugrinovački put 19. deo 31. Pozovite 062 872 7274.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Chiptuning Beograd — ECU remap & LED ugradnja | DMV Garage',
    template: '%s | DMV Garage Beograd',
  },
  description,
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    siteName: 'DMV Garage',
    url: '/',
    title: 'DMV Garage — Chiptuning & LED ugradnja Beograd',
    description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'DMV Garage — radovi iz radionice' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#141414',
}

// Local business data for Google (map pack, knowledge panel)
const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': `${SITE_URL}/#business`,
  name: business.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: OG_IMAGE,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: business.city,
    postalCode: business.postalCode,
    addressCountry: 'RS',
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.mapsUrl,
  areaServed: { '@type': 'City', name: 'Beograd' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '15:00' },
  ],
  sameAs: [business.instagram],
  makesOffer: ['ECU chiptuning (Stage 1–3)', 'LED ugradnja', 'Auto elektronika', 'Enterijer po meri'].map((name) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name, areaServed: 'Beograd' },
  })),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" data-scroll-behavior="smooth">
      <body className={`${_barlow.variable} ${_bebas.variable} ${_dmMono.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
