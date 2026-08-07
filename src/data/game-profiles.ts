import { TAP_GAME_PROFILES } from "@/data/game-profiles/tap";

export type SupportedLocale = "en" | "zh";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface GameScoringRule {
  id: string;
  label: LocalizedText;
  points: number;
  note?: LocalizedText;
}

export interface GameMechanics {
  objective: LocalizedText;
  durationSeconds?: number;
  controls: string[];
  scoring: GameScoringRule[];
  scoringTitle?: LocalizedText;
  scoringValueLabel?: LocalizedText;
  specialMechanics: LocalizedText[];
  endCondition?: LocalizedText;
  progress?: LocalizedText;
  gameplayTopics: string[];
}

export interface LocalizedGameSeoContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  about: string[];
  howToPlay: string[];
  rules: string[];
  tips: string[];
  faq: { q: string; a: string }[];
}

export interface GameSeoProfile {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  updatedAt: string;
  seoStatus: "reviewed" | "optimized";
  testedMobile: boolean;
  containsViolence: boolean | null;
  mechanics: GameMechanics;
  content: Record<SupportedLocale, LocalizedGameSeoContent>;
}

export const GAMEPLAY_TOPIC_MEMBERS: Record<string, string[]> = {
  tap: ["quick-tap", "tap-tower", "tap-tycoon", "balloon-pop", "gravity-flip", "color-switch"],
  reaction: ["quick-tap", "reaction-test", "whack-a-mole", "fruit-catch", "avoid-blocks", "tile-hop", "table-tennis"],
};

export const GAME_PROFILES: Record<string, GameSeoProfile> = {
  ...TAP_GAME_PROFILES,
};

export function getGameProfileConfig(slug: string): GameSeoProfile | undefined {
  return GAME_PROFILES[slug];
}
