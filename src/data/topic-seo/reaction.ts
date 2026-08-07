import type { TopicSeoConfig } from "@/data/topic-seo";

export const REACTION_TOPIC_SEO: TopicSeoConfig = {
  key: "reaction",
  path: "/reaction-games",
  primaryKeyword: "reaction games",
  secondaryKeywords: ["reaction games online", "reaction speed test", "quick reaction game", "reflex games"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Reaction Games",
      metaTitle: "Reaction Games – Free Speed, Dodge & Target Games Online",
      metaDescription: "Play 7 reaction games online: Quick Tap, Reaction Speed Test, Whack-a-Mole, Fruit Catch, Avoid Blocks, Tile Hop and Table Tennis.",
      h1: "Free Reaction Games – Speed, Timing, Dodge & Target Challenges",
      intro: "Test different kinds of quick response: tap after a signal, reacquire moving targets, dodge falling hazards, switch lanes or react inside a speeding paddle rally.",
      about: [
        "Reaction games are not one mechanic. Quick Tap and Whack-a-Mole focus on visual target acquisition; Reaction Speed Test isolates signal-to-click latency; Fruit Catch and Avoid Blocks require continuous movement decisions; Tile Hop asks for lane changes; Table Tennis adds prediction to a ball that accelerates during rallies.",
        "Grouping them here makes the differences explicit. Some reward milliseconds, some reward survival score, and some end after a fixed timer or point target.",
      ],
      playStylesTitle: "Choose a Reaction Game by Response Type",
      playStyles: [
        { gameSlug: "reaction-test", title: "Signal reaction time", description: "Wait through a random 1–5 second delay and tap only after the panel turns green. Results are measured in milliseconds." },
        { gameSlug: "quick-tap", title: "Rapid target reacquisition", description: "Hit randomly relocating targets for 20 seconds; normal targets are 1 point and 15% gold targets are 3." },
        { gameSlug: "whack-a-mole", title: "3×3 target switching", description: "Hit the one active mole for 30 seconds while its visible window shrinks from 900ms toward 400ms." },
        { gameSlug: "fruit-catch", title: "Catch and avoid", description: "Move a basket to catch +1 fruit while avoiding 15% bomb spawns that cost two lives." },
        { gameSlug: "avoid-blocks", title: "Continuous dodge", description: "Score when falling blocks pass safely; speed and spawn density both rise with score." },
        { gameSlug: "tile-hop", title: "Three-lane switching", description: "Shift one column left or right to remain on scrolling tiles as speed increases by 0.1 per point." },
        { gameSlug: "table-tennis", title: "Paddle tracking", description: "Return the ball against a CPU, with horizontal speed increasing 5% after every paddle contact. First to 7 wins." },
      ],
      howItWorksTitle: "Different Types of Reaction Pressure",
      howItWorks: [
        "Single-signal tests measure how quickly one response follows an unpredictable cue.",
        "Target games add visual search because you must first find where the next target appeared before tapping it.",
        "Dodge and catch games require continuous spatial adjustment rather than one isolated response.",
        "Paddle and lane games mix reaction with prediction: reading the next path early is often more valuable than waiting for the final instant.",
      ],
      faq: [
        { q: "Which game measures reaction time in milliseconds?", a: "Reaction Speed Test measures the time from its green signal to your tap and reports millisecond results." },
        { q: "Which reaction games are timed?", a: "Quick Tap lasts 20 seconds and Whack-a-Mole lasts 30 seconds. Other games use survival, score or first-to-7 conditions." },
        { q: "Which reaction game saves a best score?", a: "Quick Tap, Avoid Blocks and Tile Hop save best scores locally. Reaction Speed Test keeps its result history only for the active page session." },
        { q: "Are the reaction-test labels medical benchmarks?", a: "No. The under-200/300/400ms labels are thresholds defined by this game only, not medical or population standards." },
      ],
    },
    zh: {
      label: "反应类游戏",
      metaTitle: "反应类游戏 – 免费速度、躲避与目标点击小游戏",
      metaDescription: "在线玩7款反应类游戏：Quick Tap、Reaction Speed Test、Whack-a-Mole、Fruit Catch、Avoid Blocks、Tile Hop、Table Tennis。",
      h1: "免费反应类游戏 – 速度、时机、躲避与目标挑战",
      intro: "测试不同快速反应：看到信号后点击、重新锁定移动目标、躲避下落危险、切换路线，或应对不断加速的球拍回合。",
      about: [
        "反应类游戏并不是一种固定机制。Quick Tap和Whack-a-Mole强调视觉搜索目标；Reaction Speed Test尽量隔离信号到点击的延迟；Fruit Catch和Avoid Blocks需要持续移动；Tile Hop要求换列；Table Tennis则把预测加入越来越快的球拍回合。",
        "这个Hub把这些差异直接展示出来。有的用毫秒衡量，有的按生存分数，有的按固定倒计时或先到指定分数结束。",
      ],
      playStylesTitle: "按反应类型选择游戏",
      playStyles: [
        { gameSlug: "reaction-test", title: "信号反应时间", description: "等待1–5秒随机延迟，只在面板变绿后点击，用毫秒记录结果。" },
        { gameSlug: "quick-tap", title: "快速重新锁定目标", description: "20秒内点击随机换位目标；普通1分，15%概率金色目标3分。" },
        { gameSlug: "whack-a-mole", title: "3×3目标切换", description: "30秒打唯一有效地鼠，显示窗口从900ms逐步缩短到最低400ms。" },
        { gameSlug: "fruit-catch", title: "接住与避开", description: "移动篮子接+1分水果，同时避开15%概率出现、会扣2命的炸弹。" },
        { gameSlug: "avoid-blocks", title: "持续躲避", description: "让下落方块安全通过即可得分，速度和生成密度都会随分数提高。" },
        { gameSlug: "tile-hop", title: "三列切换", description: "每次左右移动1列保持小球有平台支撑，每得1分滚动速度增加0.1。" },
        { gameSlug: "table-tennis", title: "球拍追踪", description: "对战CPU回球，每次球拍接触让水平速度提高5%，先到7分获胜。" },
      ],
      howItWorksTitle: "不同反应压力有什么区别",
      howItWorks: [
        "单信号测试主要测不可预测提示出现后的一次响应速度。",
        "目标点击类还增加视觉搜索，因为必须先找到下一个目标在哪里。",
        "躲避和接取类要求持续进行空间调整，而不是只做一次反应。",
        "球拍和路线切换把反应与预测结合，提前读下一步通常比等到最后瞬间更重要。",
      ],
      faq: [
        { q: "哪款用毫秒测反应？", a: "Reaction Speed Test 记录从绿色信号出现到点击之间的毫秒时间。" },
        { q: "哪些反应游戏有固定时间？", a: "Quick Tap固定20秒，Whack-a-Mole固定30秒；其他游戏按生存、得分或先到7分结束。" },
        { q: "哪些会保存最高分？", a: "Quick Tap、Avoid Blocks、Tile Hop会本地保存Best；Reaction Speed Test只在当前页面会话保存记录。" },
        { q: "反应测试的分级是医学标准吗？", a: "不是。低于200/300/400ms等标签只是本游戏内部定义，不是医学或人群标准。" },
      ],
    },
  },
};
