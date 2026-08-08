import type { GameSeoProfile, LocalizedGameSeoContent } from "@/data/game-profiles";
import { TAP_GAME_PROFILES } from "@/data/game-profiles/tap";
import { MERGE_GAME_PROFILES } from "@/data/game-profiles/merge";
import { DEFENSE_GAME_PROFILES } from "@/data/game-profiles/defense";
import { MEMORY_GAME_PROFILES } from "@/data/game-profiles/memory";
import { REACTION_GAME_PROFILES } from "@/data/game-profiles/reaction";
import { IDLE_GAME_PROFILES } from "@/data/game-profiles/idle";
import { CATALOG_ARCADE_GAME_PROFILES } from "@/data/game-profiles/catalog-arcade";
import { CATALOG_CASUAL_PUZZLE_GAME_PROFILES } from "@/data/game-profiles/catalog-casual-puzzle";
import { CATALOG_RACING_SHOOTING_GAME_PROFILES } from "@/data/game-profiles/catalog-racing-shooting";
import { CATALOG_SPORTS_STRATEGY_GAME_PROFILES } from "@/data/game-profiles/catalog-sports-strategy";

const BASES: Record<string, GameSeoProfile> = {
  ...TAP_GAME_PROFILES,
  ...MERGE_GAME_PROFILES,
  ...DEFENSE_GAME_PROFILES,
  ...MEMORY_GAME_PROFILES,
  ...REACTION_GAME_PROFILES,
  ...IDLE_GAME_PROFILES,
  ...CATALOG_ARCADE_GAME_PROFILES,
  ...CATALOG_CASUAL_PUZZLE_GAME_PROFILES,
  ...CATALOG_RACING_SHOOTING_GAME_PROFILES,
  ...CATALOG_SPORTS_STRATEGY_GAME_PROFILES,
};

type ContentPatch = Partial<LocalizedGameSeoContent>;

function rebuilt(
  slug: string,
  mechanics: Partial<GameSeoProfile["mechanics"]>,
  en: ContentPatch,
  zh: ContentPatch,
): GameSeoProfile {
  const base = BASES[slug];
  if (!base) throw new Error(`Missing base profile for rebuilt flagship: ${slug}`);
  return {
    ...base,
    updatedAt: "2026-08-08",
    mechanics: { ...base.mechanics, ...mechanics },
    content: {
      en: { ...base.content.en, ...en },
      zh: { ...base.content.zh, ...zh },
    },
  };
}

