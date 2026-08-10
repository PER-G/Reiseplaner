/* ============================================================
   Reiseführer China · Rendering
   Wird von index.html (Übersicht) und stadt.html (Stadtseite)
   gemeinsam genutzt.
   ============================================================ */

/* ---------- Datums-Helfer ---------- */
function tripDate(dayIndex) {
  const d = new Date(TRIP.start + "T12:00:00");
  d.setDate(d.getDate() + (dayIndex - 1));
  return d;
}
const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function fmtDate(d) {
  return `${WEEKDAYS[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.`;
}

/* ============================================================
   Karten-Helfer
   WICHTIG: Auf dem chinesischen Festland ist Google Maps ohne
   VPN nicht nutzbar. Apple Karten funktioniert dort (Amap-Daten)
   und ist deshalb der primäre Button.
   ============================================================ */
function appleMapsUrl(item) {
  const q = encodeURIComponent(item.mapsName || item.name);
  if (item.lat && item.lng) return `https://maps.apple.com/?q=${q}&ll=${item.lat},${item.lng}`;
  return `https://maps.apple.com/?q=${q}`;
}
function googleMapsUrl(item) {
  const q = encodeURIComponent(item.mapsName || item.name);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* Route über alle Sehenswürdigkeiten einer Zone */
function routeStops(city, zone) {
  const stops = zone.sights.filter((s) => s.inRoute !== false);
  const cfg = zone.route || {};
  if (cfg.fromHotel && city.hotel) {
    return [{ lat: city.hotel.lat, lng: city.hotel.lng }, ...stops];
  }
  return stops;
}
function googleRouteUrl(city, zone) {
  const pts = routeStops(city, zone);
  if (pts.length < 2) return null;
  const mode = (zone.route && zone.route.mode) === "transit" ? "transit" : "walking";
  const origin = `${pts[0].lat},${pts[0].lng}`;
  const last = pts[pts.length - 1];
  const waypoints = pts.slice(1, -1).map((s) => `${s.lat},${s.lng}`).join("|");
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${last.lat},${last.lng}&travelmode=${mode}`;
  if (waypoints) url += `&waypoints=${encodeURIComponent(waypoints)}`;
  return url;
}
/* Apple Karten kann keine Mehrfach-Wegpunkte per URL –
   deshalb Start → Ziel, die Zwischenstopps stehen auf den Karten. */
function appleRouteUrl(city, zone) {
  const pts = routeStops(city, zone);
  if (pts.length < 2) return null;
  const flag = (zone.route && zone.route.mode) === "transit" ? "r" : "w";
  const first = pts[0], last = pts[pts.length - 1];
  return `https://maps.apple.com/?saddr=${first.lat},${first.lng}&daddr=${last.lat},${last.lng}&dirflg=${flag}`;
}

/* ============================================================
   Karten-Rendering (Sehenswürdigkeit / Restaurant)
   ============================================================ */
function renderCard(item, type) {
  const node = document.getElementById("card-template").content.firstElementChild.cloneNode(true);
  const img = node.querySelector(".card-image");
  if (type === "restaurant") {
    img.src = FOOD_SVG;
    img.dataset.fallback = "true";
    img.alt = "";
  } else {
    img.src = item.image || FOOD_SVG;
    img.alt = item.name;
    img.onerror = () => { img.src = FOOD_SVG; img.dataset.fallback = "true"; };
  }

  node.querySelector(".card-title").textContent = item.name;
  const cnEl = node.querySelector(".card-cn");
  if (item.cn) cnEl.textContent = item.cn; else cnEl.remove();
  node.querySelector(".card-type").textContent =
    type === "restaurant" ? "Essen" : "Sehenswürdigkeit";
  node.querySelector(".card-desc").textContent = item.desc;

  const badgesEl = node.querySelector(".card-badges");
  if (type === "restaurant") {
    if (item.price) {
      const p = document.createElement("span");
      p.className = "badge price";
      p.textContent = item.price;
      badgesEl.appendChild(p);
    }
  } else if (item.stroller) {
    const s = STROLLER[item.stroller];
    const sb = document.createElement("span");
    sb.className = "badge " + s.cls;
    sb.textContent = `${s.emoji} ${s.label}`;
    badgesEl.appendChild(sb);
  }
  (item.badges || []).forEach((b) => {
    const tag = document.createElement("span");
    tag.className = /glutenfrei|vegan|vegetarisch|gesund/i.test(b) ? "badge gf" : "badge tip";
    tag.textContent = b;
    badgesEl.appendChild(tag);
  });

  node.querySelector(".card-link.apple").href = appleMapsUrl(item);
  node.querySelector(".card-link.google").href = googleMapsUrl(item);

  if (type === "sight" && item.ticketUrl) {
    const t = document.createElement("a");
    t.className = "card-ticket";
    t.href = item.ticketUrl;
    t.target = "_blank";
    t.rel = "noopener";
    t.innerHTML = `<span>🎟️</span><span>Tickets / Infos (offiziell)</span>`;
    node.querySelector(".card-links").before(t);
  }
  return node;
}

/* ============================================================
   Zonen-Rendering
   ============================================================ */
function renderZone(city, zone) {
  const node = document.getElementById("zone-template").content.firstElementChild.cloneNode(true);
  node.dataset.zone = zone.id;

  const zImg = node.querySelector(".zone-image");
  zImg.src = zone.image;
  zImg.alt = zone.title;
  node.querySelector(".zone-tag").textContent = zone.tag;
  node.querySelector(".zone-title").textContent = zone.title;
  node.querySelector(".zone-summary").textContent = zone.summary;
  node.querySelector(".zone-stats").innerHTML = `
    <span>${zone.sights.length}</span>&nbsp;Sehenswürdigkeiten ·
    <span>${zone.restaurants.length}</span>&nbsp;Essen
    <br><span class="zone-walk">${zone.walkFromHotel}</span>`;

  const sightsEl = node.querySelector(".cards.sights");
  zone.sights.forEach((s) => sightsEl.appendChild(renderCard(s, "sight")));

  const restEl = node.querySelector(".cards.restaurants");
  zone.restaurants.forEach((r) => restEl.appendChild(renderCard(r, "restaurant")));

  /* Essen standardmäßig eingeklappt */
  const restSection = restEl.parentElement;
  const restHeader = restSection.querySelector("h4");
  restEl.classList.add("is-hidden");
  restSection.classList.add("collapsible", "is-collapsed");
  restHeader.innerHTML = `<span>Essen &amp; Trinken <span class="section-count">(${zone.restaurants.length})</span></span><span class="section-icon">▾</span>`;
  restHeader.setAttribute("role", "button");
  restHeader.setAttribute("tabindex", "0");
  const toggleRest = (e) => {
    if (e) e.preventDefault();
    const collapsed = restSection.classList.toggle("is-collapsed");
    restEl.classList.toggle("is-hidden", collapsed);
  };
  restHeader.addEventListener("click", toggleRest);
  restHeader.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleRest(); }
  });

  if (zone.transportNote) {
    const note = document.createElement("p");
    note.className = "transport-note";
    note.innerHTML = `<strong>🚇 Anreise &amp; Verkehr:</strong> ${zone.transportNote}`;
    node.querySelector(".zone-body").prepend(note);
  }

  /* Routen-Buttons */
  const transit = (zone.route && zone.route.mode) === "transit";
  const gUrl = googleRouteUrl(city, zone);
  const aUrl = appleRouteUrl(city, zone);
  const actions = node.querySelector(".zone-actions");
  if (!gUrl) {
    actions.remove();
  } else {
    const aBtn = node.querySelector(".route-btn.apple");
    const gBtn = node.querySelector(".route-btn.google");
    aBtn.href = aUrl;
    gBtn.href = gUrl;
    aBtn.querySelector(".route-icon").textContent = transit ? "🚇" : "🚶";
    node.querySelector(".route-hint").textContent = transit
      ? "Apple Karten funktioniert in China ohne VPN (Start → Ziel). Google Maps zeigt alle Zwischenstopps, braucht auf dem Festland aber VPN."
      : "Apple Karten funktioniert in China ohne VPN (Start → Ziel). Google Maps läuft die Stopps der Reihe nach ab, braucht auf dem Festland aber VPN.";
  }

  const toggle = node.querySelector(".zone-toggle");
  const body = node.querySelector(".zone-body");
  toggle.addEventListener("click", () => {
    const open = node.classList.toggle("is-open");
    body.hidden = !open;
    if (open) requestAnimationFrame(() => node.scrollIntoView({ behavior: "smooth", block: "start" }));
  });

  return node;
}

