"use client";

import { Link } from "@/components/Link";
import { trackEvent } from "@/lib/analytics";
import type { GameCardData } from "@/types/game-card";
import { Play } from "lucide-react";

interface GameCardProps {
  game: GameCardData;
  trackingSource?: "related" | "home" | "category" | "search";
}

export default function GameCard({ game, trackingSource }: GameCardProps) {
  const handleClick = () => {
    if (trackingSource === "related") {
      trackEvent("related_game_click", {
        game_slug: game.slug,
        game_category: game.category,
      });
    }
  };

  return (
    <Link
      href={`/game/${game.slug}`}
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-light">
        <img
          src={game.thumbnail}
          alt={`${game.title} - Free Online Game`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="truncate text-sm font-semibold text-white group-hover:text-primary">
          {game.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
          {game.description}
        </p>
        <div className="mt-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            {game.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
