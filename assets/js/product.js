/* Power Nation — product detail page. URL: product.html#<product-id> */
(function () {
  "use strict";
  const P = window.PN_PRODUCTS, C = window.PN_COLOURS, CATS = window.PN_CATEGORIES, I = window.PN_ICONS;
  const money = (n) => "£" + n.toFixed(2);
  const PERSONAL_PRICE = 5; // PLACEHOLDER: name personalisation price in £

  function render() {
    const id = decodeURIComponent(location.hash.slice(1));
    const p = P.find((x) => x.id === id) || P[0];
    let colour = p.colours[0];
    let size = p.sizes.length === 1 ? p.sizes[0] : null;
    let qty = 1;
    let personal = false;
    document.title = p.name + " | Power Nation";

    document.getElementById("pdp-crumbs").innerHTML = `<a href="shop.html">Shop</a> / <a href="shop.html#cat-${p.cat}">${CATS[p.cat].name}</a> / <span>${p.name}</span>`;
    const root = document.getElementById("pdp");

    const draw = () => {
      const tint = C[colour].hex.startsWith("#") ? C[colour].hex : "#b9a6ff";
      const price = p.price + (personal ? PERSONAL_PRICE : 0);
      const canPersonal = ["practice", "warmups", "bags", "accessories"].includes(p.cat);
      root.innerHTML = `
        <div class="pdp__gallery">
          ${p.images
            ? [colour].concat(p.colours.filter((c) => c !== colour && p.images[c])).map((c) => `<div class="media" style="--tint:${tint}"><img src="${p.images[c]}" alt="${p.name} in ${window.PN_cname(p, c)}"></div>`).join("")
            : `<div class="media" style="--tint:${tint}" data-note="${p.name}, front view on model, grey studio" data-size="1600×2000"><img src="images/products/${p.id}.jpg" alt="${p.name} in ${C[colour].name}"></div>
          <div class="media" style="--tint:${tint}" data-note="Second angle or back view" data-size="1600×2000"><img src="images/products/${p.id}-2.jpg" alt="${p.name}, alternate view" loading="lazy"></div>
          <div class="media" style="--tint:${tint}" data-note="Detail close-up: fabric, stones or logo" data-size="1600×2000"><img src="images/products/${p.id}-3.jpg" alt="${p.name}, detail" loading="lazy"></div>`}
        </div>
        <div class="pdp__info">
          <div class="stack" style="gap:10px">
            <span class="label">${CATS[p.cat].name}</span>
            <h1>${p.name}</h1>
            <div class="pdp__price">${money(price)}</div>
          </div>
          <p class="lede" style="font-size:1rem">${p.desc}</p>
          <div><div class="opt-label">Colour <b>${window.PN_cname(p, colour)}</b></div>
            <div class="colour-opts">${p.colours.map((c) => `<button type="button" style="--c:${C[c].hex}" aria-label="${window.PN_cname(p, c)}" aria-pressed="${c === colour}" data-pc="${c}"></button>`).join("")}</div></div>
          <div><div class="opt-label">Size <a href="uniforms.html#sizing" style="color:inherit">Size guide</a></div>
            <div class="size-opts">${p.sizes.map((s) => `<button type="button" aria-pressed="${s === size}" data-ps="${s}">${s}</button>`).join("")}</div></div>
          ${canPersonal ? `<div class="pdp__personal">
            <label><input type="checkbox" id="pdp-personal" ${personal ? "checked" : ""}> Add a name (+${money(PERSONAL_PRICE)})</label>
            <div class="field" ${personal ? "" : "hidden"}><label for="pdp-name">Name to add</label><input id="pdp-name" maxlength="14" placeholder="e.g. ELLIE"></div>
          </div>` : ""}
          <div class="pdp__add">
            <div class="qty"><button type="button" aria-label="Decrease quantity" data-pq="-1">−</button><span>${qty}</span><button type="button" aria-label="Increase quantity" data-pq="1">+</button></div>
            <button class="btn btn--pink" type="button" data-padd ${size ? "" : 'aria-disabled="true"'}>${size ? "Add to bag" : "Select a size"}</button>
          </div>
          <ul class="perks">
            <li>${I.truck} Free UK delivery over £${window.PN_SITE.freeShip}</li>
            <li>${I.shield} Made to match your team colours on request</li>
          </ul>
          <div class="team-box">
            <strong>Ordering for your team?</strong>
            <p>Get this in your team colours with your logo. Team pricing on 10+ and no minimum order.</p>
            <a class="link-u" style="justify-self:start" href="uniforms.html#quote">Get team pricing</a>
          </div>
          <div class="acc">
            <details open><summary>Details</summary><div class="acc__body"><ul style="margin:0;padding-left:18px">${p.details.map((d) => `<li>${d}</li>`).join("")}</ul></div></details>
            <details><summary>Delivery &amp; returns</summary><div class="acc__body"><p>Delivery options and dispatch times are shown at checkout. Personalised and custom items are made to order for you, so they can only be returned if faulty.</p></div></details>
          </div>
        </div>`;
      window.PN_hydrateMedia(root);
      let bar = document.getElementById("pdp-mbar");
      if (!bar) {
        bar = document.createElement("div");
        bar.className = "mbar"; bar.id = "pdp-mbar";
        document.body.appendChild(bar);
        const check = () => {
          const add = root.querySelector(".pdp__add");
          const on = !!add && add.getBoundingClientRect().bottom < 0;
          bar.classList.toggle("is-on", on);
          document.body.classList.toggle("has-mbar", on);
        };
        window.addEventListener("scroll", check, { passive: true });
        window.addEventListener("resize", check);
      }
      bar.innerHTML = `<div class="mbar__text"><b>${p.name}</b><span>${money(price)} · ${window.PN_cname(p, colour)}${size ? " · " + size : ""}</span></div><button class="btn btn--pink" type="button" data-mbar-add>${size ? "Add to bag" : "Choose size"}</button>`;
      const nameInput = document.getElementById("pdp-name");
      if (nameInput) nameInput.value = root.dataset.name || "";
    };

    root.onclick = (e) => {
      const c = e.target.closest("[data-pc]"); if (c) { colour = c.dataset.pc; draw(); return; }
      const s = e.target.closest("[data-ps]"); if (s) { size = s.dataset.ps; draw(); return; }
      const q = e.target.closest("[data-pq]"); if (q) { qty = Math.max(1, qty + +q.dataset.pq); draw(); return; }
      if (e.target.closest("[data-padd]")) {
        if (!size) { window.PN_toast("Pick a size first"); return; }
        const name = personal ? (root.dataset.name || "").trim().toUpperCase() : "";
        window.PN_addToBag({ id: p.id, colour, size, qty, price: p.price + (personal ? PERSONAL_PRICE : 0), personal: name });
      }
    };
    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-mbar-add]")) return;
      if (!size) { root.querySelector(".size-opts").scrollIntoView({ behavior: "smooth", block: "center" }); window.PN_toast("Pick a size first"); return; }
      root.querySelector("[data-padd]").click();
    });
    root.onchange = (e) => { if (e.target.id === "pdp-personal") { personal = e.target.checked; draw(); } };
    root.oninput = (e) => { if (e.target.id === "pdp-name") root.dataset.name = e.target.value; };
    draw();

    const related = P.filter((x) => x.id !== p.id && (x.cat !== p.cat)).sort((a, b) => b.tags.includes("best") - a.tags.includes("best")).slice(0, 8);
    const rel = document.getElementById("related");
    rel.innerHTML = related.map((x) => window.PN_cardHTML(x, p.colours.includes(colour) ? colour : null)).join("");
    window.PN_hydrateMedia(rel);
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  render();
})();
