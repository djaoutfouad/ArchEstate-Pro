# ArchEstate Pro — Pre-Repair Audit Report
**Audit Date:** 2026-09-09  
**Auditor:** Senior Software & Technical SEO Engineer  
**Project:** ArchEstate Pro (React + Vite + TypeScript + Cloudflare Pages)  
**Target Goal:** Elevate code quality, technical SEO, user experience, calculation rigor, and privacy compliance in preparation for Google AdSense review.

---

## 1. Key Project Files & Architecture

| File Path | Role & Purpose | Current State / Notes |
| :--- | :--- | :--- |
| `src/config/site.ts` | Single source of truth for URLs, routes, brand metadata | Uses fallback to `.workers.dev`; needs clean env var handling (`VITE_SITE_URL`). |
| `src/utils/router.tsx` | Custom lightweight client-side router & path parser | Lacks explicit 404 state for unknown paths or invalid calculator slugs. |
| `src/App.tsx` | Main application shell and view controller | Defaults to Homepage on invalid routes; lacks direct standalone views for legal routes. |
| `src/data/calculatorsData.ts` | Complete catalog of the 15 calculators | Solid technical schemas; needs expansion with comprehensive educational content. |
| `src/utils/calculations.ts` | 15 computational engines & formatting helpers | High mathematical quality; needs edge-case hardening (0% interest, division by zero). |
| `src/components/calculator/CalculatorEngine.tsx` | Interactive calculator interface & technical guide | Well-structured; needs full 12-point educational section integration. |
| `src/components/common/SEOHead.tsx` | Head tags, OpenGraph, Canonical & Schema.org | Contains misleading `Offer: price=0` in SoftwareApplication JSON-LD. |
| `src/components/common/LegalModals.tsx` | Privacy, Terms, About, Contact, Methodology dialogs | Modal-based; needs standalone page rendering and enhanced Privacy/Cookie controls. |
| `scripts/prerender.ts` | Static Site Generation (SSG) for 24 routes | Successfully builds 24 routes; needs 404.html generation and full educational content mirroring. |
| `index.html` | Base HTML entry point | Contains non-compliant TCF v2.2 stub returning hardcoded `gdprApplies: false`. |

---

## 2. Identified Issues by Severity Level

### Critical Severity (Must be resolved before AdSense or production launch)
1. **Invalid Routes Return Home (200 OK instead of 404 Not Found):**
   - **Location:** `src/utils/router.tsx`, `src/App.tsx`, `scripts/prerender.ts`.
   - **Risk:** Visiting `/does-not-exist` or `/calculators/invalid-slug` silently renders the homepage content. Search engines index duplicate/soft-404 pages, damaging crawl budget and violating Google Webmaster guidelines.
2. **Non-Compliant IAB TCF v2.2 Stub in `index.html`:**
   - **Location:** `index.html` lines 30–55.
   - **Risk:** Hardcoding `gdprApplies: false` in a fake `__tcfapi` stub breaches Google EU User Consent policy and AdSense automated compliance crawlers, which flag synthetic CMP stubs.
3. **Missing Standalone Legal & Informational Pages:**
   - **Location:** `src/App.tsx`, `src/components/common/LegalModals.tsx`.
   - **Risk:** Legal policies (Privacy, Terms, About, Contact, Methodology) are presented inside overlay modals over the homepage. Direct browser navigation to `/privacy` or `/terms` must render a dedicated, clean, non-modal standalone page layout.

### High Severity (Direct impact on SEO and editorial quality)
4. **Thin & Repetitive Educational Content on Calculator Pages:**
   - **Location:** `src/data/calculatorsData.ts`, `src/components/calculator/CalculatorEngine.tsx`.
   - **Risk:** AdSense requires substantial unique editorial value on tool pages. Current calculators only have brief 3-4 bullet descriptions, lacking detailed user guidance, worked numerical examples, and explicit professional consultation triggers.
5. **Schema.org Structured Data Inaccuracies:**
   - **Location:** `src/components/common/SEOHead.tsx`, `scripts/prerender.ts`.
   - **Risk:** Inclusion of `{ '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }` on free informational web utilities can trigger Google Rich Result warnings for misleading commercial offers.
6. **Environment-Dependent Canonical & Sitemap URLs:**
   - **Location:** `src/config/site.ts`, `scripts/prerender.ts`.
   - **Risk:** The temporary `workers.dev` URL could leak into production canonical tags or sitemaps when a custom domain is connected. Must support `VITE_SITE_URL` with clean trailing-slash normalization.

### Medium Severity (User experience, validation & compliance)
7. **Mathematical Edge Cases:**
   - **Location:** `src/utils/calculations.ts`.
   - **Details:** Mortgage calculator enforced `Math.max(0.01, inputs.interestRate)` which blocked legitimate 0% interest loan scenarios. Affordability factor `piFactor` risked `NaN` if interest rate was 0.
