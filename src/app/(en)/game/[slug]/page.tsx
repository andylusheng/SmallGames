import type { Metadata } from "next";
import { getGameBySlug } from "@/lib/games";
import { buildAlternates } from "@/lib/metadata";
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

  return {
    title: `Play ${game.title} Free Online - No Download`,
    description: game.description,
    alternates: buildAlternates(`/game/${slug}`, "en"),
    openGraph: {
      title: `Play ${game.title} Free Online`,
      description: game.description,
      type: "website",
      images: [{ url: game.thumbnail }],
    },
  };
}

export default async function EnGamePage({ params }: Props) {
  const { slug } = await params;
  return <GamePageView locale="en" slug={slug} />;
}
