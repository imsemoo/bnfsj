/* Shared chrome (head + header + drawer + search + footer) for all internal pages.
   Generates static HTML identical to the homepage so the product stays coherent. */

const NAV = [
  { label: "الرئيسية", href: "index.html" },
  { label: "حضور امرأة", href: "articles.html", sub: [["حوارات", "articles.html"]] },
  { label: "سيدتي", href: "articles.html", sub: [["صحة المرأة", "articles.html?cat=saha"], ["لكِ", "articles.html?cat=lifestyle"]] },
  { label: "فلسطينيات", href: "articles.html", sub: [["مجتمع", "articles.html"], ["ذاكرة", "articles.html"]] },
  { label: "سلاسل", href: "articles.html", sub: [["هُنّ في عيوننا", "articles.html"], ["سلسلة تعليم المقهورين", "articles.html"], ["نَفَس", "articles.html"]] },
  { label: "أسرة", href: "category.html" },
  { label: "ديكور", href: "articles.html?cat=decor" },
  { label: "فكر", href: "articles.html?cat=fikr" },
  { label: "مدونات", href: "author.html" },
  { label: "عن بنفسج", href: "about.html" },
];

function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>${title} | بنفسج</title>
    <meta name="description" content="${desc}">
    <meta name="author" content="بنفسج">
    <meta name="copyright" content="جميع الحقوق محفوظة لبنفسج © 2026">
    <link rel="shortcut icon" href="images/logo.png" type="image/png">
    <link rel="icon" href="images/logo.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/pages.css">
  </head>

  <body>
    <a class="skip-link" href="#main">تخطّي إلى المحتوى</a>
`;
}

function header(active) {
  const navItems = NAV.map((n, i) => {
    const isActive = n.label === active ? " is-active" : "";
    if (n.sub) {
      const subId = "nav-sub-" + (i + 1);
      const subs = n.sub.map((s) => `                <li><a class="subnav__link" href="${s[1]}">${s[0]}</a></li>`).join("\n");
      return `            <li class="site-nav__item has-subnav">
              <button class="site-nav__link site-nav__toggle${isActive}" type="button" aria-expanded="false" aria-controls="${subId}">
                ${n.label}
                <i class="fa-solid fa-chevron-down site-nav__chev" aria-hidden="true"></i>
              </button>
              <ul class="subnav" id="${subId}" aria-label="${n.label}">
${subs}
              </ul>
            </li>`;
    }
    return `            <li class="site-nav__item"><a class="site-nav__link${isActive}" href="${n.href}">${n.label}</a></li>`;
  }).join("\n");

  const drawerItems = NAV.map((n) => {
    const isActive = n.label === active ? " is-active" : "";
    if (n.sub) {
      const subs = n.sub.map((s) => `            <a class="drawer__sublink" href="${s[1]}">${s[0]}</a>`).join("\n");
      return `          <details class="drawer__group">
            <summary class="drawer__summary">${n.label}</summary>
${subs}
          </details>`;
    }
    return `          <a class="drawer__link${isActive}" href="${n.href}">${n.label}</a>`;
  }).join("\n");

  return `    <!-- ====== Topbar ====== -->
    <div class="site-topbar">
      <div class="container site-topbar__inner">
        <div class="site-topbar__social" aria-label="روابط اجتماعية">
          <a class="icon-btn" href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
          <a class="icon-btn" href="#" aria-label="Twitter / X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
          <a class="icon-btn" href="#" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
          <a class="icon-btn" href="#" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>
          <a class="icon-btn" href="#" aria-label="SoundCloud"><i class="fa-brands fa-soundcloud" aria-hidden="true"></i></a>
        </div>
        <div class="site-topbar__meta"><span class="topbar-chip">حضور امرأة</span></div>
      </div>
    </div>

    <!-- ====== Header ====== -->
    <header class="site-header" data-header>
      <div class="container site-header__inner">
        <a class="site-brand" href="index.html" aria-label="بنفسج - الرئيسية">
          <img src="images/logo.png" alt="بنفسج" class="site-brand__logo">
        </a>
        <nav class="site-nav" aria-label="التنقل الرئيسي" data-nav>
          <ul class="site-nav__list">
${navItems}
          </ul>
        </nav>
        <div class="site-actions">
          <button class="icon-btn" type="button" aria-label="بحث" data-search-open>
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
          <button class="menu-btn" type="button" aria-label="فتح القائمة" aria-expanded="false" aria-controls="mobile-drawer" data-menu-open>
            <span class="menu-btn__lines" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>

    <!-- ====== Drawer ====== -->
    <div class="drawer" id="mobile-drawer" aria-hidden="true" data-drawer>
      <div class="drawer__backdrop" data-menu-close></div>
      <aside class="drawer__panel" role="dialog" aria-label="قائمة الهاتف" aria-modal="true">
        <div class="drawer__header">
          <span class="drawer__title">القائمة</span>
          <button class="icon-btn" type="button" aria-label="إغلاق" data-menu-close><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <nav class="drawer__nav" aria-label="التنقل على الهاتف">
