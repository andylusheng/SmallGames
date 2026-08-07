import GameCard from "./GameCard";
import type { GameCardData } from "@/types/game-card";

interface GameGridProps {
  games: GameCardData[];
  trackingSource?: "related" | "home" | "category" | "search";
}

function toCardData(game: GameCardData): GameCardData {
  const {
    id,
    title,
    slug,
    description,
    category,
    thumbnail,
    tags,
    featured,
    popular,
    publishedAt,
    updatedAt,
  } = game;

  return {
    id,
    title,
    slug,
    description,
    category,
    thumbnail,
    tags,
    featured,
    popular,
    publishedAt,
    updatedAt,
  };
}

export default function GameGrid({ games, trackingSource }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <span className="text-5xl">🎮</span>
        <p className="mt-4 text-lg">No games found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={toCardData(game)}
          trackingSource={trackingSource}
        />
      ))}
    </div>
  );
}
