import NextLink from "next/link";
import AdBanner from "@/components/AdBanner";
import GameGrid from "@/components/GameGrid";
import {
  getCategories,
  getNewGames,
  getPopularGames,
} from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { Clock, Flame } from "lucide-react";

interface HomePageViewProps { locale: string; }

export default function HomePageView({ locale }: HomePageViewProps) {
  const t = getServerTranslations(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const popular = getPopularGames(10);
  const newGames = getNewGames(10);
  const categories = getCategories();
  const browseCategories = locale === "en"
    ? "Browse Game Categories"
    : locale === "zh-tw"
      ? "瀏覽遊戲分類"
      : locale === "es"
        ? "Explorar categorías de juegos"
        : "浏览游戏分类";

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
      <section className="mb-4 md:mb-8">
        <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">{t("home.h1")}</h1>
        <p className="mt-2 max-w-4xl line-clamp-2 text-sm leading-relaxed text-gray-400 md:mt-3 md:line-clamp-none">{t("home.intro")}</p>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-bold text-white">{t("home.popularGames")}</h2>
        </div>
        <GameGrid games={popular} trackingSource="home" locale={locale} priorityCount={2} />
      </section>

      <AdBanner className="mb-8" />

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-bold text-white">{t("home.newGames")}</h2>
        </div>
        <GameGrid games={newGames} trackingSource="home" locale={locale} />
      </section>

      <AdBanner className="mb-8" />

      <section>
        <h2 className="mb-4 text-xl font-bold text-white">{browseCategories}</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <NextLink key={category} href={`${prefix}/${category}`} className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-gray-300 transition-colors hover:border-primary/40 hover:text-primary">{t(`categories.${category}`)}</NextLink>
          ))}
        </div>
      </section>
    </div>
  );
}
