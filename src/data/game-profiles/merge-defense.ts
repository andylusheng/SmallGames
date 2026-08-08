import type { GameSeoProfile } from "@/data/game-profiles";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";

const base = MERGE_GAME_PROFILES["merge-defense"];

export const MERGE_DEFENSE_REBUILD_PROFILE: Record<string, GameSeoProfile> = {
  "merge-defense": {
    ...base,
    updatedAt: "2026-08-08",
    mechanics: {
      objective: {
        en: "Build and upgrade medieval stone towers on six battlefield foundations, then stop enemy waves marching from the right-side camp to the 20-HP castle on the left.",
        zh: "在6个战场地基上建造并升级中世纪投石防御塔，阻止敌人从右侧营地一路推进到左侧20点HP的城堡。",
      },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Medieval Defense Rewards", zh: "中世纪塔防奖励" },
      scoringValueLabel: { en: "Gold", zh: "金币" },
      scoring: [
        { id: "raider-kill", label: { en: "Defeat a Raider", zh: "击败 Raider" }, points: 6, note: { en: "Raider enemies grant 6 gold when defeated.", zh: "击败 Raider 敌人获得6金币。" } },
        { id: "ogre-kill", label: { en: "Defeat the Ogre Chief", zh: "击败 Ogre Chief" }, points: 45, note: { en: "The Ogre Chief boss grants 45 gold when defeated.", zh: "击败 Ogre Chief Boss 获得45金币。" } },
        { id: "core-token", label: { en: "Forge three core fragments", zh: "合成3个核心碎片" }, value: { en: "1 free upgrade token", zh: "1个免费升级令牌" }, note: { en: "Some defeated enemies drop core fragments. Three fragments automatically merge into one upgrade token.", zh: "部分被击败的敌人会掉落核心碎片；3个碎片会自动合成为1个升级令牌。" } },
      ],
      specialMechanics: [
        { en: "A run starts with 60 gold, 20 castle HP and six fixed battlefield foundations. A level 1 Stone Tower costs 20 gold.", zh: "每局从60金币、20点城堡HP和6个固定战场地基开始；新的1级 Stone Tower 需要20金币。" },
        { en: "Towers no longer need duplicate copies to level up. Select a tower during PREP and spend gold, or a forged token, to upgrade it directly.", zh: "防御塔升级不再需要占用额外塔位合并同级塔；PREP 阶段点选塔后，可直接花金币或使用合成令牌升级。" },
        { en: "Stone Towers upgrade through levels 1–3. At level 3, choose Catapult or Trebuchet; the specialization becomes level 4 and can continue upgrading to level 6.", zh: "Stone Tower 可直接升级到1～3级；3级时选择 Catapult 或 Trebuchet，专精后变成4级，并可继续升级到6级。" },
        { en: "Some kills drop core fragments. Three fragments automatically merge into one token that pays for one tower upgrade or specialization instead of gold.", zh: "部分击杀会掉落核心碎片；3个碎片会自动合成1个令牌，可替代金币完成一次塔升级或专精。" },
        { en: "After every cleared wave, choose one of three run upgrades such as more tower damage, faster attacks, longer range, wider splash, extra castle HP or bonus gold.", zh: "每次成功守住一波后，会出现三选一局内强化，例如提高伤害、攻速、射程、范围伤害、城堡HP或获得额外金币。" },
        { en: "During battle, tapping an enemy marks it for Focus Fire for about three seconds when towers can reach it. Mud Trap can be used once per wave to slow all active enemies for 2.5 seconds.", zh: "战斗中可以点击敌人进行约3秒 Focus Fire；在防御塔射程允许时优先攻击该目标。每波还可以使用一次 Mud Trap，让当前全部敌人减速2.5秒。" },
        { en: "Enemies always enter from the right and move toward the castle on the left. Waves use Raider, Scout and Knight mixes, with Ogre Chief bosses every fifth wave.", zh: "敌人固定从右侧出现并向左侧城堡推进。波次由 Raider、Scout、Knight 组成，每5波出现 Ogre Chief Boss。" },
      ],
      endCondition: { en: "Each enemy reaching the castle removes 1 HP. The run ends at 0 HP, and Defend Again starts a fresh run.", zh: "每个到达城堡的敌人扣除1点HP；HP降到0时本局结束，点击 Defend Again 可重新开始。" },
      progress: { en: "Best wave and cumulative kills are stored in localStorage. Towers, run upgrades, forged cores, gold, HP and current wave reset on a new run.", zh: "历史最高波次和累计击杀数保存在 localStorage；新一局会重置塔阵、局内强化、核心合成进度、金币、HP和当前波次。" },
      gameplayTopics: ["merge", "defense", "strategy"],
    },
    content: {
      en: {
        ...base.content.en,
        metaTitle: "Merge Defense Game – Medieval Stone Tower Defense",
        metaDescription: "Play Medieval Merge Defense with 6 tower foundations, direct tower upgrades, forged core tokens, Catapult and Trebuchet paths, and right-to-left enemy waves.",
        h1: "Merge Defense – Medieval Stone Tower Defense Game",
        intro: "Defend a medieval castle with 60 starting gold and 20 HP. Build Stone Towers on six road foundations, upgrade each tower directly, choose Catapult or Trebuchet at level 3, forge enemy core fragments into upgrade tokens, and pick a new war buff after each cleared wave.",
        about: [
          "Merge Defense is a medieval tower-defense game built around six valuable battlefield positions instead of filling the map with duplicate towers. Each placed tower can grow directly from a basic Stone Tower into a specialized siege weapon.",
          "The merge mechanic now lives in the resource loop: defeated enemies can drop core fragments, and three fragments automatically combine into a free upgrade token. Catapult and Trebuchet towers throw visible arcing stones across the winding road from the right-side enemy camp to the left-side castle.",
        ],
        howToPlay: [
          "Press Build Tower, then tap a glowing empty foundation to place a level 1 Stone Tower for 20 gold. Build Mode stays active so you can place several towers quickly.",
          "During PREP, select a tower and press Upgrade to spend gold or use a forged token. Dragging a tower now only moves it to an empty foundation; towers are not merged together for levels.",
          "Upgrade a Stone Tower to level 3, then choose Catapult or Trebuchet. The chosen siege tower becomes level 4 and can continue to level 6.",
          "Defeated enemies can drop core fragments. Three fragments automatically merge into one free upgrade token.",
          "After each cleared wave, choose one of three war upgrades before starting the next wave.",
          "During battle, tap an enemy for Focus Fire and use Mud Trap once per wave to slow all active enemies.",
        ],
        rules: [
          "A run starts with 60 gold, wave 1 and 20 castle HP.",
          "There are six fixed tower foundations, and a new level 1 Stone Tower costs 20 gold.",
          "Stone Tower level 1 upgrades to level 2 for 25 gold, and level 2 upgrades to level 3 for 40 gold when no token is available.",
          "At level 3, choose Catapult or Trebuchet for 55 gold when no forged token is available. The specialized tower becomes level 4 and can continue to level 6.",
          "Three core fragments automatically merge into one upgrade token; the next selected tower upgrade or specialization uses a token before gold.",
          "Every cleared wave pauses for a three-choice run upgrade before the next wave can start.",
          "Focus Fire never extends normal range; only towers that can reach the marked enemy prioritize it.",
          "Mud Trap can be activated once per wave and slows active enemies for 2.5 seconds.",
          "Every enemy reaching the castle removes 1 HP; the run ends when castle HP reaches zero.",
        ],
        tips: [
          "Because there are only six tower positions, upgrade well-placed towers instead of filling the battlefield with low-level duplicates.",
          "Use Catapult for clustered enemies and Trebuchet for slower, heavier long-range hits, especially against armored Knights and Ogre Chiefs.",
          "A forged token can replace an expensive late upgrade, so saving tokens for specialization or level 5–6 upgrades can be efficient.",
          "Choose wave-clear buffs that match your current tower mix instead of taking the same stat every time.",
        ],
        faq: [
          { q: "Do towers still merge together to level up?", a: "No. Towers upgrade directly with gold or forged tokens. Dragging a tower now only repositions it to an empty foundation." },
          { q: "What still merges in Merge Defense?", a: "Enemy core fragments merge automatically: three fragments become one free tower-upgrade token." },
          { q: "How do tower upgrades work?", a: "Stone Towers grow from levels 1 to 3, then choose Catapult or Trebuchet at level 3. The specialization becomes level 4 and can continue to level 6." },
          { q: "Why is a tower not throwing rocks?", a: "A tower attacks only when an active enemy enters its firing range. Select the tower to see the range circle." },
          { q: "Which direction do enemies move?", a: "Enemies spawn from the camp on the right and march toward the castle on the left." },
        ],
      },
      zh: {
        ...base.content.zh,
        metaTitle: "Merge Defense 中世纪塔防 – 投石塔升级与核心合成",
        metaDescription: "在线玩新版 Merge Defense：6个高价值塔位、金币直接升级、核心碎片合成令牌、Catapult / Trebuchet 分支，以及每波三选一强化。",
        h1: "Merge Defense – 中世纪投石塔升级防御游戏",
        intro: "用60初始金币和20点城堡HP进行防守。战场只保留6个关键塔位，每座 Stone Tower 都能直接用金币升级；3级时选择 Catapult 或 Trebuchet。击杀敌人还可能掉落核心碎片，3个碎片自动合成为升级令牌，每守住一波再进行一次三选一强化。",
        about: [
          "新版 Merge Defense 不再要求为了升级不断购买同级塔并占满格子。战场缩减为6个高价值建塔位置，每座塔都可以直接成长，因此注意力更集中在塔位、升级路线和波次决策上。",
          "Merge 机制被保留到资源系统中：敌人有概率掉落核心碎片，3个碎片自动合成1个免费升级令牌。Catapult 与 Trebuchet 继续以抛物线石块攻击从右侧营地向左侧城堡推进的敌人。",
        ],
        howToPlay: [
          "点击 Build Tower，再点击发光空地基，用20金币部署1级 Stone Tower；建造模式会保持开启，可以连续放置多个塔。",
          "在 PREP 阶段点选防御塔，点击 Upgrade 直接花金币或使用合成令牌升级；拖动塔只用于移动到空地基，不再用于同级塔合并。",
          "把 Stone Tower 升到3级后选择 Catapult 或 Trebuchet；专精后直接变成4级，并可继续升级到6级。",
          "击败敌人有概率获得核心碎片；3个碎片会自动合成为1个免费升级令牌。",
          "每次成功守住一波后，从3个随机 War Upgrade 中选择1个，再开始下一波。",
          "战斗中点击敌人可标记 Focus Fire；每波还能使用一次 Mud Trap，让当前敌人整体减速。",
        ],
        rules: [
          "每局从60金币、第1波和20点城堡HP开始。",
          "战场共有6个固定建塔地基，新的1级 Stone Tower 需要20金币。",
          "没有令牌时，1级升2级需要25金币，2级升3级需要40金币。",
          "3级 Stone Tower 可选择 Catapult 或 Trebuchet；没有令牌时专精需要55金币，专精后成为4级并可继续升级到6级。",
          "3个核心碎片会自动合成1个升级令牌；下一次塔升级或专精会优先消耗令牌而不是金币。",
          "每次守住波次后必须先完成一次三选一局内强化，才能开始下一波。",
          "Focus Fire 只会让射程内的防御塔优先攻击被点击敌人，不会突破正常攻击射程。",
          "Mud Trap 每波只能使用一次，会让当前全部敌人减速2.5秒。",
          "每个到达左侧城堡的敌人扣1 HP；HP降到0时本局结束。",
        ],
        tips: [
          "现在只有6个塔位，优先升级覆盖路线好的塔，比堆大量低级塔更重要。",
          "Catapult 更适合处理成群敌人；Trebuchet 射速更慢，但更适合重甲 Knight 和 Ogre Chief。",
          "后期升级价格更高，把核心合成令牌留给专精或5～6级升级通常更划算。",
          "过波三选一强化最好根据当前塔阵选择，不要每次只堆同一种属性。",
        ],
        faq: [
          { q: "现在防御塔还需要互相合并升级吗？", a: "不需要。防御塔改成直接花金币或使用核心合成令牌升级；拖动塔只用于移动到空塔位。" },
          { q: "那 Merge Defense 里的 Merge 现在是什么？", a: "Merge 被放到资源系统：击杀掉落核心碎片，3个碎片会自动合成1个免费升级令牌。" },
          { q: "塔怎么升级？", a: "Stone Tower 从1级直接升到3级，3级选择 Catapult 或 Trebuchet，专精后成为4级并可继续升级到6级。" },
          { q: "为什么有防御塔不抛石头？", a: "只有敌人进入防御塔正常射程才会攻击。点选塔可以直接看到射程圈。" },
          { q: "敌人从哪边出现？", a: "敌人固定从右侧营地出现，并沿弯曲道路向左侧城堡推进。" },
        ],
      },
    },
  },
};
