const fs = require("fs");
const { page } = require("./_chrome");
const { byId, card } = require("./_data");

const FAQS = [
  ["كيف يمكنني الكتابة في بنفسج؟", "يسعدنا انضمام أصواتٍ جديدة. أرسلي لنا نبذةً عنكِ ونموذجًا من كتابتكِ عبر صفحة «تواصلي معنا»، وسيتواصل فريق التحرير معكِ خلال أيام."],
  ["هل المحتوى مجاني بالكامل؟", "نعم، كل مقالات بنفسج متاحةٌ مجانًا. نؤمن أن المعرفة التي تخصّ المرأة يجب أن تصل إلى كل بيت دون حواجز."],
  ["كيف أشترك في النشرة البريدية؟", "أدخلي بريدكِ الإلكتروني في حقل النشرة أسفل أي صفحة، وستصلكِ مختاراتُ الأسبوع من المقالات والقصص الملهمة."],
  ["ماذا تعني كلمة «بنفسج»؟", "بنفسج تعريفٌ يجمع بين «الحضور» و«المرأة»؛ فهو حضورٌ تختاره المرأة في وعيها وصوتها وكلمتها، لا حضورًا يُفرَض عليها."],
  ["كيف أصبح سفيرةً لبنفسج؟", "نرحّب بالسفيرات من كل البلدان. تواصلي معنا واذكري بلدكِ وكيف ترغبين في المساهمة، وسنوافيكِ بالتفاصيل."],
  ["هل يمكنني إعادة نشر مقالاتكم؟", "يمكنكِ مشاركة روابط مقالاتنا بحرية. أما إعادة النشر الكامل فتحتاج إذنًا مسبقًا مع الإشارة الواضحة إلى المصدر."],
];

const faqList = (items) => `        <div class="faq">
${items.map(([q, a]) => `          <details class="faq__item">
            <summary class="faq__q">${q} <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary>
            <p class="faq__a">${a}</p>
          </details>`).join("\n")}
        </div>`;