${drawerItems}
        </nav>
      </aside>
    </div>

    <!-- ====== Search ====== -->
    <div class="search" aria-hidden="true" data-search>
      <div class="search__backdrop" data-search-close></div>
      <div class="search__panel" role="dialog" aria-label="البحث" aria-modal="true">
        <button class="search__close icon-btn" type="button" aria-label="إغلاق" data-search-close><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        <form class="search__row" action="search-results.html" method="get">
          <input class="search__input" type="search" name="q" placeholder="ابحثي عن مقال أو كاتب…" aria-label="بحث">
          <button class="btn btn--primary" type="submit">بحث</button>
        </form>
      </div>
    </div>
`;
}

function footer() {
  return `    <!-- ====== Footer ====== -->
    <footer class="footer-pro">
      <div class="footer-pro__main">
        <div class="sec__container">
          <div class="footer-pro__grid">
            <div class="footer-pro__brand">
              <a href="index.html" class="footer-pro__logo"><img src="images/logo.png" alt="بنفسج" /></a>
              <p class="footer-pro__desc">يُعنى بنفسج بالمرأة وقضاياها في المجالات الفكرية والثقافية والاجتماعية، بطابع نهضويّ متحيز لقضايا المجتمع العادلة.</p>
              <div class="footer-pro__newsletter">
                <h4 class="footer-pro__newsletter-title">اشتركي في نشرتنا البريدية</h4>
                <form class="footer-pro__form">
                  <input type="email" placeholder="بريدك الإلكتروني" class="footer-pro__input" aria-label="بريدك الإلكتروني" />
                  <button type="submit" class="footer-pro__submit" aria-label="اشتراك في النشرة"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
            <div class="footer-pro__links">
              <h4 class="footer-pro__title">الأقسام</h4>
              <ul class="footer-pro__list">
                <li><a href="articles.html">حضور امرأة</a></li>
                <li><a href="articles.html">سيدتي</a></li>
                <li><a href="articles.html">فلسطينيات</a></li>
                <li><a href="articles.html">سلاسل</a></li>
                <li><a href="articles.html?cat=fikr">فكر</a></li>
              </ul>
            </div>
            <div class="footer-pro__links">
              <h4 class="footer-pro__title">المزيد</h4>
              <ul class="footer-pro__list">
                <li><a href="articles.html">كل المقالات</a></li>
                <li><a href="category.html">أسرة</a></li>
                <li><a href="articles.html?cat=decor">ديكور</a></li>
                <li><a href="author.html">مدونات</a></li>
                <li><a href="index.html">فيديو</a></li>
              </ul>
            </div>
            <div class="footer-pro__links">
              <h4 class="footer-pro__title">بنفسج</h4>
              <ul class="footer-pro__list">
                <li><a href="about.html">عن بنفسج</a></li>
                <li><a href="contact-us.html">تواصلي معنا</a></li>
                <li><a href="faq.html">الأسئلة الشائعة</a></li>
                <li><a href="privacy-policy.html">سياسة الخصوصية</a></li>
                <li><a href="terms.html">شروط الاستخدام</a></li>
              </ul>
            </div>
            <div class="footer-pro__social-col">
              <h4 class="footer-pro__title">تابعينا</h4>
              <div class="footer-pro__social">
                <a href="#" class="footer-pro__social-link footer-pro__social-link--fb" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#" class="footer-pro__social-link footer-pro__social-link--tw" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="#" class="footer-pro__social-link footer-pro__social-link--ig" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="footer-pro__social-link footer-pro__social-link--yt" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                <a href="#" class="footer-pro__social-link footer-pro__social-link--sc" aria-label="SoundCloud"><i class="fa-brands fa-soundcloud"></i></a>
              </div>
              <div class="footer-pro__apps">
                <span class="footer-pro__apps-label">حمّلي التطبيق</span>
                <div class="footer-pro__apps-badges">
                  <a href="#" class="footer-pro__app-badge"><i class="fa-brands fa-apple"></i><span>App Store</span></a>
                  <a href="#" class="footer-pro__app-badge"><i class="fa-brands fa-google-play"></i><span>Google Play</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-pro__bottom">
        <div class="sec__container">
          <div class="footer-pro__bottom-inner">
            <p class="footer-pro__copy">جميع الحقوق محفوظة لـ <strong>بنفسج</strong> © 2026</p>
            <p class="footer-pro__made">صُنع بـ <span class="footer-pro__heart">💜</span> لأجل المرأة العربية</p>
          </div>
        </div>
      </div>
    </footer>
`;
}

function scripts(extra) {
  return `
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/swiper.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/pages.js"></script>${extra || ""}
  </body>

</html>
`;
}

// Compose a full page. `body` is the inner HTML for <main>. progress = reading bar.
function page({ file, title, desc, active, body, progress, extra }) {
  const bar = progress ? `    <div class="reading-progress" data-reading-progress><div class="reading-progress__bar"></div></div>\n` : "";
  return head(title, desc) + bar + header(active) +
    `\n    <main id="main">\n${body}\n    </main>\n\n` + footer() + scripts(extra);
}

module.exports = { page, head, header, footer, scripts, NAV };