/* ============================================================
   Seite: Stadt (stadt.html?city=...)
   ============================================================ */
function initCityPage() {
  const params = new URLSearchParams(location.search);
  const id = params.get("city");
  const city = CITIES.find((c) => c.id === id);

  if (!city) {
    document.body.innerHTML =
      '<div class="notfound"><h1>Stadt nicht gefunden</h1>' +
      '<p>Bitte wählt eine Stadt aus der Übersicht.</p>' +
      '<a class="hotel-link" href="index.html">← Zur China-Übersicht</a></div>';
    return;
  }

  document.title = `${city.name} · Reiseführer China`;
  document.querySelector(".kicker").textContent = `${city.dayLabel} · ${city.dateLabel} 2026`;
  document.querySelector(".hero h1").textContent = city.name;
  document.querySelector(".hero-cn").textContent = city.cn;
  document.querySelector(".lead").textContent = city.summary;
  const heroEl = document.querySelector(".hero");
  heroEl.style.setProperty("--hero-img", `url("${city.image}")`);

  /* Hotel */
  const h = city.hotel;
  document.querySelector(".hotel-name").textContent = h.name;
  document.querySelector(".hotel-addr").textContent = h.address;
  document.getElementById("hotel-link").href = appleMapsUrl(h);
  document.getElementById("hotel-why").textContent = h.why;
  document.getElementById("hotel-transfer").textContent = h.transfer;
  document.getElementById("hotel-price").textContent = h.price;

  document.getElementById("city-intro").textContent = city.intro;
  document.getElementById("nights-label").textContent =
    city.nights === 1 ? "1 Nacht" : `${city.nights} Nächte`;

  const root = document.getElementById("zones");
  city.zones.forEach((z) => root.appendChild(renderZone(city, z)));

  /* Vor / Zurück */
  const idx = CITIES.findIndex((c) => c.id === id);
  const nav = document.getElementById("city-nav");
  const mk = (c, dir) =>
    `<a class="citynav-btn" href="stadt.html?city=${c.id}">${dir === "prev" ? "←" : ""} ${c.name} ${dir === "next" ? "→" : ""}</a>`;
  nav.innerHTML =
    (idx > 0 ? mk(CITIES[idx - 1], "prev") : '<span></span>') +
    (idx < CITIES.length - 1 ? mk(CITIES[idx + 1], "next") : '<span></span>');
}

