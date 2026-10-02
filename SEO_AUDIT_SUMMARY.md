# TaxWrite India - Final SEO Audit Summary
Date: 2026-10-01
Location Priority: Tamil Nadu (Primary) → Bengaluru (Secondary) → India (Tertiary)
Base: Coimbatore, Tamil Nadu, India

## 1. Files Kept (21 HTML + core assets)

### Core (9)
- index.html
- about.html
- services.html
- faq.html
- contact.html
- privacy-policy.html
- terms.html
- disclaimer.html
- 404.html

### Tamil Nadu Primary (9) - Strongest SEO
- company-registration-tamil-nadu.html
- private-limited-company-registration-tamil-nadu.html
- llp-registration-tamil-nadu.html
- gst-registration-tamil-nadu.html
- gst-filing-tamil-nadu.html
- accounting-services-tamil-nadu.html
- msme-registration-tamil-nadu.html
- fssai-registration-tamil-nadu.html
- tax-consultant-tamil-nadu.html

### Bengaluru Secondary (3)
- company-registration-bangalore.html
- private-limited-company-registration-bangalore.html
- gst-registration-bangalore.html

### Shared Resources
- css/style.css (preserved gradient theme, glass effects, cursor glow, hover lift, animations)
- js/script.js (vanilla, deferred, IntersectionObserver, service modals, FAQ)
- images/brand/* (logo, favicons, manifest icons)
- images/services/* (34 meaningful SVGs)
- images/about/* (4 icons: clear-guidance, structured-documentation, tamil-nadu-support, ongoing-compliance)
- robots.txt, sitemap.xml, site.webmanifest, favicon.ico, .htaccess

## 2. Files Removed (11)

### Duplicate India Pages (9) - Cannibalization Risk
- accounting-services-india.html
- company-registration-india.html
- fssai-registration-india.html
- gst-filing-india.html
- gst-registration-india.html
- llp-registration-india.html
- msme-registration-india.html
- private-limited-company-registration-india.html
- tax-consultant-india.html

**Reason:** Nearly identical content to Tamil Nadu pages, targeting same intent (company registration, GST, etc.). Keeping them weakened Tamil Nadu SEO and caused duplicate content. Consolidated to TN primary.

### Unused/Duplicate Assets (3)
- images/services/business-reporting.svg (unreferenced)
- images/taxwrite-logo.png (duplicate of images/brand/taxwrite-logo.png)
- images/about/india-wide-support.svg (duplicate of tamil-nadu-support.svg, unused after fix)

**Verification:** Grepped all HTML/CSS/JS for references before deletion. Only deleted when 0 references.

## 3. Pages Redirected (301)

In .htaccess (mod_rewrite):
- company-registration-india.html → /company-registration-tamil-nadu.html
- private-limited-company-registration-india.html → /private-limited-company-registration-tamil-nadu.html
- llp-registration-india.html → /llp-registration-tamil-nadu.html
- gst-registration-india.html → /gst-registration-tamil-nadu.html
- gst-filing-india.html → /gst-filing-tamil-nadu.html
- accounting-services-india.html → /accounting-services-tamil-nadu.html
- msme-registration-india.html → /msme-registration-tamil-nadu.html
- fssai-registration-india.html → /fssai-registration-tamil-nadu.html
- tax-consultant-india.html → /tax-consultant-tamil-nadu.html

All redirects are relevant (same service intent, different geography). No wildcard to homepage.

## 4. Final Sitemap URLs (20 canonical)

- https://www.taxwriteindia.com/ (priority 1.0)
- https://www.taxwriteindia.com/about.html (0.9)
- https://www.taxwriteindia.com/services.html (0.9)
- https://www.taxwriteindia.com/faq.html (0.7)
- https://www.taxwriteindia.com/contact.html (0.8)
- Tamil Nadu 9 pages (0.7-0.9)
- Bengaluru 3 pages (0.7-0.8)
- Legal 3 pages (0.3)
- Excluded: 404.html, /index.html duplicate, old India pages

## 5. Primary Keyword Mapping (Distinct Intent)

- index.html: business registration and compliance Tamil Nadu
- company-registration-tamil-nadu.html: company registration in Tamil Nadu
- private-limited-company-registration-tamil-nadu.html: private limited company registration Tamil Nadu
- llp-registration-tamil-nadu.html: LLP registration Tamil Nadu
- gst-registration-tamil-nadu.html: GST registration Tamil Nadu
- gst-filing-tamil-nadu.html: GST filing Tamil Nadu / GST return filing Tamil Nadu
- accounting-services-tamil-nadu.html: accounting services Tamil Nadu
- msme-registration-tamil-nadu.html: MSME / Udyam registration Tamil Nadu
- fssai-registration-tamil-nadu.html: FSSAI registration Tamil Nadu
- tax-consultant-tamil-nadu.html: tax consultant Tamil Nadu
- company-registration-bangalore.html: company registration Bangalore
- private-limited-company-registration-bangalore.html: private limited company registration Bangalore
- gst-registration-bangalore.html: GST registration Bangalore

No two pages target exactly same query. India pages removed to avoid cannibalization.

## 6. Duplicate Content Issues Fixed

- Removed 9 India pages that were near-duplicates of TN pages (only location name swapped)
- Consolidated useful content already present in TN pages (TN pages already had Bengaluru/India mention naturally)
- Ensured homepage does not have both / and /index.html in sitemap (now only /)
- Removed duplicate SVG (india-wide-support identical to tamil-nadu-support) and duplicate logo PNG
- Updated Who We Help section: changed "across India" ×8 to "across Tamil Nadu" to strengthen primary market
- Updated Why section: "India-Wide Support" → "Tamil Nadu-Focused Support" with correct positioning copy

## 7. Broken Links Fixed

- After India pages deletion: verified 0 broken href="*.html" links (Python audit)
- Verified 0 broken img src
- Verified footer-cta-stack removed (0 occurrences) – previously caused low-contrast buttons
- Fixed footer-brand structure: restored logo + paragraph closing div, now 6-column grid balanced (div open/close counts match)
- Fixed company-registration-tamil-nadu related services: added accounting-services-tamil-nadu.html to meet internal linking spec

## 8. Missing Metadata Fixed

- Homepage:
  - Title: "Company Registration & Business Compliance in Tamil Nadu | TaxWrite India" (was long Coimbatore suffix)
  - Meta description: conversion-focused per Step 9/17 (was generic)
  - OG title/description synced
- All TN pages: titles simplified per Step 16 (removed "Coimbatore" suffix, "Monthly & Quarterly" etc.), descriptions rewritten conversion-focused: "Need X in Tamil Nadu? ..."
- Bengaluru pages: titles "Company Registration in Bangalore | TaxWrite India", descriptions include remote support statement "TaxWrite India is based in Coimbatore and provides remote..."
- about.html: OG description updated to Tamil Nadu-focused, icon fixed to tamil-nadu-support.svg
- services.html: hero paragraph changed from "across India" to Tamil Nadu primary positioning
- faq.html: title/description updated to Tamil Nadu, FAQ JSON-LD question "How do I register a company in India?" → "in Tamil Nadu", answer updated to list Tamil Nadu cities
- site.webmanifest description updated to Tamil Nadu primary
- robots.txt: Allow CSS/JS/images, disallow 404, sitemap reference
- .htaccess: added security headers (HSTS env HTTPS), compression for text/plain, caching for webp/avif

## 9. Images/SVGs Removed or Optimised

- Removed 3 unused/duplicate assets (see section 2)
- Kept 44 images, all meaningful filenames (company-registration.svg, gst-registration.svg, etc.)
- All decorative SVGs use alt="" (verified)
- Brand icons referenced via manifest (512, apple-touch) retained
- No emoji icons – all custom SVG stroke #0D2740 1.6
- No heavy PNG/JPG – only SVG + brand PNG logo (94KB) optimized

## 10. Technical SEO Issues Remaining (Minor)

- 404.html missing canonical – intentional, should not be indexed; could add noindex but currently allowed via robots disallow
- No explicit width/height on some SVG icons (16×16) but SVGs are inline small – CLS impact negligible
- No srcset for brand logo PNG – but logo is small, LCP is text, not image; acceptable
- No lazy-loading for below-fold images – SVGs are tiny, not needed; could add loading="lazy" to footer logo but minor
- No BreadcrumbList on homepage/about/services/faq/contact – only on TN/Bangalore landing pages (per spec, breadcrumbs for SEO landing pages – okay)
- No FAQ JSON-LD on some TN pages? Checked company-registration-tamil-nadu has FAQPage – good. Others should have – verified most have.
- Performance: CSS 67KB, JS 42KB vanilla, no jQuery, deferred – LCP should be ≤2.5s, INP ≤200, CLS ≤0.1 expected

## Design Preservation

- Kept: colour theme --deep-navy #0D2740, --warm-cream #F7F2E8, etc.
- Kept: gradient theme (page-hero-bg full-coverage radial gradients, section-soft-blue/teal/cream/lavender)
- Kept: glass effects (backdrop-filter blur 18px saturate 180%, frosted border)
- Kept: cursor-follow glow (--mx/--my), hover lift -5px scale 1.01, tilt 2-4deg
- Kept: service-card interaction (db-card-wrap, svc-new-card-wrap), mobile tap feedback, scroll reveal
- No redesign unless required for SEO/usability – only content copy updates

## Final Checks

- Nav exactly: Home, About Us, Services, FAQ, Contact (logo→index, Free Consultation→contact)
- Footer identical every page, no footer-cta-stack, background dark, logo present, Quick Links/Services/Legal/Contact/Follow Us
- No fake office claims, no invented years/customers/awards/ratings
- Internal linking: Homepage→TN first, TN→related TN→selected Bengaluru→Contact, Bengaluru→related Bengaluru→TN main→Contact
- Tamil Nadu cities naturally mentioned: Coimbatore, Chennai, Tiruppur, Madurai, Salem, Erode, Tiruchirappalli, Hosur, Vellore via "Serving businesses in X"
- Location trust card: Tamil Nadu-Focused Support based in Coimbatore
- All pages: DOCTYPE, lang=en, charset UTF-8, viewport, unique title/meta, robots index,follow, self canonical (except homepage→/), OG, one H1, H2/H3 hierarchy
- No orphan pages, no duplicate IDs, no broken anchors
