import type { GameSeoProfile } from "@/data/game-profiles";
import { catalogProfile } from "@/data/game-profiles/catalog-factory";

export const LINK_CONNECT_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "link-connect": catalogProfile({
    slug: "link-connect",
    title: "Gem Link Connect",
    zhTitle: "宝石连连看",
    primaryKeyword: "link connect game",
    secondaryKeywords: ["onet connect", "link matching game", "pair connect puzzle", "连连看", "宝石连连看", "connect matching"],
    containsViolence: false,
    controls: ["touch", "mouse"],
    gameplayTopics: ["puzzle", "match", "connect"],
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-15",
    durationSeconds: 90,
    objective: {
      en: "Tap two identical gems to connect them with a path of at most two turns. Clear all gems from the board before the timer runs out to advance through 60 levels.",
      zh: "点击两颗相同的宝石，用不超过两个拐弯的路径将它们连接消除。在倒计时结束前清空棋盘所有宝石，闯关 60 关。"
    },
    metaTitle: {
      en: "Gem Link Connect – Match & Connect Gems, 60 Levels of Onet-Style Puzzle Fun",
      zh: "宝石连连看 – 经典连线消除游戏，60 关挑战"
    },
    metaDescription: {
      en: "Play Gem Link Connect online free. Tap identical gems to connect them with paths of up to two turns, trigger combo multipliers, use hint and shuffle power-ups, and beat 60 levels on desktop or mobile.",
      zh: "在线免费玩宝石连连看：点击相同宝石用最多两个拐弯的路径连接消除，触发连击倍率，使用提示和洗牌道具，挑战 60 关，支持电脑和手机。"
    },
    h1: {
      en: "Gem Link Connect – Tap Matching Gems and Connect Them to Clear the Board",
      zh: "宝石连连看 – 点击相同宝石，连线消除过关"
    },
    intro: {
      en: "Tap a gem to select it, then tap another identical gem. If a valid path exists between them — using at most two turns and not passing through any other gems — the pair clears and you score points. Cleared pairs leave empty cells that open up new routing paths around the board's outer channel.",
      zh: "点击一颗宝石选中，再点击另一颗相同的宝石。如果它们之间存在有效路径——最多两个拐弯且不经过其他宝石——这对宝石就会消除并得分。消除后留下的空格会开辟新的路径，连线可以绕过棋盘外围通道。"
    },
    facts: [
      { en: "The game features 60 levels across 6 chapters, starting with a 4x4 board and 6 gem types, scaling to an 8x10 board with 8 gem types and rock obstacles.", zh: "游戏包含 6 章共 60 关，从 4×4 棋盘、6 种宝石起步，逐步扩大到 8×10 棋盘、8 种宝石并加入石头障碍。" },
      { en: "Connection paths can use at most two turns (three straight segments). Paths may travel through empty cells and around the outer perimeter channel of the board.", zh: "连接路径最多两个拐弯（三段直线）。路径可以经过空格子，也可以绕过棋盘外围通道。" },
      { en: "Each pair cleared earns 100 base points. Consecutive matches within 1.5 seconds build a combo multiplier up to x3.", zh: "每消除一对基础得分 100 分。1.5 秒内连续消除可累积连击倍率，最高 ×3。" },
      { en: "Two power-ups are available per level: Hint (×3) highlights a connectable pair, and Shuffle (×2) rearranges all remaining gems.", zh: "每关提供两种道具：提示（×3）高亮一对可连宝石，洗牌（×2）重新排列所有剩余宝石。" },
      { en: "If no valid connection exists on the board, a dead-end dialog appears and the player can shuffle to continue.", zh: "如果棋盘上不存在任何可连对，会弹出死局提示，玩家可以洗牌继续。" }
    ],
    howToPlay: [
      { en: "Tap a gem to select it (it will be highlighted with a golden pulse).", zh: "点击一颗宝石选中（会有金色脉冲高亮）。" },
      { en: "Tap another gem of the same type. If a valid path exists, the pair connects and clears.", zh: "点击另一颗相同类型的宝石。如果存在有效路径，两者连接并消除。" },
      { en: "If the second gem is different or no path exists, the selection switches to the newly tapped gem.", zh: "如果第二颗宝石不同或不存在路径，选中状态切换到新点击的宝石。" },
      { en: "Clear all gems before the timer reaches zero to complete the level and earn stars.", zh: "在倒计时归零前消除所有宝石即可过关并获得星级。" }
    ],
    rules: [
      { en: "Only identical gem types can be connected and cleared.", zh: "只有相同类型的宝石才能连接消除。" },
      { en: "A valid path may contain at most two turns (three straight line segments).", zh: "有效路径最多包含两个拐弯（三段直线）。" },
      { en: "Paths cannot pass through other gems or rock obstacles, but may pass through empty cells and the outer perimeter channel.", zh: "路径不能经过其他宝石或石头障碍，但可以经过空格子和外围通道。" },
      { en: "Rock obstacles cannot be tapped, selected, or cleared — they permanently block path segments.", zh: "石头障碍不可点击、不可选中、不可消除——它们永久阻挡路径。" },
      { en: "If the timer reaches zero with gems remaining, the level ends in failure.", zh: "如果倒计时归零仍有宝石剩余，关卡失败。" }
    ],
    tips: [
      { en: "Clear gems near the center first to open up routing paths through the middle of the board.", zh: "优先消除中间区域的宝石，开辟穿过棋盘中心的路径。" },
      { en: "Build combos by clearing pairs quickly — the x3 multiplier can dramatically boost your score.", zh: "快速连续消除累积连击——×3 倍率能大幅提升得分。" },
      { en: "Save hints for when you truly cannot find a pair — they are limited to 3 per level.", zh: "提示道具留到实在找不到可连对时使用——每关只有 3 次。" },
      { en: "Use shuffle when the board feels stuck — it rearranges gems and often opens new connections.", zh: "感觉棋盘卡住时使用洗牌——重新排列宝石后常会出现新的可连对。" },
      { en: "Aim for 3-star ratings by finishing with at least 50% time remaining and using no more than 1 hint.", zh: "冲击 3 星评价：剩余时间 ≥50% 且提示使用 ≤1 次。" }
    ],
    scoring: [
      { id: "pair", label: { en: "Pair cleared", zh: "消除一对" }, value: { en: "100 pts", zh: "100 分" } },
      { id: "combo", label: { en: "Combo multiplier", zh: "连击倍率" }, value: { en: "x1.2 / x1.4 / ... / x3 max", zh: "×1.2/×1.4/…/最高×3" } },
      { id: "timebonus", label: { en: "Time bonus", zh: "时间奖励" }, value: { en: "+10 per second left", zh: "每秒剩余 +10" } },
      { id: "perfect", label: { en: "Perfect clear bonus", zh: "完美通关奖励" }, value: { en: "+500 (no hints used)", zh: "+500（未使用提示）" } }
    ],
    endCondition: {
      en: "The level is won when all gems are cleared before the timer reaches zero. Reaching zero time with gems remaining ends the level in failure.",
      zh: "在倒计时归零前消除所有宝石即过关；时间归零仍有宝石剩余则关卡失败。"
    },
    progress: {
      en: "Unlocked level, per-level star rating (1-3), and best score are saved automatically in localStorage.",
      zh: "已解锁关卡、每关星级（1-3星）和最高分自动保存在 localStorage 中。"
    }
  })
};
