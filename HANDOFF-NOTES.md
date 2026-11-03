# ShelemJ Website — Handoff Notes

Last updated: 2026-11-03. Live site: https://shelemjresourcesltd.com
Hosting: GitHub Pages (repo Justixxprime/shelemj-website, auto-deploys from `main`
via `.github/workflows/deploy.yml`). Domain registrar: Namecheap.
Contact/newsletter forms: Web3Forms (works on GitHub Pages).

---

## ✅ Done

### SEO foundation (2026-11-03)
- Every page's `canonical` and `og:url` now point to https://shelemjresourcesltd.com
  (they previously pointed to the old justixxprime.github.io address, which could
  have made Google index the wrong site). Homepage canonical is the root `/`.
- `og:image` is now a full URL on every page (relative paths break link previews).
- Added Twitter/X card tags (`twitter:card`, title, description, image) to all pages.
- `robots.txt` and `sitemap.xml` now use the real domain; sitemap has `lastmod`.
- Schema (JSON-LD) URLs updated to the real domain (Organization on all pages,
  FAQPage on faq.html).
- Better titles: homepage ("African Food Exporter, Lagos Nigeria"), Contact, FAQ.
- `404.html` uses root-relative paths so it renders correctly at any URL depth.
- Removed stale Netlify/PLACEHOLDER comments from index.html and contact.html.

### Earlier work
- Logo, favicons, 1200x630 share image, contrast fixes, trust badges, site search
  index (incl. 3 blog posts), alt text on every image, single H1 per page.
- `CNAME` file = shelemjresourcesltd.com. DNS A records + www CNAME are live.

---

## ⏳ Still to do (accounts only the owner can complete)

Rule: the CLIENT (ShelemJ owner) should own every account below. Add the
developer as a user/manager, not the other way round.

1. **Zoho Mail** — add domain, verify via TXT, set MX (mx.zoho.com 10,
   mx2.zoho.com 20, mx3.zoho.com 50), SPF TXT `v=spf1 include:zoho.com ~all`,
   DKIM TXT (value from Zoho), DMARC TXT at `_dmarc`. In Namecheap set Mail
   Settings to Custom MX. Do NOT delete the GitHub A records / www CNAME.
2. **After Zoho works**: replace shelemjresourcesltd@gmail.com in the site
   (about 43 places incl. schema) with the new address, and create a NEW
   Web3Forms access key for the new inbox (the current key delivers to Gmail).
3. **Google Search Console** — add a Domain property for shelemjresourcesltd.com,
   verify with the DNS TXT record, submit https://shelemjresourcesltd.com/sitemap.xml,
   then use URL Inspection → Request indexing on the key pages.
4. **Google Business Profile** — name exactly "ShelemJ Resources Ltd", keep name /
   address / phone identical everywhere, real photos, verify, add developer as manager.
5. **GA4** — NOT installed (an older version of these notes wrongly said it was).
   Create a GA4 property, copy the Measurement ID (G-XXXXXXXXXX), then add the
   snippet to every page.
6. **Bing Webmaster Tools** — import the site from Search Console (2 minutes).
7. **Off-site** — LinkedIn company page, Facebook/Instagram linking to the site,
   NEPC exporters directory listing, B2B marketplaces.
8. **Case studies** — only with real client details (no invented clients).

---

## 🔁 Monthly routine
Search Console errors and top queries; reply to Google reviews; one Google Business
post; publish one blog article; fix anything flagged.
