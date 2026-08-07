import type { TopicSeoConfig } from "@/data/topic-seo";

export const MERGE_TOPIC_SEO: TopicSeoConfig = {
  key: "merge",
  path: "/merge-games",
  primaryKeyword: "merge games",
  secondaryKeywords: ["merge games online", "number merge games", "merge puzzle games", "tower merge games", "pet merge games"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Merge Games",
      metaTitle: "Merge Games – Free Number, Tower & Pet Merge Games Online",
      metaDescription: "Play 4 free merge games online: Hex Merge, Merge Defense, Pet Merge and 2048. Combine equal pieces to create stronger towers, higher pets or larger number tiles.",
      h1: "Free Merge Games – Number, Tower & Pet Merge Games",
      intro: "Play four browser merge games built around the same core idea—combine equal pieces to create a stronger result—but with very different board rules, scoring systems and failure conditions.",
      about: [
        "Merge games turn matching pieces into progression. In Hex Merge, equal neighboring number hexes become a higher level; in 2048, equal number tiles collide during a full-board slide; Pet Merge lets equal pets combine from anywhere on the board; and Merge Defense converts equal tower levels into stronger automated defenses.",
        "This hub groups games by the actual merge rule instead of their store category. The important differences are where pieces are allowed to merge, what the merge creates, what new pressure is added afterward, and what eventually ends or blocks the run.",
      ],
      playStylesTitle: "Choose a Merge Game by Merge Rule",
      playStyles: [
        { gameSlug: "hex-merge", title: "Adjacent hex merging", description: "Merge equal neighboring hexes on a 5×5 board. The destination level rises by one, scores new level × 2, and a random level 1–3 tile is added after every merge." },
        { gameSlug: "merge-defense", title: "Tower upgrade merging", description: "Buy level 1 towers for 20 gold, merge equal levels for stronger auto-attacks and survive waves whose enemy count, HP and speed all scale upward." },
        { gameSlug: "pet-merge", title: "Free-position pet merging", description: "Merge any two equal pet tiers anywhere on a 5×5 board. Higher tiers score exponentially more, while Add Pet fills a random empty cell." },
        { gameSlug: "2048", title: "Sliding number merging", description: "Slide a 4×4 board so equal values collide. Each merged tile adds its new value to score, then a new 2 or 4 appears after every valid move." },
      ],
      howItWorksTitle: "How Merge Games Create Different Strategy",
      howItWorks: [
        "Position-limited merge games such as Hex Merge require equal pieces to be neighbors, so board geometry controls what can combine next.",
        "Slide merge games such as 2048 move the whole board at once, making direction choice as important as the pair being merged.",
        "Free-position merge games such as Pet Merge remove adjacency limits but make empty-space management important because new pieces occupy random cells.",
        "Upgrade merge games such as Merge Defense turn equal pieces into combat power, so merge timing is linked to resource income and enemy scaling rather than a fixed score board.",
      ],
      faq: [
        { q: "What are merge games?", a: "Merge games are games where combining two matching or equal pieces creates a higher-value, higher-level or stronger result. The exact merge rule can depend on adjacency, movement direction, board space or unit level." },
        { q: "Which merge game uses adjacent tiles?", a: "Hex Merge requires two equal-number hexes to be directly adjacent. A hex can have up to six neighbors on its staggered board." },
        { q: "Which merge game lets pieces combine from anywhere?", a: "Pet Merge allows any two equal pet tiers to merge even when they are not adjacent." },
        { q: "Which merge game includes tower defense?", a: "Merge Defense uses equal-level tower merges to create stronger automated towers while enemy waves increase in size, HP and speed." },
        { q: "Does the 2048 game save the best score?", a: "Not in the current ZeroPlay implementation. Its Best value is only kept in memory for the active page session and resets after reload." },
      ],
    },
    zh: {
      label: "合并类游戏",
      metaTitle: "合并类游戏 – 免费数字、塔防与宠物合并小游戏",
      metaDescription: "免费在线玩4款合并类游戏：Hex Merge、Merge Defense、Pet Merge 和 2048。把相同元素合成更强防御塔、更高宠物或更大数字。",
      h1: "免费合并类游戏 – 数字、塔防与宠物合并",
      intro: "4款浏览器游戏都围绕“把相同元素合成更强结果”展开，但它们的合并位置、计分、棋盘压力和结束条件完全不同。",
      about: [
        "合并类游戏把匹配元素直接转化成成长。Hex Merge 把相邻同数字六边形升级；2048 在整盘滑动时合并相同数字；Pet Merge 可以跨位置合并同等级宠物；Merge Defense 则把同等级防御塔合成更强的自动攻击单位。",
        "这个 Hub 按真实合并规则组织游戏，而不是按传统商店分类。真正决定体验差异的是：哪些位置允许合并、合并后生成什么、下一步会增加什么棋盘压力，以及什么条件会让游戏结束或暂时卡住。",
      ],
      playStylesTitle: "按合并规则选择游戏",
      playStyles: [
        { gameSlug: "hex-merge", title: "相邻六边形合并", description: "在5×5棋盘合并相邻同数字六边形。目标格提升1级，按新等级×2得分，并在每次合并后随机补入1～3级新格。" },
        { gameSlug: "merge-defense", title: "防御塔升级合并", description: "20金币购买1级塔，把同等级塔合成更强自动攻击单位，并抵挡数量、HP和速度持续提升的敌人波次。" },
        { gameSlug: "pet-merge", title: "任意位置宠物合并", description: "5×5棋盘上任意两个同tier宠物都可以合并；高tier得分指数增长，Add Pet 会随机占用一个空位。" },
        { gameSlug: "2048", title: "滑动数字合并", description: "滑动4×4棋盘让相同数字碰撞合并；新格数值直接计分，每次有效移动后都会新增一个2或4。" },
      ],
      howItWorksTitle: "不同合并规则如何形成策略差异",
      howItWorks: [
        "Hex Merge 这类位置受限玩法要求相同格子彼此相邻，因此棋盘几何结构直接决定下一步能不能继续合并。",
        "2048 这类滑动合并一次会移动整盘，选择方向和选择合并对象同样重要。",
        "Pet Merge 取消相邻限制，但 Add Pet 会随机占用空位，因此空间管理变成主要压力。",
        "Merge Defense 把合并结果转成战斗力，合并时机同时受金币收入和敌人波次成长影响，而不是只追分数。",
      ],
      faq: [
        { q: "什么是合并类游戏？", a: "合并类游戏通过组合两个相同或匹配元素，生成更高数值、更高等级或更强结果。具体规则可能由相邻关系、滑动方向、棋盘空位或单位等级决定。" },
        { q: "哪款合并游戏要求格子相邻？", a: "Hex Merge 要求两个同数字六边形直接相邻；错位六边形棋盘上一个格子最多有6个邻居。" },
        { q: "哪款合并游戏可以跨位置直接合并？", a: "Pet Merge 允许任意两个同tier宠物直接合并，不要求它们彼此相邻。" },
        { q: "哪款合并游戏带塔防玩法？", a: "Merge Defense 通过合并同等级防御塔提升自动攻击能力，同时敌人波次的数量、HP和速度持续增加。" },
        { q: "这个2048会保存最高分吗？", a: "当前 ZeroPlay 实现不会。Best 只在本次页面会话内存里记录，刷新后会重置。" },
      ],
    },
  },
};