/* ---------- contact-us.html ---------- */
{
  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">تواصلي معنا</span>
        </nav>
        <header class="page-hero">
          <span class="page-hero__kicker"><i class="fa-regular fa-envelope" aria-hidden="true"></i> نحن هنا لكِ</span>
          <h1 class="page-hero__title">تواصلي معنا</h1>
          <p class="page-hero__lead">سؤالٌ، فكرة، أو رغبةٌ في الكتابة معنا؟ يسعدنا أن نسمع منكِ. املئي النموذج وسنردّ عليكِ في أقرب وقت.</p>
        </header>
      </div>

      <section class="container page--tight">
        <div class="split" style="align-items:start;gap:var(--space-10)">
          <div>
            <form class="form" data-contact-form novalidate>
              <div class="field--row">
                <div class="field">
                  <label class="field__label" for="cf-name">الاسم <span class="req">*</span></label>
                  <input class="input" id="cf-name" name="name" type="text" placeholder="اسمكِ الكريم" required>
                </div>
                <div class="field">
                  <label class="field__label" for="cf-email">البريد الإلكتروني <span class="req">*</span></label>
                  <input class="input" id="cf-email" name="email" type="email" placeholder="example@email.com" required>
                </div>
              </div>
              <div class="field">
                <label class="field__label" for="cf-subject">الموضوع <span class="req">*</span></label>
                <input class="input" id="cf-subject" name="subject" type="text" placeholder="عمّ تودّين الحديث؟" required>
              </div>
              <div class="field">
                <label class="field__label" for="cf-message">الرسالة <span class="req">*</span></label>
                <textarea class="textarea" id="cf-message" name="message" placeholder="اكتبي رسالتكِ هنا…" required></textarea>
              </div>
              <div class="form__success" data-form-success>
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                <span>شكرًا لكِ! وصلتنا رسالتكِ بنجاح، وسيتواصل معكِ فريق بنفسج قريبًا.</span>
              </div>
              <button class="btn btn--primary btn--lg" type="submit"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> إرسال الرسالة</button>
            </form>
          </div>

          <aside style="display:flex;flex-direction:column;gap:var(--space-3)">
            <a class="info-card" href="mailto:hello@bnfsj.net">
              <span class="info-card__icon"><i class="fa-regular fa-envelope" aria-hidden="true"></i></span>
              <span><span class="info-card__label">البريد الإلكتروني</span><span class="info-card__value">hello@bnfsj.net</span></span>
            </a>
            <a class="info-card" href="contact-us.html">
              <span class="info-card__icon"><i class="fa-solid fa-pen-nib" aria-hidden="true"></i></span>
              <span><span class="info-card__label">للكتابة معنا</span><span class="info-card__value">editors@bnfsj.net</span></span>
            </a>
            <div class="info-card" style="cursor:default">
              <span class="info-card__icon"><i class="fa-solid fa-clock" aria-hidden="true"></i></span>
              <span><span class="info-card__label">وقت الردّ</span><span class="info-card__value">خلال 48 ساعة عملٍ عادةً</span></span>
            </div>
            <div class="info-card" style="cursor:default">
              <span class="info-card__icon"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i></span>
              <span style="flex:1">
                <span class="info-card__label">تابعينا</span>
                <span class="profile__social" style="margin-top:6px">
                  <a class="share__btn share__btn--fb" href="#" aria-label="فيسبوك"><i class="fa-brands fa-facebook-f"></i></a>
                  <a class="share__btn share__btn--x" href="#" aria-label="إكس"><i class="fa-brands fa-x-twitter"></i></a>
                  <a class="share__btn" href="#" aria-label="إنستغرام"><i class="fa-brands fa-instagram"></i></a>
                </span>
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section class="soft-bg">
        <div class="container block">
          <div class="block__head">
            <span class="section-eyebrow">الأسئلة الشائعة</span>
            <h2 class="section-title">ربّما تجدين إجابتكِ هنا</h2>
          </div>
${faqList(FAQS.slice(0, 4))}
        </div>
      </section>`;

  fs.writeFileSync("contact-us.html", page({
    title: "تواصلي معنا", active: "", body,
    desc: "تواصلي مع فريق بنفسج: للأسئلة والاقتراحات والكتابة معنا.",
  }));
  console.log("contact-us.html written");
}

/* ---------- faq.html ---------- */
{
  const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">الأسئلة الشائعة</span>
        </nav>
        <header class="page-hero">
          <span class="page-hero__kicker"><i class="fa-regular fa-circle-question" aria-hidden="true"></i> مركز المساعدة</span>
          <h1 class="page-hero__title">الأسئلة الشائعة</h1>
          <p class="page-hero__lead">جمعنا لكِ أكثر الأسئلة تكرارًا حول بنفسج: الكتابة، والاشتراك، والمشاركة. إن لم تجدي إجابتكِ، نحن على بُعد رسالة.</p>
        </header>
      </div>

      <section class="container page--tight">
${faqList(FAQS)}
      </section>

      <section class="container block">
        <div class="cta-band">
          <h2 class="cta-band__title">لم تجدي ما تبحثين عنه؟</h2>
          <p class="cta-band__text">فريقنا سعيدٌ بمساعدتكِ. أرسلي سؤالكِ وسنردّ عليكِ في أقرب وقت.</p>
          <div class="cta-band__actions">
            <a class="btn btn--lg btn--on-dark" href="contact-us.html">تواصلي معنا</a>
          </div>
        </div>
      </section>`;

  fs.writeFileSync("faq.html", page({
    title: "الأسئلة الشائعة", active: "", body,
    desc: "الأسئلة الشائعة حول منصّة بنفسج.",
  }));
  console.log("faq.html written");
}

/* ---------- 404.html ---------- */
{
  const suggested = [byId(24), byId(15), byId(20)];
  const body = `      <section class="container">
        <div class="error-page">
          <div class="error-page__code">٤٠٤</div>
          <h1 class="error-page__title">يبدو أن هذه الصفحة ذهبت في نزهة…</h1>
          <p class="error-page__text">لم نتمكّن من العثور على ما تبحثين عنه. ربّما تغيّر الرابط أو حُذفت الصفحة، لكن لا تقلقي — هناك الكثير من القصص الجميلة بانتظاركِ.</p>
          <div class="cta-band__actions" style="justify-content:center">
            <a class="btn btn--primary btn--lg" href="index.html"><i class="fa-solid fa-house" aria-hidden="true"></i> العودة للرئيسية</a>
            <a class="btn btn--lg btn--ghost" href="articles.html">تصفّحي المقالات</a>
          </div>
        </div>
      </section>

      <section class="container block">
        <div class="block__head">
          <span class="section-eyebrow">قد يعجبكِ</span>
          <h2 class="section-title">مقالاتٌ مُقترحة لكِ</h2>
        </div>
        <div class="archive-grid">
${suggested.map(card).join("\n")}
        </div>
      </section>`;

  fs.writeFileSync("404.html", page({
    title: "صفحة غير موجودة", active: "", body,
    desc: "الصفحة المطلوبة غير موجودة.",
  }));
  console.log("404.html written");
}
