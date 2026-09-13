import type { GameSeoProfile } from "@/data/game-profiles";
import { catalogProfile } from "@/data/game-profiles/catalog-factory";

export const MATCH_PAIRS_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "match-pairs": catalogProfile({
    slug: "match-pairs",
    title: "Fruit Match Pairs",
    zhTitle: "水果对对碰",
    primaryKeyword: "match pairs game",
    secondaryKeywords: ["pair matching game", "fruit match pairs", "match pairs online", "对对碰", "配对消除"],
    containsViolence: false,
    controls: ["touch", "mouse"],
    gameplayTopics: ["puzzle", "match"],
    publishedAt: "2026-09-13",
    updatedAt: "2026-09-13",
    durationSeconds: 90,
    objective: {
      en: "Select a fruit tile and tap its identical match to clear the pair. Empty the entire board before the countdown reaches zero.",
      zh: "点击一颗水果，再点击另一颗相同的水果完成配对消除。在倒计时归零前清空整个棋盘。"
    },
    metaTitle: {
      en: "Fruit Match Pairs – Tap Matching Fruits & Clear 60 Levels",
      zh: "水果对对碰 – 点击相同水果配对消除，60 关挑战"
    },
    metaDescription: {
      en: "Play Fruit Match Pairs online. Tap identical fruit pairs to clear the board, chain combos up to x5, use special tiles, and beat 60 levels on desktop or mobile.",
      zh: "在线玩水果对对碰：点击相同水果配对消除，连击最高 ×5 倍率，利用金色/冰冻/炸弹/倒计时特殊水果，挑战 60 关，支持电脑和手机。"
    },
    h1: {
      en: "Fruit Match Pairs – Clear the Board by Matching Identical Fruits",
      zh: "水果对对碰 – 配对相同水果，清空棋盘过关"
    },
    intro: {
      en: "Tap one fruit to select it, then tap an identical fruit to remove both. No path restrictions mean the board never deadlocks — every pair is always reachable.",
      zh: "先点选一颗水果，再点击另一颗相同水果即可消除两颗。无路径限制意味着棋盘永远不会死局——任何一对相同水果随时可消。"
    },
    facts: [
      { en: "The game ships with 60 levels across 6 themed chapters, scaling from a 6x6 board with 6 fruit types to an 8x10 board with 10 fruit types.", zh: "游戏包含 6 章共 60 关，棋盘从 6×6、6 种水果逐步扩大到 8×10、10 种水果。" },
      { en: "Each matched pair scores 100 points multiplied by the current combo (x2, x3, or x5 for chains of 2+, 3+, or 5+).", zh: "每消除一对得 100 分，并乘以当前连击倍率（连续 2/3/5 对分别为 ×2/×3/×5）。" },
      { en: "Special tiles include golden fruits (double score +5s), frozen fruits (tap once to break ice), bombs (clear 3x3), and countdown fruits (clear before zero or lose 10s).", zh: "特殊水果包括金色水果（双倍分+5秒）、冰冻水果（点一次破冰）、炸弹（清除3×3范围）和倒计时水果（归零前消除否则扣10秒）。" },
      { en: "Levels are won by clearing every tile; the timer ending in failure. Remaining time converts to bonus points at 10 per second.", zh: "清空所有水果即过关；倒计时归零则失败。剩余时间每秒折算 10 分奖励。" }
    ],
    howToPlay: [
      { en: "Tap any fruit tile to select it (it glows gold).", zh: "点击任意水果进行选择（会发出金色光芒）。" },
      { en: "Tap an identical fruit to clear the pair — a glowing line connects them first.", zh: "点击另一颗相同水果完成配对消除，两者间会出现发光连线。" },
      { en: "Clear the entire board before time runs out to advance to the next level.", zh: "在时间耗尽前清空整个棋盘即可进入下一关。" }
    ],
    rules: [
      { en: "Only two identical fruit types can be matched; different types shake and deselect.", zh: "只有相同水果才能配对；不同水果会抖动并取消选择。" },
      { en: "There are no path restrictions — any two matching fruits on the board can be paired directly.", zh: "无路径限制，棋盘上任意两颗相同水果都可直接配对。" },
      { en: "Frozen fruits require one extra tap to break the ice before they can be matched.", zh: "冰冻水果需要额外点击一次破冰后才能参与配对。" },
      { en: "A combo resets if more than 3 seconds pass without a successful match.", zh: "超过 3 秒没有成功配对，连击倍率重置。" }
    ],
    tips: [
      { en: "Prioritize golden fruits for the score and time bonus before they get buried.", zh: "优先消除金色水果，获取分数和时间奖励。" },
      { en: "Keep the combo chain alive by scanning for the next pair while the current clear animates.", zh: "在当前消除动画播放时就扫视下一对，保持连击不断。" },
      { en: "Use bombs when several pairs cluster around one tile to clear many at once.", zh: "当多对水果聚集在炸弹周围时引爆，一次清除大片。" },
      { en: "Break ice on frozen fruits early so they don't block your matching options later.", zh: "尽早敲碎冰冻水果的冰层，避免后期阻碍配对选择。" }
    ],
    scoring: [
      { id: "pair", label: { en: "Matched pair", zh: "配对消除" }, value: { en: "100 × combo", zh: "100 × 连击倍率" } },
      { id: "gold", label: { en: "Golden fruit", zh: "金色水果" }, value: { en: "double score +5s", zh: "双倍分 +5秒" } },
      { id: "bomb", label: { en: "Bomb splash", zh: "炸弹波及" }, value: { en: "+50 per tile", zh: "每颗 +50" } },
      { id: "time", label: { en: "Time bonus", zh: "时间奖励" }, value: { en: "+10 / sec left", zh: "每秒剩余 +10" } }
    ],
    endCondition: {
      en: "The level is won when every tile is cleared; the timer reaching zero ends the level in failure.",
      zh: "清空所有水果即过关；倒计时归零则关卡失败。"
    },
    progress: {
      en: "Unlocked level, per-level star rating (1-3), and best score are saved automatically in localStorage.",
      zh: "已解锁关卡、每关星级（1-3星）和最高分自动保存在 localStorage 中。"
    }
  })
};
