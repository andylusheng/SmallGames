import type { Metadata } from "next";
import { getServerTranslations } from "@/lib/server-i18n";
import { buildAlternates, SITE_URL } from "@/lib/metadata";
import { TOPIC_SEO, getLocalizedTopicSeo } from "@/data/topic-seo";
import CategoryPageView, { categoryStaticParams } from "@/views/CategoryPageView";
import TopicPageView from "@/views/TopicPageView";

interface Props {
  params: Promise<{ slug: string }>;
}

const explicitTopicKeys = new Set(["tap", "merge"]);
const dynamicTopics = Object.values(TOPIC_SEO).filter((topic) => !explicitTopicKeys.has(topic.key));

function findTopicBySlug(slug: string) {
  return dynamicTopics.find((topic) => topic.path === `/${slug}`);
}

export function generateStaticParams() {
  return [
    ...categoryStaticParams(),
    ...dynamicTopics.map((topic) => ({ slug: topic.path.replace(/^\//, "") })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopicBySlug(slug);
  if (topic) {
    const content = getLocalizedTopicSeo(topic.key, "en")!;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: buildAlternates(topic.path, "en"),
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        type: "website",
        url: `${SITE_URL}${topic.path}`,
      },
    };
  }

  const t = getServerTranslations("en");
  const name = t(`categories.${slug}`);
  return {
    title: `${name} Games - Play Free Online, No Download`,
    description: `Play the best free ${name} games online instantly. No download or sign-up required. Browse on desktop or mobile; control support varies by title.`,
    alternates: buildAlternates(`/${slug}`, "en"),
    openGraph: {
      title: `${name} Games - Play Free Online`,
      description: `Play free ${name} games online in your browser.`,
      type: "website",
      url: `${SITE_URL}/${slug}`,
    },
  };
}

export default async function EnBrowsePage({ params }: Props) {
  const { slug } = await params;
  const topic = findTopicBySlug(slug);
  if (topic) return <TopicPageView locale="en" topic={topic.key} />;
  return <CategoryPageView locale="en" slug={slug} />;
}
