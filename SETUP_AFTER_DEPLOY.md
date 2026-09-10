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
3. Under **SSL/TLS**:
   - Set encryption mode to **Full (strict)**.
   - Enable **Always Use HTTPS**.
   - Enable **Automatic HTTPS Rewrites**.

---

## 3. Verifying Real HTTP 404 Status Code

Once deployed, run a cURL check in your terminal to ensure non-existent routes return a true HTTP 404 status (not 200 OK):

```bash
curl -I https://archestatepro.com/this-route-does-not-exist
```

**Expected Response:**
```http
HTTP/2 404
content-type: text/html; charset=utf-8
x-robots-tag: noindex, follow
...
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

# 2. Mathematical calculation engine tests
npx tsx scripts/test-calculations.ts

# 3. Full production build and static site generation
npm run build

# 4. End-to-end post-build verification (234 checks)
npm run verify
```