/* ============================================================
   Seite: China-Übersicht (index.html)
   ============================================================ */
function initOverview() {
  /* Städte-Karten */
  const grid = document.getElementById("city-grid");
  let day = 1;
  CITIES.forEach((c) => {
    const a = document.createElement("a");
    a.className = "city-card";
    a.href = `stadt.html?city=${c.id}`;
    a.innerHTML = `
      <img src="${c.image}" alt="${c.name}" loading="lazy" />
      <div class="city-content">
        <span class="city-tag">${c.dayLabel} · ${c.dateLabel}</span>
        <h3 class="city-name">${c.name} <span class="city-cn">${c.cn}</span></h3>
        <p class="city-desc">${c.summary}</p>
        <div class="city-meta">
          <span>🌙 ${c.nights === 1 ? "1 Nacht" : c.nights + " Nächte"}</span>
          <span>📍 ${c.highlights.join(" · ")}</span>
        </div>
        <span class="open-btn">Stadt öffnen&nbsp;→</span>
      </div>`;
    grid.appendChild(a);
    day += c.nights;
  });

  /* Etappen */
  const legsEl = document.getElementById("legs");
  LEGS.forEach((l) => {
    const div = document.createElement("div");
    div.className = "leg leg-" + l.mode;
    div.innerHTML = `
      <div class="leg-icon">${l.icon}</div>
      <div class="leg-body">
        <div class="leg-route"><strong>${l.from}</strong> → <strong>${l.to}</strong></div>
        <div class="leg-duration">${l.duration}</div>
        <p class="leg-note">${l.note}</p>
      </div>`;
    legsEl.appendChild(div);
  });

  /* Kennzahlen */
  const trains = LEGS.filter((l) => l.mode === "train").length;
  const flights = LEGS.filter((l) => l.mode === "plane" && !/Heimreise|Stuttgart/.test(l.from + l.to)).length;
  document.getElementById("stat-days").textContent = TRIP.totalDays;
  document.getElementById("stat-cities").textContent = CITIES.length;
  document.getElementById("stat-trains").textContent = trains;
  document.getElementById("stat-flights").textContent = flights;
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "city") initCityPage();
  else initOverview();
});
