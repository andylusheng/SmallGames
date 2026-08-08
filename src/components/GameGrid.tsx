import GameCard from "./GameCard";
import type { GameCardData } from "@/types/game-card";
import { getGameBySlug, getLocalizedGameDescription } from "@/lib/games";

interface GameGridProps {
  games: GameCardData[];
  trackingSource?: "related" | "home" | "category" | "search";
  locale?: string;
  priorityCount?: number;
}

function toCardData(game: GameCardData, locale: string): GameCardData {
  const { id, title, slug, description, category, thumbnail, tags, featured, popular, publishedAt, updatedAt } = game;
  const fullGame = getGameBySlug(slug);
  return {
    id, title, slug,
    description: fullGame ? getLocalizedGameDescription(fullGame, locale) : description,
    category, thumbnail, tags, featured, popular, publishedAt, updatedAt,
  };
}

export default function GameGrid({ games, trackingSource, locale = "en", priorityCount = 0 }: GameGridProps) {
  if (games.length === 0) {
    const emptyText = locale === "zh-tw"
      ? "找不到遊戲"
      : locale === "zh"
        ? "未找到游戏"
        : locale === "es"
          ? "No se encontraron juegos"
          : "No games found";
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <span className="text-5xl">🎮</span>
        <p className="mt-4 text-lg">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {games.map((game, index) => (
        <GameCard
          key={game.id}
          game={toCardData(game, locale)}
          trackingSource={trackingSource}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
