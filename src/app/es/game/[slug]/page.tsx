import type { Metadata } from "next";
import { getAllSlugs, getGameBySlug, getGamePageSeo } from "@/lib/games";
import { buildAlternates, SITE_URL } from "@/lib/metadata";
import EsGamePage from "../../_views/GamePage";

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const seo = getGamePageSeo(game, "es");
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: buildAlternates(`/game/${slug}`, "es"),
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: "website",
      locale: "es_ES",
      url: `${SITE_URL}/es/game/${slug}`,
      images: [{ url: game.thumbnail }],
    },
  };
}

export default async function EsGameRoute({ params }: Props) {
  const { slug } = await params;
  return <EsGamePage slug={slug} />;
}
