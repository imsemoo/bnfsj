const fs = require("fs");
const { page } = require("./_chrome");
const { imgU, AUTHORS, byId, card } = require("./_data");

const a = byId(24);          // featured hero article
const au = AUTHORS[a.author]; // أسماء عوض
const SHARE_URL = "https://bnfsj.net/article/nawal-alali";
const SHARE_TITLE = "نوال العلي: تعلّمتُ من أبنائي أنّ الحبّ يُربّي قبل أن يُربّي الكلام";
const u = encodeURIComponent(SHARE_URL);
const t = encodeURIComponent(SHARE_TITLE);

const share = `        <div class="share" aria-label="مشاركة المقال">
          <span class="share__label">شاركي:</span>
          <a class="share__btn share__btn--fb" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" aria-label="مشاركة على فيسبوك"><i class="fa-brands fa-facebook-f"></i></a>
          <a class="share__btn share__btn--wa" href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener" aria-label="مشاركة على واتساب"><i class="fa-brands fa-whatsapp"></i></a>
          <a class="share__btn share__btn--tg" href="https://t.me/share/url?url=${u}&text=${t}" target="_blank" rel="noopener" aria-label="مشاركة على تيليجرام"><i class="fa-brands fa-telegram"></i></a>
          <a class="share__btn share__btn--x" href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener" aria-label="مشاركة على إكس"><i class="fa-brands fa-x-twitter"></i></a>
          <a class="share__btn share__btn--in" href="https://www.linkedin.com/sharing/share-offsite/?url=${u}" target="_blank" rel="noopener" aria-label="مشاركة على لينكدإن"><i class="fa-brands fa-linkedin-in"></i></a>
          <button class="share__btn share__btn--copy" type="button" data-copy-link aria-label="نسخ الرابط"><i class="fa-solid fa-link"></i></button>
        </div>`;

const related = [byId(22), byId(13), byId(5)];

