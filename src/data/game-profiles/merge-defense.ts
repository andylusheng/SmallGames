import type { GameSeoProfile } from "@/data/game-profiles";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";

const base = MERGE_GAME_PROFILES["merge-defense"];

export const MERGE_DEFENSE_REBUILD_PROFILE: Record<string, GameSeoProfile> = {
  "merge-defense": {
    ...base,
    updatedAt: "2026-08-08",
    mechanics: {
      objective: {
        en: "Build, move and merge towers during preparation, then survive designed enemy waves on the Neon Outpost path while keeping the 20-HP base alive.",
        zh: "在准备阶段购买、移动并合并防御塔，然后在 Neon Outpost 路线上抵挡设计好的敌人波次，并保持20点基地HP不归零。",
      },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Merge Defense Rewards", zh: "Merge Defense 奖励规则" },
      scoringValueLabel: { en: "Gold", zh: "金币" },
      scoring: [
        {
          id: "merge-l1",
          label: { en: "Merge two level 1 towers", zh: "合并两个1级塔" },
          points: 5,
          note: { en: "A merge grants 4 + the previous tower level in gold, so L1 + L1 grants 5 gold.", zh: "合并奖励为4 + 合并前塔等级，因此L1 + L1会获得5金币。" },
        },
        {
          id: "drone-kill",
          label: { en: "Defeat a Drone", zh: "击败 Drone" },
          points: 6,
          note: { en: "Drone enemies grant 6 gold when destroyed.", zh: "击败 Drone 敌人获得6金币。" },
        },
        {
          id: "boss-kill",
          label: { en: "Defeat Titan MK-I", zh: "击败 Titan MK-I" },
          points: 45,
          note: { en: "The Titan boss grants 45 gold when destroyed.", zh: "击败 Titan Boss 获得45金币。" },
        },
      ],
      specialMechanics: [
        { en: "The run starts with 60 gold, 20 base HP and 10 tower slots. A new level 1 Core tower costs 20 gold.", zh: "每局从60金币、20点基地HP和10个塔位开始；新的1级 Core 塔需要20金币。" },
        { en: "During PREP, towers can be dragged into empty slots or dragged onto an equal level and specialization to merge into the next level.", zh: "在 PREP 阶段，塔可以拖到空位，或拖到等级与专精相同的塔上进行合并升级。" },
        { en: "Core towers at level 3 or higher can specialize into Rapid towers for faster laser fire or Blast towers for heavier splash attacks.", zh: "3级及以上 Core 塔可以专精为 Rapid 高频激光塔，或 Blast 范围重炮塔。" },
        { en: "Waves 1–10 use designed enemy compositions that introduce Drone, Runner and Tank enemies; waves 5 and 10 include Titan MK-I bosses.", zh: "第1～10波使用预设敌人组合，逐步加入 Drone、Runner、Tank；第5波和第10波会出现 Titan MK-I Boss。" },
        { en: "Battle speed can be switched between 1× and 2×. Simulation time uses a fixed timestep rather than browser frame count.", zh: "战斗速度可以在1×和2×之间切换；模拟时间使用固定时间步，不再依赖浏览器实际帧数。" },
      ],
      endCondition: {
        en: "Each enemy that reaches the outpost removes 1 base HP. The run ends at 0 HP, and Defend Again starts a new run.",
        zh: "每个到达基地的敌人扣除1点基地HP；HP降到0时本局结束，点击 Defend Again 可直接重新开始。",
      },
      progress: {
        en: "Best wave and cumulative kills are stored in localStorage. Towers, gold, HP and the current wave reset when a new run starts.",
        zh: "历史最高波次和累计击杀数保存在 localStorage；新一局会重置塔阵、金币、HP和当前波次。",
      },
      gameplayTopics: ["merge", "defense", "strategy"],
    },
    content: {
      en: {
        ...base.content.en,
        metaDescription: "Play Merge Defense on Neon Outpost. Start with 60 gold and 20 HP, drag and merge towers, choose Rapid or Blast upgrades, and survive Drone, Runner, Tank and Titan boss waves.",
        intro: "Defend Neon Outpost with 60 starting gold and 20 base HP. Buy 20-gold Core towers, drag matching towers together to merge them, specialize level 3+ towers into Rapid or Blast paths, and survive designed enemy waves.",
        about: [
          "Merge Defense combines a 10-slot merge tray with an automated tower-defense battlefield. PREP is for buying, moving, merging and specializing towers; BATTLE locks the tray while towers automatically engage enemies moving along the curved Neon Outpost route.",
          "The rebuilt version uses four enemy roles: Drone, Runner, Tank and Titan MK-I. Rapid towers trade per-shot damage for a much faster laser rate, while Blast towers fire slower heavy shells that can damage nearby enemies. Boss waves add a dedicated warning sequence and boss health bar.",
        ],
        howToPlay: [
          "Spend 20 gold to add a level 1 Core tower to the first empty tray slot.",
          "Drag a tower to an empty slot to move it, or drag it onto a tower with the same level and specialization to merge them.",
          "Select a level 3 or higher Core tower to choose the Rapid or Blast specialization.",
          "Press Start Wave when preparation is complete; towers then attack automatically while enemies follow the battlefield route.",
          "Use kill and wave-clear gold to rebuild during the next PREP phase, and protect all 20 base HP for as many waves as possible.",
        ],
        rules: [
          "A run starts with 60 gold, wave 1 and 20 base HP.",
          "A new level 1 Core tower costs 20 gold and requires an empty tray slot.",
          "Only towers with the same level and the same specialization can merge.",
          "Merging grants 4 plus the previous tower level in gold and creates one tower one level higher.",
          "Level 3+ Core towers can specialize into Rapid or Blast; specialized towers only merge with the same specialization.",
          "Drone, Runner, Tank and Titan enemies have different speed, durability and kill rewards.",
          "Every enemy that reaches the outpost removes 1 HP; the run ends when base HP reaches zero.",
        ],
        tips: [
          "Merge before starting a wave when possible: a higher-level tower gains both damage and fire-rate improvements without consuming another tray slot.",
          "Rapid towers work well against fast Runner groups, while Blast towers gain more value when several enemies bunch together on the curved route.",
          "Do not specialize every level 3 tower immediately if it prevents future equal-path merge pairs.",
          "Use 2× speed only when the defense is stable; switch back to 1× when a boss or dense mixed wave reaches the inner bends.",
        ],
        faq: [
          { q: "How do you merge towers in Merge Defense?", a: "During PREP, drag one tower onto another tower with the same level and specialization. They combine into one tower a level higher." },
          { q: "What is the difference between Rapid and Blast towers?", a: "Rapid towers fire lower-damage laser shots much faster. Blast towers fire slower heavy shells with higher damage and splash damage around the target." },
          { q: "Which enemies appear in Merge Defense?", a: "The rebuilt battlefield uses Drone, Runner and Tank enemies plus the Titan MK-I boss. The first 10 waves use designed compositions, with bosses on waves 5 and 10." },
          { q: "How much gold do you start with?", a: "Each new run starts with 60 gold. A level 1 Core tower costs 20 gold." },
          { q: "When does Merge Defense end?", a: "The outpost starts with 20 HP. Each enemy that reaches it removes 1 HP, and the run ends at zero HP." },
          { q: "Does Merge Defense save progress?", a: "Best wave and cumulative kills are stored in localStorage, while the active tower board and resources reset for each new run." },
        ],
      },
      zh: {
        ...base.content.zh,
        metaDescription: "在线玩新版 Merge Defense：Neon Outpost 开局60金币、20 HP，拖动并合并防御塔，选择 Rapid 或 Blast 专精，抵挡 Drone、Runner、Tank 和 Titan Boss。",
        intro: "在 Neon Outpost 用60初始金币和20点基地HP进行防守。20金币购买 Core 塔，把相同塔拖到一起合并，3级以上选择 Rapid 或 Blast 专精，并抵挡设计好的敌人波次。",
        about: [
          "新版 Merge Defense 把10格合并区和自动塔防战场结合起来。PREP 阶段用于购买、移动、合并和专精防御塔；进入 BATTLE 后塔阵锁定，防御塔会自动攻击沿 Neon Outpost 曲线路径移动的敌人。",
          "当前战场有 Drone、Runner、Tank 和 Titan MK-I 四类敌人。Rapid 塔牺牲单发伤害换取更高激光射速；Blast 塔射速较慢，但重炮伤害更高并带范围伤害。Boss 波次会触发独立警告和 Boss 血条。",
        ],
        howToPlay: [
          "花20金币在第一个空塔位购买1级 Core 塔。",
          "把塔拖到空位可以移动；拖到等级和专精都相同的塔上可以合并升级。",
          "选择3级或更高的 Core 塔，可以选择 Rapid 或 Blast 专精。",
          "准备完成后点击 Start Wave；进入战斗后防御塔自动攻击沿路线前进的敌人。",
          "利用击杀和过波奖励，在下一次 PREP 阶段继续购买与合并，并尽量保护20点基地HP。",
        ],
        rules: [
          "每局从60金币、第1波和20点基地HP开始。",
          "新的1级 Core 塔需要20金币，并且至少要有一个空塔位。",
          "只有等级相同且专精相同的两个塔才能合并。",
          "合并会生成高1级的塔，并奖励“4 + 合并前等级”金币。",
          "3级以上 Core 塔可专精为 Rapid 或 Blast；专精后的塔只能与相同专精进行合并。",
          "Drone、Runner、Tank、Titan 的速度、耐久和击杀奖励不同。",
          "每个到达基地的敌人扣1 HP；基地HP降到0时本局结束。",
        ],
        tips: [
          "能在开波前完成合并时尽量先合并：高等级塔会同时提高伤害与攻击效率，而且还能腾出塔位。",
          "Rapid 更适合处理高速 Runner；当多个敌人在弯道聚集时，Blast 的范围伤害价值更高。",
          "不要见到3级 Core 就全部立刻专精，否则可能导致后续缺少同路线的可合并对子。",
          "防线稳定时可以使用2×加速；Boss 或高密度混合波进入内侧弯道时可以切回1×观察。",
        ],
        faq: [
          { q: "Merge Defense 怎么合并防御塔？", a: "在 PREP 阶段，把一个塔拖到另一个等级和专精都相同的塔上，两者会合成一个高1级的塔。" },
          { q: "Rapid 和 Blast 有什么区别？", a: "Rapid 使用更低单发伤害换取高频激光攻击；Blast 射速更慢，但单发更重，并会对目标周围敌人造成范围伤害。" },
          { q: "新版 Merge Defense 有哪些敌人？", a: "当前有 Drone、Runner、Tank 和 Titan MK-I Boss。前10波使用预设组合，第5波和第10波会出现 Boss。" },
          { q: "Merge Defense 开局有多少金币？", a: "每局开局60金币，新的1级 Core 塔价格为20金币。" },
          { q: "Merge Defense 什么时候结束？", a: "基地初始20 HP，每个到达基地的敌人扣1 HP，HP降到0时本局结束。" },
          { q: "Merge Defense 会保存进度吗？", a: "历史最高波次和累计击杀数会保存到 localStorage；当前塔阵和资源每局重新开始。" },
        ],
      },
    },
  },
};
