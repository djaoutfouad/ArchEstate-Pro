# ArchEstate Pro — Release 20 Changelog

**Release Date:** September 2026  
**Status:** Production Ready  
**Scope:** Final Quality, Technical SEO, Static Site Generation (SSG), HTTP 404 Status, and AdSense Policy Hardening

---

## 1. Educational Content in Pre-rendered SSG HTML (Fix 1)
- **Engineered Pure HTML Guide Generator (`src/utils/renderEducationalGuideHtml.ts`):**
  - Created a dedicated, type-safe HTML generator rendering all 13 required educational, technical, and planning sections.
  - Aligned all 15 calculator keys in `src/data/calculatorEducationalContent.ts` to the canonical calculator IDs.
- **SSG Static Pre-rendering (`scripts/prerender.ts`):**
  - Integrated `renderEducationalGuideHtml` into the static page generator loop.
  - All 15 static calculator pages (`dist/calculators/[slug]/index.html`) now contain complete, human-authored educational content directly in the pre-rendered HTML before JavaScript hydration.
- **Interactive UI Synchronization (`src/components/calculator/CalculatorEducationalGuide.tsx`):**
  - Standardized explicit section headings across both the pre-rendered static HTML and the interactive React hydration component:
    1. *What This Calculator Does*
    2. *When to Use This Tool*
    3. *Input Parameters and Measurement Guidelines*
    4. *Worked Engineering or Planning Example*
    5. *Plain-Language Formula*
    6. *Assumptions and Default Values*
    7. *Rounding Rules and Units*
    8. *What the Result Does Not Include*
    9. *Common Mistakes*
    10. *When to Consult a Qualified Professional*
    11. *Last Reviewed Date*
    12. *Frequently Asked Questions*
    13. *Related Calculators*

---

## 2. Real HTTP 404 Status & Not-Found Handling (Fix 2)
- **Cloudflare Pages Functions Catch-All (`functions/[[path]].ts`):**
  - Added an edge Pages Function that intercepts requests for non-existent routes, attempts static asset resolution via `env.ASSETS`, and returns `404.html` with a **genuine HTTP 404 Not Found status code** (eliminating 200 OK soft-404s).
- **Cloudflare Worker Support (`public/_worker.js`):**
  - Added advanced-mode Worker fallback serving `404.html` with HTTP status `404` and `X-Robots-Tag: noindex, follow`.
- **Security & Crawler Headers (`public/_headers`):**
  - Added explicit header definitions for `/404.html` to inject `X-Robots-Tag: noindex, follow`.
- **Static Template (`404.html`):**
  - Built pre-rendered `404.html` containing explicit `<meta name="robots" content="noindex, follow" />`, breadcrumbs, and quick-action navigation back to all 15 calculators and calculation methodology.
- **Client-Side SPA Transitions (`src/components/common/SEOHead.tsx`, `src/utils/router.tsx`):**
  - Dynamically updates `document.title = "Page Not Found — ArchEstate Pro"`.
  - Automatically appends `<meta name="robots" content="noindex, follow" />` during client-side navigation to invalid paths, ensuring consistent crawler guidance.

---

## 3. Route Inventory & Single Source of Truth (Fix 3)
- **Unified Route Source:**
  - `CALCULATORS` array in `src/data/calculatorsData.ts` is the single source of truth for all 15 calculators.
  - Standardized `VALID_CALCULATOR_SLUGS` in `src/config/site.ts` to exactly match the 15 canonical IDs:
    `ba13-drywall-ceiling`, `pvc-panel-ceiling`, `acoustic-grid-ceiling`, `cove-ceiling`, `plaster-staff-ceiling`, `paint-primer`, `tiles-estimator`, `concrete-volume`, `bricks-blocks`, `ac-btu-size`, `mortgage-piti`, `rental-yield`, `affordability-calc`, `closing-costs`, `wallpaper-roll`.
- **Sitemap Generator Audit:**
  - `sitemap.xml` generates exactly 24 URLs:
    - 1 Home page (`/`)
    - 3 Category hub pages (`/calculators/false-ceilings-drywall`, `/calculators/construction-finishing`, `/calculators/real-estate-financial`)
    - 15 Canonical calculator pages
    - 5 Legal & informational pages (`/about`, `/contact`, `/privacy`, `/terms`, `/methodology`)
  - No orphaned, duplicated, or phantom routes exist in the sitemap or codebase.

---

## 4. Domain & Technical SEO Optimization (Fix 4)
- **Canonical Domain Handling (`src/config/site.ts`):**
  - Hardened `SITE_URL` resolution: defaults to `https://archestatepro.com`.
  - Automatically detects and ignores temporary development/worker domains (such as `*.workers.dev` or `localhost`), ensuring all canonical tags and sitemap entries reference the custom production domain.
- **Robots Directives:**
  - `noindex` is applied exclusively to 404 pages (both HTTP header and meta tag).
  - All 24 core pages feature valid indexable canonical links with OpenGraph and JSON-LD breadcrumb schemas.

---

## 5. Phrasing, Compliance & Google AdSense Policy Hardening (Fix 5)
- **Practical Planning Language:**
  - Replaced all exaggerated or absolute claims (such as "Engineering-grade") with accurate, practical phrasing ("Practical planning estimator", "Preliminary planning tool").
  - Clarified framing calculations for gypsum/drywall to state typical 60cm on-center furring channel intervals.
- **Privacy & GDPR/CCPA Representation:**
  - Softened legal claims in `src/components/pages/PrivacyPage.tsx` and `src/components/pages/ContactPage.tsx` from "absolute guarantee" to "handled in accordance with industry best practices".
  - Created interactive `CookieSettingsModal.tsx` and added permanent "Cookie Preferences & Consent" access in the global footer.
- **Zero Ad Code Before Approval:**
  - Verified `ADS_ENABLED = false` in `src/App.tsx`.
  - Confirmed zero placeholder publisher IDs (such as `pub-1234567890123456` or `ca-pub-0000000000000000`).

---

## 6. Testing & Automated Verification
- **Post-Build Verification Suite (`scripts/verify-build.ts`):**
  - 234 automated checks verifying file existence, sitemap integrity, 404 status configuration, and presence of all 13 educational sections across all 15 calculators in `dist/`.
- **Calculation Engine Edge-Case Tests (`scripts/test-calculations.ts`):**
  - 24 mathematical unit tests confirming 0% mortgage rates, negative inputs, edge cases, and zero division safeguards without errors or `NaN`.
