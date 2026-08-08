import type { GameSeoProfile } from "@/data/game-profiles";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";

const base = MERGE_GAME_PROFILES["merge-defense"];

export const MERGE_DEFENSE_REBUILD_PROFILE: Record<string, GameSeoProfile> = {
  "merge-defense": {
    ...base,
    updatedAt: "2026-08-08",
    mechanics: {
      objective: {
        en: "Build, move and merge towers directly on eight battlefield pads, then survive designed enemy waves while keeping the 20-HP Pixel Outpost alive.",
        zh: "直接在战场的8个建塔点购买、移动并合并防御塔，然后抵挡设计好的敌人波次，并保持20点 Pixel Outpost 基地HP不归零。",
      },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Merge Defense Rewards", zh: "Merge Defense 奖励规则" },
      scoringValueLabel: { en: "Gold", zh: "金币" },
      scoring: [
        { id: "merge-l1", label: { en: "Merge two level 1 towers", zh: "合并两个1级塔" }, points: 5, note: { en: "A merge grants 4 + the previous tower level in gold, so L1 + L1 grants 5 gold.", zh: "合并奖励为4 + 合并前塔等级，因此L1 + L1会获得5金币。" } },
        { id: "drone-kill", label: { en: "Defeat a Drone", zh: "击败 Drone" }, points: 6, note: { en: "Drone enemies grant 6 gold when destroyed.", zh: "击败 Drone 敌人获得6金币。" } },
        { id: "boss-kill", label: { en: "Defeat Titan MK-I", zh: "击败 Titan MK-I" }, points: 45, note: { en: "The Titan boss grants 45 gold when destroyed.", zh: "击败 Titan Boss 获得45金币。" } },
      ],
      specialMechanics: [
        { en: "The run starts with 60 gold, 20 base HP and eight fixed battlefield build pads. A new level 1 Core tower costs 20 gold.", zh: "每局从60金币、20点基地HP和8个固定战场建塔点开始；新的1级 Core 塔需要20金币。" },
        { en: "During PREP, a purchased Core tower is placed directly on an empty field pad. Existing towers can be dragged to another empty pad or onto an equal tower to merge.", zh: "在 PREP 阶段，购买后的 Core 塔直接放到空战场建塔点；已有塔可以拖到其他空点，或拖到同等级同专精塔上进行合并。" },
        { en: "Every build pad is positioned to cover part of the enemy road. Selecting a tower shows its firing range so idle periods are visible rather than ambiguous.", zh: "所有建塔点都布置在能够覆盖部分敌人道路的位置；选择防御塔会显示射程，使暂时没有敌人进入射程时的状态更直观。" },
        { en: "Core towers at level 3 or higher can specialize into Rapid towers for faster laser fire or Blast towers for slower splash attacks.", zh: "3级及以上 Core 塔可以专精为 Rapid 高频激光塔，或 Blast 低射速范围重炮塔。" },
        { en: "During battle, tapping an enemy marks it for Focus Fire for about three seconds when towers can reach it. EMP can be used once per wave to slow all active enemies for 2.6 seconds.", zh: "战斗中可以点击敌人进行约3秒 Focus Fire；在防御塔射程允许时优先攻击该目标。每波还可以使用一次 EMP，让当前全部敌人减速2.6秒。" },
        { en: "Waves 1–10 use designed Drone, Runner and Tank compositions, with Titan MK-I bosses on waves 5 and 10. Battle speed switches between 1× and 2× using fixed-timestep simulation.", zh: "第1～10波使用预设 Drone、Runner、Tank 组合，第5和第10波出现 Titan MK-I Boss；战斗速度可在1×和2×切换，并使用固定时间步模拟。" },
      ],
      endCondition: { en: "Each enemy that reaches Pixel Outpost removes 1 base HP. The run ends at 0 HP, and Defend Again starts a fresh run.", zh: "每个到达 Pixel Outpost 的敌人扣除1点基地HP；HP降到0时本局结束，点击 Defend Again 可直接重新开始。" },
      progress: { en: "Best wave and cumulative kills are stored in localStorage. Towers, gold, HP and the current wave reset when a new run starts.", zh: "历史最高波次和累计击杀数保存在 localStorage；新一局会重置塔阵、金币、HP和当前波次。" },
      gameplayTopics: ["merge", "defense", "strategy"],
    },
    content: {
      en: {
        ...base.content.en,
        metaTitle: "Merge Defense Game – Pixel Tower Merge & Wave Defense",
        metaDescription: "Play Pixel Merge Defense with 8 battlefield pads, 60 starting gold and 20 HP. Place and merge towers, use Focus Fire and EMP, and survive Titan boss waves.",
        h1: "Merge Defense – Pixel Tower Merge Defense Game",
        intro: "Defend Pixel Outpost with 60 starting gold and 20 base HP. Place 20-gold Core towers directly on battlefield pads, drag matching towers together to merge, choose Rapid or Blast upgrades, and survive designed enemy waves.",
        about: [
          "Merge Defense is a pixel-style merge tower-defense game where the merge board and combat map are the same space. Eight fixed build pads sit around the enemy road, so buying, repositioning and merging towers changes the visible defense layout directly.",
          "The battlefield uses Drone, Runner, Tank and Titan MK-I enemies. Rapid and Blast provide different firing styles, while Focus Fire and a once-per-wave EMP add manual decisions during otherwise automatic tower combat.",
        ],
        howToPlay: [
          "Press Buy Core, then tap one of the glowing empty battlefield pads to place a level 1 tower for 20 gold.",
          "During PREP, drag a tower to an empty pad to reposition it, or drag it onto a matching tower with the same level and specialization to merge.",
          "Select a level 3 or higher Core tower to specialize it into Rapid or Blast.",
          "Start the wave. Tap an enemy to mark it for Focus Fire, and use EMP once during the wave to slow all active enemies.",
          "Use kill and wave-clear gold to strengthen the field before the next wave, and keep the 20-HP outpost alive.",
        ],
        rules: [
          "A run starts with 60 gold, wave 1 and 20 base HP.",
          "There are eight fixed build pads, and a new level 1 Core tower costs 20 gold.",
          "Only towers with the same level and specialization can merge; a merge creates one tower one level higher and grants a gold bonus.",
          "Level 3+ Core towers can specialize into Rapid or Blast.",
          "Focus Fire prioritizes a tapped enemy only when that enemy is inside a tower's normal firing range.",
          "EMP can be activated once per wave and slows active enemies for 2.6 seconds.",
          "Every enemy that reaches the outpost removes 1 HP; the run ends when HP reaches zero.",
        ],
        tips: [
          "Select towers during PREP to see their range and use the overlap between nearby pads instead of treating all positions as identical.",
          "Merge matching towers before a difficult wave to raise damage and free a build pad at the same time.",
          "Use Focus Fire on a Runner near the base or on a damaged Titan rather than marking an enemy that most towers cannot reach.",
          "Save EMP for dense mixed waves or a boss push, because it is available only once each wave.",
        ],
        faq: [
          { q: "Where do towers go in Merge Defense?", a: "Towers are placed directly on eight fixed build pads around the battlefield road. There is no separate 10-slot tray in the pixel-field version." },
          { q: "Why is a tower not shooting?", a: "A tower attacks only when an active enemy is inside its visible firing range. Every build pad covers part of the road, and selecting the tower shows the range circle." },
          { q: "How do you merge towers?", a: "During PREP, drag one tower onto another with the same level and specialization. They combine into one tower a level higher." },
          { q: "What do Focus Fire and EMP do?", a: "Tap an enemy to prioritize it for about three seconds when towers can reach it. EMP can be used once per wave to slow all active enemies for 2.6 seconds." },
          { q: "Which enemies appear?", a: "Drone, Runner and Tank units appear in designed wave mixes, with Titan MK-I bosses on waves 5 and 10." },
        ],
      },
      zh: {
        ...base.content.zh,
        metaTitle: "Merge Defense 像素合并塔防 – 合成炮塔抵挡敌人",
        metaDescription: "在线玩像素版 Merge Defense：8个战场建塔点、60初始金币和20 HP。直接建塔合并，使用 Focus Fire 与 EMP，抵挡 Titan Boss 波次。",
        h1: "Merge Defense – 像素合并炮塔防御游戏",
        intro: "在 Pixel Outpost 用60初始金币和20点基地HP进行防守。20金币购买 Core 塔并直接放到战场建塔点，把相同塔拖到一起合并，选择 Rapid 或 Blast 专精，并抵挡设计好的敌人波次。",
        about: [
          "新版 Merge Defense 是像素风合并塔防游戏，合并区域和实际战场已经合为一体。8个固定建塔点分布在敌人道路周围，购买、移动和合并都会直接改变战场上的防御布局。",
          "当前敌人包括 Drone、Runner、Tank 和 Titan MK-I。Rapid 与 Blast 采用不同攻击方式，同时加入 Focus Fire 和每波一次 EMP，让自动攻击之外也存在即时操作。",
        ],
        howToPlay: [
          "点击 Buy Core，再点击战场上的发光空建塔点，用20金币部署1级 Core 塔。",
          "在 PREP 阶段，把塔拖到空建塔点可以移动；拖到等级和专精都相同的塔上可以合并。",
          "选择3级或更高的 Core 塔，可以专精为 Rapid 或 Blast。",
          "开始波次后，点击敌人可标记 Focus Fire；每波还可以使用一次 EMP，让当前敌人整体减速。",
          "利用击杀和过波金币继续强化战场，并保护20点基地HP。",
        ],
        rules: [
          "每局从60金币、第1波和20点基地HP开始。",
          "战场共有8个固定建塔点，新的1级 Core 塔需要20金币。",
          "只有等级和专精都相同的塔才能合并；合并后变成高1级塔并获得金币奖励。",
          "3级以上 Core 塔可以专精为 Rapid 或 Blast。",
          "Focus Fire 只会让射程内的防御塔优先攻击被点击敌人，不会突破正常攻击射程。",
          "EMP 每波只能使用一次，会让当前全部敌人减速2.6秒。",
          "每个到达基地的敌人扣1 HP；HP降到0时本局结束。",
        ],
        tips: [
          "PREP 阶段点选防御塔可以看到射程，应该利用相邻塔位之间的覆盖重叠，而不是把所有位置当成完全一样。",
          "困难波次前优先合并对子，可以同时提高战斗力并腾出建塔点。",
          "Focus Fire 更适合用来处理接近基地的 Runner 或残血 Boss，不要标记大部分塔都够不到的目标。",
          "EMP 每波只有一次，最好留给高密度混合波或 Boss 推进阶段。",
        ],
        faq: [
          { q: "Merge Defense 的塔放在哪里？", a: "像素战场版直接使用道路周围8个固定建塔点，不再使用独立的10格塔盘。" },
          { q: "为什么有炮塔不攻击？", a: "只有敌人进入炮塔正常射程才会攻击。所有建塔点都会覆盖部分道路，点选炮塔还能直接看到射程圈。" },
          { q: "怎么合并防御塔？", a: "在 PREP 阶段，把一个塔拖到另一个等级和专精都相同的塔上，两者会合成一个高1级塔。" },
          { q: "Focus Fire 和 EMP 有什么作用？", a: "点击敌人会让射程允许的炮塔约3秒内优先攻击该敌人；EMP 每波可使用一次，让当前全部敌人减速2.6秒。" },
          { q: "有哪些敌人？", a: "当前有 Drone、Runner、Tank 和 Titan MK-I Boss；第5波和第10波会出现 Boss。" },
        ],
      },
    },
  },
};
