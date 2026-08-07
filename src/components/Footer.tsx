"use client";

import { useLocale, useTranslations } from "@/lib/i18n";
import { Link } from "@/components/Link";
import { Gamepad2 } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const legalLabel = locale === "zh-tw" ? "法律資訊" : locale === "zh" ? "法律信息" : "Legal";

  return (
    <footer className="border-t border-white/10 bg-dark-light">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-white">
                {t("site.name")}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              {t("nav.categories")}
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {["action", "puzzle", "arcade", "racing", "sports", "casual"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/${cat}`}
                      className="text-sm text-gray-400 transition-colors hover:text-primary"
                    >
                      {t(`categories.${cat}` as any)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              {legalLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-primary">{t("footer.privacy")}</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 transition-colors hover:text-primary">{t("footer.terms")}</Link></li>
              <li><Link href="/dmca" className="text-sm text-gray-400 transition-colors hover:text-primary">{t("footer.dmca")}</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 transition-colors hover:text-primary">{t("footer.about")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {t("site.name")}.{" "}
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
