import localGamesData from "@/data/games.json";
import { TAP_GAME_PROFILES } from "@/data/game-profiles/tap";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";
import { DEFENSE_GAME_PROFILES } from "@/data/game-profiles/defense";
import { MEMORY_GAME_PROFILES } from "@/data/game-profiles/memory";
import { REACTION_GAME_PROFILES } from "@/data/game-profiles/reaction";
import { NUMBER_GAME_PROFILES } from "@/data/game-profiles/number";
import { WORD_GAME_PROFILES } from "@/data/game-profiles/word";
import { CLASSIC_GAME_PROFILES } from "@/data/game-profiles/classic";
import { IDLE_GAME_PROFILES } from "@/data/game-profiles/idle";
import { CATALOG_ACTION_GAME_PROFILES } from "@/data/game-profiles/catalog-action";
import { CATALOG_ARCADE_GAME_PROFILES } from "@/data/game-profiles/catalog-arcade";
import { CATALOG_CASUAL_PUZZLE_GAME_PROFILES } from "@/data/game-profiles/catalog-casual-puzzle";
import { CATALOG_RACING_SHOOTING_GAME_PROFILES } from "@/data/game-profiles/catalog-racing-shooting";
import { CATALOG_SPORTS_STRATEGY_GAME_PROFILES } from "@/data/game-profiles/catalog-sports-strategy";

export type SupportedLocale = "en" | "zh";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface GameScoringRule {
  id: string;
  label: LocalizedText;
  points?: number;
  value?: LocalizedText;
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
  merge: ["hex-merge", "merge-defense", "pet-merge", "2048"],
  defense: ["tower-defense", "plant-defense", "merge-defense"],
  memory: ["memory-cards", "memory-sequence"],
  reaction: ["quick-tap", "reaction-test", "whack-a-mole", "fruit-catch", "avoid-blocks", "tile-hop", "table-tennis"],
  number: ["2048", "number-puzzle", "speed-math", "sudoku", "hex-merge"],
  word: ["word-scramble", "word-search", "hangman"],
  classic: ["tetris", "minesweeper", "tic-tac-toe", "pong", "space-invaders", "brick-breaker", "pac-man", "frogger"],
  idle: ["cookie-clicker", "idle-miner", "idle-factory", "tap-tycoon", "lemonade-stand", "pet-merge"],
};

const RAW_GAME_PROFILES: Record<string, GameSeoProfile> = {
  ...TAP_GAME_PROFILES,
  ...MERGE_GAME_PROFILES,
  ...DEFENSE_GAME_PROFILES,
  ...MEMORY_GAME_PROFILES,
  ...REACTION_GAME_PROFILES,
  ...NUMBER_GAME_PROFILES,
  ...WORD_GAME_PROFILES,
  ...CLASSIC_GAME_PROFILES,
  ...IDLE_GAME_PROFILES,
  ...CATALOG_ACTION_GAME_PROFILES,
  ...CATALOG_ARCADE_GAME_PROFILES,
  ...CATALOG_CASUAL_PUZZLE_GAME_PROFILES,
  ...CATALOG_RACING_SHOOTING_GAME_PROFILES,
  ...CATALOG_SPORTS_STRATEGY_GAME_PROFILES,
};

export const TOPIC_GAME_SLUGS = Array.from(new Set(Object.values(GAMEPLAY_TOPIC_MEMBERS).flat()));
export const INVENTORY_GAME_SLUGS = (localGamesData as { slug: string }[]).map((game) => game.slug);

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function validateLocalizedSeo(slug: string, locale: SupportedLocale, content: LocalizedGameSeoContent, errors: string[]) {
  const prefix = `${slug}/${locale}`;
  if (!hasText(content.metaTitle)) errors.push(`${prefix}: missing metaTitle`);
  if (!hasText(content.metaDescription)) errors.push(`${prefix}: missing metaDescription`);
  if (!hasText(content.h1)) errors.push(`${prefix}: missing h1`);
  if (!hasText(content.intro)) errors.push(`${prefix}: missing intro`);
  if (content.about.length < 1) errors.push(`${prefix}: missing source-grounded about content`);
  if (content.howToPlay.length < 3) errors.push(`${prefix}: needs at least 3 how-to-play steps`);
  if (content.rules.length < 3) errors.push(`${prefix}: needs at least 3 game-specific rules`);
  if (content.tips.length < 2) errors.push(`${prefix}: needs at least 2 game-specific tips`);
  if (content.faq.length < 3) errors.push(`${prefix}: needs at least 3 game-specific FAQ items`);
}

