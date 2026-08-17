# ShelemJ Website — Handoff Notes

This file tracks what's been done to the site and exactly what you still need to
do yourself (things only you can complete, like domain DNS and Google account
setup). Keep this file in the repo so future-you (or whoever helps you next) has
the full picture.

---

## ✅ Already done for you

### Logo & branding
- Replaced the nav/footer logo and all favicons with a cleaned, sharpened, properly
  cropped version of your gold crest emblem.
- Generated every required size: `favicon.ico`, 16×16, 32×32, 180×180 (Apple),
  192×192 and 512×512 (Android/PWA).
- Built a new 1200×630 social share image (`assets/images/og-image.jpeg`) so links
  posted to WhatsApp, LinkedIn, or Twitter show your logo properly instead of
  nothing.

### Content fixes
- Export Markets stat on the homepage now shows a confirmed **100+** instead of
  the "(confirm)" placeholder.
- Removed the empty "Additional Certification — Awaiting details" placeholder card
  on the Supply Chain page, since NEPC + CAC are your only two certifications
  right now. Grid rebalanced to look intentional with two cards, not three.
- Removed every remaining `PLACEHOLDER` comment in the codebase now that the
  underlying issue is resolved.

### SEO — structured data (new)
- Added **Organization schema** (JSON-LD) to all 21 pages — tells Google your
  business name, logo, address, and founding year in a machine-readable format.
  This is what can make a "knowledge panel" appear next to your search result.
- Added **FAQPage schema** to `faq.html`, built from your real 8 Q&As. This is
  what lets your FAQ answers show up directly inside Google's search results as
  expandable snippets — free extra real estate on the results page.
- **Correction to an earlier audit you shared with me**: meta descriptions,
  Open Graph tags, sitemap.xml, and robots.txt already existed site-wide before
  I touched anything. That audit was inaccurate on those specific points.

### Trust badges (real, not fabricated)
- The homepage had a "Trusted By" client-logo strip that was **already disabled**
  (commented out in the code) because the actual logo image files didn't exist —
  it would have shown broken images if it were ever turned on.
- I did not invent fake client logos or fake company names — that would be
  misleading to visitors. Instead I replaced it with a live trust-badge strip
  built from facts already verified elsewhere on your site: **CAC Registered**,
  **NEPC Registered**, **100% Direct African Sourcing**, **Est. 2013**.

### Site search
- Confirmed the search bar is fully functional — it's a small built-in index
  (no server needed, because a ~20-page static site doesn't need one). Added the
  3 blog articles to that index; they were missing before.

### Accessibility
- Ran real WCAG contrast-ratio math on your color system (not a guess). Found
  and fixed two genuine AA failures: the copyright/legal bar at the bottom of
  every page, and the registration-number line on the Contact page, were both
  rendering at 3.43:1 contrast (fails the 4.5:1 minimum for body text). Both
  bumped to a shade that passes comfortably.
- Everything else — skip-to-content link, visible focus rings, `aria-label`s on
  every icon button, `prefers-reduced-motion` support, labeled form fields, alt
  text on every image, single `<h1>` per page — was already correctly built.
  Your earlier build (or whoever built it) did this properly the first time.

### Domain
- Added a `CNAME` file to the repo containing `shelemjresourcesltd.com`. This is
  half of what's needed to connect your custom domain to GitHub Pages — see
  "Domain connection" below for the half only you can do.

### Google Analytics 4 (GA4)
- Added the GA4 tracking snippet to all 21 pages. It is currently **inactive**
  (placeholder ID `G-XXXXXXXXXX`) and does nothing until you complete the steps
  below and send me your real Measurement ID.

### Auto-translate
- Confirmed this already works with zero setup — every page has `<html lang="en">`,
  which is all browsers need to auto-offer translation to non-English visitors.
- Added `translate="no"` to the "ShelemJ" wordmark in the nav and footer so Google
  Translate never mangles your brand name into something else.

---

## ⏳ Still needs you — step by step

### 1. Get your GA4 Measurement ID
1. Go to **analytics.google.com** and sign in with any Google account.
2. Click **Start measuring** → Account name: `ShelemJ Resources` → Next.
3. Property name: `ShelemJ Website` → set timezone (Nigeria) and currency (NGN) → Next.
4. Pick an industry category (Retail or Import/Export) and business size (Small) → Create → accept the Terms of Service.
5. Choose **Web** as the platform (globe icon).
6. Enter `shelemjresourcesltd.com` as the URL, name the stream `ShelemJ Website` → **Create stream**.
7. Copy the code shown at the top — looks like `G-ABC1234XYZ`. That's your Measurement ID.
8. Send that code to me (or search-and-replace `G-XXXXXXXXXX` yourself in every HTML file) and tracking goes live immediately.

### 2. Connect the custom domain (shelemjresourcesltd.com)
1. Log into wherever you bought the domain (Namecheap, GoDaddy, Whogohost, etc.) → find **DNS Settings** / **Manage DNS**.
2. Add **four A records**, Host/Name = `@`, pointing to GitHub's servers:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add **one CNAME record**, Host/Name = `www`, pointing to `justixxprime.github.io`.
4. Push this updated codebase (it already contains the `CNAME` file) to your GitHub repo — your existing GitHub Action will auto-deploy it.
5. In the repo, go to **Settings → Pages**, type `shelemjresourcesltd.com` under **Custom domain**, Save.
6. Wait 10 minutes–24 hours for DNS to propagate. Once GitHub shows a green checkmark, tick **Enforce HTTPS**.

### 3. Case studies — I need real information first
I did **not** fabricate case studies with invented client names, order volumes,
or results — that would be a false claim about your business, which I won't do
even if it "looks" more impressive. Your current Testimonials page uses
unattributed quotes, which is fine as-is, but a real case study needs real
specifics. When you're ready, send me (per client, only what you're comfortable
sharing publicly):
- Client/company name (or "a UK-based grocer" if they prefer anonymity)
- What they buy and roughly how much
- One concrete before/after detail (e.g. "went from a single trial order to a
  standing monthly order within 2 months")

I'll turn that into a proper case-study section the moment you have it.

---

## 📁 What's in this zip
Everything — the full site, ready to re-upload to GitHub. Nothing needs to be
merged manually; this replaces your existing repo contents.
