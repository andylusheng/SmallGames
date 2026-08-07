"use client";

import { useTranslations } from "@/lib/i18n";
import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";
const GAME_CATEGORIES = ["action", "puzzle", "arcade", "racing", "sports", "shooting", "strategy", "casual", "idle"];

const categoryIcons: Record<string, string> = {
  all: "🎮",
  action: "⚔️",
  puzzle: "🧩",
  arcade: "🕹️",
  racing: "🏎️",
  sports: "⚽",
  shooting: "🔫",
  strategy: "♟️",
  casual: "🎯",
  adventure: "🗺️",
};

export default function CategoryNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const categories = GAME_CATEGORIES;

  return (
    <nav className="mx-auto max-w-7xl px-4">
      <ul className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
        <li>
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-surface hover:text-white"
            }`}
          >
            <span>{categoryIcons.all}</span>
            {t("categories.all")}
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              href={`/${cat}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === `/${cat}`
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-surface hover:text-white"
              }`}
            >
              <span>{categoryIcons[cat] || "🎮"}</span>
              {t(`categories.${cat}` as any)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