export const FLAGSHIP_NINE_PROFILES: Record<string, GameSeoProfile> = {
  "quick-tap": rebuilt("quick-tap", {
    scoring: [
      { id: "normal", label: { en: "Normal target", zh: "普通目标" }, points: 1 },
      { id: "gold", label: { en: "Gold target", zh: "金色目标" }, points: 3 },
      { id: "combo", label: { en: "Combo bonus", zh: "连击加成" }, value: { en: "Up to +3 before Fever", zh: "Fever 前最高额外 +3" } },
      { id: "fever", label: { en: "Fever scoring", zh: "Fever 得分" }, value: { en: "All hit points are doubled", zh: "所有命中得分翻倍" } },
    ],
    specialMechanics: [
      { en: "Each run lasts 20 seconds. Target size shrinks as the timer falls.", zh: "每局持续20秒，随着倒计时下降，目标会逐渐缩小。" },
      { en: "A combo of 8 triggers about five seconds of Fever, which doubles hit scoring.", zh: "连击达到8次会触发约5秒 Fever，命中得分翻倍。" },
      { en: "Gray decoys and empty-arena misses reset combo and end active Fever.", zh: "点击灰色诱饵或空白区域会重置连击，并结束当前 Fever。" },
      { en: "Classic uses random target positions; Daily uses a deterministic target sequence for the current date.", zh: "Classic 使用随机目标位置；Daily 会根据当天日期生成固定目标序列。" },
    ],
  }, {
    intro: "Play a 20-second neon reflex challenge. Hit moving targets, avoid gray decoys, build an 8-hit combo to trigger Fever, and use the Fever window to double your score.",
    about: ["Quick Tap is a short reaction game built around accuracy, combo preservation and a five-second Fever scoring window. The target gets smaller later in the run, while gold targets create higher-value opportunities."],
    howToPlay: ["Start Classic or Daily mode.", "Tap blue or gold targets as soon as they appear and avoid gray decoys.", "Reach combo ×8 to trigger Fever and score double points for about five seconds.", "Keep hitting until the 20-second timer reaches zero."],
    rules: ["Normal targets start at 1 point and gold targets at 3 points before combo bonuses.", "Combo bonuses rise with longer streaks, up to +3 before Fever multiplication.", "Gray decoys and misses reset combo; Fever requires an eight-hit combo."],
    tips: ["Protect combo first; Fever is more valuable than chasing a risky gold target.", "Late-run targets are smaller, so prioritize clean taps over speed."],
    faq: [
      { q: "How long is a Quick Tap run?", a: "Each Classic or Daily run lasts 20 seconds." },
      { q: "How does Fever work?", a: "Reach combo ×8 to trigger about five seconds of Fever, during which hit scoring is doubled." },
      { q: "What do gray targets do?", a: "Gray targets are decoys. Tapping one resets combo and ends active Fever." },
    ],
  }, {
    intro: "进行20秒霓虹反应挑战：快速点击移动目标、避开灰色诱饵，连续命中8次触发 Fever，并在 Fever 时间内获得双倍得分。",
    about: ["Quick Tap 现在围绕准确率、连击和 Fever 爆发窗口展开。越接近倒计时结束，目标越小；金色目标则提供更高的基础得分。"],
    howToPlay: ["选择 Classic 或 Daily 开始。", "快速点击蓝色或金色目标，不要点击灰色诱饵。", "连续命中8次触发 Fever，约5秒内命中得分翻倍。", "坚持到20秒倒计时结束并冲击最高分。"],
    rules: ["普通目标基础1分，金色目标基础3分，之后再计算连击加成。", "连击越高，加分越多，Fever 前最高额外 +3。", "点击诱饵或点空都会重置连击；Fever 需要8连击触发。"],
    tips: ["优先保护连击，Fever 的价值通常高于冒险追一个金色目标。", "后半程目标更小，保持准确比盲目提速更重要。"],
    faq: [
      { q: "一局 Quick Tap 多久？", a: "Classic 和 Daily 每局都是20秒。" },
      { q: "Fever 怎么触发？", a: "连续命中8次会触发约5秒 Fever，这段时间命中得分翻倍。" },
      { q: "灰色目标是什么？", a: "灰色目标是诱饵，点中会重置连击并结束当前 Fever。" },
    ],
  }),

  "hex-merge": rebuilt("hex-merge", {
    scoring: [
      { id: "merge", label: { en: "Merge score", zh: "合并得分" }, value: { en: "New rune level × 8 × live chain multiplier", zh: "新符文等级 × 8 × 当前连锁倍率" } },
      { id: "double", label: { en: "×2 rune", zh: "×2 符文" }, value: { en: "Doubles that merge score", zh: "该次合并得分翻倍" } },
    ],
    specialMechanics: [
      { en: "Merge adjacent matching hex runes; a Wild rune can merge with any occupied adjacent rune.", zh: "合并相邻且等级相同的六边形符文；Wild 可以与任意相邻已占用符文合并。" },
      { en: "Each successful merge adds one Forge Energy. Six energy unlocks Shatter.", zh: "每次成功合并增加1点 Forge Energy；累计6点可使用 Shatter。" },
      { en: "Shatter removes any occupied rune, consumes all six energy and then spawns one new rune.", zh: "Shatter 可以移除任意已占用符文，消耗6点能量，并随后生成一个新符文。" },
      { en: "Quick consecutive merges build a live chain multiplier; the multiplier resets when selection breaks the chain window.", zh: "短时间连续合并会形成连锁倍率；超出连锁窗口或重新选择会重置连锁。" },
    ],
  }, {
    intro: "Merge adjacent matching hex runes, build live chains for higher scores, charge six Forge Energy, and spend Shatter to remove a blocking rune before the board locks.",
    about: ["Hex Merge is now a rune-forging puzzle with a controllable recovery tool. Successful merges charge Forge Energy, giving the player a deliberate way to create space instead of relying only on random rescue tiles."],
    howToPlay: ["Select an occupied rune, then select an adjacent matching rune to merge them.", "Chain merges quickly to increase the live score multiplier.", "After six successful merges, press Shatter and choose one occupied rune to destroy.", "Keep creating space and higher-level runes until no legal move remains."],
    rules: ["Only adjacent matching levels merge, except Wild runes which can pair with any occupied neighbor.", "A merge creates one rune one level higher and spawns a new low-level rune.", "Shatter costs six Forge Energy and does not directly award score."],
    tips: ["Save Shatter for a tile that blocks multiple future pairings, not simply the highest rune.", "Build chains when several pairs are already visible before starting the first merge."],
    faq: [
      { q: "What does Forge Energy do?", a: "Every successful merge adds one energy. At six energy, Shatter becomes available." },
      { q: "What does Shatter do?", a: "It removes one occupied rune, consumes the full six-energy meter, and gives the board more room." },
      { q: "Do Wild runes match anything?", a: "Yes. A Wild rune can merge with any occupied adjacent rune." },
    ],
  }, {
    intro: "合并相邻同等级六边形符文，通过连续合并提高倍率；累计6点 Forge Energy 后可使用 Shatter 主动移除堵路符文，避免棋盘过早锁死。",
    about: ["Hex Merge 现在是一款带主动解围机制的符文合并益智游戏。每次成功合并都会积累 Forge Energy，让玩家可以主动制造空间，而不是只依赖随机特殊块。"],
    howToPlay: ["先选择一个符文，再选择相邻且可匹配的符文完成合并。", "在短时间内连续合并，提升实时连锁倍率。", "成功合并6次后点击 Shatter，再选择一个已占用符文将其移除。", "持续制造空间和更高等级符文，直到没有合法合并。"],
    rules: ["只有相邻同等级符文能正常合并；Wild 可以与任意相邻已占用符文合并。", "合并后生成高1级符文，并补入一个新的低等级符文。", "Shatter 消耗6点 Forge Energy，本身不直接得分。"],
    tips: ["Shatter 最适合清理阻断多个潜在对子的位置，不一定要清最高等级符文。", "如果盘面上已经有多个对子，先规划连续合并路线再动手。"],
    faq: [
      { q: "Forge Energy 有什么用？", a: "每次成功合并增加1点能量，达到6点后可以使用 Shatter。" },
      { q: "Shatter 做什么？", a: "它会移除一个已占用符文并清空6点能量，为棋盘腾出空间。" },
      { q: "Wild 可以和任何符文合并吗？", a: "可以，只要目标符文与 Wild 相邻且已经占用。" },
    ],
  }),

  "space-shooter": rebuilt("space-shooter", {
    specialMechanics: [
      { en: "Enemies arrive in discrete waves; clearing a wave pauses combat and offers three random ship upgrades.", zh: "敌人按独立波次出现；清空一波后战斗暂停，并出现三个随机飞船强化选项。" },
      { en: "Every fifth wave ends with a Dreadnought boss with its own health bar.", zh: "每5波会出现拥有独立血条的 Dreadnought Boss。" },
      { en: "Upgrade choices include faster fire, extra projectiles, higher damage, shield charges and hull repair.", zh: "强化选项包括提高射速、增加弹道、提升伤害、增加护盾次数和修复生命。" },
      { en: "Dragging on touch devices moves the ship and keeps it firing; desktop supports A/D or arrow movement and Space to fire.", zh: "触屏拖动会移动飞船并持续开火；桌面支持 A/D 或方向键移动、Space 开火。" },
    ],
  }, {
    intro: "Clear escalating enemy waves, choose one ship upgrade after every wave, and survive the Dreadnought boss that appears every fifth wave.",
    about: ["Space Shooter is a wave-based arcade shooter with Drone, Dart, Tank and Dreadnought enemies. Between waves, one of three upgrades changes fire rate, projectile count, damage or survivability for the rest of the run."],
    howToPlay: ["Move with A/D or the left and right arrow keys; on mobile, drag the ship.", "Press Space on desktop to fire; touch dragging keeps the ship firing automatically.", "Clear every enemy in the wave and choose one of three upgrades.", "Prepare for the Dreadnought boss on every fifth wave."],
    rules: ["You start with three lives and lose a life when an enemy collides with or passes the ship.", "Wave-clear upgrades last for the current run.", "Shield charges absorb one damaging hit before lives are removed."],
    tips: ["Projectile-count upgrades are especially strong when combined with damage upgrades.", "Keep movement small against Tank enemies so you still have space to dodge fast Darts."],
    faq: [
      { q: "When does the boss appear?", a: "A Dreadnought appears at the end of every fifth wave." },
      { q: "Are upgrades permanent?", a: "They last for the current run and reset when a new run starts." },
      { q: "How does mobile shooting work?", a: "Dragging moves the ship and also keeps its weapon firing automatically." },
    ],
  }, {
    intro: "清空不断增强的敌人波次，每过一波从三个强化中选一个，并在每5波迎战 Dreadnought Boss。",
    about: ["Space Shooter 现在采用波次式街机射击结构，包含 Drone、Dart、Tank 和 Dreadnought。每波结束后会出现三选一强化，持续改变本局的射速、弹道数量、伤害或生存能力。"],
    howToPlay: ["桌面使用 A/D 或左右方向键移动；手机直接拖动飞船。", "桌面按 Space 开火；手机拖动时会自动持续开火。", "清空当前波次全部敌人后，从三个强化中选择一个。", "每5波准备迎战 Dreadnought Boss。"],
    rules: ["开局有3条生命，敌人碰撞或越过防线会扣除生命。", "过波强化只在当前这一局有效。", "护盾次数会优先吸收一次伤害，然后才扣生命。"],
    tips: ["增加弹道数量后再叠加伤害，通常能形成更强的清场能力。", "面对高速 Dart 时不要把飞船长期贴边，保留横向闪避空间。"],
    faq: [
      { q: "Boss 什么时候出现？", a: "每5波结束时会出现 Dreadnought Boss。" },
      { q: "强化会永久保留吗？", a: "不会，只在当前这一局有效，重新开局会重置。" },
      { q: "手机版怎么射击？", a: "拖动飞船时会自动持续开火。" },
    ],
  }),

  "fruit-catch": rebuilt("fruit-catch", {
    specialMechanics: [
      { en: "Catching eight fruits without breaking the build-up triggers about five seconds of Catch Rush.", zh: "连续积累8次成功接取会触发约5秒 Catch Rush。" },
      { en: "Catch Rush widens the basket and doubles fruit scoring while active.", zh: "Catch Rush 期间篮子会变宽，水果得分翻倍。" },
      { en: "Gold stars are high-value catches; bombs remove two lives and reset combo and Rush progress.", zh: "金色星星属于高价值目标；炸弹会扣2条生命并重置连击和 Rush 进度。" },
      { en: "Missing a normal fruit removes one life and resets combo.", zh: "漏接普通水果会扣1条生命并重置连击。" },
    ],
  }, {
    intro: "Move the basket through a bright orchard, catch fruit, avoid bombs, and build eight catches to trigger a five-second Catch Rush with a wider basket and double scoring.",
    about: ["Fruit Catch is a pointer-and-touch catching game with combo scoring and a temporary Catch Rush state. Rush rewards consistent catching by widening the basket and doubling fruit points for a short window."],
    howToPlay: ["Drag or move the basket under falling fruit.", "Catch normal fruit and gold stars while avoiding bombs.", "Build eight catches to activate Catch Rush.", "Use the wider Rush basket to collect more fruit before the timer ends."],
    rules: ["Normal missed fruit costs one life; bombs caught in the basket cost two lives.", "Gold stars have a higher base value than normal fruit.", "Catch Rush lasts about five seconds and doubles fruit scoring while widening the basket."],
    tips: ["During Rush, prioritize safe clusters instead of crossing the whole screen for one fruit.", "A bomb costs more than a missed fruit, so give bombs extra clearance."],
    faq: [
      { q: "How do you trigger Catch Rush?", a: "Build eight successful catches before the build-up is broken." },
      { q: "What does Catch Rush do?", a: "It widens the basket and doubles fruit scoring for about five seconds." },
      { q: "What happens if you catch a bomb?", a: "You lose two lives and your combo and Rush progress reset." },
    ],
  }, {
    intro: "在明亮果园里移动篮子接水果、躲炸弹，连续积累8次接取即可触发约5秒 Catch Rush：篮子变宽且水果得分翻倍。",
    about: ["Fruit Catch 现在把连击和短时爆发结合起来。稳定接住水果会触发 Catch Rush，在短时间内通过更宽的篮子和双倍得分奖励连续操作。"],
    howToPlay: ["拖动或移动篮子接住下落水果。", "接普通水果和金色星星，同时避开炸弹。", "连续积累8次接取触发 Catch Rush。", "利用 Rush 期间更宽的篮子快速收集更多水果。"],
    rules: ["漏接普通水果扣1条生命；接到炸弹扣2条生命。", "金色星星的基础价值高于普通水果。", "Catch Rush 持续约5秒，期间篮子变宽且水果得分翻倍。"],
    tips: ["Rush 期间优先吃安全的水果群，不要为了单个水果横穿整个屏幕。", "炸弹惩罚比漏一个水果更大，要给炸弹留更大的安全距离。"],
    faq: [
      { q: "Catch Rush 怎么触发？", a: "连续积累8次成功接取即可触发。" },
      { q: "Catch Rush 有什么效果？", a: "约5秒内篮子变宽，水果得分翻倍。" },
      { q: "接到炸弹会怎样？", a: "扣2条生命，并重置连击和 Rush 进度。" },
    ],
  }),

  "tower-defense": rebuilt("tower-defense", {
    specialMechanics: [
      { en: "Four tower types can be placed on grass: Archer, Watch, Mortar and Frost.", zh: "可以在草地区域部署4类防御塔：Archer、Watch、Mortar 和 Frost。" },
      { en: "Selecting a placed tower shows its range and enables direct gold upgrades that increase its level, damage and range.", zh: "选择已部署防御塔会显示射程，并可直接消耗金币升级，提升等级、伤害和射程。" },
      { en: "After each cleared wave, choose one of three permanent run upgrades such as global damage, fire rate, range, reward gold or an immediate war chest.", zh: "每波清空后会从三个本局永久强化中选择一个，例如全局伤害、射速、射程、金币奖励或立即获得战备金币。" },
      { en: "Every fourth wave includes a tougher boss enemy.", zh: "每4波会包含一个更强的 Boss 敌人。" },
    ],
  }, {
    intro: "Place Archer, Watch, Mortar and Frost towers along the road, upgrade important towers directly with gold, and choose one tactical run upgrade after each cleared wave.",
    about: ["Tower Defense is a grid-based defense game with four tower roles and direct per-tower upgrades. Wave rewards add a second progression layer by letting one global tactical perk persist for the rest of the run."],
    howToPlay: ["Choose one of the four tower types and tap an empty grass tile to place it.", "Tap a placed tower to inspect its range and upgrade cost.", "Start the next wave and let towers attack enemies moving along the fixed path.", "After clearing the wave, choose one tactical reward before continuing."],
    rules: ["Towers cannot be placed on the enemy road or on an occupied tile.", "Direct upgrades increase a selected tower's level and combat stats.", "The base starts with 20 HP and the run ends when enemies reduce it to zero."],
    tips: ["Upgrade towers covering multiple path turns before spending gold on weak edge positions.", "Frost plus Mortar is useful because slowing keeps grouped enemies inside splash range longer."],
    faq: [
      { q: "How do tower upgrades work?", a: "Select a placed tower and use the Upgrade button; the gold cost rises with its level." },
      { q: "What happens after a wave?", a: "You receive wave gold and choose one of three run-wide tactical rewards." },
      { q: "How often do bosses appear?", a: "A tougher boss enemy appears every fourth wave." },
    ],
  }, {
    intro: "沿道路部署 Archer、Watch、Mortar 和 Frost，选中关键防御塔直接花金币升级，并在每波清空后从三个战术强化中选择一个。",
    about: ["Tower Defense 现在采用4类防御塔 + 单塔直接升级的结构。每波结束后的三选一强化会在当前整局持续生效，形成第二层成长。"],
    howToPlay: ["选择一种防御塔，然后点击空草地进行部署。", "点击已部署的塔查看射程和升级费用。", "开始下一波，让防御塔自动攻击沿固定道路推进的敌人。", "清空波次后，从三个战术奖励中选择一个再继续。"],
    rules: ["不能把塔建在敌人道路或已有防御塔的位置。", "直接升级会提高所选塔的等级和战斗属性。", "基地初始20 HP，敌人将其降到0时本局结束。"],
    tips: ["优先升级能覆盖多个道路拐点的塔，再考虑边缘低覆盖位置。", "Frost 配合 Mortar 效果较好，减速能让成群敌人在范围伤害区域停留更久。"],
    faq: [
      { q: "防御塔怎么升级？", a: "点击已部署塔后使用 Upgrade，金币费用会随着等级上升。" },
      { q: "每波结束后会发生什么？", a: "获得过波金币，并从三个本局持续生效的战术奖励中选一个。" },
      { q: "Boss 多久出现一次？", a: "每4波会出现一个更强的 Boss 敌人。" },
    ],
  }),

  "idle-miner": rebuilt("idle-miner", {
    specialMechanics: [
      { en: "Manual mining increases an Overdrive meter by one point per click; 20 points trigger about eight seconds of double click and idle production.", zh: "每次主动挖矿会增加1点 Overdrive；累计20点触发约8秒双倍点击与自动产出。" },
      { en: "Six upgrade lines increase either gold per click or passive gold per second, with rising costs and persistent levels.", zh: "6条升级线分别提高单次点击或每秒自动金币，费用逐级增长并持久保存。" },
      { en: "Total mined gold advances the visual mine through Surface, Copper, Silver, Gold, Crystal and Core layers.", zh: "累计挖出的金币会推动矿井依次进入 Surface、Copper、Silver、Gold、Crystal 和 Core 层。" },
      { en: "Gold, total production, click power, idle production and upgrade levels persist in localStorage.", zh: "金币、累计产出、点击产能、自动产能和升级等级都会保存在 localStorage。" },
    ],
  }, {
    intro: "Mine actively to charge Overdrive, trigger about eight seconds of double production, buy click and idle upgrades, and push the mine from the Surface down to the Core layer.",
    about: ["Idle Miner combines manual tapping with persistent idle growth. Active mining is no longer only a flat click action: every 20 manual hits triggers a temporary Overdrive that doubles both click and passive production."],
    howToPlay: ["Tap the central rock to earn gold and charge Overdrive.", "Buy click upgrades when you want stronger active mining, or worker upgrades for more passive gold per second.", "Trigger Overdrive every 20 manual hits and use the eight-second window for doubled production.", "Reach total-production milestones to descend through deeper mine layers."],
    rules: ["Overdrive requires 20 manual mining clicks and lasts about eight seconds.", "Upgrade prices increase as the same upgrade line gains levels.", "Progress and purchased upgrade levels are stored locally in the browser."],
    tips: ["When Overdrive starts, keep tapping because both manual and idle income are doubled at the same time.", "Balance click and idle upgrades instead of over-investing in only one production source."],
    faq: [
      { q: "What does Overdrive do?", a: "It doubles click and passive production for about eight seconds." },
      { q: "How do you trigger Overdrive?", a: "Perform 20 manual mining clicks." },
      { q: "Does Idle Miner save progress?", a: "Yes. Core production values and upgrade levels are stored in localStorage." },
    ],
  }, {
    intro: "主动挖矿积累 Overdrive，触发约8秒双倍产出；购买点击与自动产能升级，并从 Surface 一路推进到 Core 深层。",
    about: ["Idle Miner 现在把主动点击和持续挂机成长结合起来。每20次主动挖矿会触发一次短暂 Overdrive，使点击与每秒自动产出同时翻倍。"],
    howToPlay: ["点击中央矿石获取金币并积累 Overdrive。", "想加强主动玩法就买点击升级，想提高挂机收益就买自动产出升级。", "每20次主动点击触发 Overdrive，并在约8秒内享受双倍产出。", "通过累计总产量解锁更深矿层。"],
    rules: ["Overdrive 需要20次主动挖矿点击，持续约8秒。", "同一升级线等级越高，下一次升级费用越高。", "核心产出数值和升级等级会保存在浏览器 localStorage。"],
    tips: ["Overdrive 开启后继续主动点击，因为点击和自动收益会同时翻倍。", "点击流和挂机流最好同时发展，不要只堆一边。"],
    faq: [
      { q: "Overdrive 有什么作用？", a: "约8秒内让点击产出和每秒自动产出都翻倍。" },
      { q: "怎么触发 Overdrive？", a: "完成20次主动挖矿点击。" },
      { q: "Idle Miner 会保存进度吗？", a: "会，核心产能数值和升级等级保存在 localStorage。" },
    ],
  }),

  "avoid-blocks": rebuilt("avoid-blocks", {
    specialMechanics: [
      { en: "Passing very close to a block without colliding counts as a Near Miss and charges Phase Shift by 25%.", zh: "贴近障碍安全通过会判定为 Near Miss，并为 Phase Shift 充能25%。" },
      { en: "At 100% charge, Phase Shift can be activated for about 1.25 seconds of collision immunity.", zh: "充能达到100%后，可主动开启约1.25秒 Phase Shift 碰撞免疫。" },
      { en: "Near Misses score more than ordinary safe passes and build a visible streak.", zh: "Near Miss 得分高于普通安全通过，并会累积可见连击。" },
      { en: "Falling-block speed and spawn pressure increase as score raises the level.", zh: "随着分数提高等级，下落速度和障碍生成压力都会增加。" },
    ],
  }, {
    intro: "Dodge falling blocks, skim past them for Near Miss bonuses, charge Phase Shift to 100%, and spend the short immunity window when the screen becomes impossible to escape cleanly.",
    about: ["Avoid Blocks is a survival dodging game with a risk-reward meter. Safe close calls charge Phase Shift, so aggressive positioning creates both more score and a defensive resource for later danger."],
    howToPlay: ["Move horizontally with pointer, touch, A/D or the arrow keys.", "Avoid direct collision with falling blocks.", "Pass close to blocks to earn Near Miss bonuses and charge Phase Shift.", "At 100% charge, press Phase or Space to gain about 1.25 seconds of collision immunity."],
    rules: ["A normal safe pass gives 1 point.", "Near Misses give bonus points and add 25% Phase Shift charge.", "A collision ends the run unless Phase Shift is currently active."],
    tips: ["Do not spend Phase Shift immediately at 100%; hold it until overlapping blocks remove your normal escape path.", "Near Misses are easiest beside narrower blocks rather than wide barriers."],
    faq: [
      { q: "How do you charge Phase Shift?", a: "Each Near Miss adds 25%, so four close passes fill the meter." },
      { q: "How long does Phase Shift last?", a: "About 1.25 seconds." },
      { q: "Does Phase Shift activate automatically?", a: "No. The player chooses when to use it after the meter reaches 100%." },
    ],
  }, {
    intro: "躲避下落障碍，贴边通过获得 Near Miss 奖励并为 Phase Shift 充能；达到100%后可主动使用短暂无敌，处理无法正常闪避的危险局面。",
    about: ["Avoid Blocks 现在加入风险回报资源。越贴近障碍安全通过，分数和 Phase Shift 充能越高，因此主动冒险会换来后续的保命能力。"],
    howToPlay: ["使用鼠标、触摸、A/D 或左右方向键横向移动。", "避免和下落方块直接碰撞。", "贴近障碍通过可获得 Near Miss 加分并充能 Phase Shift。", "充能100%后点击 Phase 或按 Space，获得约1.25秒碰撞免疫。"],
    rules: ["普通安全通过获得1分。", "Near Miss 会获得额外分数并增加25% Phase Shift 充能。", "如果没有处于 Phase Shift，发生碰撞会立即结束本局。"],
    tips: ["Phase Shift 满了也不用立刻开，最好留到多个障碍重叠、没有正常路线时。", "窄障碍更适合主动刷 Near Miss，宽障碍风险更高。"],
    faq: [
      { q: "Phase Shift 怎么充能？", a: "每次 Near Miss 增加25%，四次贴边安全通过即可充满。" },
      { q: "Phase Shift 持续多久？", a: "约1.25秒。" },
      { q: "Phase Shift 会自动触发吗？", a: "不会，充满后由玩家自己选择什么时候使用。" },
    ],
  }),

  "memory-sequence": rebuilt("memory-sequence", {
    specialMechanics: [
      { en: "Each successful round adds one new pad to the sequence and gradually increases playback tempo.", zh: "每次成功会在序列末尾增加一个色块，并逐步加快播放节奏。" },
      { en: "Three completed rounds charge Focus and grant one Replay for the current pattern.", zh: "连续完成3轮会充满 Focus，并获得一次当前序列 Replay。" },
      { en: "Replay replays the full current sequence once without advancing the level, then consumes the Focus charge.", zh: "Replay 会完整重播当前序列一次，不增加等级，并消耗已充满的 Focus。" },
      { en: "A wrong input ends the run and resets current sequence progress.", zh: "输入错误会结束本局并重置当前序列进度。" },
    ],
  }, {
    intro: "Watch a four-pad pattern, repeat it in order, survive faster playback at higher levels, and charge Focus every three completed rounds to earn one optional Replay.",
    about: ["Memory Sequence is a Simon-style memory game with a player-controlled Replay resource. Focus gives the player one strategic safety tool for long high-speed patterns without removing the core memory challenge."],
    howToPlay: ["Watch the complete illuminated pad sequence.", "Repeat the pads in exactly the same order.", "Complete three rounds to fill Focus.", "When Focus is ready, use Replay before answering to watch the current sequence one more time."],
    rules: ["Every successful round adds one new step to the pattern.", "Playback tempo rises as the level increases.", "One incorrect pad ends the run; Replay can only be used when Focus is ready."],
    tips: ["Save Replay for long speed rounds instead of using it on a short early pattern.", "Remember the rhythm between colors as well as the colors themselves."],
    faq: [
      { q: "How do you earn Replay?", a: "Complete three rounds to charge Focus." },
      { q: "Does Replay change the sequence?", a: "No. It replays the exact current pattern once." },
      { q: "What happens after a wrong input?", a: "The run ends and the best completed level is stored locally." },
    ],
  }, {
    intro: "观察四个色块的完整序列并按顺序复现；等级越高播放越快，每完成3轮会充满 Focus，获得一次可主动使用的 Replay。",
    about: ["Memory Sequence 是带主动 Replay 资源的 Simon 类记忆游戏。Focus 为长序列和高速阶段提供一次策略性保命机会，同时不改变核心记忆挑战。"],
    howToPlay: ["先看完色块完整亮起顺序。", "按照完全相同的顺序逐个点击色块。", "完成3轮即可充满 Focus。", "Focus 满后，可以在作答前使用 Replay，再看一次当前完整序列。"],
    rules: ["每完成一轮，下一轮序列会增加一步。", "等级越高，序列播放速度越快。", "点错一个色块本局结束；Replay 只能在 Focus 已充满时使用。"],
    tips: ["Replay 最好留给较长的高速轮次，不要在开局短序列上浪费。", "除了记颜色，也可以记住颜色之间的节奏。"],
    faq: [
      { q: "怎么获得 Replay？", a: "完成3轮即可充满 Focus。" },
      { q: "Replay 会改变序列吗？", a: "不会，只会把当前完全相同的序列重播一次。" },
      { q: "点错后会怎样？", a: "当前本局结束，并把最高完成等级保存在本地。" },
    ],
  }),

  "lemonade-stand": rebuilt("lemonade-stand", {
    specialMechanics: [
      { en: "Each day has weather that changes drink demand; price, recipe level, reputation and optional marketing all modify customer traffic.", zh: "每天的天气都会改变需求；售价、配方等级、Reputation 和可选 Marketing 会共同影响客流。" },
      { en: "Marketing costs $5 and increases demand for the current day only.", zh: "Marketing 花费5美元，只提高当天需求。" },
      { en: "Reputation rises on reasonably priced successful days and falls when pricing is too aggressive or no customers buy.", zh: "价格合理且有成交时 Reputation 会提高；售价过高或无人购买会降低 Reputation。" },
      { en: "Opening the stand creates a day-result screen before the player advances to the next weather forecast.", zh: "开店后会先显示当天结算，再由玩家进入下一天和新的天气预报。" },
    ],
  }, {
    intro: "Read the daily weather, buy supplies, set a price, optionally spend $5 on marketing, improve the recipe, and protect reputation while growing the stand's cash record.",
    about: ["Lemonade Stand is a small daily business simulation. Weather changes demand, while the player balances supply cash, price, recipe quality, temporary marketing and a reputation value that carries into future days."],
    howToPlay: ["Check the weather forecast before spending money.", "Buy five cups of supply for $3 when needed and set the selling price between $0.50 and $5.00.", "Optionally spend $5 on marketing for a one-day demand boost or $15 to improve the recipe.", "Open for Business, review customers, revenue and reputation, then advance to the next day."],
    rules: ["Revenue equals customers served multiplied by the selected price per cup.", "Marketing applies only to the current day and costs $5.", "If you have no cups and less than $3, the stand cannot restock and the run ends."],
    tips: ["High-demand weather can support a higher price, while cold or rainy days usually need a cheaper offer.", "Keep at least $3 in reserve when cup inventory is low so you can restock after a weak day."],
    faq: [
      { q: "What does reputation do?", a: "Reputation modifies future demand. Fair successful pricing raises it; aggressive pricing or zero-customer days can lower it." },
      { q: "How long does marketing last?", a: "Marketing boosts demand for the current day only." },
      { q: "How do you lose the run?", a: "If cup inventory reaches zero and cash is below the $3 restock cost, the stand closes." },
    ],
  }, {
    intro: "先看每天的天气，再决定备货、售价、是否花5美元营销以及是否升级配方；同时维护 Reputation，持续刷新现金纪录。",
    about: ["Lemonade Stand 是按天推进的小型经营模拟。天气改变需求，玩家需要平衡备货资金、售价、配方、当天 Marketing 和会影响后续客流的 Reputation。"],
    howToPlay: ["先查看当天的天气预报再决定支出。", "需要时花3美元补充5杯库存，并把单杯售价设置在0.5到5美元之间。", "可以花5美元做当天 Marketing，或花15美元升级配方。", "点击 Open for Business，查看当天顾客、收入和 Reputation，再进入下一天。"],
    rules: ["当天收入 = 实际顾客数 × 单杯售价。", "Marketing 只对当天有效，费用为5美元。", "如果库存为0且现金不足3美元，无法补货，本局结束。"],
    tips: ["高需求天气可以尝试更高价格；寒冷或雨天通常需要更便宜的定价。", "库存较低时最好至少保留3美元，避免差一天之后无法补货。"],
    faq: [
      { q: "Reputation 有什么用？", a: "它会影响后续需求。合理定价且成功成交会提高 Reputation，过高售价或无人购买可能降低它。" },
      { q: "Marketing 持续多久？", a: "只提高当天需求。" },
      { q: "什么情况下本局结束？", a: "库存为0且现金不足3美元补货时，店铺关闭。" },
    ],
  }),
};
