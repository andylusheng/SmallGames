import { TAP_GAME_PROFILES } from "@/data/game-profiles/tap";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";
import { DEFENSE_GAME_PROFILES } from "@/data/game-profiles/defense";
import { MEMORY_GAME_PROFILES } from "@/data/game-profiles/memory";
import { REACTION_GAME_PROFILES } from "@/data/game-profiles/reaction";
import { NUMBER_GAME_PROFILES } from "@/data/game-profiles/number";
import { WORD_GAME_PROFILES } from "@/data/game-profiles/word";
import { CLASSIC_GAME_PROFILES } from "@/data/game-profiles/classic";
import { IDLE_GAME_PROFILES } from "@/data/game-profiles/idle";

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

export const GAME_PROFILES: Record<string, GameSeoProfile> = {
  ...TAP_GAME_PROFILES,
  ...MERGE_GAME_PROFILES,
  ...DEFENSE_GAME_PROFILES,
  ...MEMORY_GAME_PROFILES,
  ...REACTION_GAME_PROFILES,
  ...NUMBER_GAME_PROFILES,
  ...WORD_GAME_PROFILES,
  ...CLASSIC_GAME_PROFILES,
  ...IDLE_GAME_PROFILES,
};

export function getGameProfileConfig(slug: string): GameSeoProfile | undefined {
  return GAME_PROFILES[slug];
}
