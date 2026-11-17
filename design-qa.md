# Garage DMV visual QA — 17 November 2026

final result: blocked

## Evidence and comparison scope
Source: user-provided 1280×720 approved layout and separate original car photo in conversation. Attachments are visible in conversation but have no local file paths. No invented source image or AI regeneration used.
Before: /workspace/artifacts/shared-before-1440.png, live Vercel branch preview opened with user-provided share access in headless Chromium. Full-page 1440 CSS px capture; only first-screen region compared.
After: /workspace/artifacts/after-1440.png (1440×900, DPR 1) and /workspace/artifacts/after-mobile.png (390×844, DPR 1), local production build rendered in Chromium. Reference desktop proportions interpreted at 1.125×; no approved mobile reference exists.
Cloud browser tool itself fails with "the gaas-browser node_repl sandbox cannot be disabled". Headless Chromium is the fallback, not successful cloud browser verification. A combined source/capture artifact could not be created from the attachment, so formal design-QA gate remains blocked.

## Corrections after inspecting the live preview and reference
- Typography: broad Arial bold italic hero heading instead of condensed Barlow fallback; reduced desktop heading scale and tracking. Existing body fonts retained.
- Layout: desktop service strip now begins at 512 px at 1440 width; configurator starts near 634 px. Hero height reduced; four service cards keep desktop columns and mobile two-column layout.
- Palette: scoped brighter orange and cyan accents, cyan highlighted LED card. No changes to Bensky theme parameters.
- Assets: supplied car photograph already exists as garage-dmv-hero.webp; preserved, adjusted crop for desktop and mobile. No new AI assets. Readable Garage DMV typographic wordmark replaces tiny padded logo.
- Navigation: readable mixed-case text, initial home underline, real configured telephone number and calendar icon. Menu close and configurator anchor tested.
- Hotspots: performance CPU icon, adjusted callout positions and light marker, links remain focusable and tappable.
- Content: no fabricated gains/customer totals added. Existing descriptive service/location labels retained in place of mockup statistics.

## Remaining findings
- P1 Bensky rejects both preview domain and localhost. Vendor shows "This website doesn't have permission to use this application". Full vehicle selection/results/WhatsApp end-to-end cannot be validated until an authorized domain is available. Vendor URL, ID 1977, iframe resizing, hook and vehicle WhatsApp flow are unchanged.
- P2 Reference contains a different composed vehicle/background treatment (wall signage and colored floor trails) than the supplied standalone photo. No new artwork fabricated to fill those differences.
- P2 Wordmark uses a library chevron rather than the exact double slash brand artwork. Icons approximate reference (lightbulb for lights).
- P2 Configurator cannot reproduce the compact reference's three fields while preserving the commercial iframe. Its real unauthorized state remains visible, not replaced or concealed.
- P2 Header and service captions are still finer than the reference. No mobile visual target supplied, so mobile is checked for usability rather than claimed as a visual match.

## Verification
- Production build passed with NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 (environment TLS setting only).
- npx tsc --noEmit passed.
- Chromium production run: no uncaught page errors; mobile menu opens, selecting Konfigurator closes it and navigates to #vehicle-lookup; no horizontal document overflow at 390 px.
- Desktop 1440 px and mobile 390 px screenshots inspected. Final crop/marker adjustment captured and inspected in the updated production build and live Vercel preview.
- No merge or production deployment. Keep PR as draft; no claim of reference parity.

## Live preview verification after push
Vercel succeeded for 2efa0deebbc7dd52c998e7ec3f907818979c79d6. Opened the branch preview with share access in headless Chromium and inspected /workspace/artifacts/vercel-after-1440.png and /workspace/artifacts/vercel-after-mobile.png. Confirmed new navbar, mobile menu closure, #vehicle-lookup navigation, no horizontal overflow at 390 px and no uncaught page errors. Bensky domain refusal remains visible. Formal Cloud browser/combined-artifact QA gate remains blocked.
