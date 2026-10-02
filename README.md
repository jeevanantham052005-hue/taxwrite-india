# TaxWrite India - Business Registration & Compliance Across Tamil Nadu

**Live Site:** https://www.taxwriteindia.com  
**Base:** Coimbatore, Tamil Nadu, India  
**Primary SEO:** Tamil Nadu → Secondary: Bengaluru → Tertiary: India

## Overview

TaxWrite India provides company registration, GST, tax, accounting and business compliance support for entrepreneurs, startups and SMEs across Tamil Nadu. Based in Coimbatore, with additional remote support for Bengaluru and across India.

## Tech Stack

- HTML5 / CSS3 / Vanilla JS (no heavy libraries)
- Single `css/style.css` + `js/script.js`
- SVG icons (stroke #0D2740 1.6)
- Glass effects: `backdrop-filter blur 18px saturate 180%`
- Animations: transform/opacity only, rAF, prefers-reduced-motion support

## Features

- ✅ Tamil Nadu primary SEO (9 landing pages)
- ✅ Bengaluru secondary (3 pages)
- ✅ Slide-in + fade-in animations for all cards
- ✅ Glowing buttons (primary navy, WhatsApp green, Call teal)
- ✅ Fit-box cards (Who We Are section)
- ✅ Working contact form WITHOUT PHP → saves to Google Sheet "taxwrite new leads" + emails to official@taxwrite.org
- ✅ Phone: +91 7200215338 (tel:+917200215338), WhatsApp: wa.me/917200215338, Email: official@taxwrite.org

## Pages (21 HTML)

**Core:** index.html, about.html, services.html, faq.html, contact.html, privacy-policy.html, terms.html, disclaimer.html, 404.html

**Tamil Nadu (Primary):**
- company-registration-tamil-nadu.html
- private-limited-company-registration-tamil-nadu.html
- llp-registration-tamil-nadu.html
- gst-registration-tamil-nadu.html
- gst-filing-tamil-nadu.html
- accounting-services-tamil-nadu.html
- msme-registration-tamil-nadu.html
- fssai-registration-tamil-nadu.html
- tax-consultant-tamil-nadu.html

**Bengaluru (Secondary):**
- company-registration-bangalore.html
- private-limited-company-registration-bangalore.html
- gst-registration-bangalore.html

## Contact Form Setup (No PHP)

Form saves to Google Sheet titled **"taxwrite new leads"** + emails to **official@taxwrite.org**

1. Create Google Sheet named `taxwrite new leads`
2. Extensions → Apps Script → Paste `apps-script/Code.gs`
3. Deploy → New deployment → Web app → Execute as Me, Who has access: Anyone
4. Copy Web App URL and paste in `js/script.js`:
   ```js
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/.../exec";
   ```
5. See `GOOGLE_SHEET_SETUP.md` for detailed steps

Your current Web App URL (already wired):
```
https://script.google.com/macros/s/AKfycbxCtO8JhrvJNdX8SAeKS7KO2cebuFnAh1ZYonFumjFqcjcHSEqxVdum1djKKFwIud7M_g/exec
```
Sheet: https://docs.google.com/spreadsheets/d/1peFMaxnRVB5bAAF1yr0SUfVSp_E8YOu7OdIhx3uD0Yg/edit

## Deployment

- Upload to any static hosting (Hostinger, Netlify, Vercel, GitHub Pages)
- Ensure `.htaccess` 301 redirects for old India pages → TN pages
- `robots.txt` allows CSS/JS/images, `sitemap.xml` has 20 canonical URLs

## Local Preview

```bash
cd taxwrite-india
python3 -m http.server 8000
# Open http://localhost:8000
```

## License

© 2026 TaxWrite India. All Rights Reserved.
