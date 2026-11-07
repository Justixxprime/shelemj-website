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

### Icons & brand identity everywhere (2026-11-03)
- Full icon set generated from the crest: favicon.ico (16/32/48), PNG favicons 16/32/48/96
  (tiny sizes use the bold gold "S" monogram so they stay readable; 96+ use the full crest),
  Apple touch icon 180 (opaque), Android/PWA 192/512 + maskable 192/512, Windows tile 150
  + browserconfig.xml, site.webmanifest (installable app identity, theme #0D0D0D).
- Icon tags standardised on every page with root-absolute paths (work in subfolders).
- New branded share card `assets/images/og-share-1200x630.jpg` (1200x630, 92 KB, no contact
  details on it). Added og:type/site_name/locale/image size+alt and twitter:image:alt.
- Organization schema logo now points to the square 512 icon.
- NOTE: social apps cache previews. After deploy use the Facebook Sharing Debugger / LinkedIn
  Post Inspector "re-scrape", and re-share on WhatsApp in a new chat to see the new card.

## ⏳ Still to do (accounts only the owner can complete)

Rule: the CLIENT (ShelemJ owner) should own every account below. Add the
developer as a user/manager, not the other way round.

1. **Zoho Mail (LAST — waiting for payment; Mail Lite 5GB, listed ₦770/user/month billed yearly)** — add domain, verify via TXT, set MX (mx.zoho.com 10,
   mx2.zoho.com 20, mx3.zoho.com 50), SPF TXT `v=spf1 include:zoho.com ~all`,
   DKIM TXT (value from Zoho), DMARC TXT at `_dmarc`. In Namecheap set Mail
   Settings to Custom MX. Do NOT delete the GitHub A records / www CNAME.
2. **After Zoho works**: replace info@shelemjresourcesltd.com in the site
   (about 43 places incl. schema) with the new address, and create a NEW
   Web3Forms access key for the new inbox (the current key delivers to Gmail).
3. **Google Search Console** — add a Domain property for shelemjresourcesltd.com,
   verify with the DNS TXT record, submit https://shelemjresourcesltd.com/sitemap.xml,
   then use URL Inspection → Request indexing on the key pages.
4. **Google Business Profile** — name exactly "ShelemJ Resources Ltd", keep name /
   address / phone identical everywhere, real photos, verify, add developer as manager.
5. **GA4** — DONE: installed on all pages with Measurement ID G-4DVRHQ6KFN (property "ShelemJ Website"). Data shows in GA4 within ~24-48h of the deploy. If you serve EU/UK visitors, consider a cookie notice + privacy page.
6. **Bing Webmaster Tools** — import the site from Search Console (2 minutes).
7. **Off-site** — LinkedIn company page, Facebook/Instagram linking to the site,
   NEPC exporters directory listing, B2B marketplaces.
8. **Case studies** — only with real client details (no invented clients).

---

## 🔁 Monthly routine
Search Console errors and top queries; reply to Google reviews; one Google Business
post; publish one blog article; fix anything flagged.

## 2026-11-07 — Design refinement + performance build
- NEW HEADER (all 20 pages): transparent over the hero, solid with hairline on scroll, slim contact strip
  (phone + info@ email) on desktop, underline nav, "Request a Sample" button, scroll progress line.
  Mobile menu rebuilt and moved OUT of the header (the overlay now covers the whole page; menu is hidden
  from keyboard users while closed). Resources dropdown markup/JS kept exactly.
- HERO: video panel now extends under the header and fades into the text side; scroll cue hidden on
  phones (it used to sit on the address); "Established 2013 - NEPC and CAC registered" line added (facts
  already on the site).
- FOOTER: contact column rebuilt - email can no longer break onto two lines; address/phones/email are
  tappable links with icons; mobile layout fixed.
- SAMPLE BAR: now a floating bottom bar (was a full-width gold strip under the header); hides near the footer.
- EMAIL/FORMS: Gmail replaced by info@shelemjresourcesltd.com in 44 places (incl. schema). New Web3Forms
  key in all 21 forms (enquiry + newsletter). Enquiry form: button disables while sending, errors are
  announced (role=alert) and readable.
- PERFORMANCE: hero video re-encoded 4.7 MB -> 2.3 MB (same footage, no audio track existed); hero video
  only autoplays on healthy connections (not data-saver/2G/3G), preload=metadata; 64 page photos also
  served as WebP (8.3 MB -> 5.3 MB; originals kept for lightbox links); width/height added to 178 images
  (no layout shift); film grain now a 9 KB tile instead of an SVG filter; Ken Burns runs once.
- FIXES: site search from /blog/ pages built broken links (now fixed) and now includes the 3 articles;
  Tailwind config now scans assets/js; one over-long blog title shortened; invalid iframe attribute fixed;
  footer + credit-line text raised to readable contrast; duplicate skip link not added (one already existed).
- NOT DONE / NEEDS OWNER: real photography (landscape hero video, sharp daylight product/packaging shots);
  product facts (origins, pack sizes, MOQ) - only what is already on the site is used; real Web3Forms
  delivery test; Search Console / Business Profile checks; WebP for gallery lightbox originals.
