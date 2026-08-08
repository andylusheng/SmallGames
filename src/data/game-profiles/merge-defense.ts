import type { GameSeoProfile } from "@/data/game-profiles";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";

const base = MERGE_GAME_PROFILES["merge-defense"];

export const MERGE_DEFENSE_REBUILD_PROFILE: Record<string, GameSeoProfile> = {
  "merge-defense": {
    ...base,
    updatedAt: "2026-08-08",
    mechanics: {
      objective: {
        en: "Build, move and merge medieval stone towers on eight battlefield foundations, then stop enemy waves marching from the right-side camp to the 20-HP castle on the left.",
        zh: "在8个战场地基上建造、移动并合并中世纪投石防御塔，阻止敌人从右侧营地一路推进到左侧20点HP的城堡。",
      },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Medieval Defense Rewards", zh: "中世纪塔防奖励" },
      scoringValueLabel: { en: "Gold", zh: "金币" },
      scoring: [
        { id: "merge-l1", label: { en: "Merge two level 1 towers", zh: "合并两个1级塔" }, points: 5, note: { en: "A merge grants 4 + the previous tower level in gold, so L1 + L1 grants 5 gold.", zh: "合并奖励为4 + 合并前塔等级，因此L1 + L1会获得5金币。" } },
        { id: "raider-kill", label: { en: "Defeat a Raider", zh: "击败 Raider" }, points: 6, note: { en: "Raider enemies grant 6 gold when defeated.", zh: "击败 Raider 敌人获得6金币。" } },
        { id: "ogre-kill", label: { en: "Defeat the Ogre Chief", zh: "击败 Ogre Chief" }, points: 45, note: { en: "The Ogre Chief boss grants 45 gold when defeated.", zh: "击败 Ogre Chief Boss 获得45金币。" } },
      ],
      specialMechanics: [
        { en: "A run starts with 60 gold, 20 castle HP and eight fixed battlefield foundations. A level 1 Stone Tower costs 20 gold.", zh: "每局从60金币、20点城堡HP和8个固定战场地基开始；新的1级 Stone Tower 需要20金币。" },
        { en: "During PREP, towers can be dragged to empty foundations or onto an equal tower to merge. The selected tower shows its firing range.", zh: "在 PREP 阶段，可以把塔拖到空地基移动，也可以拖到同等级同类型塔上合并；选中的塔会显示攻击范围。" },
        { en: "Stone Towers throw arcing rocks. Level 3+ towers can specialize into Catapults for stronger splash attacks or Trebuchets for slower, heavier boulders with wider splash.", zh: "Stone Tower 会沿抛物线投掷石块；3级以上可专精为 Catapult，获得更强范围伤害，或 Trebuchet，以更慢速度抛出更重、范围更大的巨石。" },
        { en: "During battle, tapping an enemy marks it for Focus Fire for about three seconds when towers can reach it. Mud Trap can be used once per wave to slow all active enemies for 2.5 seconds.", zh: "战斗中可以点击敌人进行约3秒 Focus Fire；在防御塔射程允许时优先攻击该目标。每波还可以使用一次 Mud Trap，让当前全部敌人减速2.5秒。" },
        { en: "Enemies always enter from the right and move toward the castle on the left. Waves 1–10 use designed Raider, Scout and Knight mixes, with Ogre Chief bosses on waves 5 and 10.", zh: "敌人固定从右侧出现并向左侧城堡推进。第1～10波使用预设 Raider、Scout、Knight 组合，第5和第10波出现 Ogre Chief Boss。" },
      ],
      endCondition: { en: "Each enemy reaching the castle removes 1 HP. The run ends at 0 HP, and Defend Again starts a fresh run.", zh: "每个到达城堡的敌人扣除1点HP；HP降到0时本局结束，点击 Defend Again 可重新开始。" },
      progress: { en: "Best wave and cumulative kills are stored in localStorage. Towers, gold, HP and current wave reset on a new run.", zh: "历史最高波次和累计击杀数保存在 localStorage；新一局会重置塔阵、金币、HP和当前波次。" },
      gameplayTopics: ["merge", "defense", "strategy"],
    },
    content: {
      en: {
        ...base.content.en,
        metaTitle: "Merge Defense Game – Medieval Stone Tower Defense",
        metaDescription: "Play Medieval Merge Defense with 8 battlefield foundations, 60 starting gold and 20 castle HP. Merge Stone Towers, launch Catapult and Trebuchet rocks, and stop enemy waves from the right.",
        h1: "Merge Defense – Medieval Merge Tower Defense Game",
        intro: "Defend a medieval castle with 60 starting gold and 20 HP. Build 20-gold Stone Towers around the road, drag matching towers together to merge, upgrade into Catapult or Trebuchet siege towers, and stop enemy waves marching from right to left.",
        about: [
          "Merge Defense is a medieval merge tower-defense game where tower placement and merging happen directly on the battlefield. Eight fixed foundations surround a bright grass-and-dirt road running from the enemy camp on the right to the castle on the left.",
          "Stone Towers throw visible arcing rocks instead of laser shots. Catapult and Trebuchet upgrades increase splash damage and impact weight, while Raider, Scout, Knight and Ogre enemies create different wave pressures.",
        ],
        howToPlay: [
          "Press Buy Stone Tower, then tap a glowing empty foundation to place a level 1 tower for 20 gold.",
          "During PREP, drag a tower to an empty foundation to reposition it, or onto a matching tower with the same level and type to merge.",
          "Select a level 3 or higher Stone Tower to specialize it into Catapult or Trebuchet.",
          "Start the wave. Tap an enemy to mark it for Focus Fire, and use Mud Trap once during the wave to slow all active enemies.",
          "Use kill and wave-clear gold to strengthen the road defense before the next attack reaches the castle.",
        ],
        rules: [
          "A run starts with 60 gold, wave 1 and 20 castle HP.",
          "There are eight fixed tower foundations, and a new level 1 Stone Tower costs 20 gold.",
          "Only towers with the same level and type can merge; a merge creates one tower one level higher and grants a gold bonus.",
          "Level 3+ Stone Towers can specialize into Catapult or Trebuchet.",
          "Focus Fire never extends normal range; only towers that can reach the marked enemy prioritize it.",
          "Mud Trap can be activated once per wave and slows active enemies for 2.5 seconds.",
          "Every enemy reaching the castle removes 1 HP; the run ends when castle HP reaches zero.",
        ],
        tips: [
          "Select a tower to see its range before moving it. Foundations closer to road corners tend to cover more of the route.",
          "Merge equal towers before difficult waves to raise damage and free a foundation at the same time.",
          "Catapult is useful against clustered enemies, while Trebuchet trades firing speed for heavier boulders and wider splash.",
          "Save Mud Trap for dense mixed waves or the Ogre Chief push because it is available only once each wave.",
        ],
        faq: [
          { q: "Which direction do enemies move?", a: "Enemies always spawn from the camp on the right and march toward the castle on the left." },
          { q: "Why is a tower not throwing rocks?", a: "A tower attacks only when an active enemy enters its visible firing range. Select the tower to see the range circle." },
          { q: "How do you merge towers?", a: "During PREP, drag one tower onto another with the same level and type. They combine into one tower a level higher." },
          { q: "What is the difference between Catapult and Trebuchet?", a: "Catapult throws medium boulders with splash damage more often. Trebuchet fires slower but launches heavier boulders with a larger splash radius." },
          { q: "Which enemies appear?", a: "Raider, Scout and Knight units appear in designed wave mixes, with Ogre Chief bosses on waves 5 and 10." },
        ],
      },
      zh: {
        ...base.content.zh,
        metaTitle: "Merge Defense 中世纪合并塔防 – 投石塔防御游戏",
        metaDescription: "在线玩中世纪版 Merge Defense：8个战场地基、60初始金币和20城堡HP。合并 Stone Tower，升级 Catapult / Trebuchet，用抛物线石块阻挡右侧来敌。",
        h1: "Merge Defense – 中世纪合并投石塔防游戏",
        intro: "用60初始金币和20点城堡HP进行防守。20金币购买 Stone Tower 并直接部署在道路周围，把相同塔拖到一起合并，升级为 Catapult 或 Trebuchet，以抛物线石块抵挡从右往左推进的敌人波次。",
        about: [
          "新版 Merge Defense 改成中世纪合并塔防。8个固定建塔地基直接分布在明亮草地与土路周围，右侧是敌人营地，左侧是需要保护的城堡，建塔、移动和合并都会直接改变战场布局。",
          "防御塔不再使用科幻激光，而是实际抛出有飞行弧线的石块。Catapult 与 Trebuchet 提供不同的范围打击强度，敌人则由 Raider、Scout、Knight 和 Ogre Chief 组成。",
        ],
        howToPlay: [
          "点击 Buy Stone Tower，再点击战场上的发光空地基，用20金币部署1级投石塔。",
          "在 PREP 阶段，把塔拖到空地基可以移动；拖到等级和类型都相同的塔上可以合并。",
          "选择3级或更高的 Stone Tower，可以专精为 Catapult 或 Trebuchet。",
          "开始波次后，点击敌人可标记 Focus Fire；每波还可以使用一次 Mud Trap，让当前敌人整体减速。",
          "利用击杀和过波金币继续强化道路防线，并保护左侧20点城堡HP。",
        ],
        rules: [
          "每局从60金币、第1波和20点城堡HP开始。",
          "战场共有8个固定建塔地基，新的1级 Stone Tower 需要20金币。",
          "只有等级和类型都相同的塔才能合并；合并后变成高1级塔并获得金币奖励。",
          "3级以上 Stone Tower 可以专精为 Catapult 或 Trebuchet。",
          "Focus Fire 只会让射程内的防御塔优先攻击被点击敌人，不会突破正常攻击射程。",
          "Mud Trap 每波只能使用一次，会让当前全部敌人减速2.5秒。",
          "每个到达左侧城堡的敌人扣1 HP；HP降到0时本局结束。",
        ],
        tips: [
          "点选防御塔可以看到射程，道路拐角附近的塔位通常能够覆盖更长的敌人路线。",
          "困难波次前优先合并对子，可以同时提高战斗力并腾出建塔地基。",
          "Catapult 更适合处理成群敌人；Trebuchet 射速更慢，但巨石伤害与范围更大。",
          "Mud Trap 每波只有一次，最好留给高密度混合波或 Ogre Chief 推进阶段。",
        ],
        faq: [
          { q: "敌人从哪边出现？", a: "敌人固定从右侧营地出现，并沿道路向左侧城堡推进。" },
          { q: "为什么有防御塔不抛石头？", a: "只有敌人进入防御塔正常射程才会攻击。点选塔可以直接看到射程圈。" },
          { q: "怎么合并防御塔？", a: "在 PREP 阶段，把一个塔拖到另一个等级和类型都相同的塔上，两者会合成一个高1级塔。" },
          { q: "Catapult 和 Trebuchet 有什么区别？", a: "Catapult 以较高频率投掷中型石块并造成范围伤害；Trebuchet 射速更慢，但会抛出更重的巨石并覆盖更大的爆炸范围。" },
          { q: "有哪些敌人？", a: "当前有 Raider、Scout、Knight 和 Ogre Chief Boss；第5波和第10波会出现 Boss。" },
        ],
      },
    },
  },
};
