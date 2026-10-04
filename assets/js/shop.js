/* Power Nation — shop filtering by category, colour, search and sort.
   Deep links: shop.html#cat-bows, #colour-pink, #new, #best, #search */
(function () {
  "use strict";
  const P = window.PN_PRODUCTS, C = window.PN_COLOURS, CATS = window.PN_CATEGORIES;
  const $ = (id) => document.getElementById(id);
  const state = { cat: "all", colours: new Set(), tag: null, q: "", sort: "featured" };

  function readHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    state.cat = "all"; state.colours.clear(); state.tag = null;
    if (h.startsWith("cat-") && CATS[h.slice(4)]) state.cat = h.slice(4);
    else if (h.startsWith("colour-") && C[h.slice(7)]) state.colours.add(h.slice(7));
    else if (h === "new" || h === "best" || h === "team") state.tag = h;
    else if (h === "search") setTimeout(() => $("shop-search").focus(), 100);
  }

  function filtered(ignore) {
    const q = state.q.trim().toLowerCase();
    return P.filter((p) =>
      (ignore === "cat" || state.cat === "all" || p.cat === state.cat) &&
      (ignore === "colour" || !state.colours.size || p.colours.some((c) => state.colours.has(c))) &&
      (!state.tag || p.tags.includes(state.tag)) &&
      (!q || (p.name + " " + p.sub + " " + CATS[p.cat].name).toLowerCase().includes(q))
    );
  }

  function renderFilters() {
    const base = filtered("cat");
    const cats = [["all", "All", base.length]].concat(Object.keys(CATS).map((k) => [k, CATS[k].name, base.filter((p) => p.cat === k).length]));
    $("filter-cats").innerHTML = cats.map(([k, n, c]) => `<li><button type="button" data-cat="${k}" aria-pressed="${state.cat === k}">${n} <span>${c}</span></button></li>`).join("");
    $("filter-colours").innerHTML = Object.keys(C).map((k) => `<button class="colour-btn" type="button" data-colour="${k}" aria-pressed="${state.colours.has(k)}" aria-label="${C[k].name}"><i style="--c:${C[k].hex}"></i>${C[k].name.split(" ")[0]}</button>`).join("");
    const chips = [];
    if (state.cat !== "all") chips.push(`<button type="button" data-clear="cat">${CATS[state.cat].name} ✕</button>`);
    state.colours.forEach((k) => chips.push(`<button type="button" data-clear="colour:${k}">${C[k].name} ✕</button>`));
    if (state.tag) chips.push(`<button type="button" data-clear="tag">${{ new: "New in", best: "Best sellers", team: "Team order" }[state.tag]} ✕</button>`);
    $("active-filters").innerHTML = chips.join("");
  }

  function render() {
    let list = filtered();
    if (state.sort === "low") list = list.slice().sort((a, b) => a.price - b.price);
    if (state.sort === "high") list = list.slice().sort((a, b) => b.price - a.price);
    if (state.sort === "new") list = list.slice().sort((a, b) => b.tags.includes("new") - a.tags.includes("new"));

    const title = state.cat !== "all" ? CATS[state.cat].name : state.colours.size === 1 ? C[[...state.colours][0]].name : state.tag === "new" ? "New in" : state.tag === "best" ? "Best sellers" : "Shop all";
    $("shop-title").textContent = title;
    $("shop-sub").textContent = state.cat !== "all" ? CATS[state.cat].sub : "Bows, practice wear, warm-ups and kit bags in your team colours.";
    $("shop-count").textContent = list.length + (list.length === 1 ? " product" : " products");

    const colourKey = state.colours.size ? [...state.colours][0] : null;
    const cards = list.map((p) => window.PN_cardHTML(p, colourKey));
    const promo = `<div class="bespoke-inline">
      <div class="media media--photo"><img src="images/uniforms/bespoke-team.jpg" alt="Four athletes in bespoke Starlets cheer uniforms" loading="lazy"></div>
      <div class="bespoke-inline__copy"><span class="label" style="color:var(--ink)">Bespoke uniforms</span><h3>Want the whole team to match?</h3><p>Free design, free sample, no minimum order. Uniforms, bows and practice wear all made in your colours.</p><a class="btn" href="uniforms.html#quote">Get my free design</a></div>
    </div>`;
    if (cards.length > 6) cards.splice(6, 0, promo); else cards.push(promo);
    $("shop-grid").innerHTML = list.length ? cards.join("") : `<div class="grid-empty"><h3>No matches</h3><p class="lede">Try another colour, or we can make it custom in your team colours.</p><div class="btn-row" style="justify-content:center"><button class="btn btn--glass" type="button" data-clear="all">Clear filters</button><a class="btn btn--line" href="uniforms.html#quote">Ask for custom</a></div></div>`;
    window.PN_hydrateMedia($("shop-grid"));
    renderFilters();
  }

  function setHash(token) {
    try { history.replaceState(null, "", token ? "#" + token : location.pathname); } catch (e) { /* sandboxed */ }
  }

  document.addEventListener("click", (e) => {
    const cat = e.target.closest("[data-cat]");
    if (cat) { state.cat = cat.dataset.cat; setHash(state.cat === "all" ? "" : "cat-" + state.cat); render(); return; }
    const col = e.target.closest("[data-colour]");
    if (col) {
      const k = col.dataset.colour;
      state.colours.has(k) ? state.colours.delete(k) : state.colours.add(k);
      setHash(state.colours.size === 1 ? "colour-" + [...state.colours][0] : "");
      render(); return;
    }
    const clr = e.target.closest("[data-clear]");
    if (clr) {
      const v = clr.dataset.clear;
      if (v === "cat") state.cat = "all";
      else if (v === "tag") state.tag = null;
      else if (v.startsWith("colour:")) state.colours.delete(v.slice(7));
      else if (v === "all") { state.cat = "all"; state.colours.clear(); state.tag = null; state.q = ""; $("shop-search").value = ""; }
      setHash(""); render();
    }
  });
  $("shop-search").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("shop-sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  window.addEventListener("hashchange", () => { readHash(); render(); });

  readHash();
  render();
})();
