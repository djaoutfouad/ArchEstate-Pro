# ArchEstate Pro — Setup & Verification After Deployment

This document provides step-by-step post-deployment configuration instructions for **Cloudflare Pages**, custom domain binding, Search Console verification, and edge runtime testing.

---

## 1. Cloudflare Pages Deployment Configuration

### Step A: Build & Output Settings
In your Cloudflare Pages Dashboard:
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Node.js Version:** `20.x` or higher (Set environment variable `NODE_VERSION=20.18.0`)

### Step B: Environment Variables
Add the following in **Settings > Environment Variables > Production**:
- `VITE_SITE_URL` = `https://archestatepro.com`
- `NODE_ENV` = `production`
*(Optional for EmailJS contact form integration)*:
- `VITE_EMAILJS_SERVICE_ID` = *(Your EmailJS service ID)*
- `VITE_EMAILJS_TEMPLATE_ID` = *(Your EmailJS template ID)*
- `VITE_EMAILJS_PUBLIC_KEY` = *(Your EmailJS public key)*

---

## 2. Custom Domain & SSL/TLS Configuration

1. In Cloudflare Pages, go to **Custom Domains > Set up a domain**.
2. Enter your apex domain: `archestatepro.com` and follow instructions to add `www.archestatepro.com`.
3. **DNS Records Requirement**:
   - Ensure your registrar's nameservers point to Cloudflare (e.g., `aria.ns.cloudflare.com` / `gabe.ns.cloudflare.com`), OR add a CNAME record:
     - `CNAME` `@` -> `<your-project-name>.pages.dev`
     - `CNAME` `www` -> `<your-project-name>.pages.dev`
   - Until DNS records are configured and propagated, running `curl -I https://archestatepro.com` will report: `curl: (6) Could not resolve host: archestatepro.com`.
4. Under **SSL/TLS**:
   - Set encryption mode to **Full (strict)**.
   - Enable **Always Use HTTPS**.
   - Enable **Automatic HTTPS Rewrites**.

---

## 3. Cloudflare Edge HTTP 404 Interception Mechanics

ArchEstate Pro provides two redundant edge routing mechanisms to ensure genuine HTTP 404 status codes:
1. **Cloudflare Pages Functions (`functions/[[path]].ts`)**:
   - For GitHub/GitLab connected deployments, Cloudflare automatically builds and executes `functions/[[path]].ts`.
   - The handler checks request paths against the 24 pre-rendered static routes (`VALID_ROUTES`). Any non-matching route immediately streams `dist/404.html` with an explicit `HTTP 404 Not Found` status and `X-Robots-Tag: noindex, follow`.
2. **Advanced Mode Worker (`public/_worker.js` -> `dist/_worker.js`)**:
   - For direct Wrangler uploads (`wrangler pages deploy dist`), `_worker.js` executes at the edge and mirrors the identical 404 interception logic.

### Live Verification Command
Once DNS has propagated and the project is live on Cloudflare Pages:
```bash
curl -Iv https://archestatepro.com/does-not-exist
```

**Expected Response Headers:**
```http
HTTP/2 404
content-type: text/html; charset=utf-8
x-robots-tag: noindex, follow
cache-control: no-cache, no-store, must-revalidate
```

If testing against the preview branch or `.pages.dev` domain prior to apex domain propagation:
```bash
curl -Iv https://<your-project>.pages.dev/does-not-exist
```

---

## 4. Google Search Console & Sitemap Submission

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a **Domain Property**: `archestatepro.com` (recommended via DNS TXT record).
3. Once verified, go to **Sitemaps** in the left sidebar.
4. Enter `sitemap.xml` and click **Submit**.
5. Confirm that **24 pages** are discovered:
   - 1 Home page
   - 3 Category hub pages
   - 15 Canonical calculator pages
   - 5 Legal and methodology pages

---

## 5. Contact Form Correspondence Verification

1. Navigate to `https://archestatepro.com/contact`.
2. Send a test message through the form.
3. If EmailJS keys are configured, the message will dispatch directly.
4. If EmailJS keys are omitted, the form automatically falls back to secure `mailto:contact15archestate@gmail.com` direct dispatch, ensuring zero lost customer inquiries.

---

## 6. Pre-Commit Quality Assurance

Before pushing future modifications, execute the local audit pipeline:
```bash
# 1. Type checking and syntax audit
npm run lint

# 2. Full production build and static site generation (24 static pages)
npm run build

# 3. Comprehensive post-build verification (5 automated test suites)
npm run verify

# 4. Mathematical logic edge-case tests
npm run test:calculations

# 5. Dedicated browser DOM hydration and Arabic locale tests
npm run test:browser
```
This runs all automated suites in sequence:
- `scripts/verify-build.ts` (310 checks: 24 SSG pages, 13 sections per calculator, sitemap, robots, canonicals)
- `scripts/verify-images.ts` (152 checks: local existence, binary headers, 640x360 dimensions, no hotlinking, unique images)
- `scripts/verify-numbers.ts` (61 checks: ASCII Latin 0-9 digits across formatters, HTML, and calculations)
- `scripts/verify-calculators.ts` (575 checks: inputs, boundaries, negative handling, max bounds, NaN/Infinity prevention)
- `scripts/test-browser-inputs.ts` (1,632 checks: DOM hydration, type="text", inputmode="decimal", typing, steppers, reset, ar-EG locale zero Arabic digits)
