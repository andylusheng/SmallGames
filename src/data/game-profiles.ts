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
  "quick-tap": {
    slug: "quick-tap",
    primaryKeyword: "quick tap game",
    secondaryKeywords: [
      "tap speed game",
      "quick tapping game",
      "reaction tap game",
      "20 second tap game",
    ],
    publishedAt: "2026-07-21",
    updatedAt: "2026-08-07",
    seoStatus: "optimized",
    testedMobile: true,
    containsViolence: false,
    mechanics: {
      objective: {
        en: "Score as many points as possible by hitting moving targets before the 20-second timer reaches zero.",
        zh: "在20秒倒计时结束前不断点击移动目标，尽可能获得更高分数。",
      },
      durationSeconds: 20,
      controls: ["mouse", "touch"],
      scoring: [
        {
          id: "normal-target",
          label: { en: "Normal target", zh: "普通目标" },
          points: 1,
          note: { en: "Each successful hit moves the target to a new random position.", zh: "每次命中后，目标都会随机移动到新位置。" },
        },
        {
          id: "gold-target",
          label: { en: "Gold target", zh: "金色目标" },
          points: 3,
          note: { en: "Gold targets have a 15% chance to appear after a target moves.", zh: "目标移动后有15%的概率出现金色目标。" },
        },
      ],
      specialMechanics: [
        { en: "The target moves to a random position after every successful hit.", zh: "每次成功命中后，目标都会随机移动。" },
        { en: "Gold targets appear with a 15% probability and are worth three times a normal target.", zh: "金色目标出现概率为15%，得分是普通目标的3倍。" },
        { en: "Tapping empty space does not add points or apply a score penalty.", zh: "点击空白区域不会得分，也不会扣分。" },
      ],
      endCondition: {
        en: "The round ends automatically when the 20-second timer reaches zero.",
        zh: "20秒倒计时归零后，本局自动结束。",
      },
      progress: {
        en: "If the final score beats the previous best, the new best score is saved in localStorage in the current browser.",
        zh: "如果本局分数超过历史最高分，新纪录会保存在当前浏览器的 localStorage 中。",
      },
      gameplayTopics: ["tap", "reaction", "score-challenge"],
    },
    content: {
      en: {
        metaTitle: "Quick Tap Game – 20-Second Tap Challenge",
        metaDescription: "Play Quick Tap online and hit moving targets for 20 seconds. Normal targets score 1 point, while 15% gold targets score 3 points.",
        h1: "Quick Tap – 20-Second Tap Speed Game",
        intro: "Hit moving targets for 20 seconds and build the highest score you can. Normal targets are worth 1 point; gold targets appear 15% of the time and are worth 3.",
        about: [
          "Quick Tap is a short score-chasing reaction game built around one action: find the target and hit it before the timer runs out. Every successful hit immediately moves the target to a new random position, so the challenge is repeated visual reacquisition rather than memorizing a fixed pattern.",
          "Each round lasts exactly 20 seconds. Most targets are worth 1 point, but after each move there is a 15% chance that the next target will be gold and worth 3 points. Your best score is stored locally in the same browser when you set a new record.",
        ],
        howToPlay: [
          "Press Start Game to begin a 20-second round.",
          "Tap or click the visible target to score points.",
          "After every hit, immediately find the target again at its new random position.",
          "Keep scoring until the timer reaches zero, then compare the result with your saved best score.",
        ],
        rules: [
          "A round lasts 20 seconds from the moment the game starts.",
          "A normal target awards 1 point and a gold target awards 3 points.",
          "Gold targets have a 15% chance to appear after the target relocates.",
          "The target changes position after every successful hit.",
          "Tapping empty space does not score and does not subtract points.",
        ],
        tips: [
          "Keep your pointer or tapping finger near the middle of the play area so the average distance to the next random target is shorter.",
          "Prioritize gold targets. A single gold hit is worth the same as three normal hits.",
          "Use short, precise taps instead of large swipes. The target relocates immediately after every hit, so fast visual reacquisition matters more than continuous movement.",
          "Do not panic after an empty tap. There is no score penalty, so refocus on locating the target instead of compensating with random clicks.",
        ],
        faq: [
          { q: "How long is a Quick Tap game?", a: "Each Quick Tap round lasts 20 seconds. The timer starts when you press Start Game and the round ends automatically at zero." },
          { q: "How does Quick Tap scoring work?", a: "Normal targets are worth 1 point. Gold targets are worth 3 points. Tapping empty space gives 0 points and does not reduce your score." },
          { q: "What is the gold target in Quick Tap?", a: "After each successful hit, the next target has a 15% chance to be gold. A gold target awards 3 points instead of 1." },
          { q: "Does Quick Tap save my best score?", a: "Yes. When you beat your previous best, the game saves the new best score in localStorage in the current browser." },
          { q: "Can I play Quick Tap on a phone?", a: "The game uses pointer controls and a responsive play area, so it supports touch interaction in mobile browsers. Device-specific behavior can still vary by browser." },
        ],
      },
      zh: {
        metaTitle: "Quick Tap 快速点击游戏 – 20秒反应挑战",
        metaDescription: "在线玩 Quick Tap：20秒内不断点击随机移动的目标。普通目标1分，15%概率出现的金色目标3分，挑战你的点击速度和反应。",
        h1: "Quick Tap – 20秒快速点击游戏",
        intro: "在20秒内不断寻找并点击移动目标，尽可能刷新高分。普通目标1分；金色目标有15%的概率出现，每次价值3分。",
        about: [
          "Quick Tap 是一个围绕单一操作设计的短局反应游戏：找到目标并在倒计时结束前点击它。每次成功命中后，目标都会立刻随机移动到新的位置，因此真正的难点不是记住固定路线，而是不断快速重新锁定目标。",
          "每局固定20秒。大多数目标命中后获得1分，但目标每次移动后都有15%的概率变成金色，命中金色目标可以获得3分。如果本局超过历史最高分，新纪录会保存在当前浏览器中。",
        ],
        howToPlay: [
          "点击 Start Game 开始一局20秒挑战。",
          "看到目标后，用鼠标点击或手指触摸目标即可得分。",
          "每次命中后，目标都会随机移动，马上重新寻找它的位置。",
          "持续得分直到倒计时归零，然后查看本局成绩是否超过历史最高分。",
        ],
        rules: [
          "每局从开始后固定持续20秒。",
          "普通目标命中得1分，金色目标命中得3分。",
          "目标每次重新出现时，有15%的概率变成金色目标。",
          "每次成功命中后，目标都会随机移动到新的位置。",
          "点击空白区域不会得分，也不会扣分。",
        ],
        tips: [
          "让鼠标或手指尽量停留在游戏区域中央附近，可以缩短移动到下一个随机目标的平均距离。",
          "优先点击金色目标。一次金色目标等于三个普通目标的分数。",
          "使用短而准确的点击，不要做大幅滑动。目标每次命中后立刻换位，快速重新锁定目标比连续移动更重要。",
          "误点空白区域不会扣分，不需要急着乱点补偿，重新寻找目标即可。",
        ],
        faq: [
          { q: "Quick Tap 一局多长时间？", a: "每局固定20秒。点击 Start Game 后开始计时，倒计时归零时本局自动结束。" },
          { q: "Quick Tap 怎么计分？", a: "普通目标每次1分，金色目标每次3分。点击空白区域是0分，也不会扣除已有分数。" },
          { q: "Quick Tap 的金色目标是什么？", a: "每次成功命中并重新生成目标时，新目标有15%的概率变成金色。金色目标命中后获得3分。" },
          { q: "Quick Tap 会保存最高分吗？", a: "会。如果本局超过之前的最高分，游戏会把新纪录保存在当前浏览器的 localStorage 中。" },
          { q: "手机可以玩 Quick Tap 吗？", a: "游戏使用 pointer 交互并采用响应式游戏区域，因此支持移动浏览器触屏操作；具体表现仍可能因浏览器和设备而不同。" },
        ],
      },
    },
  },
};

export function getGameProfileConfig(slug: string): GameSeoProfile | undefined {
  return GAME_PROFILES[slug];
}
