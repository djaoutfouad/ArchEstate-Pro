# ArchEstate Pro — Google AdSense Preparation & Setup Guide

This guide outlines the prerequisites, verification workflow, and activation steps required to connect **ArchEstate Pro** to Google AdSense while adhering to Google Publisher Policies.

---

## 1. Prerequisites Checklist Before Applying

Do **not** apply for Google AdSense until the following conditions are met:

- [x] **High-Value Unique Content:** All 15 calculators feature deep, pre-rendered educational guides (13 distinct sections per tool, worked examples, formulas, and measurement instructions).
- [x] **No Placeholder Ad Code:** The site contains **zero dummy ad scripts** or artificial blank containers (`ADS_ENABLED = false`).
- [x] **Essential Policy Pages Live:** Complete and authentic Privacy Policy, Terms of Service, About Us, Contact Us, and Methodology pages are indexed.
- [x] **Functioning Contact Form & Email:** Working contact route with active correspondence email (`contact15archestate@gmail.com`).
- [x] **Valid HTTP 404 & Clean Sitemap:** Non-existent URLs return real HTTP 404 status codes. `sitemap.xml` contains all 24 production pages.
- [ ] **Custom Domain Live:** Deployed and serving via your official apex domain `https://archestatepro.com`.
- [ ] **Google Search Console Verification:** The property is claimed, sitemap submitted, and core pages are indexed by Googlebot.
- [ ] **Traffic Baseline:** Recommended to have at least 50–100 genuine daily impressions to demonstrate real-world utility.

---

## 2. Step-by-Step Google AdSense Application Flow

### Step 1: Submit Application
1. Go to [Google AdSense](https://www.google.com/adsense/start/).
2. Sign in with your Google account.
3. Enter your primary site domain: `https://archestatepro.com`.
4. Select your country/territory and accept the Terms.

### Step 2: Verification Tag Installation
When prompted by Google AdSense to connect your site:
1. Copy the snippet provided by Google:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossorigin="anonymous"></script>
   ```
2. Paste this snippet inside the `<head>` section of `/index.html`.
3. Re-run the production build:
   ```bash
   npm run build
   ```
4. Deploy the updated build to Cloudflare Pages.
5. In your AdSense console, click **"Request Review"**.

### Step 3: Configure `ads.txt`
Google requires an authorized digital seller file at `https://archestatepro.com/ads.txt`:
1. Create or edit `public/ads.txt`:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
   *(Replace `pub-XXXXXXXXXXXXXXXX` with your exact publisher ID from AdSense).*
2. During the next `npm run build`, Vite will copy this file directly into `dist/ads.txt`.

---

## 3. Post-Approval Activation in ArchEstate Pro

Once Google sends the formal approval email:

1. **Enable In-App Advertising:**
   In `src/App.tsx`, change:
   ```typescript
   // Enable advertisements across layout slots
   const ADS_ENABLED = true;
   ```

2. **Configure Placement Slots:**
   In `src/components/common/AdvertisementPlaceholder.tsx` or your custom ad component, insert your real AdSense slot IDs:
   ```html
   <ins class="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   ```

3. **Placement Hygiene Rules:**
   - **Above-the-Fold Balance:** Do not push calculator input fields below the viewport fold with oversized hero banners.
   - **Distance from Interactive Controls:** Maintain at least 25px clearance between ad blocks and calculation buttons (`Calculate`, `Reset`, input spinners) to prevent accidental clicks.
   - **No Ads on 404 or Legal Pages:** The application is architected to automatically suppress ad slots on `/404`, `/privacy`, `/terms`, and other governance pages.

---

## 4. How ArchEstate Pro Prevents Common AdSense Rejections

| Common Rejection Reason | How ArchEstate Pro Is Protected |
|-------------------------|----------------------------------|
| **"Low-Value Content"** | Over 12,000 words of authentic, tool-specific educational material pre-rendered in static HTML across 15 calculators. |
| **"Site Under Construction"** | All 15 calculators are fully functional client-side engines with verified math and realistic worked examples. |
| **"Navigation Issues"** | Strict hierarchy with category hubs, breadcrumbs, unified header/footer, and real HTTP 404 handling. |
| **"Misleading Advertising"** | Phrasing has been standardized to "Practical planning estimator", avoiding exaggerated "guarantees". |
| **"Privacy & Consent Compliance"** | Built-in Cookie Preferences modal allowing users to review and update consent anytime. |
