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
    const content = getLocalizedTopicSeo(topic.key, "zh")!;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: buildAlternates(topic.path, "zh"),
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        type: "website",
        url: `${SITE_URL}/zh${topic.path}`,
      },
    };
  }

  const t = getServerTranslations("zh");
  const name = t(`categories.${slug}`);
  return {
    title: `${name}游戏 - 免费在线玩`,
    description: `在线畅玩最好的免费${name}游戏，无需下载，无需注册。可使用电脑或手机浏览，具体操作支持因游戏而异。`,
    alternates: buildAlternates(`/${slug}`, "zh"),
    openGraph: {
      title: `${name}游戏 - 免费在线玩`,
      description: `在线免费畅玩${name}游戏。`,
      type: "website",
      url: `${SITE_URL}/zh/${slug}`,
    },
  };
}

export default async function ZhBrowsePage({ params }: Props) {
  const { slug } = await params;
  const topic = findTopicBySlug(slug);
  if (topic) return <TopicPageView locale="zh" topic={topic.key} />;
  return <CategoryPageView locale="zh" slug={slug} />;
}
