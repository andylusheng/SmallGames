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
  idle: "💤",
};

interface CategoryNavProps {
  mobileMenu?: boolean;
  onNavigate?: () => void;
}

export default function CategoryNav({ mobileMenu = false, onNavigate }: CategoryNavProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/^\/(?:zh-tw|zh)(?=\/|$)/, "") || "/";

  const itemClass = (active: boolean) =>
    `flex items-center gap-2 rounded-lg text-sm font-medium transition-colors ${
      mobileMenu ? "w-full px-3 py-2.5" : "shrink-0 rounded-full px-3 py-1.5"
    } ${active ? "bg-primary text-white" : "text-gray-300 hover:bg-surface hover:text-white"}`;

  return (
    <nav className="mx-auto max-w-7xl px-4" aria-label={mobileMenu ? "Game categories" : undefined}>
      <ul className={mobileMenu ? "grid grid-cols-2 gap-2 py-3" : "flex gap-1 overflow-x-auto py-2 scrollbar-none"}>
        <li>
          <Link href="/" onClick={onNavigate} className={itemClass(normalizedPath === "/")}>
            <span aria-hidden="true">{categoryIcons.all}</span>
            <span>{t("categories.all")}</span>
          </Link>
        </li>
        {GAME_CATEGORIES.map((cat) => (
          <li key={cat}>
            <Link
              href={`/${cat}`}
              onClick={onNavigate}
              className={itemClass(normalizedPath === `/${cat}`)}
            >
              <span aria-hidden="true">{categoryIcons[cat] || "🎮"}</span>
              <span>{t(`categories.${cat}` as any)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
