import type { SupportedLocale } from "@/data/game-profiles";
import { toZhTwDeep } from "@/data/zh-tw/convert";
import { getEsTopicSeo } from "@/data/es/topic-seo";
import { TAP_TOPIC_SEO } from "@/data/topic-seo/tap";
import { MERGE_TOPIC_SEO } from "@/data/topic-seo/merge";
import { DEFENSE_TOPIC_SEO } from "@/data/topic-seo/defense";
import { MEMORY_TOPIC_SEO } from "@/data/topic-seo/memory";
import { REACTION_TOPIC_SEO } from "@/data/topic-seo/reaction";
import { NUMBER_TOPIC_SEO } from "@/data/topic-seo/number";
import { WORD_TOPIC_SEO } from "@/data/topic-seo/word";
import { CLASSIC_TOPIC_SEO } from "@/data/topic-seo/classic";
import { IDLE_TOPIC_SEO } from "@/data/topic-seo/idle";

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
  defense: DEFENSE_TOPIC_SEO,
  memory: MEMORY_TOPIC_SEO,
  reaction: REACTION_TOPIC_SEO,
  number: NUMBER_TOPIC_SEO,
  word: WORD_TOPIC_SEO,
  classic: CLASSIC_TOPIC_SEO,
  idle: IDLE_TOPIC_SEO,
};

export function getTopicSeoConfig(topic: string): TopicSeoConfig | undefined { return TOPIC_SEO[topic]; }

export function getLocalizedTopicSeo(topic: string, locale: string): LocalizedTopicSeoContent | undefined {
  const config = getTopicSeoConfig(topic);
  if (!config) return undefined;
  if (locale === "zh-tw") return toZhTwDeep(config.content.zh);
  if (locale === "es") return getEsTopicSeo(topic);
  const supportedLocale: SupportedLocale = locale === "zh" ? "zh" : "en";
  return config.content[supportedLocale];
}

export function getTopicHubHref(topic: string, locale: string): string | undefined {
  const config = getTopicSeoConfig(topic);
  if (!config) return undefined;
  return locale === "en" ? config.path : `/${locale}${config.path}`;
}
