const fs = require("fs");
const { page } = require("./_chrome");
const { ARTICLES, CATEGORIES, card, featuredCard, imgU, catLabel } = require("./_data");

const chips = (active = "all") =>
  CATEGORIES.map((c) => {
    const a = c.key === active;
    return `          <button class="chip${a ? " is-active" : ""}" type="button" data-filter="${c.key}" aria-selected="${a}">${c.label}</button>`;
  }).join("\n");

const toolbar = (count) => `        <div class="toolbar">
          <p class="toolbar__count">عُثر على <strong data-archive-count>${count}</strong> مقالة</p>
          <div class="toolbar__controls">
            <label class="search-field">
              <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              <input type="search" data-archive-search placeholder="ابحثي في المقالات…" aria-label="بحث في المقالات">
            </label>
            <select class="select" data-archive-sort aria-label="ترتيب">
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="popular">الأكثر قراءة</option>
            </select>
          </div>
        </div>`;

const pagination = (active, total) => {
  let links = `        <a class="pagination__link pagination__link--text" href="#" aria-disabled="${active === 1}"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> <span>السابق</span></a>\n`;
  for (let i = 1; i <= total; i++) {
    links += `        <a class="pagination__link${i === active ? " is-active" : ""}" href="#">${i}</a>\n`;
  }
  links += `        <a class="pagination__link pagination__link--text" href="#"><span>التالي</span> <i class="fa-solid fa-chevron-left" aria-hidden="true"></i></a>`;
  return `      <nav class="pagination" aria-label="ترقيم الصفحات">\n${links}\n      </nav>`;
};

const emptyState = `        <div class="empty-state" data-archive-empty style="display:none">
          <div class="empty-state__icon"><i class="fa-regular fa-folder-open" aria-hidden="true"></i></div>
          <h3 class="empty-state__title">لا توجد نتائج مطابقة</h3>
          <p class="empty-state__text">جرّبي كلمةً أخرى أو اختاري تصنيفًا مختلفًا — هناك الكثير لاكتشافه.</p>
        </div>`;

// First article renders as the big featured lead card; the rest as image-forward cards.
const grid = (list) => {
  const cards = list.map((a, i) => (i === 0 ? featuredCard(a) : card(a)));
  return `        <div class="archive-grid" data-archive-grid>\n${cards.join("\n")}\n        </div>`;
};

/* ---------- articles.html ---------- */
{
  const list = ARTICLES.slice(0, 12);
  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">كل المقالات</span>
        </nav>
        <header class="page-hero">
          <span class="page-hero__kicker">أرشيف بنفسج</span>
          <h1 class="page-hero__title">كل المقالات</h1>
          <p class="page-hero__lead">مكتبةٌ من القصص والأفكار التي تكتبها نساءٌ لنساء: عن الأسرة والأمومة والذات والبيت والروح. اقرئي على مهلكِ.</p>
        </header>
      </div>

      <section class="container page--tight">
        <div class="chip-row" role="tablist" aria-label="تصنيفات">
${chips("all")}
        </div>
${toolbar(list.length)}
${grid(list)}
${emptyState}
${pagination(1, 3)}
      </section>`;
  fs.writeFileSync("articles.html", page({
    title: "كل المقالات", active: "", body,
    desc: "أرشيف مقالات بنفسج: الأسرة، الأمومة، تطوير الذات، الديكور، الصحة والمطبخ — محتوًى نسائي راقٍ.",
  }));
  console.log("articles.html written");
}

/* ---------- category.html (الأسرة والأمومة) ---------- */
{
  const list = ARTICLES.filter((a) => a.cat === "osra" || a.cat === "omoma");
  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح" style="justify-content:flex-start">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <a href="articles.html">المقالات</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">أسرة وأمومة</span>
        </nav>
      </div>

      <section class="container page--tight">
        <div class="cover-hero">
          <div class="cover-hero__img"><img src="${imgU("photo-1583357820970-221489bb3e72", 1280, 460, "faces")}" alt="أسرة وأمومة"></div>
          <div class="cover-hero__content">
            <span class="cover-hero__kicker"><i class="fa-solid fa-people-roof" aria-hidden="true"></i> تصنيف</span>
            <h1 class="cover-hero__title">أسرة وأمومة</h1>
            <p class="cover-hero__desc">كلُّ ما يُقرّب القلوب داخل البيت الواحد: تربيةٌ بالحبّ، وحوارٌ صادق، وأمومةٌ بلا ذنب، ولحظاتٌ صغيرة تصنع الدفء.</p>
          </div>
        </div>
      </section>

      <section class="container block--tight">
        <div class="chip-row" role="tablist" aria-label="تصنيفات">
          <button class="chip is-active" type="button" data-filter="all" aria-selected="true">الكل</button>
          <button class="chip" type="button" data-filter="osra" aria-selected="false">أسرة</button>
          <button class="chip" type="button" data-filter="omoma" aria-selected="false">أمومة</button>
        </div>
${toolbar(list.length)}
${grid(list)}
${emptyState}
${pagination(1, 2)}
      </section>`;
  fs.writeFileSync("category.html", page({
    title: "أسرة وأمومة", active: "", body,
    desc: "مقالات بنفسج في الأسرة والأمومة: التربية الإيجابية، الحوار مع الأبناء، والأمومة الواعية.",
  }));
  console.log("category.html written");
}

/* ---------- tag.html (#تطوير_الذات) ---------- */
{
  const list = ARTICLES.filter((a) => a.cat === "tatweer" || a.cat === "saha");
  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <a href="articles.html">المقالات</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">وسم: تطوير الذات</span>
        </nav>
        <header class="page-hero">
          <span class="page-hero__kicker"><i class="fa-solid fa-hashtag" aria-hidden="true"></i> وسم</span>
          <h1 class="page-hero__title">تطوير الذات والعناية بالروح</h1>
          <p class="page-hero__lead">مقالاتٌ تحمل وسم «تطوير الذات»: عاداتٌ صغيرة، وحدودٌ صحية، وطمأنينةٌ تبدأ من الداخل.</p>
        </header>
      </div>

      <section class="container page--tight">
${toolbar(list.length)}
${grid(list)}
${emptyState}
${pagination(1, 2)}
      </section>`;
  fs.writeFileSync("tag.html", page({
    title: "وسم: تطوير الذات", active: "", body,
    desc: "كل مقالات بنفسج الموسومة بـ تطوير الذات والصحة النفسية للمرأة.",
  }));
  console.log("tag.html written");
}
