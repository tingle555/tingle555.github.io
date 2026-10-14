document.addEventListener("DOMContentLoaded", () => {
  const textNodes = document.querySelectorAll("[data-site]");
  textNodes.forEach(el => {
    const key = el.dataset.site;
    if (SITE_CONTENT[key] !== undefined) {
      el.textContent = SITE_CONTENT[key].replace(/\\n/g, "\n");
      if (key === "heroTitle" || key === "introQuote" || key === "featureTitle" || key === "contactTitle") {
        el.innerHTML = SITE_CONTENT[key].split("\\n").map(escapeHtml).join("<br>");
      }
    }
  });

  const hero = document.getElementById("hero-image");
  if (hero) { hero.src = SITE_CONTENT.heroImage; }
  const detail = document.querySelector(".feature-image img");
  if (detail) { detail.src = SITE_CONTENT.detailImage; }

  const linkMap = {
    phone: "tel:" + SITE_CONTENT.phone.replace(/[^0-9+]/g, ""),
    website: SITE_CONTENT.website,
    line: SITE_CONTENT.lineUrl,
    instagram: SITE_CONTENT.instagramUrl,
    contactButton: "mailto:" + SITE_CONTENT.email
  };
  document.querySelectorAll("[data-link]").forEach(el => {
    const key = el.dataset.link;
    if (linkMap[key]) el.href = linkMap[key];
  });

  const serviceGrid = document.getElementById("service-grid");
  serviceGrid.innerHTML = SERVICES.map(s => `<article class="service-card"><span class="service-icon" aria-hidden="true">${escapeHtml(s.icon)}</span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p></article>`).join("");

  const newsGrid = document.getElementById("news-grid");
  newsGrid.innerHTML = NEWS.map(n => `<article class="news-card"><time class="news-date">${escapeHtml(n.date)}</time><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.summary)}</p><span class="news-tag">${escapeHtml(n.tag)}</span></article>`).join("");

  document.getElementById("year").textContent = new Date().getFullYear();
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
});
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}