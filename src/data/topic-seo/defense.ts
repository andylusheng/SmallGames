import type { TopicSeoConfig } from "@/data/topic-seo";

export const DEFENSE_TOPIC_SEO: TopicSeoConfig = {
  key: "defense",
  path: "/defense-games",
  primaryKeyword: "defense games",
  secondaryKeywords: ["tower defense games", "defense games online", "plant defense game", "merge defense game"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Defense Games",
      metaTitle: "Defense Games – Free Tower, Plant & Merge Defense Online",
      metaDescription: "Play 3 browser defense games: Tower Defense, Plant Defense and Merge Defense. Build towers or plants, manage resources and stop scaling enemy waves.",
      h1: "Free Defense Games – Tower, Plant & Merge Defense",
      intro: "Choose between fixed-path tower placement, five-lane plant defense and merge-powered auto towers—three defense systems with different economies and failure conditions.",
      about: [
        "Defense games revolve around converting limited resources into enough stopping power before enemies cross a protected line. The exact decision loop differs by game: Tower Defense sells four specialized towers, Plant Defense splits economy/attack/blocking across three plants, and Merge Defense turns duplicate tower levels into stronger units.",
        "This hub groups them by the defensive objective rather than store category. Compare how each game creates pressure through wave size, enemy HP, movement speed, resource income and the cost of letting an enemy through.",
      ],
      playStylesTitle: "Choose a Defense Game by Defense System",
      playStyles: [
        { gameSlug: "tower-defense", title: "Four-tower path defense", description: "Spend 100 starting gold on Basic, Sniper, Splash and Slow towers. Enemy count, HP and speed scale by wave, with a boss every third wave." },
        { gameSlug: "plant-defense", title: "Five-lane plant defense", description: "Use Sunflowers for sun, Shooters for row damage and 10-HP Walls for delay across an 8×5 lawn. Any enemy crossing the left edge ends the run." },
        { gameSlug: "merge-defense", title: "Merge-powered defense", description: "Buy level-1 towers for 20 gold, merge equal levels, earn gold from kills and survive with 20 HP as waves become stronger." },
      ],
      howItWorksTitle: "How Defense Games Create Pressure",
      howItWorks: [
        "Placement defense asks where a tower's range and effect cover the fixed enemy route most efficiently.",
        "Lane defense asks how to distribute economy, damage and blockers across several independent attack rows.",
        "Merge defense links board slots and unit level: duplicate low-level towers are both an opportunity to upgrade and a temporary use of limited space.",
        "All three games scale enemies over time, so a build that survives early waves still needs continued reinvestment.",
      ],
      faq: [
        { q: "Which defense game has four tower types?", a: "Tower Defense has Basic, Sniper, Splash and Slow towers with different prices, ranges and effects." },
        { q: "Which defense game uses plants?", a: "Plant Defense uses an 8×5 lawn with Sunflower, Shooter and Wall plants across five enemy rows." },
        { q: "Which defense game uses merging?", a: "Merge Defense lets two towers of the same level combine into a tower one level higher." },
        { q: "Do all defense games use the same failure rule?", a: "No. Tower Defense loses HP when enemies escape, Plant Defense ends as soon as one enemy crosses the left edge, and Merge Defense uses a 20-HP base." },
      ],
    },
    zh: {
      label: "防御类游戏",
      metaTitle: "防御类游戏 – 免费塔防、植物防御与合并防御",
      metaDescription: "在线玩3款防御类游戏：Tower Defense、Plant Defense、Merge Defense。布置塔或植物、管理资源并抵挡持续增强的敌人波次。",
      h1: "免费防御类游戏 – 塔防、植物与合并防御",
      intro: "选择固定路线塔防、5路植物防御或合并升级自动塔；三套防守系统的经济和失败条件都不同。",
      about: [
        "防御类游戏的共同核心，是把有限资源转换成足够的阻挡和伤害，在敌人穿过防线前建立持续成长的防御。Tower Defense出售4种专门塔；Plant Defense把经济、攻击和阻挡拆给3种植物；Merge Defense则通过同等级塔合并升级。",
        "这个Hub按真实防守目标组织，而不是传统商店分类。可以直接比较波次数量、敌人HP、移动速度、收入方式，以及漏掉敌人后各游戏如何惩罚玩家。",
      ],
      playStylesTitle: "按防守系统选择游戏",
      playStyles: [
        { gameSlug: "tower-defense", title: "四塔固定路线防守", description: "用开局100金币购买基础、狙击、范围和减速塔。敌人数量、HP和速度随波次增长，每3波出现Boss。" },
        { gameSlug: "plant-defense", title: "五路植物防御", description: "8×5草坪上用向日葵产阳光、射手输出、10HP墙拖延。任何敌人穿过左边界都会立即结束。" },
        { gameSlug: "merge-defense", title: "合并升级防御", description: "20金币购买1级塔，把同等级塔合成高1级单位，通过击杀赚金币，并用20HP基地抵挡持续增强的波次。" },
      ],
      howItWorksTitle: "防御类游戏如何制造压力",
      howItWorks: [
        "固定路线塔防的核心是让射程和特殊效果覆盖最有价值的路线位置。",
        "多路线防御需要在不同攻击行之间分配经济、伤害和阻挡资源。",
        "合并防御把塔位空间和单位等级绑在一起：重复低级塔既是升级材料，也会暂时占用有限槽位。",
        "三款游戏都会让敌人逐步增强，因此只够应付前期的阵容必须持续再投资。",
      ],
      faq: [
        { q: "哪款防御游戏有4种塔？", a: "Tower Defense 有基础塔、狙击塔、范围塔和减速塔，价格、射程和效果都不同。" },
        { q: "哪款使用植物？", a: "Plant Defense 在8×5草坪上使用向日葵、射手和墙，面对5条敌人路线。" },
        { q: "哪款通过合并升级？", a: "Merge Defense 可以把两个同等级防御塔合成高1级塔。" },
        { q: "三款失败条件一样吗？", a: "不一样。Tower Defense漏敌扣HP，Plant Defense只要1个敌人穿过左边界就结束，Merge Defense则使用20HP基地。" },
      ],
    },
  },
};
