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
| `--heading` | `#f4f4f2` | Naslovi (`text-heading`) |
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
| Male oznake iznad naslova | DM Mono | `.section-kicker` (sivo) |
| Oznake podgrupa u sekciji (Telefon, Adresa, Oprema…) | DM Mono | `.subhead` (narandžasto) |

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

Klase `.btn`, `.section-*` i `.subhead` su u `@layer components`, pa ih Tailwind klase mogu menjati (npr. `btn btn-primary hidden lg:inline-flex min-h-11`).

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
- Poštovati `prefers-reduced-motion`: bez pomeranja, zumiranja i pritiska, ostaju samo promene boje i providnosti.
- Poštovati `prefers-reduced-transparency` i `prefers-contrast: more`: `.material` postaje puna pozadina, ivice jače.

## 7. Pokret i interakcija (apple-design skill)
Pravila iz Apple-ovih WWDC predavanja o fluidnim interfejsima, primenjena na sajt.

- **Odgovor na pritisak, ne na puštanje.** Dugmad (`.btn`) i ikone (`.press`) se smanjuju na `scale(.97)` za 100 ms čim se pritisnu. Velike pločice (usluge, galerija) samo `scale(.98–.99)`.
- **Bez veštačkih kašnjenja.** Ništa se ne pojavljuje „posle 2 sekunde”; WhatsApp dugme je tu od prvog trenutka.
- **Prevlačenje prati prst 1:1.** Klizač pre/posle (`components/configurator.tsx`) koristi Pointer Events sa `setPointerCapture`, pamti gde je uhvaćen i ne skače na prst.
- **Svaka animacija može da se prekine.** Klizač animira oprugom (kritično prigušena, odziv 0,35 s) koja kreće od vrednosti koja je trenutno na ekranu, pa može da se uhvati usred kretanja.
- **Meke ivice.** Preko ivice klizač pruža otpor (rubber-band, najviše ~40 px), pa se oprugom vraća.
- **Isti put unutra i napolje.** Mobilni meni pada ispod trake i vraća se gore; lightbox se pojavljuje i nestaje istim fade/zoom-om.
- **Animira se samo `transform` i `opacity`.** Ne `width`, `max-height` ili `left`.
- **Providna traka umesto pune.** Navigacija i filteri galerije koriste `.material` (zamućenje + poluprovidna pozadina) i `.scroll-edge` (meka senka umesto linije od 1 px). Nikad dva providna sloja jedan na drugom.
- **Gde sam.** Navigacija označava sekciju koja je trenutno na ekranu (`aria-current="location"`).
- **Validacija odmah.** Forma proverava polje kad se napusti, ne tek na slanje.
- **Razmak slova prati veličinu.** Veliki naslovi `-.01em`, tekst `0`, sitne oznake `.01em` (`.subhead`, `.small-print`). Veličine u `rem`.
- Proveriti axe-core pre merge-a: 0 grešaka.

---

## Audit (17. 11. 2026, PR #7)

**Ocena: 90/100** (pre ispravki u PR #7: 72/100).

| Kategorija | Stanje |
|---|---|
| Boje | Sve boje u komponentama idu preko tokena (`bg-background`, `bg-card`, `bg-accent`, `text-heading`, `--brand`). Izuzeci: WhatsApp zelena i ikonica na klizaču pre/posle. Hero CSS u `globals.css` još ima nekoliko svojih vrednosti za mobilne oznake. |
| Tipografija | 3 fonta, jedan stil naslova, `.section-kicker` i `.subhead` za sve oznake. |
| Dugmad | `.btn` svuda, uključujući navigaciju i prikaz slike u galeriji. |
| Polja | Jedan stil, vidljive labele, greške povezane sa poljima. |
| Kod | Nekorišćene shadcn komponente i 40 paketa uklonjeni. |

Šta je ostalo:
1. Prebaciti boje mobilnih oznaka iz hero CSS-a (`.mobile-callout`, `.mobile-booking`) na tokene.
2. Razmaci slova (`tracking-[…]`) još imaju više vrednosti u starijim delovima; svesti na `.2em` za oznake i bez razmaka za tekst.
