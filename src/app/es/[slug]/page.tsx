import type { Metadata } from "next";
import { getCategories } from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { buildAlternates, SITE_URL } from "@/lib/metadata";
import { TOPIC_SEO, getLocalizedTopicSeo } from "@/data/topic-seo";
import { getEsCategorySeo } from "@/data/es/category-seo";
import EsCategoryPage from "../_views/CategoryPage";
import EsTopicPage from "../_views/TopicPage";

interface Props { params: Promise<{ slug: string }>; }
const topics = Object.values(TOPIC_SEO);
function findTopic(slug: string) { return topics.find((topic) => topic.path === `/${slug}`); }

export function generateStaticParams() {
  return [
    ...getCategories().map((slug) => ({ slug })),
    ...topics.map((topic) => ({ slug: topic.path.replace(/^\//, "") })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopic(slug);
  if (topic) {
    const content = getLocalizedTopicSeo(topic.key, "es")!;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: buildAlternates(topic.path, "es"),
      openGraph: { title: content.metaTitle, description: content.metaDescription, type: "website", locale: "es_ES", url: `${SITE_URL}/es${topic.path}` },
    };
  }

  const t = getServerTranslations("es");
  const name = t(`categories.${slug}`);
  const seo = getEsCategorySeo(slug);
  const title = `Juegos de ${name.toLowerCase()} gratis online`;
  const description = seo?.hook ?? `Juega a juegos de ${name.toLowerCase()} gratis online, sin descargar ni registrarte.`;
  return {
    title,
    description,
    alternates: buildAlternates(`/${slug}`, "es"),
    openGraph: { title, description, type: "website", locale: "es_ES", url: `${SITE_URL}/es/${slug}` },
  };
}

export default async function EsBrowsePage({ params }: Props) {
  const { slug } = await params;
  const topic = findTopic(slug);
  if (topic) return <EsTopicPage topic={topic.key} />;
  return <EsCategoryPage slug={slug} />;
}
