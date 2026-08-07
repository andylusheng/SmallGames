import type { TopicSeoConfig } from "@/data/topic-seo";

export const WORD_TOPIC_SEO: TopicSeoConfig = {
  key: "word",
  path: "/word-games",
  primaryKeyword: "word games",
  secondaryKeywords: ["word games online", "word scramble game", "word search online", "hangman game"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Word Games",
      metaTitle: "Word Games – Free Scramble, Word Search & Hangman Online",
      metaDescription: "Play 3 word games online: unscramble 10 hinted words, find 5 words in an 8×8 grid or solve Hangman before 6 wrong guesses.",
      h1: "Free Word Games – Scramble, Search & Hangman",
      intro: "Build, find and guess English words through three different mechanics: letter reordering, hidden-word scanning and clue-based letter deduction.",
      about: [
        "Word games can test construction, visual search or deduction. Word Scramble gives every letter and asks you to rebuild the answer; Word Search hides complete words in a grid; Hangman reveals only a hint and partial letter pattern.",
        "The three pages therefore serve different long-tail intents even though they all use English vocabulary.",
      ],
      playStylesTitle: "Choose a Word Game by Word Task",
      playStyles: [
        { gameSlug: "word-scramble", title: "Unscramble from a hint", description: "Reorder letter tiles across 10 rounds. Consecutive correct answers build a streak and increase score." },
        { gameSlug: "word-search", title: "Find hidden words", description: "Find 5 target words inside an 8×8 grid using straight horizontal, vertical or diagonal selections in either direction." },
        { gameSlug: "hangman", title: "Guess missing letters", description: "Use a clue and A–Z guesses to solve one of 20 built-in words before 6 unique wrong letters complete the drawing." },
      ],
      howItWorksTitle: "Three Different Word-Solving Skills",
      howItWorks: [
        "Scramble solving starts with all letters known, so the main challenge is ordering them into a clue-compatible word.",
        "Word search starts with complete target words known, but hides their position and direction inside unrelated letters.",
        "Hangman hides most letters and asks you to reduce uncertainty one guessed character at a time.",
      ],
      faq: [
        { q: "Which word game has 10 rounds?", a: "Word Scramble runs for 10 rounds and rewards consecutive correct words with a growing streak bonus." },
        { q: "How many words are hidden in Word Search?", a: "Each 8×8 puzzle hides five target words selected from a pool of twenty." },
        { q: "How many wrong guesses are allowed in Hangman?", a: "Six unique wrong letters end the Hangman round." },
        { q: "Do these word games save progress?", a: "No. Their round/session progress is not persisted after a page reload in the current implementations." },
      ],
    },
    zh: {
      label: "单词类游戏",
      metaTitle: "单词类游戏 – 免费字母重组、找单词与Hangman",
      metaDescription: "在线玩3款单词游戏：10轮字母重组、8×8网格找5个隐藏词，或在6次错误前根据提示完成Hangman。",
      h1: "免费单词类游戏 – 重组、搜索与Hangman",
      intro: "用三种方式处理英文单词：重排字母、在网格中找完整词，或根据提示逐个猜字母。",
      about: [
        "单词类游戏可以强调构词、视觉搜索或推理。Word Scramble给出全部字母，需要重新排列；Word Search给出目标词，但隐藏它们的位置和方向；Hangman只给提示和部分字母。",
        "因此虽然三款都围绕英文词汇，它们实际承接的长尾搜索需求并不相同。",
      ],
      playStylesTitle: "按单词任务选择游戏",
      playStyles: [
        { gameSlug: "word-scramble", title: "根据提示重排字母", description: "10个回合重新排列字母，连续答对建立streak并提高每个正确词的得分。" },
        { gameSlug: "word-search", title: "寻找隐藏单词", description: "8×8网格中找5个目标词，支持水平、垂直、对角直线，并可正向或反向选择。" },
        { gameSlug: "hangman", title: "逐字母猜答案", description: "根据Hint从A–Z猜字母，在6个不同错误字母完成Hangman图形前解出20词库中的答案。" },
      ],
      howItWorksTitle: "三种不同的单词解题能力",
      howItWorks: [
        "字母重组已经知道全部字母，核心是把它们排成符合提示的正确顺序。",
        "找单词已经知道完整目标词，难点是从大量无关字母中定位位置和方向。",
        "Hangman隐藏大部分字母，需要通过每一次猜测逐步减少不确定性。",
      ],
      faq: [
        { q: "哪款单词游戏有10轮？", a: "Word Scramble固定10轮，连续答对会提高streak奖励。" },
        { q: "Word Search 每局隐藏几个词？", a: "8×8棋盘每局随机隐藏5个目标词。" },
        { q: "Hangman 最多能错几个字母？", a: "6个不同错误字母会结束当前回合。" },
        { q: "这些单词游戏会保存进度吗？", a: "当前实现不会，刷新后当前回合/会话记录会重置。" },
      ],
    },
  },
};
