# ArchEstate Pro — Visual Asset Registry & Licensing Ledger

This ledger records all photographic assets embedded across the ArchEstate Pro calculation suite. Every visual asset is verified for subject matter relevance, local self-hosting compliance, explicit dimension declarations, and permissive commercial licensing.

---

## 1. Asset Licensing Policy & Guarantees

- **No Hotlinking**: All images are served strictly from the local origin directory (`/images/calculators/`) within the application bundle. No requests are made to third-party CDNs during client execution.
- **License Standard**: All photographic assets are sourced under the Unsplash Commercial License or equivalent open-access public licenses granting irrevocable, worldwide, royalty-free rights to download, modify, distribute, and utilize for commercial and non-commercial web applications without payment or mandatory attribution.
- **Strict Visual Matching**: Each asset is chosen specifically to represent the physical trade, installation method, or financial transaction calculated by the respective tool. Decorative generic fillers are prohibited.
- **Accessibility & CLS Prevention**: Every image tag explicitly declares `width="640"`, `height="360"`, `loading="lazy"`, `decoding="async"`, and a descriptive `alt` attribute representing the physical scene depicted.

---

## 2. Complete Calculator Asset Ledger

| # | Calculator Slug | Local File Path | Image Subject | Source Provider | Source Reference / ID | License Type | Verification Date |
|---|----------------|-----------------|---------------|-----------------|----------------------|--------------|-------------------|
| 0 | *Hero Section* | `/images/hero-construction-blueprint.jpg` | Precision construction engineering blueprint and spirit level measurement | Unsplash | `photo-1504307651254-35680f356dfd` | Unsplash License | September 2026 |
| 1 | `ba13-drywall-ceiling` | `/images/calculators/ba13-drywall-ceiling-installation.jpg` | Worker installing BA13 drywall plasterboard on ceiling metal framing | Unsplash | `photo-1589939705384-5185137a7f0f` | Unsplash License | September 2026 |
| 2 | `pvc-panel-ceiling` | `/images/calculators/pvc-panel-ceiling-installation.jpg` | Linear interlocking suspended PVC ceiling panels with perimeter shadowline trim | Unsplash | `photo-1507089947368-19c1da9775ae` | Unsplash License | September 2026 |
| 3 | `acoustic-grid-ceiling` | `/images/calculators/acoustic-tbar-ceiling.jpg` | Suspended modular acoustic ceiling grid with mineral fiber sound absorption tiles | Unsplash | `photo-1497366216548-37526070297c` | Unsplash License | September 2026 |
| 4 | `cove-ceiling` | `/images/calculators/cove-ceiling-lighting.jpg` | Recessed modern architectural ceiling tier with soft indirect LED cove lighting | Unsplash | `photo-1600566753190-17f0baa2a6c3` | Unsplash License | September 2026 |
| 5 | `plaster-staff-ceiling` | `/images/calculators/plaster-staff-ceiling-cornice.jpg` | Decorative architectural plaster staff molding and ornamental ceiling cornice | Unsplash | `photo-1582582494705-f8ce0b0c24f0` | Unsplash License | September 2026 |
| 6 | `paint-primer` | `/images/calculators/paint-roller-wall.jpg` | Paint roller applying smooth coating to interior wall drywall surface | Unsplash | `photo-1562259949-e8e7689d7828` | Unsplash License | September 2026 |
| 7 | `tiles-estimator` | `/images/calculators/tile-bathroom-finish.jpg` | Ceramic tile installation on bathroom wall with uniform grout spacer lines | Unsplash | `photo-1584622650111-993a426fbf0a` | Unsplash License | September 2026 |
| 8 | `concrete-volume` | `/images/calculators/concrete-volume-slab-foundation.jpg` | Pouring and leveling concrete foundation slab with reinforcement formwork | Unsplash | `photo-1578575437130-527eed3abbec` | Unsplash License | September 2026 |
| 9 | `bricks-blocks` | `/images/calculators/bricks-blocks-masonry-wall.jpg` | Standard red brick masonry wall course showing uniform mortar joints | Unsplash | `photo-1590069261209-f8e9b8642343` | Unsplash License | September 2026 |
| 10 | `ac-btu-size` | `/images/calculators/ac-btu-cooling-hvac-unit.jpg` | HVAC technician installing and calibrating split air conditioning cooling unit | Unsplash | `photo-1621905251189-08b45d6a269e` | Unsplash License | September 2026 |
| 11 | `mortgage-piti` | `/images/calculators/mortgage-financial-planning.jpg` | Mortgage loan analysis worksheet with interest rate calculations and pen | Unsplash | `photo-1554224155-8d04cb21cd6c` | Unsplash License | September 2026 |
| 12 | `rental-yield` | `/images/calculators/rental-yield-property-investment.jpg` | Modern multi-unit residential apartment building architecture for rental yield | Unsplash | `photo-1486406146926-c627a92ad1ab` | Unsplash License | September 2026 |
| 13 | `affordability-calc` | `/images/calculators/affordability-home-buying-budget.jpg` | House keys on property ownership documentation for home affordability | Unsplash | `photo-1560518883-ce09059eeffa` | Unsplash License | September 2026 |
| 14 | `closing-costs` | `/images/calculators/closing-costs-escrow-settlement.jpg` | Reviewing and signing real estate settlement closing cost documentation | Unsplash | `photo-1454165804606-c3d57bc86b40` | Unsplash License | September 2026 |
| 15 | `wallpaper-roll` | `/images/calculators/wallpaper-roll-interior-hanging.jpg` | Designer decorative wallpaper installation with continuous pattern repeat | Unsplash | `photo-1618221195710-dd6b41faaea6` | Unsplash License | September 2026 |

---

## 3. Automated Verification Script

Image integrity, unique mapping, dimension metadata, and local file persistence are enforced continuously through `scripts/verify-images.ts` and `scripts/verify-build.ts` during every production build cycle.
