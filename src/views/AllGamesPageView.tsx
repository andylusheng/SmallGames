import type { Metadata } from "next";
import NextLink from "next/link";
import GameGrid from "@/components/GameGrid";
import { getAllGames, getGamesByCategory } from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { buildAlternates } from "@/lib/metadata";

const CATEGORY_ORDER = ["action", "puzzle", "arcade", "racing", "sports", "shooting", "strategy", "casual", "idle"];
const CATEGORY_ICONS: Record<string, string> = {
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

function text(locale: string) {
  if (locale === "zh") return {
    title: "全部免费在线小游戏",
    description: "浏览 ZeroPlay Games 的全部 100 款免费网页小游戏。按动作、益智、街机、赛车、体育、射击、策略、休闲和放置分类查找游戏，无需下载或注册。",
    intro: "全部 100 款游戏按类别整理，继续向下即可浏览完整游戏库。",
    breadcrumb: "全部游戏",
    viewCategory: "查看分类",
  };
  if (locale === "zh-tw") return {
    title: "全部免費線上遊戲",
    description: "瀏覽 ZeroPlay Games 的全部 100 款免費網頁遊戲。依動作、益智、街機、賽車、體育、射擊、策略、休閒和放置分類尋找遊戲，無需下載或註冊。",
    intro: "全部 100 款遊戲依類別整理，繼續向下即可瀏覽完整遊戲庫。",
    breadcrumb: "全部遊戲",
    viewCategory: "查看分類",
  };
  if (locale === "es") return {
    title: "Todos los juegos online gratis",
    description: "Explora los 100 juegos de navegador de ZeroPlay Games, organizados por acción, puzles, arcade, carreras, deportes, disparos, estrategia, casual e idle. Sin descargar ni registrarse.",
    intro: "Los 100 juegos están organizados por categoría. Sigue bajando para explorar todo el catálogo.",
    breadcrumb: "Todos los juegos",
    viewCategory: "Ver categoría",
  };
  return {
    title: "All Free Online Games",
    description: "Browse all 100 free browser games on ZeroPlay Games, organized by action, puzzle, arcade, racing, sports, shooting, strategy, casual and idle. No download or sign-up required.",
    intro: "All 100 games are organized by category. Keep scrolling to explore the complete game catalog.",
    breadcrumb: "All Games",
    viewCategory: "View category",
  };
}

export function buildAllGamesMetadata(locale: string): Metadata {
  const copy = text(locale);
  return {
    title: copy.title,
    description: copy.description,
    alternates: buildAlternates("/all-games", locale),
    robots: { index: true, follow: true },
  };
}

export default function AllGamesPageView({ locale }: { locale: string }) {
  const t = getServerTranslations(locale);
  const copy = text(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const totalGames = getAllGames().length;
  const groups = CATEGORY_ORDER.map((category) => ({ category, games: getGamesByCategory(category) }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400">
        <NextLink href={`${prefix}/`} className="hover:text-primary">{t("nav.home")}</NextLink>
        <span>/</span>
        <span className="text-white">{copy.breadcrumb}</span>
      </nav>

      <header className="mb-8 max-w-4xl">
        <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">{copy.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">{copy.intro.replace("100", String(totalGames))}</p>
      </header>

      <div className="space-y-12">
        {groups.map(({ category, games }) => (
          <section id={category} key={category} className="lazy-section scroll-mt-32">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-xl font-bold text-white sm:text-2xl">
                <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>
                {t(`categories.${category}`)}
              </h2>
              <NextLink href={`${prefix}/${category}`} className="text-sm font-medium text-primary hover:underline">
                {copy.viewCategory} →
              </NextLink>
            </div>
            <GameGrid games={games} trackingSource="category" locale={locale} />
          </section>
        ))}
      </div>
    </div>
  );
}
