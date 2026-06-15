const fs = require("fs");
const { page } = require("./_chrome");
const { imgU } = require("./_data");

const body = `      <div class="container">
        <nav class="breadcrumb page-hero__breadcrumb" aria-label="مسار التصفّح">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">عن بنفسج</span>
        </nav>
      </div>

      <!-- Hero -->
      <section class="container page--tight">
        <div class="cover-hero">
          <div class="cover-hero__img"><img src="${imgU("photo-1730812670456-7bd7f5a4d640", 1280, 520, "faces")}" alt="نساء بنفسج"></div>
          <div class="cover-hero__content">
            <span class="cover-hero__kicker"><i class="fa-solid fa-feather" aria-hidden="true"></i> حضور امرأة</span>
            <h1 class="cover-hero__title">بنفسج… حين يصبح حضور المرأة قصّةً تُروى بصوتها</h1>
            <p class="cover-hero__desc">منصّةٌ إعلامية نسائية تُنتج محتواها بأيدي النساء وللنساء، برؤًى تصنعها نساءٌ عربيات فلسطينيات تؤمنّ بأن للمرأة حضورًا تختاره… في وعيها أوّلًا، وفي صوتها إذا تحدّثت، وفي كلماتها إذا كتبت.</p>
          </div>
        </div>
      </section>

      <!-- من نحن -->
      <section class="container block">
        <div class="split">
          <div>
            <span class="section-eyebrow">من نحن</span>
            <h2 class="section-title">منصّةٌ تجعل من المرأة ذاتًا تُعرّف نفسها بنفسها</h2>
            <div class="section-text">
              <p>«بنفسج» تعريفٌ يجمع بين <strong>الحضور</strong> و<strong>المرأة</strong> معًا. نحن لا نتحدّث <em>عن</em> المرأة من بعيد، بل نمنحها المنبر لتتحدّث عن نفسها، وتكتب تجربتها، وتشارك وعيها مع نساءٍ يشبهنها.</p>
              <p>نُعنى بالمرأة وقضاياها في المجالات الفكرية والثقافية والاجتماعية، بطابعٍ نهضويٍّ متّزن، يضع قضايا المرأة ضمن سياقها المجتمعي الأوسع، بعيدًا عن الصخب والاستقطاب.</p>
            </div>
          </div>
          <div class="split__media"><img src="${imgU("photo-1517971129774-8a2b38fa128e", 720, 900, "faces")}" alt="الكتابة بأيدي النساء"></div>
        </div>
      </section>

      <!-- رؤيتنا + رسالتنا -->
      <section class="container block">
        <div class="vm-grid">
          <article class="vm-card vm-card--dark">
            <div class="vm-card__icon"><i class="fa-solid fa-eye" aria-hidden="true"></i></div>
            <h3 class="vm-card__title">رؤيتنا</h3>
            <p class="vm-card__text">أن تكون المرأة حاضرةً في وعيها وصوتها وكلمتها؛ نُنتج معارفَ تخصّها في كينونتها وأدوارها، ونصنع فضاءً تُعبّر فيه عن ذاتها بثقةٍ واتّزان.</p>
          </article>
          <article class="vm-card">
            <div class="vm-card__icon"><i class="fa-solid fa-compass" aria-hidden="true"></i></div>
            <h3 class="vm-card__title">رسالتنا</h3>
            <p class="vm-card__text">نرافق المرأة في رحلةٍ تبدأ من تصحيح تصوّرها عن ذاتها، مرورًا بتطوير مهاراتها، وصولًا إلى تفعيل أدوارها في السياقات الأسرية والمجتمعية والإنسانية.</p>
          </article>
        </div>
      </section>

      <!-- قيمنا -->
      <section class="soft-bg">
        <div class="container block">
          <div class="block__head">
            <span class="section-eyebrow">قيمنا</span>
            <h2 class="section-title">مبادئُ نكتب على هُداها</h2>
            <p class="section-text">قيمٌ تحكم كلّ كلمةٍ ننشرها، وتمنح بنفسج هويتها الخاصّة.</p>
          </div>
          <div class="values-grid">
            <article class="value-card">
              <div class="value-card__icon"><i class="fa-solid fa-heart" aria-hidden="true"></i></div>
              <h3 class="value-card__title">الأصالة</h3>
              <p class="value-card__text">محتوًى بأيدي النساء وللنساء، نابعٌ من تجربةٍ حقيقية لا من قوالبَ جاهزة.</p>
            </article>
            <article class="value-card">
              <div class="value-card__icon"><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i></div>
              <h3 class="value-card__title">التوازن</h3>
              <p class="value-card__text">رؤًى متّزنة تعالج قضايا المرأة ضمن سياقها الأوسع، بلا صخبٍ ولا استقطاب.</p>
            </article>
            <article class="value-card">
              <div class="value-card__icon"><i class="fa-solid fa-people-group" aria-hidden="true"></i></div>
              <h3 class="value-card__title">التشاركية</h3>
              <p class="value-card__text">نُصغي ونُشرك؛ فالحكاية التي تُروى بأصواتٍ متعدّدة أصدقُ وأعمق.</p>
            </article>
            <article class="value-card">
              <div class="value-card__icon"><i class="fa-solid fa-book-open" aria-hidden="true"></i></div>
              <h3 class="value-card__title">العمق</h3>
              <p class="value-card__text">نُفضّل القراءة الهادئة على العناوين الصاخبة، والمعنى على الضجيج.</p>
            </article>
            <article class="value-card">
              <div class="value-card__icon"><i class="fa-solid fa-hands-holding-circle" aria-hidden="true"></i></div>
              <h3 class="value-card__title">الاحترام</h3>
              <p class="value-card__text">نحترم وعي القارئة وذكاءها، ونخاطبها كشريكةٍ لا كمتلقٍّ سلبي.</p>
            </article>
            <article class="value-card">
              <div class="value-card__icon"><i class="fa-solid fa-spa" aria-hidden="true"></i></div>
              <h3 class="value-card__title">الجمال</h3>
              <p class="value-card__text">نؤمن أن للشكل رسالة؛ فنُقدّم المحتوى بلغةٍ راقية وتصميمٍ يليق بالمعنى.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- لماذا بنفسج -->
      <section class="container block">
        <div class="block__head">
          <span class="section-eyebrow">لماذا بنفسج؟</span>
          <h2 class="section-title">لأنّ صوتكِ يستحقّ مساحةً تليق به</h2>
        </div>
        <div class="why-list">
          <div class="why-item">
            <div class="why-item__check"><i class="fa-solid fa-check" aria-hidden="true"></i></div>
            <div>
              <h3 class="why-item__title">محتوًى يصنعه نساءٌ يفهمنكِ</h3>
              <p class="why-item__text">كاتباتٌ ومختصّاتٌ يكتبن من قلب التجربة، فتجدين في كلماتهنّ صدى أيامكِ.</p>
            </div>
          </div>
          <div class="why-item">
            <div class="why-item__check"><i class="fa-solid fa-check" aria-hidden="true"></i></div>
            <div>
              <h3 class="why-item__title">قضايا حقيقية بلا تهويل</h3>
              <p class="why-item__text">نتناول الأسرة والأمومة والذات والمجتمع برؤيةٍ نهضوية متّزنة وصادقة.</p>
            </div>
          </div>
          <div class="why-item">
            <div class="why-item__check"><i class="fa-solid fa-check" aria-hidden="true"></i></div>
            <div>
              <h3 class="why-item__title">تجربة قراءةٍ فاخرة</h3>
              <p class="why-item__text">تصميمٌ هادئ وطباعةٌ مريحة للعين، لتقرئي على مهلٍ وراحة.</p>
            </div>
          </div>
          <div class="why-item">
            <div class="why-item__check"><i class="fa-solid fa-check" aria-hidden="true"></i></div>
            <div>
              <h3 class="why-item__title">مجتمعٌ يكبر معكِ</h3>
              <p class="why-item__text">سفيراتٌ وكاتباتٌ وقارئاتٌ من مختلف البلدان، تجمعهنّ روحٌ واحدة.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="container block--tight">
        <div class="stats-band">
          <div class="stat"><span class="stat__num">+1200</span><span class="stat__label">مقالة منشورة</span></div>
          <div class="stat"><span class="stat__num">+50</span><span class="stat__label">كاتبة ومختصّة</span></div>
          <div class="stat"><span class="stat__num">+500K</span><span class="stat__label">قارئة شهريًّا</span></div>
          <div class="stat"><span class="stat__num">12</span><span class="stat__label">دولة عربية</span></div>
        </div>
      </section>

      <!-- CTA -->
      <section class="container block">
        <div class="cta-band">
          <h2 class="cta-band__title">شاركينا حضوركِ</h2>
          <p class="cta-band__text">سواءٌ أردتِ أن تكتبي، أو تقترحي فكرة، أو تكوني سفيرةً لبنفسج في بلدكِ — بابنا مفتوحٌ لكِ.</p>
          <div class="cta-band__actions">
            <a class="btn btn--lg btn--on-dark" href="contact-us.html">تواصلي معنا</a>
            <a class="btn btn--lg btn--outline-light" href="articles.html">تصفّحي المقالات</a>
          </div>
        </div>
      </section>`;

fs.writeFileSync("about.html", page({
  title: "عن بنفسج",
  desc: "بنفسج منصّة إعلامية نسائية تُنتج محتواها بأيدي النساء وللنساء، برؤًى نهضوية متّزنة تُعنى بحضور المرأة وقضاياها.",
  active: "عن بنفسج",
  body,
}));
console.log("about.html written");
