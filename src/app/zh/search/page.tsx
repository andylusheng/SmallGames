"use client";

import { useTranslations } from "@/lib/i18n";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";
import { searchGames } from "@/lib/games";

function SearchContent() {
  const t = useTranslations("search");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = useMemo(() => searchGames(query), [query]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">{t("placeholder")}</h1>
        <SearchBar />
      </div>

      {query && (
        <p className="text-gray-400 text-sm">
          {results.length} {t("results")} &quot;{query}&quot;
        </p>
      )}

      {query ? (
        <GameGrid games={results} />
      ) : (
        <p className="text-gray-500 text-center py-12">{t("placeholder")}</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
