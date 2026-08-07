"use client";

import { useLocale, useTranslations } from "@/lib/i18n";
import { Link } from "@/components/Link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(zh-tw|zh|es)(?=\/|$)/, "") || "/";
}

function localizedHref(pathname: string, locale: "en" | "zh-tw" | "es") {
  const base = stripLocale(pathname);
  if (locale === "en") return base;
  return `/${locale}${base === "/" ? "" : base}`;
}

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const switches = [
    { locale: "en" as const, label: "English" },
    { locale: "zh-tw" as const, label: "繁體中文" },
    { locale: "es" as const, label: "Español" },
  ].filter((item) => item.locale !== locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-4 md:h-16">
          <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Gamepad2 className="h-7 w-7 text-primary md:h-8 md:w-8" />
            <span className="text-lg font-bold text-white sm:text-xl">{t("site.name")}</span>
          </Link>

          <div className="hidden max-w-md flex-1 md:block"><SearchBar /></div>

          <div className="flex items-center gap-1.5">
            {switches.map((item) => (
              <NextLink key={item.locale} href={localizedHref(pathname, item.locale)} className="rounded-lg px-2.5 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-surface hover:text-white md:text-sm">
                {item.label}
              </NextLink>
            ))}
            <button className="rounded-lg p-2 text-gray-400 hover:bg-surface hover:text-white md:hidden" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-t border-white/5 md:block"><CategoryNav /></div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-dark md:hidden">
          <div className="mx-auto max-w-7xl px-4 pt-3"><SearchBar /></div>
          <CategoryNav mobileMenu onNavigate={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
