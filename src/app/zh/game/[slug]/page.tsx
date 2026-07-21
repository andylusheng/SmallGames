import type { Metadata } from "next";
import { getGameBySlug } from "@/lib/games";
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
    title: `${game.title} - 免费在线小游戏`,
    description: game.description,
    openGraph: {
      title: `${game.title} - 免费在线玩`,
      description: game.description,
      type: "website",
      images: [{ url: game.thumbnail }],
    },
  };
}

export default async function ZhGamePage({ params }: Props) {
  const { slug } = await params;
  return <GamePageView locale="zh" slug={slug} />;
}
