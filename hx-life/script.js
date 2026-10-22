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

  const detailImg = document.getElementById("detail-image") || document.querySelector(".feature-image img");
  const detailImages = Array.isArray(SITE_CONTENT.detailImages) && SITE_CONTENT.detailImages.length
    ? SITE_CONTENT.detailImages
    : [SITE_CONTENT.detailImage];

  if (detailImg && detailImages.length) {
    let currentDetailIdx = 0;
    const counterEl = document.getElementById("detail-counter");
    const dotsEl = document.getElementById("detail-dots");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");

    function renderDetailSlide(index) {
      currentDetailIdx = (index + detailImages.length) % detailImages.length;
      detailImg.src = detailImages[currentDetailIdx];
      if (counterEl) {
        const cur = String(currentDetailIdx + 1).padStart(2, "0");
        const total = String(detailImages.length).padStart(2, "0");
        counterEl.textContent = `${cur} / ${total}`;
      }
      if (dotsEl) {
        dotsEl.querySelectorAll(".slider-dot").forEach((dot, i) => {
          dot.classList.toggle("active", i === currentDetailIdx);
          dot.setAttribute("aria-selected", String(i === currentDetailIdx));
        });
      }
    }

    if (dotsEl) {
      dotsEl.innerHTML = detailImages.map((_, i) =>
        `<button type="button" class="slider-dot${i === 0 ? " active" : ""}" role="tab" aria-label="切換至第 ${i + 1} 張照片" aria-selected="${i === 0}"></button>`
      ).join("");
      dotsEl.querySelectorAll(".slider-dot").forEach((dot, i) => {
        dot.addEventListener("click", () => renderDetailSlide(i));
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => renderDetailSlide(currentDetailIdx - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => renderDetailSlide(currentDetailIdx + 1));

    renderDetailSlide(0);
  }

  const linkMap = {
    phone: SITE_CONTENT.phone ? "tel:" + SITE_CONTENT.phone.replace(/[^0-9+]/g, "") : "",
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
  serviceGrid.innerHTML = SERVICES.map(s => {
    const isImage = /\.(png|jpe?g|svg|webp)$/i.test(s.icon);
    const iconMarkup = isImage
      ? `<span class="service-icon"><img class="service-icon-img" src="${escapeHtml(s.icon)}" alt="${escapeHtml(s.title)}"></span>`
      : `<span class="service-icon" aria-hidden="true">${escapeHtml(s.icon)}</span>`;
    return `<article class="service-card">${iconMarkup}<h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p></article>`;
  }).join("");

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