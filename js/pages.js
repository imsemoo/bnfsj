/* ================================================================
   BANAFSAJ — Internal pages interactions (vanilla JS)
   Reading progress · share/copy · TOC scroll-spy · print ·
   contact form · archive filter & search.
   ================================================================ */
(function () {
  "use strict";

  /* ---------- Reading progress bar ---------- */
  const progressWrap = document.querySelector("[data-reading-progress]");
  const progress = progressWrap && progressWrap.querySelector(".reading-progress__bar");
  if (progress) {
    const update = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- Share buttons (web share friendly URLs + copy link) ---------- */
  const toast = document.querySelector("[data-toast]");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  const copyBtn = document.querySelector("[data-copy-link]");
  if (copyBtn) {
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const url = window.location.href;
      const done = () => showToast("تم نسخ الرابط ✓");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done));
      } else {
        fallbackCopy(url, done);
      }
    });
  }
  function fallbackCopy(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); cb(); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------- Print ---------- */
  const printBtn = document.querySelector("[data-print]");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  /* ---------- Table of contents (scroll-spy + smooth scroll) ---------- */
  const tocLinks = Array.from(document.querySelectorAll("[data-toc] a"));
  if (tocLinks.length) {
    const headings = tocLinks
      .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);

    tocLinks.forEach((a) => {
      a.addEventListener("click", function (e) {
        const id = a.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
          history.replaceState(null, "", "#" + id);
        }
      });
    });

    const spy = () => {
      let current = headings[0];
      const y = window.scrollY + 120;
      headings.forEach((h) => { if (h.offsetTop <= y) current = h; });
      tocLinks.forEach((a) =>
        a.classList.toggle("is-active", current && a.getAttribute("href") === "#" + current.id)
      );
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
  }

  /* ---------- Contact form (graceful success UI) ---------- */
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const success = document.querySelector("[data-form-success]");
      contactForm.reset();
      if (success) {
        success.classList.add("is-visible");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ---------- Archive filter + search + sort ---------- */
  const grid = document.querySelector("[data-archive-grid]");
  if (grid) {
    const cards = Array.from(grid.querySelectorAll("[data-category]"));
    const chips = Array.from(document.querySelectorAll("[data-filter]"));
    const searchInput = document.querySelector("[data-archive-search]");
    const sortSelect = document.querySelector("[data-archive-sort]");
    const countEl = document.querySelector("[data-archive-count]");
    const emptyEl = document.querySelector("[data-archive-empty]");
    let activeCat = "all";

    const apply = () => {
      const q = (searchInput && searchInput.value.trim().toLowerCase()) || "";
      let shown = 0;
      cards.forEach((c) => {
        const matchCat = activeCat === "all" || c.dataset.category === activeCat;
        const text = (c.textContent || "").toLowerCase();
        const matchQ = !q || text.indexOf(q) !== -1;
        const show = matchCat && matchQ;
        c.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown;
      if (emptyEl) emptyEl.style.display = shown ? "none" : "";
    };

    chips.forEach((chip) => {
      chip.addEventListener("click", function (e) {
        e.preventDefault();
        chips.forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        activeCat = chip.dataset.filter || "all";
        apply();
      });
    });

    if (searchInput) searchInput.addEventListener("input", apply);

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        const mode = sortSelect.value;
        const sorted = cards.slice().sort((a, b) => {
          if (mode === "oldest") return (+a.dataset.order || 0) - (+b.dataset.order || 0);
          if (mode === "popular") return (+b.dataset.views || 0) - (+a.dataset.views || 0);
          return (+b.dataset.order || 0) - (+a.dataset.order || 0); // newest
        });
        sorted.forEach((c) => grid.appendChild(c));
      });
    }

    apply();
  }
})();
