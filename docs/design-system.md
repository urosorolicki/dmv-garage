# Garage DMV — dizajn sistem

Pravila po kojima je napravljen sajt. Kad se dodaje nova sekcija ili menja postojeća, prati ovo, pa će sajt ostati dosledan.

Izvor istine u kodu:
- tokeni i klase: `app/globals.css`
- fontovi: `app/layout.tsx`
- naslov sekcije: `components/section-heading.tsx`
- podaci o firmi (telefon, adresa, WhatsApp): `lib/site-config.ts`

---

## 1. Boje

| Token | Vrednost | Za šta |
|---|---|---|
| `--background` | `#061017` | Pozadina svih sekcija (tamnoplava „radionica”) |
| `--card` / `--popover` | `#0a1820` | Kartice, polja forme, FAQ kartica |
| `--secondary` / `--muted` | `#0f2029` | Hover i blage podloge |
| `--accent` | `#152a35` | Jači hover |
| `--border` | `#1d3340` | Tanke linije između elemenata (dekorativno) |
| `--foreground` | `oklch(0.92 0.006 65)` | Glavni tekst |
| `--muted-foreground` | `oklch(0.68 0.006 65)` | Sporedni tekst (kontrast ≥ 4.5:1 na pozadini) |
| `--brand` | `#ff8a00` | **Jedina** narandžasta: primarna dugmad, crte, akcenti |
| `--brand-bright` | `#ffa52c` | Hover primarnog dugmeta |
| `--cool-accent` | `#00d9f5` | Cijan — **samo** za LED/svetla |
| WhatsApp zelena | `#25D366` | Samo plutajuće WhatsApp dugme |

Pravila:
- Ne uvoditi novu narandžastu ili novu tamnu pozadinu. Ako treba nova nijansa, dodaj je kao token u `:root`.
- Ivice **interaktivnih** elemenata (polja, sekundarna dugmad) moraju imati kontrast ≥ 3:1. Na `#061017` to je najmanje `white/40`. Token `--border` je samo za dekoraciju.
- U SVG-u boja ide preko `style={{ fill: "var(--brand)" }}` jer atributi `fill="var(...)"` ne rade pouzdano.

## 2. Tipografija

Fontovi se učitavaju samo u `app/layout.tsx`. Ne dodavati nove.

| Uloga | Font | Kako |
|---|---|---|
| Naslovi (hero, sekcije, brojke) | Barlow 800 *italic*, verzal | `.section-title`, `#hero-title`, ili `font-display font-extrabold italic` |
| Tekst | Barlow 300–600 | podrazumevano (`font-sans`) |
| Male oznake iznad naslova, tehnički podaci | DM Mono | `.section-kicker`, `font-mono` |

Veličine:
- Naslov sekcije: `clamp(1.9rem, 4.2vw, 3.4rem)` (`.section-title`), manji u karticama: `.section-title-sm`
- Tekst: 14–16 px (`text-sm` / `text-base`), uvod sekcije do `text-xl`
- Oznake: 11 px, razmak slova `.2em`

Napomena: oba Barlow fonta imaju isto ime porodice. Element dobija debeo kurziv **samo** ako traži težinu 800 i kurziv (`font-extrabold italic`), inače dobija obični Barlow.

## 3. Komponente

### Naslov sekcije — `SectionHeading`
Narandžasta crta, mala oznaka, veliki kurzivni naslov. **Svaka** sekcija počinje ovim.

```tsx
<SectionHeading kicker="Šta nudimo" title="Usluge" />
<SectionHeading as="h1" kicker="Portfolio" title="Galerija radova" />   // naslov stranice
<SectionHeading kicker="Kontakt" title="Zakaži termin" size="sm" />    // u kartici
```

| Prop | Tip | Podrazumevano | Opis |
|---|---|---|---|
| `kicker` | string | — | Kratka oznaka iznad (1–3 reči) |
| `title` | string | — | Naslov, kratak (prikazuje se verzalom) |
| `as` | `"h1" \| "h2"` | `"h2"` | `h1` samo jednom po stranici |
| `size` | `"default" \| "sm"` | `"default"` | `sm` za naslove u karticama |
| `id` | string | — | Za `aria-labelledby` sekcije |

### Dugmad — `.btn`
| Varijanta | Klasa | Kada |
|---|---|---|
| Primarno | `btn btn-primary` | Glavna akcija u sekciji (jedna po bloku): zakazivanje, WhatsApp, „Proveri snagu” |
| Sekundarno | `btn btn-secondary` | Sporedna akcija: „Pogledaj radove”, „Pozovi”, „Otvori u Google Maps” |
| Tekst-link | narandžasti tekst + `→`, `min-h-11` | Akcija unutar kartice: „Pitaj za svoj auto” |

