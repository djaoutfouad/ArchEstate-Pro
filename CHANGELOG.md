# ArchEstate Pro — Changelog

## Release v24 — Unified Master Quality, Latin Numerals, 404 Guard, & Asset Ledger
**Release Date:** September 2026  
**Status:** Production Ready  
**Build Health:** 1,098/1,098 Tests Passed (100% Green), TypeScript Strict Zero-Emit Warnings, SSG 24 Pages

---

### 1. Latin ASCII Numeral Enforcement (0–9)
- **HTML & Typography Configuration:**
  - Added `dir="ltr"` to `<html lang="en" dir="ltr">` in `index.html`.
  - Applied `font-variant-numeric: lining-nums tabular-nums; direction: ltr;` across `html`, `body`, and form controls (`input`, `select`, `textarea`, `table`, `td`, `th`) in `src/index.css`.
- **Systematic Number & Currency Formatters (`src/utils/calculations.ts`):**
  - Updated `formatCurrency`, `formatCurrencyExact`, and `formatNumber` to explicitly use `'en-US-u-nu-latn'` locale with `{ numberingSystem: 'latn' }`.
  - Implemented `normalizeToAsciiDigits()` to automatically sanitize and convert Arabic-Indic (`[٠-٩]`) and Eastern Arabic-Indic/Persian (`[۰-۹]`) digits to standard ASCII (`0-9`) at the engine boundary.
- **Form Controls & Date Formatting (`src/components/calculator/CalculatorEngine.tsx`):**
  - Applied `lang="en"`, `dir="ltr"`, `inputMode="decimal"`, and `[font-variant-numeric:lining-nums]` to numeric inputs.
  - Applied explicit `'en-US-u-nu-latn'` with `{ numberingSystem: 'latn' }` to date generation in clipboard summary and printable specification sheets.
  - Added `dir="ltr"` and `[font-variant-numeric:lining-nums]` to the dynamic amortization schedule table.
- **Automated Numerals Test Suite (`scripts/verify-numbers.ts`):**
  - Added automated test scanning all 24 pre-rendered HTML files in `dist/` and calculation outputs across all 15 calculators, strictly asserting 0 occurrences of non-Latin digits.

---

### 2. Edge HTTP 404 Status Interception
- **Cloudflare Pages Edge Functions (`functions/[[path]].ts`):**
  - Implemented exact-match route lookup against all 24 canonical application routes (`/`, 3 categories, 15 calculators, 5 legal/info pages).
  - Any non-matching HTML request immediately returns `404.html` with a **genuine HTTP 404 Not Found status code**, `X-Robots-Tag: noindex, follow`, and `Cache-Control: no-cache, no-store, must-revalidate`.
- **Cloudflare Worker Static Fallback (`public/_worker.js` & `dist/_worker.js`):**
  - Implemented identical canonical route matching in `_worker.js` for Cloudflare direct-upload and Worker deployments.

---

### 3. Visual Asset Overhaul & Licensing Registry
- **Asset Relevance Enhancements:**
  - Upgraded `concrete-volume` image to authentic foundation slab with steel rebar cage construction (`photo-1503387762-592deb58ef4e`).
  - Upgraded `pvc-panel-ceiling` image to linear interlocking ceiling panels with suspended perimeter trim (`photo-1513694203232-719a280e022f`).
  - Audited all other 13 images to ensure 100% relevance to each specific trade (split AC, brick courses with mortar, classical plaster cornice, wallpaper rolls, tile spacing, drywall metal studs, acoustic T-bar, etc.).
- **Asset Licensing Ledger (`ASSET_LICENSES.md`):**
  - Created complete ledger documenting file path, subject, source, original ID, URL, license type, and verification date for all 15 tools.
- **Asset Integrity Test Suite (`scripts/verify-images.ts`):**
  - Automated verification of local file persistence, non-empty binary headers (JPEG/PNG), 640x360 explicit dimensions, zero external hotlinking, 100% uniqueness, and descriptive non-role-repeating alt texts.

---

### 4. Exhaustive 15-Calculator Logic Test Suite (`scripts/verify-calculators.ts`)
- Implemented automated verification across all 15 calculators:
  - Default input execution (finite results, non-empty formatted strings).
  - Boundary condition testing (0 and minimal values).
  - Negative input handling (-50 clamped safely).
  - Maximum scale bounds testing.
  - Reset to default values integrity.
  - Zero `NaN` or `Infinity` tolerance.

---

### 5. Privacy, Cookie Settings, & AdSense Compliance
- **Permanent Cookie Settings Link (`src/components/common/Footer.tsx`):**
  - Added dedicated, accessible "Cookie Settings" button with `id="footer-cookie-settings"` in the global footer opening the interactive preferences modal.
- **Zero-Storage Privacy Policy (`src/components/pages/PrivacyPage.tsx`):**
  - Verified disclosure of client-side-only execution, zero user accounts, zero remote database storage, and transparent future AdSense advertising notices.
- **AdSense Preparation Documentation (`ADSENSE_SETUP.md`):**
  - Documented prerequisites, verification tags, `ads.txt` syntax, and placement hygiene rules.

---

## Release v20 — SSG Pre-rendering & Cloudflare Setup
- Initial SSG generator rendering all 13 educational sections directly into static HTML.
- Sitemap generation for 24 canonical routes.
- Cloudflare Pages basic 404 handler.
