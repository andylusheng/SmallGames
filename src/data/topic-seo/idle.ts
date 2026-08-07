import type { TopicSeoConfig } from "@/data/topic-seo";

export const IDLE_TOPIC_SEO: TopicSeoConfig = {
  key: "idle",
  path: "/idle-games",
  primaryKeyword: "idle games",
  secondaryKeywords: ["idle games online", "clicker games", "idle clicker games", "incremental games online", "idle management games"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Idle & Clicker Games",
      metaTitle: "Idle Games – Free Clicker, Mining & Business Games Online",
      metaDescription: "Play 6 idle and clicker games: Cookie Clicker, Idle Miner, Idle Factory, Tap Tycoon, Lemonade Stand and Pet Merge with different save and growth systems.",
      h1: "Free Idle & Clicker Games – Tap, Upgrade and Grow",
      intro: "Start with manual income, passive production, management or merge growth, then reinvest resources into stronger output across six different progression systems.",
      about: [
        "Idle and clicker games share an investment loop: earn a resource, spend it on higher production, then use the faster production to reach the next upgrade. But the six games here implement that loop differently—some reward tapping, some automate income, one uses day-by-day pricing, and Pet Merge converts matching board pieces into higher tiers.",
        "Save behavior also differs and is documented per game. Idle Miner and Idle Factory persist detailed progress, Tap Tycoon and Pet Merge save selected records, while Cookie Clicker currently resets completely after reload.",
      ],
      playStylesTitle: "Choose an Idle Game by Progression Loop",
      playStyles: [
        { gameSlug: "cookie-clicker", title: "Manual click + passive CPS", description: "Start at 1 cookie per click, buy six passive producers plus a repeatable ×2 click-power upgrade, with costs scaling by 1.15." },
        { gameSlug: "idle-miner", title: "Saved mining progression", description: "Combine three click upgrades and three per-second upgrades. Full gold, production and upgrade state is restored from localStorage." },
        { gameSlug: "idle-factory", title: "Automatic businesses + Prestige", description: "Buy five businesses, grow Income/s and reset at $10K to gain +0.5 global multiplier per Prestige." },
        { gameSlug: "tap-tycoon", title: "Tap income + 8 upgrades", description: "Tap for cash, build passive income across eight upgrades and track the highest cumulative income locally." },
        { gameSlug: "lemonade-stand", title: "Day-by-day pricing management", description: "Manage $20 starting cash, cups, $0.5–$5 pricing, recipe upgrades and weather multipliers rather than continuous passive ticking." },
        { gameSlug: "pet-merge", title: "Merge-based progression", description: "Combine equal pet tiers anywhere on a 5×5 board; higher tiers score exponentially more while new pets consume empty cells." },
      ],
      howItWorksTitle: "Different Idle Progression Loops",
      howItWorks: [
        "Clicker loops trade active input for immediate currency, then use upgrades to make each future click or second more valuable.",
        "Idle production shifts the main decision from clicking to deciding which upgrade gives the best next income increase.",
        "Prestige systems deliberately reset short-term progress in exchange for a stronger multiplier on future rebuilding.",
        "Management and merge variants keep the same reinvestment idea but use daily demand or board space instead of pure currency-per-second growth.",
      ],
      faq: [
        { q: "Which idle games save full progress?", a: "Idle Miner and Idle Factory persist detailed economic and upgrade state in localStorage." },
        { q: "Which idle game has Prestige?", a: "Idle Factory unlocks Prestige at $10,000 cash and increases the global multiplier by 0.5 for each prestige earned." },
        { q: "Does Cookie Clicker save progress?", a: "Not in the current ZeroPlay implementation. Cookies and upgrades reset after reload." },
        { q: "Is Lemonade Stand a normal idle clicker?", a: "No. It progresses one simulated business day at a time using price, inventory, recipe and weather calculations rather than continuous passive income." },
      ],
    },
    zh: {
      label: "放置与点击类游戏",
      metaTitle: "放置类游戏 – 免费Clicker、挖矿与经营小游戏",
      metaDescription: "在线玩6款放置/点击游戏：Cookie Clicker、Idle Miner、Idle Factory、Tap Tycoon、Lemonade Stand、Pet Merge，拥有不同成长和保存机制。",
      h1: "免费放置与Clicker游戏 – 点击、升级与持续成长",
      intro: "从手动收入、被动生产、经营或合并成长开始，把资源不断再投入更强产能，体验6套不同的增长循环。",
      about: [
        "放置和Clicker的共同点是投资循环：先赚资源，再花资源提高生产，然后用更快生产继续触达下一次升级。但这6款实现方式并不相同——有的强调点击、有的自动产出、有的按天经营，Pet Merge则把棋盘相同元素转成更高tier。",
        "保存方式也不同。Idle Miner和Idle Factory保存详细进度；Tap Tycoon和Pet Merge只保存部分纪录；Cookie Clicker当前刷新后会完全重置。",
      ],
      playStylesTitle: "按成长循环选择游戏",
      playStyles: [
        { gameSlug: "cookie-clicker", title: "主动点击 + 被动CPS", description: "从每次点击1个饼干开始，购买6种被动生产和可重复×2点击升级，价格按1.15指数增长。" },
        { gameSlug: "idle-miner", title: "完整保存的挖矿成长", description: "3种点击升级+3种每秒升级，Gold、产能和升级状态都会从localStorage恢复。" },
        { gameSlug: "idle-factory", title: "自动生意 + Prestige", description: "购买5类生意提升Income/s，现金达到$10K后Prestige，每次让全局倍率+0.5。" },
        { gameSlug: "tap-tycoon", title: "点击收入 + 8类升级", description: "点击赚钱并构建8类主动/被动收益升级，本地记录最高累计收入。" },
        { gameSlug: "lemonade-stand", title: "按天定价经营", description: "管理开局$20、杯数、$0.5–$5售价、配方和天气，而不是持续自动tick收入。" },
        { gameSlug: "pet-merge", title: "合并成长", description: "5×5棋盘任意位置合并同tier宠物，高tier指数得分，新宠物持续占用空位。" },
      ],
      howItWorksTitle: "不同放置成长循环有什么区别",
      howItWorks: [
        "Clicker用主动输入换即时货币，再通过升级让之后每次点击或每秒产出更高。",
        "被动生产逐渐把重点从点击转向升级选择：下一笔资源花在哪里最能提高产能。",
        "Prestige主动牺牲短期进度，换取以后重建时更强的永久倍率。",
        "经营和合并变体仍然保留再投资思想，但主要压力变成每日需求或棋盘空间，而不是纯CPS增长。",
      ],
      faq: [
        { q: "哪些放置游戏保存完整进度？", a: "Idle Miner和Idle Factory会把详细经济和升级状态保存在localStorage。" },
        { q: "哪款有Prestige？", a: "Idle Factory现金达到$10,000后可以Prestige，每次让全局倍率增加0.5。" },
        { q: "Cookie Clicker 会保存吗？", a: "当前ZeroPlay实现不会，刷新后饼干和升级都会重置。" },
        { q: "Lemonade Stand 是普通Clicker吗？", a: "不是，它按经营日推进，通过售价、库存、配方和天气计算顾客需求，而不是持续被动产出。" },
      ],
    },
  },
};
