"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";
import type { GameCardData } from "@/types/game-card";

export default function SearchClient({ games }: { games: GameCardData[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return games.filter((game) => game.title.toLowerCase().includes(q) || game.description.toLowerCase().includes(q) || game.tags.some((tag) => tag.toLowerCase().includes(q)));
  }, [games, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <div><h1 className="mb-4 text-2xl font-bold">Buscar juegos</h1><SearchBar /></div>
      {query && <p className="text-sm text-gray-400">{results.length} juegos para &quot;{query}&quot;</p>}
      {query ? <GameGrid games={results} trackingSource="search" locale="es" /> : <p className="py-12 text-center text-gray-500">Escribe el nombre o tipo de juego que buscas.</p>}
    </div>
  );
}
