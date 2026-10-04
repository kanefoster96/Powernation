# Power Nation

Website for Power Nation Cheer: bespoke cheer uniforms, plus a store for bows, practice wear, warm-ups, bags, accessories and Nfinity shoes.

Plain HTML, CSS and JavaScript. There's no build step, so open `index.html` or host the folder on any static host.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home: uniform pitch, new arrivals, shop by category and colour, comp-date calculator, coach proof, Club Shop, floors |
| `uniforms.html` | Bespoke uniforms: Hit Zero package, guarantees, tiers, process, upgrades, complete-the-kit, gallery |
| `shop.html` | Store with category, colour, search and sort. Deep links: `#cat-bows`, `#colour-pink`, `#new`, `#best` |
| `product.html#<id>` | Product page: colour, size, name personalisation, team upsell |
| `about.html` | Story, with links to floors, contact and free design |
| `design.html` | Free design request form (`#elite`, `#hybrid`, `#sublimated`, `#club-shop`, `#practice-wear` pre-select options) |
| `faq.html`, `size-guide.html`, `delivery.html` | Help pages |
| `floors.html`, `contact.html` | Floors and hire; contact form and details |

## Editing

- **Products, prices, colours**: `assets/js/products.js`
- **Phone, email, address, socials, free-delivery threshold**: `SITE` at the top of `assets/js/main.js`
- **Comp-date calculator timings**: `DESIGN_WEEKS` / `PRODUCTION_WEEKS` in `assets/js/main.js`
- **Colours and fonts**: tokens at the top of `assets/css/styles.css`
- **Images**: see [`images/README.md`](images/README.md). Missing images show a labelled placeholder.

## Before launch

- Replace placeholder prices (products and uniform tiers) and the "worth £" values in the Hit Zero package.
- Confirm the proposed policies: Sample-Match Promise, Comp-Date Lock, Fit-Right Guarantee, deposit/balance payments, Club Shop credit, £50 referral credit, "2027 comp season" booking pill.
- Connect the forms (free design, contact, newsletter) to a form service or CRM, and the bag checkout to your store platform (e.g. Shopify).
- Add real coach quotes and club logos.

## Brand & SEO

- **Logo:** `images/brand/pn-badge.svg` (traced vector badge). Favicons: `favicon.ico`, `images/brand/favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, maskable Android icons (dark backdrop, padded so the badge never touches the edges), plus `site.webmanifest`.
- **Share card:** `images/brand/og-image.jpg` (1200×630) used for WhatsApp, iMessage, Facebook, LinkedIn and X previews.
- **Every page** has a unique title and description, canonical URL, Open Graph and Twitter tags. Home has business structured data (address, phone, socials); Bespoke Uniforms has FAQ structured data.
- **`robots.txt` + `sitemap.xml`** list the public pages. The product page is `noindex` until products get their own URLs.
- **Preview domain is hidden from Google:** `vercel.json` sends `noindex` on any `*.vercel.app` address, so the preview (with placeholder prices) never competes with the live powernationcheer.com. It's indexed normally once the real domain points here.
- **When the real domain goes live:** replace `https://powernation-zeta.vercel.app` with the real domain in the page heads, `robots.txt` and `sitemap.xml` (one find-and-replace), then submit the sitemap in Google Search Console.
