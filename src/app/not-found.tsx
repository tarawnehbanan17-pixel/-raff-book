import Link from "next/link";
import { ArrowIcon, BookMarkIcon, SearchIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="paper-grain">
      <div className="mx-auto grid min-h-[65vh] max-w-2xl place-items-center px-4 py-16 text-center sm:px-6">
        <div>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-forest text-parchment shadow-lift">
            <BookMarkIcon className="h-10 w-10" />
          </div>
          <p className="mt-6 font-display text-6xl font-bold text-forest">٤٠٤</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">
            هذا الرفّ فاضي... الصفحة غير موجودة
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-ink/60">
            يبدو أن الرابط قديم أو أن الكتاب أزيل من رَف. جرّب تتصفّح الكتب المتوفرة حاليًا أو
            ارجع للرئيسية.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              href="/books"
              className="flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-parchment transition hover:bg-ink"
            >
              <SearchIcon className="h-4 w-4" />
              تصفّح الكتب
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-forest/25 bg-parchment px-5 py-3 text-sm font-bold text-forest transition hover:bg-sand/60"
            >
              الرئيسية
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
