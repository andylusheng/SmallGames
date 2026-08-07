import type { TopicSeoConfig } from "@/data/topic-seo";

export const MEMORY_TOPIC_SEO: TopicSeoConfig = {
  key: "memory",
  path: "/memory-games",
  primaryKeyword: "memory games",
  secondaryKeywords: ["memory games online", "memory card game", "memory sequence game", "pattern memory game"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Memory Games",
      metaTitle: "Memory Games – Free Card Matching & Sequence Memory Online",
      metaDescription: "Play two focused memory games online: match 8 pairs across 16 Memory Cards or repeat a four-pad sequence that grows by one step every level.",
      h1: "Free Memory Games – Card Matching & Sequence Recall",
      intro: "Train two different tasks: remember where matching cards are located, or remember the exact order of a color sequence that grows every level.",
      about: [
        "Memory Cards and Memory Sequence both depend on recall, but they test different information. Memory Cards is spatial: you need to remember where previously seen emoji are located on a 4×4 board. Memory Sequence is ordered: you must reproduce an expanding series of four colored pads in the exact sequence shown.",
        "This Topic intentionally excludes generic reaction tests. A fast click after a signal is a reaction task, while these pages require storing and retrieving information across multiple steps.",
      ],
      playStylesTitle: "Choose a Memory Game by What You Remember",
      playStyles: [
        { gameSlug: "memory-cards", title: "Remember card locations", description: "Flip two cards at a time across 16 cards and find all 8 emoji pairs. Every second reveal counts as a move, and fewer moves are better." },
        { gameSlug: "memory-sequence", title: "Remember sequence order", description: "Watch four colored pads, repeat the complete pattern, then add one new random step every level. One wrong input restarts at level 1." },
      ],
      howItWorksTitle: "Location Memory vs Sequence Memory",
      howItWorks: [
        "Card matching rewards remembering several independent locations so previously seen cards can be paired without reopening unnecessary unknowns.",
        "Sequence recall preserves order: remembering the right colors is not enough if they are tapped in the wrong position in the sequence.",
        "Memory Cards measures efficiency with move count, while Memory Sequence measures progression with the highest completed level.",
      ],
      faq: [
        { q: "Which memory game uses matching pairs?", a: "Memory Cards uses 16 cards containing 8 emoji pairs on a 4×4 board." },
        { q: "Which memory game gets longer every level?", a: "Memory Sequence appends one random colored pad after every successfully repeated sequence." },
        { q: "Does Memory Cards save Best after refresh?", a: "No. Its lowest move count is kept only for the active page session." },
        { q: "Does Memory Sequence save Best?", a: "Yes. Its best completed level is saved in localStorage in the current browser." },
      ],
    },
    zh: {
      label: "记忆类游戏",
      metaTitle: "记忆类游戏 – 免费卡牌配对与序列记忆小游戏",
      metaDescription: "在线玩2款核心记忆游戏：Memory Cards 在16张牌中找8对；Memory Sequence 复现4色序列，每过1级增加1步。",
      h1: "免费记忆类游戏 – 卡牌位置与序列记忆",
      intro: "体验两种不同记忆任务：记住配对卡牌的位置，或者记住每级都会增长的彩色序列顺序。",
      about: [
        "Memory Cards 和 Memory Sequence 都依赖记忆，但保存的信息不同。Memory Cards 是空间位置记忆：需要记住4×4棋盘中已经出现过的emoji在哪里。Memory Sequence 是顺序记忆：必须按完全相同顺序复现不断增长的4色按键序列。",
        "这个Topic不会把普通反应速度测试硬塞进来。看到信号后快速点击属于反应任务，而这里的游戏都要求在多个步骤之间保存并重新调用信息。",
      ],
      playStylesTitle: "按需要记住的信息选择游戏",
      playStyles: [
        { gameSlug: "memory-cards", title: "记卡牌位置", description: "16张牌中每次翻2张，找齐8组emoji配对。每翻开第2张牌计1次Move，完成所需Move越少越好。" },
        { gameSlug: "memory-sequence", title: "记序列顺序", description: "观察4色按键并复现完整模式；每成功1级增加1个随机步骤，点错一次就从Level 1重开。" },
      ],
      howItWorksTitle: "位置记忆与序列记忆的区别",
      howItWorks: [
        "卡牌配对要求同时记住多个独立位置，让已经见过的卡牌可以直接配成一组。",
        "序列记忆强调顺序；即使记住了正确颜色，只要点击位置顺序错误仍然失败。",
        "Memory Cards 用Move数衡量效率，Memory Sequence 用最高完成Level衡量成长。",
      ],
      faq: [
        { q: "哪款是卡牌配对？", a: "Memory Cards 使用4×4共16张牌，其中有8组emoji配对。" },
        { q: "哪款每级序列都会变长？", a: "Memory Sequence 每完整复现一次，就在已有序列末尾增加1个随机彩色按键。" },
        { q: "Memory Cards 的Best刷新后还在吗？", a: "不在，最低Move数只保存在当前页面会话。" },
        { q: "Memory Sequence 会保存Best吗？", a: "会，最高完成Level保存在当前浏览器 localStorage。" },
      ],
    },
  },
};
