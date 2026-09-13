import type { GameSeoProfile } from "@/data/game-profiles";
import { catalogProfile } from "@/data/game-profiles/catalog-factory";

export const MATCH_3_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "match-3": catalogProfile({
    slug: "match-3",
    title: "Fruit Match 3",
    zhTitle: "水果消消乐",
    primaryKeyword: "match 3 game",
    secondaryKeywords: ["match 3 puzzle", "fruit match 3", "match 3 online free", "三消游戏", "消消乐", "match three game"],
    containsViolence: false,
    controls: ["touch", "mouse"],
    gameplayTopics: ["puzzle", "match"],
    publishedAt: "2026-09-13",
    updatedAt: "2026-09-13",
    durationSeconds: 120,
    objective: {
      en: "Swap adjacent fruits to line up three or more identical ones. Clear matches, trigger cascading combos, and complete level goals within the move limit.",
      zh: "交换相邻水果，使三个或以上相同水果连成一线即可消除。触发连锁反应，在步数限制内完成关卡目标。"
    },
    metaTitle: {
      en: "Fruit Match 3 – Swap & Match Fruits, 60 Levels of Match-3 Fun",
      zh: "水果消消乐 – 交换消除三消游戏，60 关挑战"
    },
    metaDescription: {
      en: "Play Fruit Match 3 online free. Swap adjacent fruits to match 3+, trigger cascade combos, create striped/wrapped/rainbow special fruits, and beat 60 levels on desktop or mobile.",
      zh: "在线免费玩水果消消乐：交换相邻水果三连消除，触发连锁 Combo，合成条纹/包装/彩虹特殊水果，挑战 60 关，支持电脑和手机。"
    },
    h1: {
      en: "Fruit Match 3 – Swap Adjacent Fruits to Match and Clear the Board",
      zh: "水果消消乐 – 交换相邻水果，三连消除过关"
    },
    intro: {
      en: "Tap a fruit then tap an adjacent fruit to swap them. Line up three or more identical fruits to clear them. Cleared fruits fall and new ones drop in, often triggering cascade combos for bonus points.",
      zh: "点击一颗水果，再点击相邻水果进行交换。使三个或以上相同水果连成一线即可消除。消除后上方水果下落、顶部补充新水果，常能触发连锁 Combo 获得额外分数。"
    },
    facts: [
      { en: "The game features 60 levels across 6 chapters, starting with a 6x6 board and 5 fruit types, scaling to an 8x8 board with 8 fruit types and obstacles.", zh: "游戏包含 6 章共 60 关，从 6×6 棋盘、5 种水果起步，逐步扩大到 8×8 棋盘、8 种水果并加入障碍。" },
      { en: "Matching 4 in a row creates a Striped fruit that clears an entire row or column; L/T shapes create a Wrapped fruit that explodes in a 3x3 area; 5 in a row creates a Rainbow fruit that clears all fruits of one color.", zh: "4 连消生成条纹水果（清除整行/整列），L/T 形生成包装水果（3×3 爆炸），5 连消生成彩虹水果（清除全场同色）。" },
      { en: "Each level has a move limit and specific goals: reach a target score, clear a set number of a specific fruit, or complete mixed objectives.", zh: "每关有限定步数和具体目标：达到目标分数、消除指定数量的某种水果，或完成混合目标。" },
      { en: "Cascade combos multiply scores: the second cascade earns x1.5, the third x2, the fourth x2.5, and the fifth or beyond x3.", zh: "连锁 Combo 有分数倍率：第 2 批 ×1.5，第 3 批 ×2，第 4 批 ×2.5，第 5 批及以上 ×3。" },
      { en: "Obstacles include ice blocks (require two matches to clear) and chained fruits (cannot be moved until unlocked).", zh: "障碍包括冰块（需消除两次破冰）和锁链水果（解锁前不可移动）。" }
    ],
    howToPlay: [
      { en: "Tap a fruit to select it, then tap an adjacent fruit to swap them.", zh: "点击一颗水果选中，再点击相邻水果进行交换。" },
      { en: "If the swap creates a line of 3+ identical fruits, they clear and you lose one move; otherwise the swap bounces back.", zh: "如果交换形成 3 个以上相同水果连线则消除并扣 1 步，否则交换回弹不扣步。" },
      { en: "Cleared fruits fall down and new fruits spawn from the top, potentially creating cascade combos.", zh: "消除后水果下落，顶部生成新水果，可能触发连锁 Combo。" },
      { en: "Complete all level goals before running out of moves to advance and earn stars.", zh: "在步数用完前完成所有关卡目标即可过关并获得星级。" }
    ],
    rules: [
      { en: "Only adjacent fruits (up, down, left, right) can be swapped; diagonal swaps are not allowed.", zh: "只能交换上下左右相邻的水果，不支持对角线交换。" },
      { en: "A swap that does not create a match is reversed and does not consume a move.", zh: "未形成匹配的交换会回弹，不扣除步数。" },
      { en: "Special fruits are created at the center of a 4-match, L/T-match, or 5-match pattern.", zh: "特殊水果在 4 连、L/T 形或 5 连匹配的中心位置生成。" },
      { en: "If no valid move exists on the board, the game automatically shuffles all fruits.", zh: "如果棋盘上不存在有效交换，游戏会自动洗牌重新排列。" },
      { en: "Ice-covered fruits need two matches to fully remove; chained fruits cannot be moved until the chain is broken by a match.", zh: "冰块水果需消除两次才能完全移除；锁链水果在被消除解锁前不可移动。" }
    ],
    tips: [
      { en: "Look for opportunities to create 4 or 5 matches to spawn special fruits — they clear far more than basic matches.", zh: "寻找 4 连或 5 连的机会生成特殊水果，清除效率远高于普通消除。" },
      { en: "Plan swaps at the bottom of the board to trigger longer cascade chains as fruits fall.", zh: "优先在棋盘底部交换，水果下落时能触发更长的连锁。" },
      { en: "Use Rainbow fruits by swapping them with the color you need most for level goals.", zh: "将彩虹水果与关卡目标最需要的颜色交换，快速完成目标。" },
      { en: "Break ice and chains early so they don't block your matching options in later moves.", zh: "尽早破冰和解锁锁链，避免后期阻碍消除选择。" },
      { en: "Aim for 3-star ratings by maximizing cascade combos and keeping moves in reserve.", zh: "通过最大化连锁 Combo 和保留剩余步数来冲击 3 星评价。" }
    ],
    scoring: [
      { id: "match3", label: { en: "3-match", zh: "3 连消" }, value: { en: "60 pts (20/fruit)", zh: "60 分（每个 20）" } },
      { id: "match4", label: { en: "4-match", zh: "4 连消" }, value: { en: "120 + Striped fruit", zh: "120 + 条纹水果" } },
      { id: "match5", label: { en: "5-match", zh: "5 连消" }, value: { en: "200 + Rainbow fruit", zh: "200 + 彩虹水果" } },
      { id: "ltmatch", label: { en: "L/T match", zh: "L/T 形" }, value: { en: "150 + Wrapped fruit", zh: "150 + 包装水果" } },
      { id: "cascade", label: { en: "Cascade combo", zh: "连锁倍率" }, value: { en: "x1.5 / x2 / x2.5 / x3", zh: "×1.5/×2/×2.5/×3" } },
      { id: "moves", label: { en: "Move bonus", zh: "步数奖励" }, value: { en: "+50 per move left", zh: "每步剩余 +50" } }
    ],
    endCondition: {
      en: "The level is won when all goals are completed before moves run out; reaching zero moves with unmet goals ends the level in failure.",
      zh: "在步数用完前完成所有目标即过关；步数归零仍未完成目标则关卡失败。"
    },
    progress: {
      en: "Unlocked level, per-level star rating (1-3), and best score are saved automatically in localStorage.",
      zh: "已解锁关卡、每关星级（1-3星）和最高分自动保存在 localStorage 中。"
    }
  })
};
