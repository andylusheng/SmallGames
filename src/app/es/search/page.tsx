import { Suspense } from "react";
import { getAllGames, getLocalizedGameDescription } from "@/lib/games";
import SearchClient from "./SearchClient";

export default function EsSearchPage() {
  const games = getAllGames().map((game) => ({
    id: game.id,
    title: game.title,
    slug: game.slug,
    description: getLocalizedGameDescription(game, "es"),
    category: game.category,
    thumbnail: game.thumbnail,
    tags: game.tags,
    featured: game.featured,
    popular: game.popular,
    publishedAt: game.publishedAt,
    updatedAt: game.updatedAt,
  }));
  return <Suspense fallback={<div className="py-12 text-center text-gray-500">Cargando...</div>}><SearchClient games={games} /></Suspense>;
}
