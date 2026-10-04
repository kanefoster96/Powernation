/* Power Nation — shared site behaviour: header/footer, image slots,
   bag, quick add, carousels, toggles and forms. */
(function () {
  "use strict";

  /* ---------- site settings (edit here) ---------- */
  const SITE = {
    email: "info@powernationcheer.co.uk",
    phone: "01788 227 195",
    phoneHref: "+441788227195",
    address: ["Unit 17 Webb Ellis Business Park", "Rugby", "CV21 2NP"],
    freeShip: 75, // PLACEHOLDER: free UK delivery threshold in £
    socials: {
      instagram: "https://www.instagram.com/powernationcheer/",
      facebook: "https://www.facebook.com/Powernationcheerltd/",
      tiktok: "https://www.tiktok.com/@powernationcheer", // PLACEHOLDER: confirm handle
      youtube: "" // add a link to show the icon
    }
  };
  window.PN_SITE = SITE;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const money = (n) => "£" + n.toFixed(2);
  const page = document.body.dataset.page || "";

  /* ---------- icons ---------- */
  const I = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7-4.4-9-9.2C1.7 7.4 4 4 7.4 4c2 0 3.4 1.1 4.6 2.6C13.2 5.1 14.6 4 16.6 4 20 4 22.3 7.4 21 10.8 19 15.6 12 20 12 20Z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 5 7 7-7 7"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8h3.3Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.2c-1.5 0-2.8-.4-4-1.2v6.3c0 3.6-2.7 5.8-5.8 5.8A5.7 5.7 0 0 1 5 15.3c0-3.4 3-6 6.6-5.6v3.3c-1.6-.4-3.3.7-3.3 2.4 0 1.4 1.1 2.5 2.5 2.5 1.6 0 2.6-1 2.6-2.9V3h3.2Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.6-1-2.7-2.6-2.9C16.9 5 12 5 12 5s-4.9 0-7.4.3C3 5.5 2.2 6.6 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.6 1 2.7 2.6 2.9C7.1 19 12 19 12 19s4.9 0 7.4-.3c1.6-.2 2.4-1.3 2.6-2.9.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9.5h8M8 12.5h5"/></svg>'
  };
  window.PN_ICONS = I;

  /* ---------- logo ---------- */
  if (window.PN_LOGO_SPRITE && !document.getElementById("pn-badge")) {
    document.body.insertAdjacentHTML("afterbegin", window.PN_LOGO_SPRITE);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) $$(".pn-shine-anim").forEach((a) => a.remove());
  }
  // decorative=true when the surrounding link already names the brand
  const badge = (cls = "", decorative = true) => window.PN_LOGO_SPRITE
    ? `<svg class="logo__badge ${cls}" viewBox="${window.PN_LOGO_VIEWBOX}" preserveAspectRatio="xMidYMid meet" ${decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Power Nation"'}><use href="#pn-badge" xlink:href="#pn-badge"/></svg>`
    : `<span class="logo__word">Power<b>Nation</b></span>`;
  window.PN_badge = badge;

  /* ---------- header ---------- */
  const NAV = [
    ["Bespoke Uniforms", "uniforms.html", "uniforms"],
    ["Shop", "shop.html", "shop"],
    ["Bows", "shop.html#cat-bows", ""],
    ["Practice Wear", "shop.html#cat-practice", ""],
    ["Floors", "floors.html", "floors"],
    ["About", "about.html", "about"]
  ];

  // Marquee: two identical sets side by side; the track slides exactly one set width, so the loop is seamless
  const ANNOUNCE = ["No minimum orders", "Free design and sample before you pay", "Uniforms in as little as 5 weeks", "Official Nfinity stockist"];
  const announceSet = (hidden) => `<div class="announce__set"${hidden ? ' aria-hidden="true"' : ""}>${[0, 1, 2].map(() => ANNOUNCE.map((t) => `<span>${t}</span>`).join("")).join("")}</div>`;

  /* ---------- active nav link: matches page and shop filter (#cat-…) ---------- */
  function markActiveNav() {
    const file = (location.pathname.split("/").pop() || "index.html").replace(/^$/, "index.html");
    const hash = location.hash;
    const links = $$(".nav-desktop a, .menu-list a");
    const same = (a) => { const u = new URL(a.getAttribute("href"), location.href); return (u.pathname.split("/").pop() || "index.html") === file; };
    let match = links.filter((a) => same(a) && new URL(a.getAttribute("href"), location.href).hash === hash && hash);
    if (!match.length) match = links.filter((a) => same(a) && !new URL(a.getAttribute("href"), location.href).hash);
    if (!match.length && page === "shop") match = links.filter((a) => /^shop\.html$/.test(a.getAttribute("href")));
    links.forEach((a) => a.removeAttribute("aria-current"));
    match.forEach((a) => a.setAttribute("aria-current", "page"));
  }

  function headerHTML() {
    const nav = NAV.map(([t, h]) => `<a href="${h}">${t}</a>`).join("");
    return `
    <a class="skip" href="#main">Skip to content</a>
    <div class="announce" role="region" aria-label="Offers"><div class="announce__track">${announceSet(false)}${announceSet(true)}</div></div>
    <header class="header">
      <div class="wrap header__inner">
        <div class="header__left">
          <button class="icon-btn menu-btn" type="button" aria-label="Open menu" data-open="menu">${I.menu}</button>
          <nav class="nav-desktop" aria-label="Main">${nav}</nav>
        </div>
        <div class="header__center">
          <a class="logo" href="index.html" aria-label="Power Nation home">
            ${badge()}
          </a>
        </div>
        <div class="header__right">
          <a class="icon-btn" href="shop.html#search" aria-label="Search the shop">${I.search}</a>
          <a class="icon-btn" href="contact.html" aria-label="Account and contact">${I.user}</a>
          <button class="icon-btn" type="button" aria-label="Open bag" data-open="bag">${I.bag}<span class="bag-count" data-bag-count hidden>0</span></button>
        </div>
      </div>
    </header>
    <div class="scrim" data-scrim></div>
    <aside class="drawer drawer--left" id="drawer-menu" aria-label="Menu" aria-hidden="true">
      <div class="drawer__head"><a class="logo" href="index.html" aria-label="Power Nation home">${badge("logo__badge--menu")}</a><button class="icon-btn" type="button" aria-label="Close menu" data-close>${I.close}</button></div>
      <div class="drawer__body">
        <ul class="menu-list">
          <li><a href="uniforms.html">Bespoke Uniforms <span>Free design</span></a></li>
          <li><a href="shop.html">Shop all</a></li>
          <li><a href="shop.html#cat-bows">Bows</a></li>
          <li><a href="shop.html#cat-practice">Practice Wear</a></li>
          <li><a href="shop.html#cat-warmups">Hoodies &amp; Warm-ups</a></li>
          <li><a href="shop.html#cat-bags">Backpacks</a></li>
          <li><a href="shop.html#cat-shoes">Cheer Shoes</a></li>
          <li><a href="floors.html">Floors &amp; Hire</a></li>
          <li><a href="faq.html">FAQs</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
        <div class="menu-contact">
          <span class="label">Talk to the team</span>
          <span>${SITE.phone}</span>
          <span>${SITE.email}</span>
        </div>
      </div>
      <div class="drawer__foot"><a class="btn btn--pink" href="design.html">Get my free design</a></div>
    </aside>
    <aside class="drawer drawer--right" id="drawer-bag" aria-label="Your bag" aria-hidden="true">
      <div class="drawer__head"><h2>Your bag</h2><button class="icon-btn" type="button" aria-label="Close bag" data-close>${I.close}</button></div>
      <div class="drawer__body" data-bag-body></div>
      <div class="drawer__foot" data-bag-foot></div>
    </aside>
    <aside class="drawer drawer--right" id="drawer-quick" aria-label="Quick add" aria-hidden="true">
      <div class="drawer__head"><h2>Quick add</h2><button class="icon-btn" type="button" aria-label="Close quick add" data-close>${I.close}</button></div>
      <div class="drawer__body" data-quick-body></div>
      <div class="drawer__foot" data-quick-foot></div>
    </aside>
    <div class="toast" role="status" aria-live="polite" data-toast></div>`;
  }

  function footerHTML() {
    const soc = Object.entries(SITE.socials).filter(([, u]) => u)
      .map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${k}">${I[k]}</a>`).join("");
    return `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__cta">
          <div class="footer__brand">
            ${badge("logo__badge--lg", false)}
            <h2>Your colours.<br><span class="ab-text">Your stage.</span></h2>
          </div>
          <form class="newsletter" data-newsletter>
            <label class="label" for="nl-email">Get new bows and offers by email</label>
            <div class="newsletter__row">
              <input id="nl-email" type="email" required placeholder="Email address" autocomplete="email">
              <button class="btn btn--pink" type="submit">Join</button>
            </div>
          </form>
        </div>
        <div class="footer__cols">
          <details open><summary>Help</summary><ul>
            <li><a href="faq.html">Uniform FAQs</a></li>
            <li><a href="size-guide.html">Size guide</a></li>
            <li><a href="delivery.html">Delivery &amp; returns</a></li>
            <li><a href="contact.html">Contact us</a></li>
          </ul></details>
          <details open><summary>Shop</summary><ul>
            <li><a href="uniforms.html">Bespoke uniforms</a></li>
            <li><a href="shop.html#cat-bows">Bows</a></li>
            <li><a href="shop.html#cat-practice">Practice wear</a></li>
            <li><a href="shop.html#cat-shoes">Nfinity shoes</a></li>
          </ul></details>
          <details open><summary>More</summary><ul>
            <li><a href="about.html">About Power Nation</a></li>
            <li><a href="floors.html">Sprung floors &amp; hire</a></li>
            <li><a href="design.html">Free uniform design</a></li>
            <li><a href="contact.html">Contact us</a></li>
          </ul></details>
          <details open><summary>Address</summary><ul>
            ${SITE.address.map((l) => `<li>${l}</li>`).join("")}
            <li>${SITE.phone}</li>
            <li>${SITE.email}</li>
          </ul></details>
        </div>
        <div class="socials">${soc}</div>
        <div class="footer__base">
          <span>© ${new Date().getFullYear()} Power Nation Cheer Limited. All rights reserved.</span>
          <span>Company no. 12069903 · Registered office: Celixir House, Stratford Business and Technology Park, Banbury Road, Stratford-upon-Avon CV37 7GZ</span>
        </div>
        <div class="footer__mega" aria-hidden="true">Power Nation</div>
      </div>
    </footer>
    ${!["uniforms", "design"].includes(page) ? `<a class="fab-quote" href="design.html">${I.pencil}<span>Free design</span></a>` : ""}`;
  }

  const h = $("[data-include=header]");
  if (h) h.outerHTML = headerHTML();
  markActiveNav();
  window.addEventListener("hashchange", markActiveNav);
  const f = $("[data-include=footer]");
  if (f) f.outerHTML = footerHTML();
  // Footer link columns: always open on desktop, collapsible on phones
  if (matchMedia("(max-width: 899px)").matches) $$(".footer__cols details").forEach((d) => d.removeAttribute("open"));

  /* ---------- image slots ---------- */
  if (/[?&]slots\b/.test(location.search)) document.documentElement.classList.add("show-slots");
  // <div class="media" data-note="what to shoot" data-size="2400×1350"><img src="images/…" alt="…"></div>
  function hydrateMedia(root = document) {
    $$(".media", root).forEach((m) => {
      if (m.dataset.ready) return;
      m.dataset.ready = "1";
      const img = $("img", m);
      const src = img ? img.getAttribute("src") : m.dataset.src || "";
      const ph = document.createElement("div");
      ph.className = "media__ph";
      ph.setAttribute("aria-hidden", "true");
      // Missing photos show a branded "coming soon" image. Add ?slots to the URL to see which file goes where.
      ph.innerHTML = `<em class="media__soon">Image coming soon</em><b>${src.replace(/^images\//, "")}</b>${m.dataset.note ? `<span>${m.dataset.note}</span>` : ""}${m.dataset.size ? `<i>${m.dataset.size}</i>` : ""}`;
      m.appendChild(ph);
      const vid = $("video", m);
      // Skip background video for reduced-motion users and data-saver connections
      const lite = matchMedia("(prefers-reduced-motion: reduce)").matches || (navigator.connection && navigator.connection.saveData);
      if (vid && lite) vid.remove();
      else if (vid) {
        const s = $("source", vid);
        const kill = () => vid.remove();
        if (s) s.addEventListener("error", kill);
        vid.addEventListener("error", kill);
      }
      if (!img) { m.classList.add("is-missing"); return; }
      const missing = () => m.classList.add("is-missing");
      if (img.complete && img.naturalWidth === 0) missing();
      else img.addEventListener("error", missing);
    });
  }
  window.PN_hydrateMedia = hydrateMedia;

  /* ---------- product cards ---------- */
  // Per-colour photos: products can set images: { colourKey: "path.jpg" } and colourNames: { colourKey: "Label" }
  const imgFor = (p, c, n) => (!n && p && p.images && p.images[c]) ? p.images[c] : `images/products/${p.id}${n ? "-" + n : ""}.jpg`;
  const cname = (p, c) => (p && p.colourNames && p.colourNames[c]) || ((window.PN_COLOURS || {})[c] || {}).name || c;
  window.PN_img = imgFor;
  window.PN_cname = cname;

  function swatchesHTML(p, max = 6) {
    const C = window.PN_COLOURS || {};
    const shown = p.colours.slice(0, max).map((c, i) => p.images
      ? `<button type="button" class="swatch" style="--c:${C[c].hex}" aria-label="Show ${cname(p, c)}" aria-pressed="${i === 0}" data-swatch="${p.id}|${c}"></button>`
      : `<span class="swatch" style="--c:${C[c].hex}" title="${cname(p, c)}"></span>`).join("");
    const more = p.colours.length > max ? `<span class="swatch swatch--more">+${p.colours.length - max}</span>` : "";
    return `<div class="swatches" aria-label="${p.colours.length} colours">${shown}${more}</div>`;
  }
  function cardHTML(p, colourKey) {
    const C = window.PN_COLOURS || {};
    const c = colourKey && p.colours.includes(colourKey) ? colourKey : p.colours[0];
    const tint = C[c].hex.startsWith("#") ? C[c].hex : "#b9a6ff";
    const badge = p.tags.includes("new") ? '<span class="card__badge">New</span>' : p.tags.includes("best") ? '<span class="card__badge card__badge--pink">Best seller</span>' : p.tags.includes("team") ? '<span class="card__badge">Team order</span>' : "";
    const fav = getFavs().includes(p.id);
    return `<div class="card">
      <div class="media" style="--tint:${tint}" data-note="${p.name} in ${cname(p, c)}. Clean studio shot on grey, 4:5" data-size="1200×1500">
        <img src="${imgFor(p, c)}" alt="${p.name} in ${cname(p, c)}" loading="lazy">
        <a class="card__hit" href="product.html#${p.id}" tabindex="-1" aria-hidden="true"></a>
        ${badge}
        <button class="card__fab card__fab--fav" type="button" aria-label="Save ${p.name}" aria-pressed="${fav}" data-fav="${p.id}">${I.heart}</button>
        <button class="card__fab card__fab--add" type="button" aria-label="Quick add ${p.name}" data-quick="${p.id}">${I.plus}</button>
      </div>
      ${swatchesHTML(p)}
      <a class="card__name" href="product.html#${p.id}">${p.name}</a>
      <div class="card__sub">${p.sub}</div>
      <div class="card__price">${money(p.price)}</div>
    </div>`;
  }
  window.PN_cardHTML = cardHTML;

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };
  let bag = store.get("pn-bag", []);
  let favs = store.get("pn-favs", []);
  function getFavs() { return favs; }

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $("[data-toast]");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("is-on"), 2600);
  }
  window.PN_toast = toast;

  /* ---------- drawers ---------- */
  let lastFocus = null;
  function openDrawer(name) {
    closeDrawers(true);
    const d = $("#drawer-" + name);
    if (!d) return;
    lastFocus = document.activeElement;
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    $("[data-scrim]").classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => { const b = $("[data-close]", d); b && b.focus(); }, 50);
  }
  function closeDrawers(silent) {
    $$(".drawer.is-open").forEach((d) => { d.classList.remove("is-open"); d.setAttribute("aria-hidden", "true"); });
    const s = $("[data-scrim]");
    if (s) s.classList.remove("is-open");
    document.body.style.overflow = "";
    if (!silent && lastFocus) lastFocus.focus();
  }
  window.PN_openDrawer = openDrawer;

  /* ---------- bag ---------- */
  function addToBag(item) {
    const key = [item.id, item.colour, item.size, item.personal || ""].join("|");
    const found = bag.find((b) => b.key === key);
    if (found) found.qty += item.qty || 1;
    else bag.push({ ...item, key, qty: item.qty || 1 });
    store.set("pn-bag", bag);
    renderBag();
    openDrawer("bag");
  }
  window.PN_addToBag = addToBag;

  function renderBag() {
    const P = window.PN_PRODUCTS || [];
    const C = window.PN_COLOURS || {};
    const count = bag.reduce((n, b) => n + b.qty, 0);
    $$("[data-bag-count]").forEach((el) => { el.textContent = count; el.hidden = count === 0; });
    const body = $("[data-bag-body]");
    const foot = $("[data-bag-foot]");
    if (!body) return;
    const total = bag.reduce((n, b) => n + b.qty * b.price, 0);
    const left = Math.max(0, SITE.freeShip - total);
    const meter = `<div class="ship-meter">
      <span>${left > 0 ? `You're <b>${money(left)}</b> away from free UK delivery` : "<b>Free UK delivery unlocked</b>"}</span>
      <div class="ship-meter__bar"><div class="ship-meter__fill" style="width:${Math.min(100, (total / SITE.freeShip) * 100)}%"></div></div>
    </div>`;
    if (!bag.length) {
      body.innerHTML = `${meter}<div class="bag-empty"><p>Your bag is empty.</p><a class="btn btn--glass" href="shop.html">Shop the store</a></div>`;
      foot.innerHTML = `<a class="btn btn--line btn--block" href="design.html">Team uniforms? Get a free design</a>`;
      return;
    }
    body.innerHTML = meter + `<ul class="bag-items">${bag.map((b, i) => {
      const p = P.find((x) => x.id === b.id) || {};
      const tint = C[b.colour] && C[b.colour].hex.startsWith("#") ? C[b.colour].hex : "#b9a6ff";
      return `<li class="bag-item">
        <div class="media media--hide-ph" style="--tint:${tint}"><img src="${imgFor(p.id ? p : { id: b.id }, b.colour)}" alt=""></div>
        <div><div class="bag-item__name">${p.name || b.id}</div>
          <div class="bag-item__meta">${C[b.colour] ? cname(p, b.colour) : ""} · ${b.size}${b.personal ? ` · “${b.personal}”` : ""}</div>
          <div class="qty"><button type="button" aria-label="Decrease quantity" data-qty="${i}" data-d="-1">−</button><span>${b.qty}</span><button type="button" aria-label="Increase quantity" data-qty="${i}" data-d="1">+</button></div>
        </div>
        <div class="bag-item__price">${money(b.qty * b.price)}</div>
      </li>`;
    }).join("")}</ul>
    <div class="bag-upsell"><span class="label label--pink">Ordering for a whole team?</span><p>Order 10 or more and get team prices, plus names added for free.</p><a class="link-u" href="design.html">Get team pricing</a></div>`;
    foot.innerHTML = `<div class="bag-total"><span>Subtotal</span><span>${money(total)}</span></div>
      <button class="btn btn--pink btn--block" type="button" data-checkout>Checkout</button>
      <span class="form__note">Taxes included. Delivery calculated at checkout.</span>`;
    hydrateMedia(body);
  }

  /* ---------- quick add ---------- */
  function openQuick(id) {
    const P = window.PN_PRODUCTS || [];
    const C = window.PN_COLOURS || {};
    const p = P.find((x) => x.id === id);
    if (!p) return;
    let colour = p.colours[0];
    let size = p.sizes.length === 1 ? p.sizes[0] : null;
    const body = $("[data-quick-body]");
    const foot = $("[data-quick-foot]");
    const draw = () => {
      body.innerHTML = `<div class="stack" style="gap:22px">
        <div style="display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:center">
          <div class="media media--hide-ph" style="--tint:${C[colour].hex.startsWith("#") ? C[colour].hex : "#b9a6ff"};aspect-ratio:4/5;border-radius:10px"><img src="${imgFor(p, colour)}" alt=""></div>
          <div><div class="card__name">${p.name}</div><div class="card__sub">${p.sub}</div><div class="card__price" style="margin-top:6px">${money(p.price)}</div></div>
        </div>
        <div><div class="opt-label">Colour <b>${cname(p, colour)}</b></div><div class="colour-opts">${p.colours.map((c) => `<button type="button" style="--c:${C[c].hex}" aria-label="${cname(p, c)}" aria-pressed="${c === colour}" data-qc="${c}"></button>`).join("")}</div></div>
        <div><div class="opt-label">Size <a href="size-guide.html" style="color:inherit">Size guide</a></div><div class="size-opts">${p.sizes.map((s) => `<button type="button" aria-pressed="${s === size}" data-qs="${s}">${s}</button>`).join("")}</div></div>
      </div>`;
      foot.innerHTML = `<button class="btn btn--pink btn--block" type="button" data-qadd ${size ? "" : "disabled style=\"opacity:.5\""}>${size ? "Add to bag · " + money(p.price) : "Select a size"}</button>
        <a class="link-u" style="justify-self:center" href="product.html#${p.id}">View full details</a>`;
      hydrateMedia(body);
    };
    body.onclick = (e) => {
      const c = e.target.closest("[data-qc]"); if (c) { colour = c.dataset.qc; draw(); }
      const s = e.target.closest("[data-qs]"); if (s) { size = s.dataset.qs; draw(); }
    };
    foot.onclick = (e) => {
      if (e.target.closest("[data-qadd]") && size) addToBag({ id: p.id, colour, size, price: p.price });
    };
    draw();
    openDrawer("quick");
  }
  window.PN_openQuick = openQuick;

  /* ---------- delegated clicks ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target;
    const open = t.closest("[data-open]");
    if (open) { e.preventDefault(); if (open.dataset.open === "bag") renderBag(); openDrawer(open.dataset.open); return; }
    if (t.closest("[data-close]") || t.closest("[data-scrim]")) { closeDrawers(); return; }
    if (t.closest(".drawer a[href]")) { closeDrawers(true); }
    const sw = t.closest("[data-swatch]");
    if (sw) {
      e.preventDefault();
      const [pid, c] = sw.dataset.swatch.split("|");
      const prod = (window.PN_PRODUCTS || []).find((x) => x.id === pid);
      const card = sw.closest(".card");
      const img = card && card.querySelector(".media img");
      if (prod && img) { img.src = imgFor(prod, c); img.alt = `${prod.name} in ${cname(prod, c)}`; card.querySelector(".media").classList.remove("is-missing"); }
      if (card) $$("[data-swatch]", card).forEach((b) => b.setAttribute("aria-pressed", b === sw));
      return;
    }
    const q = t.closest("[data-quick]");
    if (q) { e.preventDefault(); openQuick(q.dataset.quick); return; }
    const fv = t.closest("[data-fav]");
    if (fv) {
      e.preventDefault();
      const id = fv.dataset.fav;
      favs = favs.includes(id) ? favs.filter((x) => x !== id) : favs.concat(id);
      store.set("pn-favs", favs);
      $$(`[data-fav="${id}"]`).forEach((b) => b.setAttribute("aria-pressed", favs.includes(id)));
      toast(favs.includes(id) ? "Saved to your favourites" : "Removed from favourites");
      return;
    }
    const qty = t.closest("[data-qty]");
    if (qty) {
      const i = +qty.dataset.qty;
      bag[i].qty += +qty.dataset.d;
      if (bag[i].qty <= 0) bag.splice(i, 1);
      store.set("pn-bag", bag);
      renderBag();
      return;
    }
    if (t.closest("[data-checkout]")) { toast("Checkout connects to your store platform at launch"); return; }
    const rb = t.closest("[data-rail-btn]");
    if (rb) {
      const rail = $("#" + rb.dataset.railBtn);
      if (rail) rail.scrollBy({ left: (rb.dataset.dir === "next" ? 1 : -1) * rail.clientWidth * 0.8, behavior: "smooth" });
    }
    const seg = t.closest("[data-seg]");
    if (seg) {
      const group = seg.closest(".seg");
      $$("button", group).forEach((b) => b.setAttribute("aria-pressed", b === seg));
      $$(`[data-seg-panel="${group.dataset.group}"]`).forEach((p) => { p.hidden = p.dataset.value !== seg.dataset.seg; });
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawers(); });

  /* ---------- forms ---------- */
  document.addEventListener("submit", (e) => {
    const nl = e.target.closest("[data-newsletter]");
    if (nl) { e.preventDefault(); nl.reset(); toast("You're on the list. Watch your inbox."); return; }
    const qf = e.target.closest("[data-quote-form]");
    if (qf) {
      e.preventDefault();
      // Connect this to your form service (e.g. Formspree, Netlify Forms, or your CRM) at launch.
      const name = (qf.querySelector("[name=name]") || {}).value || "";
      const done = document.getElementById(qf.dataset.success);
      qf.hidden = true;
      if (done) { done.hidden = false; const n = done.querySelector("[data-name]"); if (n) n.textContent = name.split(" ")[0] || "coach"; done.scrollIntoView({ behavior: "smooth", block: "center" }); }
    }
  });

  /* ---------- comp-date deadline calculator ---------- */
  // Weeks needed before a competition: design + sample approval, then production.
  const DESIGN_WEEKS = 3;     // PLACEHOLDER: typical brief-to-approved-sample time
  const PRODUCTION_WEEKS = 5; // fastest production lead time
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-countdown]");
    if (!form) return;
    e.preventDefault();
    const val = $("input[type=date]", form).value;
    const out = $(".countdown__out", form);
    if (!val) { out.textContent = "Pick your competition date first."; return; }
    const comp = new Date(val + "T12:00:00");
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const deadline = new Date(comp); deadline.setDate(comp.getDate() - (DESIGN_WEEKS + PRODUCTION_WEEKS) * 7);
    const days = Math.round((deadline - today) / 86400000);
    const fmt = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
    if (days > 0) {
      out.innerHTML = `<b>Get in touch by ${fmt(deadline)}</b><span>That's ${days} day${days === 1 ? "" : "s"} from today. The sooner the better.</span><a class="link-u" href="design.html">Get my free design</a>`;
      out.dataset.state = days < 14 ? "soon" : "ok";
    } else {
      out.innerHTML = `<b>That's tight, but call us</b><span>We usually need ${DESIGN_WEEKS + PRODUCTION_WEEKS} weeks, but printed uniforms can sometimes be done faster. Call us today on ${SITE.phone}.</span><a class="link-u" href="design.html">Send my brief now</a>`;
      out.dataset.state = "late";
    }
    const q = document.getElementById("q-date");
    if (q) q.value = val;
    try { localStorage.setItem("pn-comp-date", val); } catch (err) { /* storage blocked */ }
  });

  /* ---------- home rails rendered from data ---------- */
  $$("[data-products]").forEach((el) => {
    const P = window.PN_PRODUCTS || [];
    const [kind, val] = el.dataset.products.split(":");
    let list = P;
    if (kind === "tag") list = P.filter((p) => p.tags.includes(val));
    if (kind === "cat") list = P.filter((p) => p.cat === val);
    if (kind === "cats") list = P.filter((p) => val.split(",").includes(p.cat));
    const limit = +(el.dataset.limit || 12);
    el.innerHTML = list.slice(0, limit).map((p) => cardHTML(p)).join("");
  });

  /* ---------- sticky mobile action bars ---------- */
  // <div class="mbar" data-mbar data-show-after=".hero" data-hide-on=".footer">
  function initMbar(bar) {
    if (!bar || bar.dataset.ready || !("IntersectionObserver" in window)) return;
    bar.dataset.ready = "1";
    const after = $(bar.dataset.showAfter);
    const hide = bar.dataset.hideOn ? $(bar.dataset.hideOn) : null;
    let past = false, inHide = false;
    const update = () => {
      const on = past && !inHide;
      bar.classList.toggle("is-on", on);
      document.body.classList.toggle("has-mbar", on);
    };
    if (after) new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(after);
    if (hide) new IntersectionObserver(([e]) => { inHide = e.isIntersecting; update(); }).observe(hide);
  }
  window.PN_initMbar = initMbar;
  $$("[data-mbar]").forEach(initMbar);

  hydrateMedia();
  renderBag();
})();
