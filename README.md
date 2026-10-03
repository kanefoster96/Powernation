# Power Nation

Website for Power Nation Cheer: bespoke cheer uniforms, plus a store for bows, practice wear, warm-ups, bags, accessories and Nfinity shoes.

Plain HTML, CSS and JavaScript. There's no build step, so open `index.html` or host the folder on any static host.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home: uniform pitch, new arrivals, shop by category and colour, comp-date calculator, coach proof, Club Shop, floors |
| `uniforms.html` | Bespoke uniforms: Hit Zero package, guarantees, tiers, process, upgrades, complete-the-kit, size guide, FAQs, free design form |
| `shop.html` | Store with category, colour, search and sort. Deep links: `#cat-bows`, `#colour-pink`, `#new`, `#best` |
| `product.html#<id>` | Product page: colour, size, name personalisation, team upsell |
| `about.html` | Story, floors and hire, contact form |

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