8. **Contact Form Resilience & Privacy Transparency:**
   - **Location:** `src/components/common/LegalModals.tsx`, `src/components/common/SEOHead.tsx`.
   - **Details:** Privacy policy must explicitly detail EmailJS payload transmission, data retention, local storage policies, and provide an interactive Cookie Consent Manager.
9. **Cloudflare Pages HTTP 404 Status:**
   - **Location:** Missing `public/404.html` and `dist/404.html`.
   - **Details:** Cloudflare Pages needs a static `404.html` to return a true HTTP status 404 rather than an SPA 200 rewrite for unknown assets.

---

## 3. Required Pages and Route Inventory

The following 25 routes must exist and be statically pre-rendered:

1. `/` (Homepage & Tool Directory)
2. `/calculators/false-ceilings-drywall` (Category 1)
3. `/calculators/construction-finishing` (Category 2)
4. `/calculators/real-estate-financial` (Category 3)
5. `/calculators/ba13-drywall-ceiling` (Tool 1)
6. `/calculators/pvc-suspended-ceiling` (Tool 2)
7. `/calculators/acoustic-grid-ceiling-60x60` (Tool 3)
8. `/calculators/cove-light-perimeter-bulkhead` (Tool 4)
9. `/calculators/gypsum-cornice-plaster-staff` (Tool 5)
10. `/calculators/wall-paint-primer` (Tool 6)
11. `/calculators/tile-grout-flooring` (Tool 7)
12. `/calculators/reinforced-concrete-volume` (Tool 8)
13. `/calculators/brick-block-masonry-mortar` (Tool 9)
14. `/calculators/hvac-cooling-btu-load` (Tool 10)
15. `/calculators/mortgage-piti-amortization` (Tool 11)
16. `/calculators/rental-yield-cap-rate-roi` (Tool 12)
17. `/calculators/home-affordability-debt-ratio` (Tool 13)
18. `/calculators/closing-costs-notary-fee` (Tool 14)
19. `/calculators/wallpaper-rolls-pattern-repeat` (Tool 15)
20. `/about` (Direct About Us Page)
21. `/contact` (Direct Contact & Inquiries Page)
22. `/privacy` (Direct Privacy Policy & Cookie Disclosures Page)
23. `/terms` (Direct Terms of Service & Limitations Page)
24. `/methodology` (Direct Detailed Methodology & References Page)
25. `/404` & `404.html` (Dedicated 404 Not Found Page with `noindex, follow`)

---

## 4. Execution Plan

1. **Step 1: Router & 404 Infrastructure**
   - Update `src/utils/router.tsx` to detect invalid slugs and unknown paths, returning `{ is404: true }`.
   - Create a dedicated, highly accessible `NotFoundPage` component (`src/components/common/NotFoundPage.tsx`) with clear navigation options, category links, and home button.
   - Configure Cloudflare Pages `404.html` in both `public/` and `scripts/prerender.ts`.

2. **Step 2: Standalone Legal & Informational Pages**
   - Create dedicated standalone page components or a clean layout for `/about`, `/contact`, `/privacy`, `/terms`, and `/methodology` in `src/components/pages/`.
   - Ensure direct navigation renders full-page layouts while retaining modal capability if triggered from within tools.
   - Implement an interactive Cookie Consent Manager (`CookieConsentBanner.tsx` and `CookieSettingsModal.tsx`) with local storage state.

3. **Step 3: Technical SEO & JSON-LD Refinement**
   - Update `src/config/site.ts` to support `VITE_SITE_URL` and `process.env.SITE_URL` cleanly.
   - Refactor `SEOHead.tsx` and `scripts/prerender.ts`: remove `Offer` price=0, add `isAccessibleForFree: true`, correct Breadcrumbs, and inject `noindex, follow` on 404.
   - Remove fake TCF stub from `index.html`.

4. **Step 4: 12-Dimension Educational Content System**
   - Define `EducationalContent` interface in `src/types/calculator.ts`.
   - Create `src/data/calculatorContent.ts` containing original, comprehensive content for all 15 tools across all 12 specified dimensions.
   - Connect educational content to `CalculatorEngine.tsx` and static SSG generation in `scripts/prerender.ts`.

5. **Step 5: Methodology Page Enhancement & Real References**
   - Detail computational formulas, units, baseline planning assumptions, limits of validity, and regional disclaimers for all 15 calculators on `/methodology`.

6. **Step 6: Mathematical Edge-Case Hardening & Automated Tests**
   - Fix 0% interest rate handling in `calculateMortgagePITI` and `calculateAffordability`.
   - Build an automated test suite (`scripts/test-calculations.ts`) verifying boundary cases (0, negative, extreme values, 0% interest, division by zero).
   - Document changes in `CHANGELOG.md`.

7. **Step 7: Verification, Pre-rendering & Documentation**
   - Run `npm run build` and `tsx scripts/test-calculations.ts`.
   - Verify all 25 SSG pages, `sitemap.xml`, and `robots.txt`.
   - Generate `POST_REPAIR_AUDIT.md`, `ADSENSE_SETUP.md`, and `SETUP_AFTER_DEPLOY.md`.