Stanja: visina 48 px (najmanje 44), hover posvetljuje, fokus = bela linija 2 px. Ikonica ide **ispred** teksta, 16–18 px, `aria-hidden`.

Ne raditi: verzal sa razmaknutim slovima na dugmadi, oštre ivice bez radijusa, ručno pisani `style={{ background: "var(--brand)" }}` umesto klase.

### Polja forme
- Vidljiv `<label>` iznad polja (`text-xs text-white/75`). Placeholder je **primer** („npr. BMW 320d, 2015”), ne naziv polja.
- Polje: `rounded-[5px] bg-[#0a1820] border border-white/40`, fokus = narandžasta ivica.
- Greška: crveni tekst ispod, sa `id` koji je povezan preko `aria-describedby` i `aria-invalid`.
- Validacija je u `zod` šemi u `components/contact.tsx`; poruke u „ti” obliku („Unesi model vozila”).

### Kartice
- Velike kartice (kalkulator, FAQ CTA): `rounded-xl border border-white/20 bg-[#0a1820]`, narandžasta crta gore levo.
- Prečice u hero-u: `rounded-[12px]`, ikonica + naziv + opis.
- Kartice usluga: slika 4:3, naziv, opis, tekst-link „Pitaj za svoj auto”.

### Preuzimanje podataka u formu
- Izbor vozila u Bensky kalkulatoru automatski popunjava „Model vozila” i uslugu Chiptuning (`useBenskyVehicle`).
- Svaki link „pitaj za ovu uslugu” poziva `requestService("led" | "chiptuning" | "elektronika" | "enterijer")` iz `lib/prefill.ts` i vodi na `#contact`.

## 4. Raspored i razmaci
- Širina sadržaja: `max-w-[1440px]` (hero `1540px`), bočni razmak `px-6 lg:px-12` (hero `px-5 sm:px-8 lg:px-12`).
- Vertikalni razmak sekcija: `py-24 md:py-32`.
- Prelomne tačke: mobilni < 640, tablet 640–1023, desktop ≥ 1024 (meni prelazi u hamburger ispod 1024).
- Fiksni header je visok 73–81 px; skok na sekciju ima `scroll-padding-top: 6rem`.

## 5. Tekst i ton
- Obraćanje posetiocu na **„ti”** svuda (naslovi, dugmad, forma, FAQ). Izuzetak: meta opis za Google.
- Dugmad počinju glagolom i kažu šta se desi: „Pošalji upit na WhatsApp”, ne „Pošalji”.
- Bez izmišljenih brojki, recenzija i obećanja. Recenzije samo prave, sa Google profila.

## 6. Pristupačnost (minimum)
- Sve na šta se tapka: najmanje 44×44 px.
- Vidljiv fokus na svemu interaktivnom.
- Ništa skriveno ne sme biti dostupno tastaturom (skriveni blokovi dobijaju `inert`).
- Slike koje nose sadržaj imaju `alt`, dekorativne `alt=""` / `aria-hidden`.
- Poštovati `prefers-reduced-motion` (bez animacija).
- Proveriti axe-core pre merge-a: 0 grešaka.

---

## Audit (17. 11. 2026, PR #7)

**Ocena: 72/100.** Glavni tokeni i komponente postoje i koriste se na celoj početnoj stranici, ali ostaje dosta ručno upisanih vrednosti iz starijih delova.

| Kategorija | Stanje | Šta je ostalo |
|---|---|---|
| Boje | Tokeni definisani, jedna narandžasta | ~20 ručnih hex vrednosti (najviše u `hero.tsx` i `vehicle-lookup.tsx`); 6 komponenti i dalje koristi `style={{ … var(--brand) }}` umesto klasa |
| Tipografija | 3 fonta, jedan stil naslova | 7 starih oznaka (`tracking-[0.3em]/[0.4em] uppercase`) u „O nama” i kontaktu ne koristi `.section-kicker`; 10 različitih vrednosti razmaka slova |
| Dugmad | `.btn` u svim glavnim akcijama | Navbar „Zakaži termin” i dugme u lightbox-u galerije još imaju svoj stil |
| Polja | Jedan stil, labele, greške | — |
| Kod | — | 57 shadcn komponenti u `components/ui/` se **ne koristi nigde** |

Prioriteti:
1. Zameniti ručne hex vrednosti u `hero.tsx` i `vehicle-lookup.tsx` tokenima (`--background`, `--card`).
2. Prebaciti preostale oznake i navbar/lightbox dugmad na `.section-kicker` i `.btn`.
3. Obrisati nekorišćene `components/ui/*` i njihove pakete (Radix i sl.), posle provere da ih ne koristi ni `/galerija`.