const body = `      <div class="container">
        <nav class="breadcrumb" aria-label="مسار التصفّح" style="margin-bottom:var(--space-6)">
          <a href="index.html">الرئيسية</a>
          <span class="breadcrumb__sep">›</span>
          <a href="articles.html">المقالات</a>
          <span class="breadcrumb__sep">›</span>
          <a href="category.html">أسرة وأمومة</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">حوار نوال العلي</span>
        </nav>

        <div class="article">
          <article>
            <span class="article__badge"><i class="fa-solid fa-comments" aria-hidden="true"></i> حوارات</span>
            <h1 class="article__title">${SHARE_TITLE}</h1>

            <div class="article__byline">
              <a class="article__author" href="author.html">
                <span class="article__author-avatar"><img src="${imgU(au.img, 96, 96, "faces")}" alt="${au.name}"></span>
                <span>
                  <span class="article__author-name">${au.name}</span>
                  <span class="article__author-role">${au.role}</span>
                </span>
              </a>
              <div class="article__meta-list">
                <span><i class="fa-regular fa-calendar" aria-hidden="true"></i> ${a.date}</span>
                <span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${a.read} دقائق قراءة</span>
                <span><i class="fa-regular fa-eye" aria-hidden="true"></i> 9.1 ألف قراءة</span>
              </div>
            </div>

            <figure class="article__featured">
              <img src="${imgU(a.img, 1120, 630, "faces")}" alt="نوال العلي مع أبنائها">
            </figure>
            <p class="article__featured-caption">الكاتبة نوال العلي في جلسةٍ عائلية — تصوير فريق بنفسج</p>

            <div class="prose" data-article-body>
              <p>حين تجلس نوال العلي للحديث عن أبنائها، يتغيّر صوتها قليلًا؛ يصبح أكثر دفئًا وأبطأ، كأنها تستعيد لحظاتٍ ما زالت تسكنها. تقول في مستهلّ حوارنا: «ظننتُ أنّني سأُعلّم أطفالي كلّ شيء، فإذا بهم يُعلّمونني أن الحبّ يسبق الكلام، وأن الحضور أبلغ من كلّ نصيحة».</p>

              <p>في هذا الحوار، نفتح مع نوال نافذةً على تجربتها في التربية بالحبّ، وعن المعنى الذي وُلد لها من الأمومة بوصفها رحلة نموٍّ متبادل لا مهمّةً أحادية الاتجاه.</p>

              <h2 id="sec-1">البداية: حين أصبح البيت مدرستي الأولى</h2>
              <p>تتذكّر نوال أن أصعب ما واجهها في سنواتها الأولى كأمّ لم يكن قلّة النوم ولا تعب الجسد، بل ذلك الصوت الداخلي الذي يقارنها دائمًا بأمهاتٍ «أكثر صبرًا، وأكثر تنظيمًا». تقول: «تعلّمتُ متأخّرة أن الأمومة المثالية وهمٌ جميل، وأن ابني لا يحتاج أمًّا كاملة، بل أمًّا حاضرة».</p>
              <p>من هنا بدأت رحلتها مع ما تسمّيه «التربية بالحبّ»: أن نرى الطفل كما هو، لا كما نتمنّاه، وأن نمنحه الأمان أوّلًا، فتُبنى الثقة، ويتعلّم من تلقاء نفسه.</p>

              <blockquote class="pullquote">
                «لا أربّي أبنائي على الطاعة، بل على الفهم. أريدهم أن يفعلوا الصواب لأنهم يؤمنون به، لا لأنهم يخافون منّي».
                <cite>نوال العلي</cite>
              </blockquote>

              <h2 id="sec-2">الحبّ أوّلًا… ثم تأتي القواعد</h2>
              <p>ترفض نوال الثنائية الشائعة بين «الحزم» و«الحنان»، وترى أنهما وجهان لعملةٍ واحدة. «الطفل الذي يشعر بالحبّ يتقبّل الحدود بسهولة، لأنه يثق أن من يضعها يريد مصلحته». وتضرب مثالًا بسيطًا: بدلًا من أن تقول لابنتها «توقّفي عن البكاء»، صارت تقول «أنا معكِ، خذي وقتكِ».</p>
              <p>وتشدّد على أن وضع الحدود ليس قسوة؛ إنه شكلٌ من أشكال الرعاية، شريطة أن يكون ثابتًا وواضحًا وخاليًا من التهديد.</p>

              <h2 id="sec-3">حين يُخطئ الأبناء: فرصةٌ لا معركة</h2>
              <p>تعتبر نوال أن خطأ الطفل ليس مناسبةً للعقاب بقدر ما هو فرصةٌ للتعلّم. «حين يكسر طفلي شيئًا، لا أسأله: لماذا فعلت؟ بل أسأله: كيف نُصلح هذا معًا؟». بهذه الطريقة، تقول، يتعلّم الطفل المسؤولية دون أن يفقد كرامته.</p>
              <ul>
                <li>أصغي قبل أن تحكمي؛ فخلف كلّ سلوكٍ حاجةٌ لم تُفهم بعد.</li>
                <li>سمّي مشاعر طفلكِ له؛ فتسميتها نصفُ علاجها.</li>
                <li>كوني القدوة التي تتمنّينها؛ فالأطفال يقلّدون ما نفعل لا ما نقول.</li>
              </ul>

              <h2 id="sec-4">رسالةٌ أخيرة إلى كلّ أمّ</h2>
              <p>تختم نوال حديثها برسالةٍ تشبهها: «لا تنتظري أن تكوني الأمّ الكاملة لتبدئي. ابدئي بحبٍّ صادق، واغفري لنفسكِ كثيرًا، فالأبناء لا يتذكّرون أمًّا لم تُخطئ، بل أمًّا كانت دائمًا هناك».</p>
              <p>وربّما هذا هو الدرس الأعمق في حوارنا معها: أن التربية ليست سباقًا نحو الكمال، بل رحلةٌ يكبر فيها الطفل والأمّ معًا… على مهلٍ، وبحبّ.</p>
            </div>

            <div class="article-actions">
${share}
              <button class="print-btn" type="button" data-print><i class="fa-solid fa-print" aria-hidden="true"></i> طباعة المقال</button>
            </div>

            <div class="author-box">
              <span class="author-box__avatar"><img src="${imgU(au.img, 160, 160, "faces")}" alt="${au.name}"></span>
              <div>
                <h3 class="author-box__name">${au.name}</h3>
                <span class="author-box__role">${au.role}</span>
                <p class="author-box__bio">${au.bio}</p>
              </div>
            </div>

            <nav class="prevnext" aria-label="تصفّح المقالات">
              <a class="prevnext__item prevnext__item--prev" href="single-article.html">
                <span class="prevnext__dir"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> السابق</span>
                <span class="prevnext__title">التربية بالحبّ: كيف نبني مع أطفالنا علاقةً تدوم؟</span>
              </a>
              <a class="prevnext__item prevnext__item--next" href="single-article.html">
                <span class="prevnext__dir">التالي <i class="fa-solid fa-chevron-left" aria-hidden="true"></i></span>
                <span class="prevnext__title">اخترتُ أن أبدأ من جديد… فوجدتُ نفسي</span>
              </a>
            </nav>
          </article>

          <!-- Sidebar -->
          <aside class="article-aside">
            <nav class="toc" data-toc aria-label="محتويات المقال">
              <h2 class="toc__title">في هذا المقال</h2>
              <ul class="toc__list">
                <li><a href="#sec-1">البداية: حين أصبح البيت مدرستي الأولى</a></li>
                <li><a href="#sec-2">الحبّ أوّلًا… ثم تأتي القواعد</a></li>
                <li><a href="#sec-3">حين يُخطئ الأبناء: فرصةٌ لا معركة</a></li>
                <li><a href="#sec-4">رسالةٌ أخيرة إلى كلّ أمّ</a></li>
              </ul>
            </nav>
            <div class="toc">
              <h2 class="toc__title">شاركي المقال</h2>
${share.replace('share__label">شاركي:', 'share__label">عبر:')}
            </div>
          </aside>
        </div>
      </div>

      <!-- Related -->
      <section class="container block related">
        <div class="sec-head" style="margin-bottom:var(--space-8)">
          <div class="sec-head__right"><div class="sec-head__text">
            <span class="sec-head__kicker">قد يعجبكِ أيضًا</span>
            <h2 class="sec-head__title"><a href="articles.html">مقالاتٌ ذات صلة</a></h2>
          </div></div>
          <a class="sec-head__more" href="articles.html">كل المقالات <i class="fa-solid fa-arrow-left" aria-hidden="true"></i></a>
        </div>
        <div class="archive-grid">
${related.map(card).join("\n")}
        </div>
      </section>

      <div class="share-toast" data-toast></div>`;

fs.writeFileSync("single-article.html", page({
  title: SHARE_TITLE, active: "", body, progress: true,
  desc: "حوار بنفسج مع نوال العلي عن التربية بالحبّ والأمومة بوصفها رحلة نموٍّ متبادل.",
}));
console.log("single-article.html written");
