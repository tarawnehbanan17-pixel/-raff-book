import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import {
  ArrowIcon,
  BookMarkIcon,
  CheckIcon,
  PinIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  SwapIcon,
  WhatsappIcon,
} from "@/components/icons";
import { CATEGORIES, UNIVERSITIES } from "@/lib/constants";
import { initials } from "@/lib/format";
import { getCategoryCounts, getFavoriteBookIds, getPlatformStats, listBooks } from "@/lib/queries";
import { getSessionStudentId } from "@/lib/session";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    number: "٠١",
    title: "أضف كتابك في دقيقة",
    body: "صوّر الغلاف واكتب حالة الكتاب، واختر تبادلًا أو إهداءً. كتابك يصير ظاهرًا لطلاب جامعتك مباشرة.",
    icon: BookMarkIcon,
  },
  {
    number: "٠٢",
    title: "ابحث عن مقررك",
    body: "فلتر حسب الجامعة، التخصص، رمز المادة أو حالة الكتاب. شوف الكتب المتوفرة قربك وابدأ التبادل بضغطة.",
    icon: SearchIcon,
  },
  {
    number: "٠٣",
    title: "اتفق وبدّل بلا فلوس",
    body: "أرسل طلب تبادل أو إهداء لصاحب الكتاب، ويوصلك رده. رتّبوا اللقاء داخل الحرم الجامعي وسلّموا الكتاب يدًا بيد.",
    icon: SwapIcon,
  },
];

const POPULAR_SEARCHES = ["تفاضل وتكامل", "Anatomy", "IT 201", "مبادئ الإدارة"];

