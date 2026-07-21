import type { MetadataRoute } from "next";
import { getAllGames, getCategories } from "@/lib/games";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://playfreegames.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getAllGames();
  const categories = getCategories();

  const gameEntries: MetadataRoute.Sitemap = [];
  games.forEach((game) => {
    // English (no prefix)
    gameEntries.push({
      url: `${BASE_URL}/game/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
    // Chinese
    gameEntries.push({
      url: `${BASE_URL}/zh/game/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  const categoryEntries: MetadataRoute.Sitemap = [];
  categories.forEach((cat) => {
    categoryEntries.push({
      url: `${BASE_URL}/${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
    categoryEntries.push({
      url: `${BASE_URL}/zh/${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/zh`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/zh/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/dmca`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticPages, ...categoryEntries, ...gameEntries];
}
