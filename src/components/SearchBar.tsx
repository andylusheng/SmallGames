"use client";

import { useTranslations, useLocale } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${locale === "en" ? "" : `/${locale}`}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("search.placeholder")}
        className="w-full rounded-full border border-white/10 bg-surface py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </form>
  );
}