/**
 * 100-game SEO completion gate.
 *
 * Every game in the production inventory must have exactly one source-grounded
 * GameSeoProfile before the build can succeed. SEO completion and manual mobile
 * gameplay QA are intentionally separate: `seoStatus` must be optimized here,
 * while `testedMobile` remains independent evidence and may still be false.
 */
function finalizeAllGameProfiles(profiles: Record<string, GameSeoProfile>): Record<string, GameSeoProfile> {
  const errors: string[] = [];
  const inventory = new Set(INVENTORY_GAME_SLUGS);
  const profileSlugs = Object.keys(profiles);
  const metaTitles: Record<SupportedLocale, Map<string, string>> = { en: new Map(), zh: new Map() };
  const h1s: Record<SupportedLocale, Map<string, string>> = { en: new Map(), zh: new Map() };

  if (INVENTORY_GAME_SLUGS.length !== 100) {
    errors.push(`inventory count is ${INVENTORY_GAME_SLUGS.length}; expected exactly 100 production games`);
  }

  for (const slug of INVENTORY_GAME_SLUGS) {
    const profile = profiles[slug];
    if (!profile) {
      errors.push(`${slug}: production game is missing a GameSeoProfile`);
      continue;
    }
    if (profile.slug !== slug) errors.push(`${slug}: profile slug field is ${profile.slug}`);
    if (profile.seoStatus !== "optimized") errors.push(`${slug}: seoStatus must be optimized`);
    if (!hasText(profile.primaryKeyword)) errors.push(`${slug}: missing primaryKeyword`);
    if (profile.secondaryKeywords.length < 2) errors.push(`${slug}: needs at least 2 secondaryKeywords`);
    if (!hasText(profile.mechanics.objective.en) || !hasText(profile.mechanics.objective.zh)) errors.push(`${slug}: missing bilingual gameplay objective`);
    if (profile.mechanics.controls.length < 1) errors.push(`${slug}: missing verified controls`);
    if (profile.mechanics.specialMechanics.length < 1) errors.push(`${slug}: missing source-grounded mechanics`);

    for (const locale of ["en", "zh"] as const) {
      const content = profile.content[locale];
      validateLocalizedSeo(slug, locale, content, errors);

      const metaOwner = metaTitles[locale].get(content.metaTitle);
      if (metaOwner && metaOwner !== slug) errors.push(`${slug}/${locale}: duplicate metaTitle also used by ${metaOwner}`);
      else metaTitles[locale].set(content.metaTitle, slug);

      const h1Owner = h1s[locale].get(content.h1);
      if (h1Owner && h1Owner !== slug) errors.push(`${slug}/${locale}: duplicate h1 also used by ${h1Owner}`);
      else h1s[locale].set(content.h1, slug);
    }
  }

  for (const slug of profileSlugs) {
    if (!inventory.has(slug)) errors.push(`${slug}: profile does not map to a production games.json entry`);
  }

  if (profileSlugs.length !== INVENTORY_GAME_SLUGS.length) {
    errors.push(`profile count is ${profileSlugs.length}; inventory count is ${INVENTORY_GAME_SLUGS.length}`);
  }

  if (errors.length > 0) {
    throw new Error(`100-game SEO completion gate failed:\n${errors.join("\n")}`);
  }

  return profiles;
}

export const GAME_PROFILES: Record<string, GameSeoProfile> = finalizeAllGameProfiles(RAW_GAME_PROFILES);

export function getGameProfileConfig(slug: string): GameSeoProfile | undefined {
  return GAME_PROFILES[slug];
}
