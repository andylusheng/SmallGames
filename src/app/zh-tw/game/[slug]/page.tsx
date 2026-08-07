import type { Metadata } from "next";
import { getGameBySlug, getGamePageSeo } from "@/lib/games";
import { buildAlternates, SITE_URL } from "@/lib/metadata";
import GamePageView, { gameStaticParams } from "@/views/GamePageView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return gameStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  const seo = getGamePageSeo(game, "zh-tw");

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: buildAlternates(`/game/${slug}`, "zh-tw"),
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: "website",
      locale: "zh_TW",
      url: `${SITE_URL}/zh-tw/game/${slug}`,
      images: [{ url: game.thumbnail }],
    },
  };
}

export default async function ZhTwGamePage({ params }: Props) {
  const { slug } = await params;
  return <GamePageView locale="zh-tw" slug={slug} />;
}
