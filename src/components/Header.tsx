"use client";

import { useLocale, useTranslations } from "@/lib/i18n";
import { Link } from "@/components/Link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Gamepad2, Globe2, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";

type SwitchLocale = "en" | "zh" | "zh-tw" | "es";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(zh-tw|zh|es)(?=\/|$)/, "") || "/";
}

function localizedHref(pathname: string, locale: SwitchLocale) {
  const base = stripLocale(pathname);
  if (locale === "en") return base;
  return `/${locale}${base === "/" ? "" : base}`;
}

const LANGUAGES: { locale: SwitchLocale; code: string; label: string }[] = [
  { locale: "en", code: "EN", label: "English" },
  { locale: "zh", code: "简", label: "简体中文" },
  { locale: "zh-tw", code: "繁", label: "繁體中文" },
  { locale: "es", code: "ES", label: "Español" },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const currentLanguage = LANGUAGES.find((item) => item.locale === locale) ?? LANGUAGES[0];

  useEffect(() => {
    if (!languageOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) setLanguageOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [languageOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
        <div className="flex h-14 min-w-0 items-center justify-between gap-2 md:h-16 md:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => { setMobileMenuOpen(false); setLanguageOpen(false); }}>
            <Gamepad2 className="h-7 w-7 shrink-0 text-primary md:h-8 md:w-8" />
            <span className="truncate text-base font-bold text-white sm:text-lg md:text-xl">{t("site.name")}</span>
          </Link>

          <div className="hidden max-w-md flex-1 md:block"><SearchBar /></div>

          <div className="flex shrink-0 items-center gap-1">
            <div ref={languageMenuRef} className="relative">
              <button
                type="button"
                className="flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium text-gray-300 transition-colors hover:bg-surface hover:text-white"
                onClick={() => setLanguageOpen((open) => !open)}
                aria-label="Change language"
                aria-haspopup="menu"
                aria-expanded={languageOpen}
              >
                <Globe2 className="h-4 w-4" />
                <span className="min-w-5 text-center text-xs font-semibold sm:text-sm">{currentLanguage.code}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${languageOpen ? "rotate-180" : ""}`} />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-full z-[60] mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-dark-light py-1 shadow-2xl" role="menu">
                  {LANGUAGES.map((item) => {
                    const active = item.locale === locale;
                    return (
                      <NextLink
                        key={item.locale}
                        href={localizedHref(pathname, item.locale)}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${active ? "bg-primary/15 text-white" : "text-gray-300 hover:bg-surface-light hover:text-white"}`}
                        onClick={() => { setLanguageOpen(false); setMobileMenuOpen(false); }}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="w-6 shrink-0 text-center text-xs font-bold text-primary">{item.code}</span>
                        <span>{item.label}</span>
                      </NextLink>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              className="rounded-lg p-2 text-gray-400 hover:bg-surface hover:text-white md:hidden"
              onClick={() => { setMobileMenuOpen((open) => !open); setLanguageOpen(false); }}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
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
