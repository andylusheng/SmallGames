import type { MetadataRoute } from "next";
import { getAllGames, getCategories } from "@/lib/games";
import { TOPIC_SEO } from "@/data/topic-seo";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zeroplaygames.com";
const SITE_UPDATED_AT = "2026-08-07";

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getAllGames();
  const categories = getCategories();

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((game) => [
    {
      url: `${BASE_URL}/game/${game.slug}`,
      lastModified: game.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/zh/game/${game.slug}`,
      lastModified: game.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((category) => [
    {
      url: `${BASE_URL}/${category}`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/zh/${category}`,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ]);

  const topicEntries: MetadataRoute.Sitemap = Object.values(TOPIC_SEO).flatMap((topic) => [
    {
      url: `${BASE_URL}${topic.path}`,
      lastModified: topic.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/zh${topic.path}`,
      lastModified: topic.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/zh`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/zh/privacy`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/zh/terms`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/dmca`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/zh/dmca`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/about`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/zh/about`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticPages, ...topicEntries, ...categoryEntries, ...gameEntries];
}
