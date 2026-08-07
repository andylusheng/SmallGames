import type { Metadata } from "next";
import TopicPageView from "@/views/TopicPageView";
import { getLocalizedTopicSeo, getTopicSeoConfig } from "@/data/topic-seo";
import { buildAlternates, SITE_URL } from "@/lib/metadata";

const topic = "tap";

export function generateMetadata(): Metadata {
  const config = getTopicSeoConfig(topic)!;
  const content = getLocalizedTopicSeo(topic, "zh")!;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates(config.path, "zh"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: "website",
      url: `${SITE_URL}/zh${config.path}`,
    },
  };
}

export default function ZhTapGamesPage() {
  return <TopicPageView locale="zh" topic={topic} />;
}
