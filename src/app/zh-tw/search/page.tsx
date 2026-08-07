"use client";

import { useLocale, useTranslations } from "@/lib/i18n";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";
import type { GameCardData } from "@/types/game-card";

function SearchContent() {
  const t = useTranslations("search");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [games, setGames] = useState<GameCardData[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/games-index.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Search index failed: ${response.status}`);
        return response.json() as Promise<GameCardData[]>;
      })
      .then((data) => {
        if (active) setGames(data);
      })
      .catch(() => {
        if (active) setGames([]);
      });
    return () => { active = false; };
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(normalized) ||
        game.description.toLowerCase().includes(normalized) ||
        game.tags.some((tag) => tag.toLowerCase().includes(normalized))
    );
  }, [games, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <div>
        <h1 className="mb-4 text-2xl font-bold">{t("placeholder")}</h1>
        <SearchBar />
      </div>
      {query && (
        <p className="text-sm text-gray-400">
          {results.length} {t("results")} &quot;{query}&quot;
        </p>
      )}
      {query ? (
        <GameGrid games={results} trackingSource="search" locale={locale} />
      ) : (
        <p className="py-12 text-center text-gray-500">{t("placeholder")}</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-gray-500">載入中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
