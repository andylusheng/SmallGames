import type { SupportedLocale } from "@/data/game-profiles";
import { TAP_TOPIC_SEO } from "@/data/topic-seo/tap";
import { MERGE_TOPIC_SEO } from "@/data/topic-seo/merge";

export interface TopicPlayStyle {
  gameSlug: string;
  title: string;
  description: string;
}

export interface LocalizedTopicSeoContent {
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  about: string[];
  playStylesTitle: string;
  playStyles: TopicPlayStyle[];
  howItWorksTitle: string;
  howItWorks: string[];
  faq: { q: string; a: string }[];
}

export interface TopicSeoConfig {
  key: string;
  path: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  updatedAt: string;
  content: Record<SupportedLocale, LocalizedTopicSeoContent>;
}

export const TOPIC_SEO: Record<string, TopicSeoConfig> = {
  tap: TAP_TOPIC_SEO,
  merge: MERGE_TOPIC_SEO,
};

export function getTopicSeoConfig(topic: string): TopicSeoConfig | undefined {
  return TOPIC_SEO[topic];
}

export function getLocalizedTopicSeo(topic: string, locale: string): LocalizedTopicSeoContent | undefined {
  const config = getTopicSeoConfig(topic);
  if (!config) return undefined;
  const supportedLocale: SupportedLocale = locale === "zh" ? "zh" : "en";
  return config.content[supportedLocale];
}

export function getTopicHubHref(topic: string, locale: string): string | undefined {
  const config = getTopicSeoConfig(topic);
  if (!config) return undefined;
  return locale === "en" ? config.path : `/zh${config.path}`;
}
