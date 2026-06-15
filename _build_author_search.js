const fs = require("fs");
const { page } = require("./_chrome");
const { imgU, AUTHORS, ARTICLES, byId, card, rankedItem, CATEGORIES } = require("./_data");

/* ---------- author.html ---------- */
{
  const au = AUTHORS.sara;
  const latest = [15, 4, 16, 8, 2, 23].map(byId);
  const popular = ARTICLES.slice().sort((a, b) => b.views - a.views).slice(0, 5);

  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح" style="justify-content:flex-start">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <a href="author.html">الكاتبات</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">${au.name}</span>
        </nav>
      </div>

      <section class="container page--tight">
        <div class="profile">
          <div class="profile__avatar"><img src="${imgU(au.img, 320, 320, "faces")}" alt="${au.name}"></div>
          <div>
            <h1 class="profile__name">${au.name}</h1>
            <span class="profile__role">${au.role}</span>
            <p class="profile__bio">${au.bio}</p>
            <div class="profile__social">
              <a class="share__btn share__btn--x" href="#" aria-label="إكس"><i class="fa-brands fa-x-twitter"></i></a>
              <a class="share__btn share__btn--in" href="#" aria-label="لينكدإن"><i class="fa-brands fa-linkedin-in"></i></a>
              <a class="share__btn" href="#" aria-label="إنستغرام" style="--hb:1"><i class="fa-brands fa-instagram"></i></a>
              <a class="share__btn share__btn--copy" href="contact-us.html" aria-label="مراسلة"><i class="fa-regular fa-envelope"></i></a>
            </div>
          </div>
          <div class="profile__stats">
            <div class="profile__stat"><span class="profile__stat-num">128</span><span class="profile__stat-label">مقالة</span></div>
            <div class="profile__stat"><span class="profile__stat-num">24.5K</span><span class="profile__stat-label">متابِعة</span></div>
            <div class="profile__stat"><span class="profile__stat-num">96K</span><span class="profile__stat-label">إعجاب</span></div>
          </div>
        </div>
      </section>

      <section class="container block--tight">
        <div class="profile-body">
          <div>
            <div class="sec-head" style="margin-bottom:var(--space-6)">
              <div class="sec-head__right"><div class="sec-head__text">
                <span class="sec-head__kicker">أحدث ما كتبت</span>
                <h2 class="sec-head__title"><a href="articles.html">مقالات ${au.name}</a></h2>
              </div></div>
            </div>
            <div class="archive-grid archive-grid--2">
${latest.map(card).join("\n")}
            </div>
            <nav class="pagination" aria-label="ترقيم الصفحات">
              <a class="pagination__link is-active" href="#">1</a>
              <a class="pagination__link" href="#">2</a>
              <a class="pagination__link" href="#">3</a>
              <a class="pagination__link pagination__link--text" href="#"><span>التالي</span> <i class="fa-solid fa-chevron-left" aria-hidden="true"></i></a>
            </nav>
          </div>
          <aside>
            <div class="toc" style="background:var(--bg-section);border:0">
              <h2 class="toc__title">الأكثر قراءة</h2>
              <div class="ranked-list">
${popular.map((a, i) => rankedItem(a, i + 1)).join("\n")}
              </div>
            </div>
          </aside>
        </div>
      </section>`;

  fs.writeFileSync("author.html", page({
    title: au.name, active: "مدونات", body,
    desc: `صفحة الكاتبة ${au.name} في بنفسج: سيرتها وأحدث مقالاتها والأكثر قراءة.`,
  }));
  console.log("author.html written");
}

/* ---------- search-results.html ---------- */
{
  // results for keyword "الأمومة"
  const results = ARTICLES.filter((a) =>
    /أموم|أمّ|أم |أبنا|طفل|بنات/.test(a.title + a.excerpt)
  ).slice(0, 6);

  const chips = ["all", "omoma", "osra", "saha", "tatweer"].map((k, i) => {
    const lbl = (CATEGORIES.find((c) => c.key === k) || {}).label;
    return `          <button class="chip${i === 0 ? " is-active" : ""}" type="button" data-filter="${k}" aria-selected="${i === 0}">${lbl}</button>`;
  }).join("\n");

  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">نتائج البحث</span>
        </nav>
        <header class="page-hero">
          <span class="page-hero__kicker"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> نتائج البحث</span>
          <h1 class="page-hero__title">نتائج البحث عن: «الأمومة»</h1>
          <p class="page-hero__lead">عثرنا على <strong data-archive-count>${results.length}</strong> مقالة تطابق بحثكِ. هل تبحثين عن شيءٍ آخر؟ استخدمي الحقل بالأعلى.</p>
        </header>
      </div>

      <section class="container page--tight">
        <div class="chip-row" role="tablist" aria-label="تصفية النتائج">
${chips}
        </div>
        <div class="toolbar">
          <p class="toolbar__count">ترتيب حسب الصلة</p>
          <div class="toolbar__controls">
            <label class="search-field">
              <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              <input type="search" data-archive-search value="الأمومة" placeholder="ابحثي مجددًا…" aria-label="بحث">
            </label>
          </div>
        </div>
        <div class="archive-grid" data-archive-grid>
${results.map(card).join("\n")}
        </div>
        <div class="empty-state" data-archive-empty style="display:none">
          <div class="empty-state__icon"><i class="fa-regular fa-face-frown" aria-hidden="true"></i></div>
          <h3 class="empty-state__title">لا توجد نتائج لبحثكِ</h3>
          <p class="empty-state__text">لم نعثر على ما يطابق كلماتكِ. جرّبي مصطلحًا أبسط، أو تصفّحي أحدث المقالات.</p>
          <a class="btn btn--primary" href="articles.html">تصفّحي كل المقالات</a>
        </div>
      </section>`;

  fs.writeFileSync("search-results.html", page({
    title: "نتائج البحث", active: "", body,
    desc: "نتائج البحث في مقالات بنفسج.",
  }));
  console.log("search-results.html written");
}
