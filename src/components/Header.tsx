"use client";

import { useTranslations } from "@/lib/i18n";
import { Link } from "@/components/Link";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";

export default function Header() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">
              {t("site.name")}
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 max-w-md md:block">
            <SearchBar />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 text-gray-400 hover:bg-surface hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="hidden border-t border-white/5 md:block">
        <CategoryNav />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-dark md:hidden">
          <CategoryNav />
        </div>
      )}
    </header>
  );
}
