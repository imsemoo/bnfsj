/* Shared content store reused across all archive/article/author/search pages
   so the site behaves like one coherent publication. */

const imgU = (id, w, h, crop = "faces") =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&crop=${crop}&q=80&auto=format`;

// Author identities (consistent portraits, mirrors the homepage)
const AUTHORS = {
  sara:  { name: "سارة النمر",     role: "كاتبة ومُحرّرة", img: "photo-1550546094-9835463f9f71", x: "@sara_alnemr",
           bio: "كاتبة ومحرّرة مهتمّة بقضايا المرأة والأسرة، تكتب بلغةٍ دافئة تُقرّب الفكرة من القلب قبل العقل. لها أكثر من مئة مقالٍ في بنفسج حول الحرية الداخلية وتوازن الحياة." },
  noura: { name: "نورة العبدالله", role: "باحثة اجتماعية", img: "photo-1558027309-0844844295f7", x: "@noura_abd",
           bio: "باحثة اجتماعية تُعنى بالعلاقات الأسرية وحضور المرأة في الفضاء العام، تنقل الأفكار الأكاديمية إلى لغةٍ يومية بسيطة وعميقة في آنٍ معًا." },
  hana:  { name: "د. هنا سعيد",     role: "أخصائية نفسية", img: "photo-1544059529-9a9a0a4ef94f", x: "@dr_hana",
           bio: "أخصائية نفسية ومُدرّبة في الصحة النفسية للمرأة، تؤمن أن العناية بالروح ليست رفاهية بل ضرورة. تكتب عن القلق، والحدود الصحية، والطمأنينة." },
  asma:  { name: "أسماء عوض",      role: "مختصّة تربوية", img: "photo-1574297500578-afae55026ff3", x: "@asma_awad",
           bio: "مختصّة في التربية الإيجابية وعلاقات الأهل بالأبناء، تكتب من قلب التجربة الأمومية عن الحبّ بوصفه أوّل أدوات التربية." },
  rasha: { name: "رشا المصري",     role: "كاتبة في تطوير الذات", img: "photo-1613447895817-e617a4093f50", x: "@rasha_m",
           bio: "كاتبة في تطوير الذات والكتابة العلاجية، بدأت رحلتها من الصمت إلى الكلمة، وتشارك القارئات أدوات صغيرة لحياةٍ أكثر اتّساعًا." },
  mariam:{ name: "مريم خالد",      role: "مصمّمة ومستشارة ديكور", img: "photo-1661254601903-0edfe1cd736c", x: "@mariam_decor",
           bio: "مصمّمة داخلية تؤمن أن الجمال يبدأ من تفصيلٍ صغير. تكتب عن صناعة الدفء في البيوت بميزانياتٍ بسيطة وذوقٍ رفيع." },
};

// Categories (label + filter key + accent)
const CATEGORIES = [
  { key: "all", label: "الكل" },
  { key: "osra", label: "أسرة" },
  { key: "omoma", label: "أمومة" },
  { key: "decor", label: "ديكور" },
  { key: "saha", label: "صحة" },
  { key: "matbakh", label: "مطبخ" },
  { key: "tatweer", label: "تطوير الذات" },
  { key: "fikr", label: "فكر" },
  { key: "lifestyle", label: "لكِ" },
];

const catLabel = (k) => (CATEGORIES.find((c) => c.key === k) || {}).label || k;

// 24 articles. id used for ordering/recency; views for popularity.
const ARTICLES = [
  { id: 24, cat: "omoma", img: "photo-1611066028607-cd58e29818f5", author: "asma", date: "12 يونيو 2026", read: 7, views: 9100,
    title: "نوال العلي: تعلّمتُ من أبنائي أنّ الحبّ يُربّي قبل أن يُربّي الكلام",
    excerpt: "في حوارٍ دافئ عن الأمومة بوصفها رحلة نموٍّ متبادل، وعن اللحظات الصغيرة التي تصنع الأمان في قلوب أبنائنا." },
  { id: 23, cat: "tatweer", img: "photo-1681152299027-17efe7da7081", author: "rasha", date: "9 يونيو 2026", read: 6, views: 7400,
    title: "اخترتُ أن أبدأ من جديد… فوجدتُ نفسي",
    excerpt: "بعد سنواتٍ من العطاء للآخرين، كيف يصير التغيير في منتصف العمر بدايةً لا نهاية." },
  { id: 22, cat: "osra", img: "photo-1583357820970-221489bb3e72", author: "asma", date: "11 يونيو 2026", read: 8, views: 8800,
    title: "التربية بالحبّ: كيف نبني مع أطفالنا علاقةً تدوم؟",
    excerpt: "أساليبُ لطيفة تُعزّز ثقة الطفل بنفسه، وتمنحه شعورًا عميقًا بالأمان والانتماء." },
  { id: 21, cat: "decor", img: "photo-1588471980726-8346cb477a33", author: "mariam", date: "10 يونيو 2026", read: 5, views: 6300,
    title: "ركنُكِ الخاص: زاويةٌ للقراءة والتأمّل في قلب بيتكِ",
    excerpt: "بكرسيٍّ وثير وضوءٍ دافئ ونبتةٍ صغيرة، تتحوّل أبسط زاوية إلى ملاذٍ يخصّكِ وحدكِ." },
  { id: 20, cat: "saha", img: "photo-1518708909080-704599b19972", author: "hana", date: "9 يونيو 2026", read: 6, views: 7900,
    title: "استعيدي توازنكِ: عاداتٌ صغيرة تُجدّد طاقتكِ النفسية",
    excerpt: "دقائقُ من التنفّس العميق والصمت قد تكون أرحم ما تُهدينه لنفسكِ في يومٍ مزدحم." },
  { id: 19, cat: "matbakh", img: "photo-1556911073-52527ac43761", author: "mariam", date: "7 يونيو 2026", read: 4, views: 5400,
    title: "عشاءٌ في عشرين دقيقة: وصفاتٌ سريعة تليق بيومكِ المزدحم",
    excerpt: "أفكارٌ لذيذة ومُغذّية تجمع العائلة حول المائدة دون عناءٍ أو إرهاق." },
  { id: 18, cat: "osra", img: "photo-1764267704086-261af367c19f", author: "asma", date: "5 يونيو 2026", read: 9, views: 6800,
    title: "حين يكبر أبناؤنا: مفاتيح حوارٍ صادق مع المراهقين",
    excerpt: "بين الحماية والثقة خيطٌ رفيع… إليكِ كيف تُمسكين به بحكمةٍ وحنان." },
  { id: 17, cat: "decor", img: "photo-1631679706909-1844bbd07221", author: "mariam", date: "2 يونيو 2026", read: 5, views: 5100,
    title: "ألوان الصيف في بيتكِ: خمس لمساتٍ تُجدّد المكان",
    excerpt: "غيّري مزاج منزلكِ بتفاصيل بسيطة: وسائدُ دافئة، ونباتٌ أخضر، وضوءٌ يداعب الأركان." },
  { id: 16, cat: "tatweer", img: "photo-1517971129774-8a2b38fa128e", author: "rasha", date: "1 يونيو 2026", read: 7, views: 8200,
    title: "حين وجدتُ نفسي في الكتابة بعد سنواتٍ من الصمت",
    excerpt: "قصةٌ شخصية عن رحلة اكتشاف الذات عبر الكلمات، وكيف صارت الكتابة ملاذًا آمنًا." },
  { id: 15, cat: "fikr", img: "photo-1456324504439-367cee3b3c32", author: "sara", date: "29 مايو 2026", read: 11, views: 9600,
    title: "في معنى أن تكوني أنتِ: تأمّلاتٌ في الحرية الحقيقية للمرأة",
    excerpt: "هل الحريةُ أن نفعل ما نشاء؟ أم أنها تبدأ من فهمِ ما نحتاجه حقًّا؟" },
  { id: 14, cat: "fikr", img: "photo-1488190211105-8b0e65b80b4e", author: "hana", date: "26 مايو 2026", read: 9, views: 7100,
    title: "الأمومة ليست وظيفة: حين نعيد تعريف أجملِ الأدوار وأصعبها",
    excerpt: "بين الصورة المثالية والواقع اليومي فجوةٌ واسعة في نظرتنا إلى الأمومة." },
  { id: 13, cat: "omoma", img: "photo-1611066028607-cd58e29818f5", author: "asma", date: "24 مايو 2026", read: 6, views: 6900,
    title: "حين تكبر بناتنا: رسالةٌ من أمٍّ إلى ابنتها الصغيرة",
    excerpt: "كلماتٌ نودّ لو همسناها مبكرًا، عن الثقة والجمال والقيمة التي لا تُقاس بنظرة أحد." },
  { id: 12, cat: "saha", img: "photo-1522075782449-e45a34f1ddfb", author: "hana", date: "21 مايو 2026", read: 8, views: 8500,
    title: "خلوةٌ مع الذات: في فضل اللحظات التي نقضيها وحدنا",
    excerpt: "العزلة المختارة ليست وحدة؛ إنها مساحةٌ نُعيد فيها ترتيب أنفسنا بهدوء." },
  { id: 11, cat: "lifestyle", img: "photo-1570554886111-e80fcca6a029", author: "mariam", date: "18 مايو 2026", read: 5, views: 6100, crop: "entropy",
    title: "وصفاتٌ طبيعية لعنايةٍ لطيفة بشعركِ هذا الصيف",
    excerpt: "من زيت الأرغان إلى ماء الورد، مكوّناتٌ بسيطة من مطبخكِ تُعيد للشعر حيويته." },
  { id: 10, cat: "matbakh", img: "photo-1653611540493-b3a896319fbf", author: "mariam", date: "15 مايو 2026", read: 6, views: 5800, crop: "entropy",
    title: "مائدةٌ تجمعنا: نكهاتٌ تراثية تُعيدنا إلى بيت الجدّة",
    excerpt: "في المفتول والمقلوبة حكايةُ بيتٍ وأجيال، نُعيد إحياءها بخطواتٍ سهلة ومحبّة." },
  { id: 9, cat: "osra", img: "photo-1713071088166-9fd3a06d65b8", author: "asma", date: "12 مايو 2026", read: 7, views: 6400,
    title: "حكاية أبٍ وابن: عن الرجولة التي تتعلّم الحنان",
    excerpt: "كيف يصنع حضور الأب الدافئ فرقًا في تكوين شخصية الطفل وثقته بالعالم." },
  { id: 8, cat: "tatweer", img: "photo-1578513492882-c2a46b45af17", author: "rasha", date: "9 مايو 2026", read: 6, views: 7000,
    title: "دفترٌ صغير لعاداتٍ كبيرة: كيف تبدئين رحلة الكتابة اليومية؟",
    excerpt: "صفحةٌ في الصباح قد تُغيّر مزاج يومكِ كلّه؛ إليكِ كيف تبدئين بلا ضغط." },
  { id: 7, cat: "decor", img: "photo-1631510390389-c1e4fb20ff31", author: "mariam", date: "6 مايو 2026", read: 5, views: 5300, crop: "entropy",
    title: "البساطة فنّ: كيف تصنعين أناقةً هادئة بأقل التفاصيل؟",
    excerpt: "الأناقة الحقيقية في المنزل ليست ازدحامًا، بل مساحةٌ تتنفّس وتُريح العين." },
  { id: 6, cat: "saha", img: "photo-1506126613408-eca07ce68773", author: "hana", date: "3 مايو 2026", read: 7, views: 6700, crop: "entropy",
    title: "تنفّسي: تمارينُ بسيطة تُهدّئ القلق في خمس دقائق",
    excerpt: "حين يضيق الصدر، يكفي نفَسٌ واعٍ لتستعيدي حضوركِ وهدوءكِ من جديد." },
  { id: 5, cat: "omoma", img: "photo-1616894355117-59dd2e68818f", author: "asma", date: "30 أبريل 2026", read: 6, views: 5900,
    title: "أمومةٌ بلا ذنب: كفي عن مقارنة نفسكِ بالأمهات الأخريات",
    excerpt: "لا توجد أمٌّ مثالية؛ هناك أمٌّ تُحاول بحبّ، وهذا وحده يكفي." },
  { id: 4, cat: "fikr", img: "photo-1446161543652-83eaa65fddab", author: "sara", date: "27 أبريل 2026", read: 10, views: 7300, crop: "entropy",
    title: "في حضرة الجدّات: ذاكرةٌ نسائية تتوارثها الأجيال",
    excerpt: "تحفظ الجدّات في صدورهنّ خرائطَ بيوتٍ وروائحَ حقول… ذاكرةٌ هي أجمل ما يُورَّث." },
  { id: 3, cat: "lifestyle", img: "photo-1556910638-6cdac31d44dc", author: "mariam", date: "24 أبريل 2026", read: 4, views: 5000, crop: "entropy",
    title: "روتينٌ صباحي يشبهكِ: كيف تبدئين يومكِ بطاقةٍ ولُطف؟",
    excerpt: "خمسُ عاداتٍ صغيرة تمنح صباحكِ هدوءًا يرافقكِ حتى آخر النهار." },
  { id: 2, cat: "tatweer", img: "photo-1554244933-d876deb6b2ff", author: "rasha", date: "20 أبريل 2026", read: 8, views: 6600, crop: "entropy",
    title: "حدودٌ صحية: كيف تقولين «لا» دون أن تشعري بالذنب؟",
    excerpt: "وضع الحدود ليس قسوة؛ إنه احترامٌ لذاتكِ ولطاقتكِ ولوقتكِ الثمين." },
  { id: 1, cat: "matbakh", img: "photo-1625631980683-825234bfb7d5", author: "mariam", date: "16 أبريل 2026", read: 5, views: 4800,
    title: "على نارٍ هادئة: حين يصير المطبخ مساحةً للحبّ والذكريات",
    excerpt: "الطبخ ليس واجبًا فحسب؛ إنه طقسٌ نصنع فيه دفء البيت ونكهة الأيام." },
];

const byId = (id) => ARTICLES.find((a) => a.id === id);
const authorOf = (a) => AUTHORS[a.author];

// Render one post-card. `cls` lets callers add a data-order/views for sort.
function card(a) {
  const au = AUTHORS[a.author];
  return `          <a class="post-card" href="single-article.html" data-category="${a.cat}" data-order="${a.id}" data-views="${a.views}">
            <div class="post-card__media">
              <img src="${imgU(a.img, 600, 380, a.crop || "faces")}" alt="${a.title}" loading="lazy">
              <span class="post-card__cat">${catLabel(a.cat)}</span>
            </div>
            <div class="post-card__body">
              <h3 class="post-card__title">${a.title}</h3>
              <p class="post-card__excerpt">${a.excerpt}</p>
              <div class="post-card__meta">
                <span class="post-card__author"><i class="fa-solid fa-feather" aria-hidden="true"></i> ${au.name}</span>
                <span><i class="fa-regular fa-calendar" aria-hidden="true"></i> ${a.date}</span>
                <span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${a.read} د قراءة</span>
              </div>
            </div>
          </a>`;
}

function rankedItem(a, n) {
  return `            <a class="ranked-item" href="single-article.html">
              <span class="ranked-item__num">${String(n).padStart(2, "0")}</span>
              <div class="ranked-item__thumb"><img src="${imgU(a.img, 160, 140, a.crop || "faces")}" alt="${a.title}" loading="lazy"></div>
              <div>
                <h4 class="ranked-item__title">${a.title}</h4>
                <span class="ranked-item__meta">${a.date} · ${a.read} دقائق</span>
              </div>
            </a>`;
}

module.exports = { imgU, AUTHORS, CATEGORIES, ARTICLES, catLabel, byId, authorOf, card, rankedItem };
