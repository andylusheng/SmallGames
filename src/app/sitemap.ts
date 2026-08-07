import type { MetadataRoute } from "next";
import { getAllGames, getCategories } from "@/lib/games";
import { TOPIC_SEO } from "@/data/topic-seo";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zeroplaygames.com";
const SITE_UPDATED_AT = "2026-08-08";

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getAllGames();
  const categories = getCategories();

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((game) => [
    { url: `${BASE_URL}/game/${game.slug}`, lastModified: game.updatedAt, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/zh/game/${game.slug}`, lastModified: game.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/zh-tw/game/${game.slug}`, lastModified: game.updatedAt, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${BASE_URL}/es/game/${game.slug}`, lastModified: game.updatedAt, changeFrequency: "monthly" as const, priority: 0.85 },
  ]);

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((category) => [
    { url: `${BASE_URL}/${category}`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/zh/${category}`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/zh-tw/${category}`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.65 },
    { url: `${BASE_URL}/es/${category}`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.65 },
  ]);

  const topicEntries: MetadataRoute.Sitemap = Object.values(TOPIC_SEO).flatMap((topic) => [
    { url: `${BASE_URL}${topic.path}`, lastModified: topic.updatedAt, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE_URL}/zh${topic.path}`, lastModified: topic.updatedAt, changeFrequency: "weekly" as const, priority: 0.75 },
    { url: `${BASE_URL}/zh-tw${topic.path}`, lastModified: topic.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/es${topic.path}`, lastModified: topic.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 },
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/zh`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/zh-tw`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/es`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly", priority: 0.95 },
    ...["privacy", "terms", "dmca", "about"].flatMap((path) => [
      { url: `${BASE_URL}/${path}`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly" as const, priority: path === "about" ? 0.3 : 0.2 },
      { url: `${BASE_URL}/zh/${path}`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly" as const, priority: path === "about" ? 0.3 : 0.2 },
      { url: `${BASE_URL}/zh-tw/${path}`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly" as const, priority: path === "about" ? 0.3 : 0.2 },
      { url: `${BASE_URL}/es/${path}`, lastModified: SITE_UPDATED_AT, changeFrequency: "yearly" as const, priority: path === "about" ? 0.3 : 0.2 },
    ]),
  ];

  return [...staticPages, ...topicEntries, ...categoryEntries, ...gameEntries];
}
