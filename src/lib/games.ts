import localGamesData from "@/data/games.json";
import searchTop20GamesData from "@/data/games-search-top20.json";
import zhSeoData from "@/data/zh-seo.json";
import {
  GAMEPLAY_TOPIC_MEMBERS,
  getGameProfileConfig,
  type GameSeoProfile,
  type LocalizedGameSeoContent,
  type SupportedLocale,
} from "@/data/game-profiles";
import { toZhTwDeep, toZhTwText } from "@/data/zh-tw/convert";
import { buildEsFallbackSeo, buildEsGameContent } from "@/data/es/localize";

export type SeoStatus = "generated" | "reviewed" | "optimized";

export interface GameSeo {
  longDescription?: string;
  features?: string[];
  tips?: string[];
  difficulty?: string;
}

export interface GamePageSeo {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
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

const DEFAULT_PUBLISHED_AT = "2026-07-21";
const DEFAULT_UPDATED_AT = "2026-07-21";
const rawGames: RawGame[] = [
  ...(localGamesData as RawGame[]),
  ...(searchTop20GamesData as RawGame[]),
];

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
    (feature) => !blockedFeaturePhrases.some((phrase) => feature.toLowerCase().includes(phrase.toLowerCase()))
  );

  return { longDescription, features, tips: seo.tips, difficulty: seo.difficulty };
}

const games: Game[] = rawGames.map((rawGame) => {
  const { dateAdded: _dateAdded, plays: _plays, rating: _rating, faq: _faq, ...game } = rawGame;
  const profile = getGameProfileConfig(rawGame.slug);
  const publishedAt = rawGame.dateAdded ?? profile?.publishedAt ?? DEFAULT_PUBLISHED_AT;
  const updatedAt = [rawGame.dateAdded, profile?.updatedAt, DEFAULT_UPDATED_AT]
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1) ?? DEFAULT_UPDATED_AT;
  return {
    ...game,
    description: profile?.content.en.metaDescription ?? game.description,
    publishedAt,
    updatedAt,
    seoStatus: profile?.seoStatus ?? "generated",
    testedMobile: profile?.testedMobile ?? false,
    containsViolence: profile?.containsViolence ?? null,
    source: "local",
  };
});

export function getAllGames(): Game[] { return games; }
export function getGameBySlug(slug: string): Game | undefined { return games.find((game) => game.slug === slug); }
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
  return [...games].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit);
}
export function getGamesByCategory(category: string): Game[] {
  if (category === "all") return games;
  return games.filter((game) => game.category === category);
}
export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games.filter((candidate) => candidate.id !== game.id && (candidate.category === game.category || candidate.tags.some((tag) => game.tags.includes(tag)))).slice(0, limit);
}
export function getGamesByGameplayTopic(topic: string, excludeSlug?: string, limit = 6): Game[] {
  const members = GAMEPLAY_TOPIC_MEMBERS[topic] ?? [];
  return members.filter((slug) => slug !== excludeSlug).map((slug) => getGameBySlug(slug)).filter((game): game is Game => Boolean(game)).slice(0, limit);
}
export function getAllSlugs(): string[] { return games.map((game) => game.slug); }

export function getGameSeo(game: Game, locale: string): GameSeo {
  if (locale === "es") {
    const profile = getGameProfile(game);
    if (profile) {
      const es = buildEsGameContent(profile, game);
      return { longDescription: es.about.join("\n"), tips: es.tips };
    }
  }
  if (locale === "zh" || locale === "zh-tw") {
    const localized = (zhSeoData as Record<string, RawGameSeo>)[game.slug];
    if (localized) {
      const sanitized = sanitizeSeoContent(localized);
      return locale === "zh-tw" ? toZhTwDeep(sanitized) : sanitized;
    }
  }
  return sanitizeSeoContent({ longDescription: game.longDescription, features: game.features, tips: game.tips, difficulty: game.difficulty });
}

export function getGameProfile(gameOrSlug: Game | string): GameSeoProfile | undefined {
  const slug = typeof gameOrSlug === "string" ? gameOrSlug : gameOrSlug.slug;
  return getGameProfileConfig(slug);
}

export function getLocalizedGameProfile(gameOrSlug: Game | string, locale: string): LocalizedGameSeoContent | undefined {
  const profile = getGameProfile(gameOrSlug);
  if (!profile) return undefined;
  if (locale === "zh-tw") return toZhTwDeep(profile.content.zh);
  if (locale === "es") {
    const game = typeof gameOrSlug === "string" ? getGameBySlug(gameOrSlug) : gameOrSlug;
    return game ? buildEsGameContent(profile, game) : undefined;
  }
  const supportedLocale: SupportedLocale = locale === "zh" ? "zh" : "en";
  return profile.content[supportedLocale];
}

function compactMetaDescription(value: string, maxLength = 160): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

export function getGamePageSeo(game: Game, locale: string): GamePageSeo {
  if (locale === "es") return buildEsFallbackSeo(getGameProfile(game), game);
  const optimized = getLocalizedGameProfile(game, locale);
  if (optimized) {
    return { metaTitle: optimized.metaTitle, metaDescription: optimized.metaDescription, h1: optimized.h1, intro: optimized.intro };
  }
  const isEn = locale === "en";
  const localizedSeo = getGameSeo(game, locale);
  const localizedDescription = localizedSeo.longDescription?.split("\n").find(Boolean) || game.description;
  const fallback = {
    metaTitle: isEn ? `Play ${game.title} Free Online - No Download` : `${game.title} - 免费在线小游戏`,
    metaDescription: compactMetaDescription(localizedDescription),
    h1: isEn ? `${game.title} - Free Online Game` : `${game.title} - 免费在线游戏`,
    intro: compactMetaDescription(localizedDescription, 220),
  };
  return locale === "zh-tw" ? toZhTwDeep(fallback) : fallback;
}

export function getLocalizedGameDescription(game: Game, locale: string): string {
  if (locale === "en") return game.description;
  if (locale === "es") {
    const profile = getGameProfile(game);
    return profile ? buildEsGameContent(profile, game).metaDescription : `Juega a ${game.title} gratis en tu navegador.`;
  }
  const profile = getLocalizedGameProfile(game, locale);
  if (profile) return profile.metaDescription;
  return locale === "zh-tw" ? toZhTwText(game.description) : game.description;
}

export function getCategories(): string[] { return Array.from(new Set(games.map((game) => game.category))); }