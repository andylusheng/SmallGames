import type { Metadata } from "next";
import { getServerTranslations } from "@/lib/server-i18n";
import { buildAlternates, SITE_URL } from "@/lib/metadata";
import { TOPIC_SEO, getLocalizedTopicSeo } from "@/data/topic-seo";
import CategoryPageView, { categoryStaticParams } from "@/views/CategoryPageView";
import TopicPageView from "@/views/TopicPageView";

interface Props {
  params: Promise<{ slug: string }>;
}

const topics = Object.values(TOPIC_SEO);

function findTopicBySlug(slug: string) {
  return topics.find((topic) => topic.path === `/${slug}`);
}

export function generateStaticParams() {
  return [
    ...categoryStaticParams(),
    ...topics.map((topic) => ({ slug: topic.path.replace(/^\//, "") })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopicBySlug(slug);
  if (topic) {
    const content = getLocalizedTopicSeo(topic.key, "zh-tw")!;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: buildAlternates(topic.path, "zh-tw"),
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        type: "website",
        locale: "zh_TW",
        url: `${SITE_URL}/zh-tw${topic.path}`,
      },
    };
  }

  const t = getServerTranslations("zh-tw");
  const name = t(`categories.${slug}`);
  const title = `${name}遊戲 - 免費線上玩`;
  const description = `線上暢玩 ${name} 類免費遊戲，無需下載、無需註冊。可使用電腦或手機瀏覽；實際操作方式依遊戲而異。`;
  return {
    title,
    description,
    alternates: buildAlternates(`/${slug}`, "zh-tw"),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_TW",
      url: `${SITE_URL}/zh-tw/${slug}`,
    },
  };
}

export default async function ZhTwBrowsePage({ params }: Props) {
  const { slug } = await params;
  const topic = findTopicBySlug(slug);
  if (topic) return <TopicPageView locale="zh-tw" topic={topic.key} />;
  return <CategoryPageView locale="zh-tw" slug={slug} />;
}
