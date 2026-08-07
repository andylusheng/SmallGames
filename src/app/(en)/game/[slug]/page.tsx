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

  const seo = getGamePageSeo(game, "en");

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: buildAlternates(`/game/${slug}`, "en"),
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: "website",
      url: `${SITE_URL}/game/${slug}`,
      images: [{ url: game.thumbnail }],
    },
  };
}

export default async function EnGamePage({ params }: Props) {
  const { slug } = await params;
  return <GamePageView locale="en" slug={slug} />;
}
