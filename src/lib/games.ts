import localGamesData from "@/data/games.json";
import zhSeoData from "@/data/zh-seo.json";

export type SeoStatus = "generated" | "reviewed" | "optimized";

export interface GameSeo {
  longDescription?: string;
  features?: string[];
  tips?: string[];
  difficulty?: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  gameUrl: string;
  tags: string[];
  featured: boolean;
  popular: boolean;
  publishedAt: string;
  updatedAt: string;
  seoStatus: SeoStatus;
  testedMobile: boolean;
  containsViolence: boolean | null;
  instructions: string;
  longDescription?: string;
  features?: string[];
  tips?: string[];
  difficulty?: string;
  source?: "local";
}

type RawGame = Omit<Game, "publishedAt" | "updatedAt" | "seoStatus" | "testedMobile" | "containsViolence" | "source"> & {
  dateAdded?: string;
  plays?: number;
  rating?: number;
  faq?: { q: string; a: string }[];
};

type RawGameSeo = GameSeo & { faq?: { q: string; a: string }[] };

const PUBLISHED_AT = "2026-07-21";
const UPDATED_AT = "2026-08-07";

function sanitizeSeoContent(seo: RawGameSeo): GameSeo {
  const longDescription = seo.longDescription
    ?.split("\n")
    .filter(
      (paragraph) =>
        !paragraph.includes("runs entirely in your browser using HTML5 technology") &&
        !paragraph.includes("works on any device") &&
        !paragraph.includes("完全在浏览器中运行") &&
        !paragraph.includes("支持电脑、平板和手机")
    )
    .join("\n");

  const blockedFeaturePhrases = [
    "no in-app purchases",
    "high score saved automatically",
    "desktop, tablet, and mobile browsers",
    "无内购",
    "最高分自动保存",
    "支持桌面、平板和手机",
  ];

  const features = seo.features?.filter(
    (feature) =>
      !blockedFeaturePhrases.some((phrase) =>
        feature.toLowerCase().includes(phrase.toLowerCase())
      )
  );

  return {
    longDescription,
    features,
    tips: seo.tips,
    difficulty: seo.difficulty,
  };
}

const games: Game[] = (localGamesData as RawGame[]).map((rawGame) => {
  const { dateAdded: _dateAdded, plays: _plays, rating: _rating, faq: _faq, ...game } = rawGame;
  return {
    ...game,
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    seoStatus: "generated",
    testedMobile: false,
    containsViolence: null,
    source: "local",
  };
});

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getFeaturedGames(limit?: number): Game[] {
  const result = games.filter((game) => game.featured);
  return typeof limit === "number" ? result.slice(0, limit) : result;
}

export function getPopularGames(limit = 8): Game[] {
  const curated = games.filter((game) => game.popular);
  const fallback = games.filter((game) => !game.popular);
  return [...curated, ...fallback].slice(0, limit);
}

export function getNewGames(limit = 8): Game[] {
  return [...games]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export function getGamesByCategory(category: string): Game[] {
  if (category === "all") return games;
  return games.filter((game) => game.category === category);
}

export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games
    .filter(
      (candidate) =>
        candidate.id !== game.id &&
        (candidate.category === game.category ||
          candidate.tags.some((tag) => game.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return games.map((game) => game.slug);
}

export function getGameSeo(game: Game, locale: string): GameSeo {
  if (locale === "zh") {
    const localized = (zhSeoData as Record<string, RawGameSeo>)[game.slug];
    if (localized) return sanitizeSeoContent(localized);
  }

  return sanitizeSeoContent({
    longDescription: game.longDescription,
    features: game.features,
    tips: game.tips,
    difficulty: game.difficulty,
  });
}

export function getCategories(): string[] {
  return Array.from(new Set(games.map((game) => game.category)));
}
