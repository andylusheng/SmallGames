import localGamesData from "@/data/games.json";
import zhSeoData from "@/data/zh-seo.json";

export interface GameSeo {
  longDescription?: string;
  features?: string[];
  tips?: string[];
  difficulty?: string;
  faq?: { q: string; a: string }[];
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
  dateAdded: string;
  plays: number;
  rating: number;
  instructions: string;
  longDescription?: string;
  features?: string[];
  tips?: string[];
  difficulty?: string;
  faq?: { q: string; a: string }[];
  source?: "local";
}

// 全部自研游戏
const games: Game[] = (localGamesData as Game[]).map((g) => ({ ...g, source: "local" as const }));

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getFeaturedGames(): Game[] {
  return games.filter((game) => game.featured);
}

export function getPopularGames(limit = 8): Game[] {
  return [...games]
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit);
}

export function getNewGames(limit = 8): Game[] {
  return [...games]
    .sort(
      (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )
    .slice(0, limit);
}

export function getGamesByCategory(category: string): Game[] {
  if (category === "all") return games;
  return games.filter((game) => game.category === category);
}

export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games
    .filter(
      (g) =>
        g.id !== game.id &&
        (g.category === game.category ||
          g.tags.some((tag) => game.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase();
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q) ||
      game.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getAllSlugs(): string[] {
  return games.map((game) => game.slug);
}

/** Get locale-aware SEO content: zh pages use zh-seo.json, en uses games.json fields */
export function getGameSeo(game: Game, locale: string): GameSeo {
  if (locale === "zh") {
    const zh = (zhSeoData as Record<string, GameSeo>)[game.slug];
    if (zh) return zh;
  }
  return {
    longDescription: game.longDescription,
    features: game.features,
    tips: game.tips,
    difficulty: game.difficulty,
    faq: game.faq,
  };
}

export function getCategories(): string[] {
  const cats = new Set(games.map((game) => game.category));
  return Array.from(cats);
}