export default async function HomePage() {
  const [latestBooks, stats, categoryCounts, studentId] = await Promise.all([
    listBooks({ limit: 8 }),
    getPlatformStats(),
    getCategoryCounts(),
    getSessionStudentId(),
  ]);
  const favoriteIds = new Set(await getFavoriteBookIds(studentId));
  const featured = latestBooks[0];
  const countMap = new Map(categoryCounts.map((row) => [row.category, row.total]));

  return (
    <div>
      <section className="paper-grain relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-parchment/80 px-3.5 py-1.5 text-xs font-semibold text-forest shadow-sm">
              <SparkIcon className="h-4 w-4 text-gold" />
              تبادل وإهداء الكتب الجامعية · بلا بيع ولا أسعار
            </span>

            <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.15] text-ink sm:text-6xl">
              كتابك الجامعي
              <br />
              يلاقي{" "}
              <span className="relative inline-block text-forest">
                طالبًا يحتاجه
                <svg
                  viewBox="0 0 200 12"
                  className="absolute inset-x-0 -bottom-1 h-2.5 w-full text-gold"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8c40-6 90-7 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-ink/70 sm:text-lg">
              رَف منصة طلابية تجمع الكتب الجامعية في مكان واحد: بدّل كتابك اللي خلّصته بكتاب
              تحتاجه، أو أهدِه لزميل — بدون بيع، بدون أسعار، وبدون وسطاء.
            </p>

            <form action="/books" className="mt-8 flex flex-col gap-2 rounded-3xl border border-ink/10 bg-parchment p-2 shadow-card sm:flex-row sm:items-center sm:rounded-full">
              <div className="flex flex-1 items-center gap-3 px-3">
                <SearchIcon className="h-5 w-5 shrink-0 text-forest/60" />
                <input
                  type="search"
                  name="q"
                  placeholder="ابحث بالعنوان، المؤلف، أو رمز المادة (مثال: PHYS 101)"
                  aria-label="ابحث عن كتاب"
                  className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-ink/40"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-bold text-parchment transition hover:bg-ink"
              >
                ابحث عن كتاب
                <ArrowIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink/55">
              <span>الأكثر بحثًا:</span>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/books?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-ink/10 bg-cream/70 px-2.5 py-1 transition hover:border-forest/30 hover:text-forest"
                >
                  {term}
                </Link>
              ))}
            </div>

            <dl className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-ink/10 pt-6">
              {[
                { label: "كتاب على الرف", value: stats.bookCount },
                { label: "طالب مسجّل", value: stats.studentCount },
                { label: "جامعة", value: stats.universityCount },
              ].map((item) => (
                <div key={item.label}>
                  <dd className="font-display text-3xl font-bold text-forest">{item.value}</dd>
                  <dt className="mt-0.5 text-xs text-ink/55">{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -start-6 -top-6 hidden h-24 w-24 rounded-full border border-forest/20 dot-grid lg:block" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-sand shadow-lift">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/hero-books.jpg"
                  alt="مجموعة كتب جامعية مستعملة على مكتب خشبي"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 44vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent" />
              <span className="absolute bottom-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-parchment/95 px-3 py-1.5 text-[11px] font-semibold text-forest">
                <PinIcon className="h-3.5 w-3.5" />
                كتب من ٧ جامعات أردنية
              </span>
            </div>

            {featured ? (
              <Link
                href={`/books/${featured.id}`}
                className="animate-drift absolute -bottom-8 -start-2 flex w-[16.5rem] items-center gap-3 rounded-3xl border border-ink/10 bg-parchment/95 p-3 shadow-lift backdrop-blur sm:-start-8"
              >
                <BookCover
                  title={featured.title}
                  author={featured.author}
                  tone={featured.coverTone}
                  size="xs"
                  className="h-20 w-14 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-clay">أحدث كتاب</p>
                  <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-ink">
                    {featured.title}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-forest">
                    {featured.listingType === "donate" ? "إهداء" : "تبادل"} ·{" "}
                    {initials(featured.owner.name)}
                  </p>
                </div>
              </Link>
            ) : null}

            <div className="absolute -top-4 end-2 rounded-2xl border border-forest/15 bg-parchment px-3.5 py-2.5 text-center shadow-card">
              <p className="font-display text-xl font-bold text-forest">{stats.exchangeCount}+</p>
              <p className="text-[10px] text-ink/55">كتاب للتبادل أو الإهداء</p>
            </div>
          </div>
        </div>

        <div className="border-y border-ink/10 bg-parchment/70 py-3" dir="ltr">
          <div className="flex overflow-hidden">
            <div className="animate-ticker flex shrink-0 items-center gap-8 whitespace-nowrap px-4">
              {[...UNIVERSITIES, ...UNIVERSITIES].map((university, index) => (
                <span
                  key={`${university}-${index}`}
                  className="flex items-center gap-3 text-xs font-semibold text-ink/50"
                >
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  {university}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay">أحدث الإضافات</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              كتب جديدة على الرف
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-ink/60">
              كل كتاب هنا أضافه طالب حقيقي من جامعته — كلها للتبادل أو الإهداء. اضغط على الكتاب
              لتشوف حالته وتبدأ التبادل.
            </p>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-parchment px-5 py-2.5 text-sm font-bold text-forest transition hover:bg-forest hover:text-parchment"
          >
            عرض كل الكتب
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {latestBooks.map((book) => (
            <BookCard key={book.id} book={book} favorited={favoriteIds.has(book.id)} />
          ))}
        </div>
      </section>

      <section id="how" className="scroll-mt-24 border-y border-ink/10 bg-parchment">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 shadow-lift">
                <div className="relative aspect-[5/4] w-full">
                  <Image
                    src="/images/students-exchange.jpg"
                    alt="طالبان يتبادلان الكتب في الحرم الجامعي"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-ink/10 bg-cream p-4">
                  <ShieldIcon className="h-5 w-5 text-forest" />
                  <p className="mt-2 text-sm font-bold text-ink">بدون فلوس</p>
                  <p className="mt-1 text-xs leading-6 text-ink/55">
                    ما في أسعار ولا دفعات: تبادل أو إهداء فقط.
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-cream p-4">
                  <WhatsappIcon className="h-5 w-5 text-forest" />
                  <p className="mt-2 text-sm font-bold text-ink">تواصل مباشر</p>
                  <p className="mt-1 text-xs leading-6 text-ink/55">
                    رقم الواتساب يظهر بعد قبول صاحب الكتاب.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay">كيف يعمل رَف</p>
              <h2 className="mt-2 font-display text-3xl font-bold leading-snug text-ink sm:text-4xl">
                ثلاث خطوات، وكتابك يبدأ فصلًا جديدًا
              </h2>
              <div className="mt-7 space-y-3">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream p-4 transition hover:border-forest/25 hover:bg-white"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest/10 text-forest">
                      <step.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-clay">{step.number}</span>
                        <h3 className="text-base font-bold text-ink">{step.title}</h3>
                      </div>
                      <p className="mt-1 text-sm leading-7 text-ink/60">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/books/new"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-parchment transition hover:bg-ink"
              >
                ابدأ بإضافة كتاب
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="why-free" className="scroll-mt-24 bg-forest/95 text-parchment">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">فلسفة رَف</p>
              <h2 className="mt-2 font-display text-3xl font-bold leading-snug sm:text-4xl">
                ليش ما في أسعار على رَف؟
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-8 text-parchment/75">
                لأن هدفنا نخلّص الطالب من تكاليف الكتب، مش نبيعها من جديد. على رَف الكتاب
                بيتنقل من طالب لطالب: إما بتبادل مباشر، أو بإهداء مجاني. ما في أسعار، ما في
                عمولات، وما في دفع إلكتروني — بس كتاب مكان كتاب.
              </p>
              <Link
                href="/books/new"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-parchment px-5 py-3 text-sm font-bold text-forest transition hover:bg-sand"
              >
                شارك كتابك بالتبادل
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: "🔁",
                  title: "كتاب بدل كتاب",
                  body: "قدّم مرجعًا من مكتبتك، واستلم المرجع اللي تحتاجه — بدون أي مبلغ مالي.",
                },
                {
                  icon: "🎁",
                  title: "إهداء لمن يحتاجه",
                  body: "إذا الكتاب مش محتاجه، أهدِه لطالب. تكلفة صفر وفائدة كبيرة.",
                },
                {
                  icon: "🤝",
                  title: "تسليم يد بيد",
                  body: "تتفقوا داخل الحرم الجامعي وتتبادلوا الكتاب وجهًا لوجه.",
                },
                {
                  icon: "🛡️",
                  title: "بلا وسطاء ولا عمولات",
                  body: "ما في دفع إلكتروني ولا شركات توصيل، ولا أي جهة تأخذ نسبة.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-parchment/15 bg-parchment/5 p-4"
                >
                  <span className="text-xl">{item.icon}</span>
                  <p className="mt-2 text-sm font-bold text-parchment">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-parchment/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-clay">حسب التخصص</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              دور على كتب تخصصك
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ink/55">
            من الهندسة للصيدلة للحقوق — اختر تخصصك وشوف المراجع المتوفرة حاليًا.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/books?category=${encodeURIComponent(category.value)}`}
              className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-parchment p-3.5 transition hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand/70 text-lg">
                {category.icon}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink group-hover:text-forest">
                  {category.value}
                </span>
                <span className="block text-[11px] text-ink/50">
                  {countMap.get(category.value) ?? 0} كتاب
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-12 text-parchment shadow-lift sm:px-12">
          <div className="absolute -end-10 -top-16 h-60 w-60 rounded-full border border-parchment/15" />
          <div className="absolute -bottom-20 end-24 h-48 w-48 rounded-full bg-gold/15 blur-2xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-parchment/25 px-3 py-1 text-[11px] font-semibold">
                <CheckIcon className="h-3.5 w-3.5 text-gold" />
                مجاني بالكامل للطلاب
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-snug sm:text-4xl">
                عندك كتب على الرف ما بتستعملها؟
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-8 text-parchment/75">
                حوّلها لفرصة لطالب ثاني. أضفها على رَف تبادلًا أو إهداءً، وخليها تبدأ فصلًا
                جديدًا بدل ما تجمع غبار — وبدون أي مقابل مالي.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/books/new"
                className="flex items-center justify-center gap-2 rounded-full bg-parchment px-6 py-3.5 text-sm font-bold text-forest transition hover:bg-sand"
              >
                أضف كتابك الآن
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/books"
                className="flex items-center justify-center gap-2 rounded-full border border-parchment/30 px-6 py-3.5 text-sm font-bold text-parchment transition hover:bg-parchment/10"
              >
                تصفّح الكتب المتوفرة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
