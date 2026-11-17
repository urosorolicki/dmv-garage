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

## Mobile follow-up — desktop hierarchy adaptation
User requested mobile to resemble desktop more closely. Added a mobile-only photo scene using the same approved asset, with four labeled service links around the complete car. Removed redundant mobile pills. At 640–1023 px the text and vehicle sit side by side; phones keep readable text above the car, paired CTAs and a two-column service strip. Desktop composition and all Bensky code remain untouched.

Local production screenshots: /workspace/artifacts/mobile-revision-{320,390,430,768,1440}.png, DPR 1, viewport heights 1000 px. Inspected 320, 390 and 768 px images. Corrected the initial four-line heading at 320 px to three lines and replaced the tablet vertical stack with a desktop-like split composition, then recaptured. No document overflow at all five widths. Mobile menu/configurator navigation passed, no uncaught page errors. Production build and TypeScript passed. Full reference QA still blocked for the previously documented exact-artwork and Bensky authorization reasons; no claim of pixel parity. No approved mobile visual reference exists, so this adaptation follows the desktop hierarchy.

## Compact mobile correction after user rejected the stacked layout
User explicitly prioritized a compact desktop-like composition over the previous long stack. Skills applied: product-design audit, image-to-code and design-qa, with cloud-desktop fallback guidance. Saved-context preflight found no saved references. Original approved desktop image and supplied photograph remain the visual sources.

Current-run evidence: /workspace/artifacts/mobile-refinement/before-{320,390,430,768,1024,1440}.png; final-{320,390,430,768,1024,1440}.png; comparison.png combines before/after at 390×844 with the desktop baseline. All screenshots DPR 1. Menu evidence: menu-after.png, captured after the transition finished. Audit notes: /workspace/artifacts/mobile-refinement/audit.md. The desktop hero comparison covers the same 1440×610 region; no differing pixels.

P1 density corrected: 390 px hero reduced from 834.09 to 627.38 CSS px. P1 separated art corrected by positioning the same photo within the hero behind the copy/callouts. P2 disconnected labels corrected by reusing the desktop connector/marker treatment at photo-relative coordinates. P2 missing booking action corrected with a labeled 44×44 calendar link in the mobile header. Four service shortcuts now use a single row, captions remain on desktop and in the destination sections. No business stats or new images added.

Iteration history: first integrated capture rejected because callouts obscured CTAs. Reframed the car and repositioned callouts; a remaining 640 px collision was caught and corrected. Final browser geometry checks pass at 320,360,375,390,414,430,640,768,820,1024,1440 px: no horizontal overflow or callout/CTA overlap; callout centers receive pointer events and targets are at least 44 px tall. Confirmed performance/configurator anchor, gallery and contact navigation, menu close on selection and Escape, menu booking reachable at 320×568, no uncaught page errors. Production build and separate TypeScript validation pass.

Fonts: same desktop heading family/weight and three-line hierarchy, readable phone heading scaled to width. Colors: retained existing orange/cyan tokens. Image: same approved photograph, no generation; cropped to keep the full car. Copy: unchanged service claims; redundant phone metadata/captions hidden for compactness. Spacing: fewer stacked regions and earlier configurator entry. At 320 px compact shortcut labels are 10 px, an explicit legibility tradeoff; targets remain large and full details are available after navigation.

Overall reference-fidelity result remains blocked by the previously documented exact-artwork/Cloud-browser limitations and vendor authorization. These are not represented as passing. Mobile compactness and navigation corrections are verified in fallback Chromium; no claim of exact original mockup parity, Safari device testing or full accessibility conformance. No merge or production deployment.
