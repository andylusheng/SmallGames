import type { GameSeoProfile } from "@/data/game-profiles";
import { reviewedProfile } from "@/data/game-profiles/factory";

export const IDLE_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "cookie-clicker": reviewedProfile({
    slug: "cookie-clicker",
    primaryKeyword: "cookie clicker game",
    secondaryKeywords: ["cookie clicker online", "idle clicker game", "cookie clicking game", "free clicker game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Click the cookie for manual income, buy seven upgrade types and grow both cookies per click and passive cookies per second.", zh: "点击饼干获得主动收入，购买7类升级，同时提高每次点击和每秒被动产出的饼干数量。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Cookie Clicker Upgrades", zh: "Cookie Clicker 升级" },
      scoringValueLabel: { en: "Base cost / Effect", zh: "基础价格 / 效果" },
      scoring: [
        { id: "auto", label: { en: "Auto Clicker", zh: "Auto Clicker" }, value: { en: "15 / +0.1 per second", zh: "15 / 每秒+0.1" } },
        { id: "grandma", label: { en: "Grandma", zh: "Grandma" }, value: { en: "100 / +1 per second", zh: "100 / 每秒+1" } },
        { id: "farm", label: { en: "Farm", zh: "Farm" }, value: { en: "500 / +5 per second", zh: "500 / 每秒+5" } },
        { id: "factory", label: { en: "Factory", zh: "Factory" }, value: { en: "3,000 / +20 per second", zh: "3000 / 每秒+20" } },
        { id: "rocket", label: { en: "Rocket", zh: "Rocket" }, value: { en: "15,000 / +100 per second", zh: "15000 / 每秒+100" } },
        { id: "time", label: { en: "Time Machine", zh: "Time Machine" }, value: { en: "100,000 / +500 per second", zh: "100000 / 每秒+500" } },
        { id: "click", label: { en: "Click Power ×2", zh: "Click Power ×2" }, value: { en: "200 / doubles click power", zh: "200 / 点击收益翻倍" } },
      ],
      specialMechanics: [
        { en: "Every upgrade price is floor(baseCost × 1.15^owned), so repeated purchases become progressively more expensive.", zh: "每类升级价格都按 floor(baseCost×1.15^owned) 增长，重复购买会逐渐变贵。" },
        { en: "Passive income is credited every 100ms as one tenth of the displayed cookies-per-second rate.", zh: "被动收入每100ms结算一次，每次加入显示CPS的十分之一。" },
        { en: "Click Power ×2 has no passive income; each purchase doubles the current manual click value again.", zh: "Click Power ×2 不产生被动收入；每次购买都会再次把当前手动点击收益翻倍。" },
      ],
      endCondition: { en: "There is no fixed Game Over or final upgrade goal; progression continues while the page stays open.", zh: "没有固定Game Over或最终通关目标，只要页面保持打开就可以持续成长。" },
      progress: { en: "The current implementation does not use localStorage, so cookies and upgrades reset after a reload.", zh: "当前实现没有使用 localStorage，因此刷新后饼干数量和升级都会重置。" },
      gameplayTopics: ["idle", "clicker"],
    },
    content: {
      en: { metaTitle: "Cookie Clicker Game – 7 Upgrades and Passive CPS", metaDescription: "Play Cookie Clicker online with 7 upgrade types. Start at 1 cookie per click, buy passive CPS upgrades and double click power while costs scale by 1.15 per purchase.", h1: "Cookie Clicker – Grow Click Power and Cookies per Second", intro: "Start with one cookie per click, reinvest cookies into six passive producers plus a repeatable ×2 click-power upgrade and watch costs scale with ownership.", about: ["Cookie Clicker combines manual clicking with passive production. Six upgrades add cookies per second, ranging from a 0.1 CPS Auto Clicker to a 500 CPS Time Machine, while a seventh upgrade doubles manual click power.", "Every upgrade uses the same exponential cost rule: floor(baseCost × 1.15^owned). That means the decision gradually shifts from buying cheap early producers to saving for larger output jumps."], howToPlay: ["Tap or click the large cookie to earn the current clickPower amount.", "Buy upgrades when your cookie balance reaches their current cost.", "Use passive producers to raise cookies per second and Click Power ×2 to strengthen manual input.", "Continue reinvesting; this version has no fixed ending."], rules: ["Manual click power starts at 1.", "Passive income is paid every 100ms at CPS / 10.", "Upgrade costs grow by a 1.15 exponent based on how many copies you own.", "Reloading the page resets the current progression."], tips: ["Early Auto Clicker and Grandma purchases create passive income while you continue clicking manually.", "Compare the next cost with the CPS gain instead of buying only the cheapest visible option.", "Repeated Click Power ×2 purchases can make active clicking meaningful again after passive income grows."], faq: [{ q: "How many upgrades are in Cookie Clicker?", a: "There are seven upgrade types: six passive producers and one repeatable Click Power ×2 upgrade." }, { q: "How do upgrade prices increase?", a: "Price is floor(baseCost × 1.15^owned) for each upgrade type." }, { q: "Does Cookie Clicker save progress?", a: "Not in the current implementation. Reloading the page resets cookies and upgrades." }, { q: "Is there a final level?", a: "No. The game has no coded final level or Game Over condition." }] },
      zh: { metaTitle: "Cookie Clicker 饼干点击 – 7类升级与被动CPS", metaDescription: "在线玩Cookie Clicker：从每次点击1个饼干开始，购买7类升级提高被动CPS或让点击收益翻倍；价格按1.15指数增长。", h1: "Cookie Clicker – 提高点击收益和每秒产量", intro: "从每次点击1个饼干开始，把收入投入6种被动生产升级和可重复购买的×2点击强化，并应对不断上涨的升级价格。", about: ["Cookie Clicker 同时包含主动点击和被动生产。6类升级增加每秒饼干，从0.1 CPS的Auto Clicker到500 CPS的Time Machine；第7类升级则直接把手动点击收益翻倍。", "所有升级价格都使用 floor(baseCost×1.15^owned) 的指数增长，因此前期买便宜产能、后期攒大升级之间会不断变化。"], howToPlay: ["点击大饼干，每次获得当前clickPower数量。", "余额达到升级价格后购买生产或点击强化。", "用被动生产提高CPS，用Click Power ×2提升主动点击。", "持续再投资；当前版本没有固定终点。"], rules: ["初始每次点击收益为1。", "被动收入每100ms结算CPS/10。", "每类升级价格按1.15的拥有数量指数增长。", "刷新页面会重置当前进度。"], tips: ["前期Auto Clicker和Grandma可以在继续手动点击时建立基础被动收入。", "不要只买当前最便宜升级，要比较下一次成本和CPS增量。", "被动收入提高后，重复购买Click Power ×2可以重新提升主动点击价值。"], faq: [{ q: "Cookie Clicker 有几类升级？", a: "7类：6种被动生产升级和1种可重复购买的Click Power ×2。" }, { q: "升级价格怎么涨？", a: "每类价格按 floor(baseCost×1.15^owned) 计算。" }, { q: "进度会保存吗？", a: "当前实现不会，刷新后饼干和升级都会重置。" }, { q: "有最终关卡吗？", a: "没有，源码没有固定最终Level或Game Over。" }] },
    },
  }),

  "idle-miner": reviewedProfile({
    slug: "idle-miner",
    primaryKeyword: "idle miner game",
    secondaryKeywords: ["idle mining game online", "mining clicker game", "gold miner idle game", "idle miner browser game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Mine gold manually, buy six click/passive upgrades and grow gold, total mined, per-click power and per-second income.", zh: "手动挖金并购买6种点击/被动升级，提高金币、累计开采、每次点击和每秒收入。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Idle Miner Upgrades", zh: "Idle Miner 升级" },
      scoringValueLabel: { en: "Base cost / Gain", zh: "基础价格 / 增益" },
      scoring: [
        { id: "pickaxe", label: { en: "Better Pickaxe", zh: "Better Pickaxe" }, value: { en: "10 / +1 per click", zh: "10 / 每次点击+1" } },
        { id: "miner", label: { en: "Hire Miner", zh: "Hire Miner" }, value: { en: "50 / +1 per second", zh: "50 / 每秒+1" } },
        { id: "drill", label: { en: "Gold Drill", zh: "Gold Drill" }, value: { en: "200 / +5 per click", zh: "200 / 每次点击+5" } },
        { id: "team", label: { en: "Mining Team", zh: "Mining Team" }, value: { en: "500 / +5 per second", zh: "500 / 每秒+5" } },
        { id: "dynamite", label: { en: "Dynamite", zh: "Dynamite" }, value: { en: "2,000 / +25 per click", zh: "2000 / 每次点击+25" } },
        { id: "excavator", label: { en: "Excavator", zh: "Excavator" }, value: { en: "5,000 / +25 per second", zh: "5000 / 每秒+25" } },
      ],
      specialMechanics: [
        { en: "After each purchase, that upgrade's next cost becomes floor(baseCost × 1.4^count).", zh: "每购买一次后，该升级下一次价格变为 floor(baseCost×1.4^count)。" },
        { en: "Passive income is credited once per second and increases both spendable gold and Total Mined.", zh: "被动收入每秒结算一次，同时增加可花费Gold和Total Mined。" },
        { en: "The game saves gold, total mined, click power, passive income and each upgrade's count/cost every five seconds and after purchases.", zh: "游戏每5秒以及购买升级后保存Gold、Total Mined、点击收益、被动收益和各升级数量/价格。" },
      ],
      endCondition: { en: "There is no Game Over; mining progression continues indefinitely.", zh: "没有Game Over，挖矿成长可以持续进行。" },
      progress: { en: "Full progression is stored in localStorage under idleminer and restored on reload.", zh: "完整进度保存在 localStorage 的 idleminer，并在刷新后恢复。" },
      gameplayTopics: ["idle", "clicker"],
    },
    content: {
      en: { metaTitle: "Idle Miner Game – 6 Mining Upgrades with Saved Progress", metaDescription: "Play Idle Miner online with 6 upgrades for click and passive gold. Costs scale by 1.4 per owned upgrade and full mining progress is saved in localStorage.", h1: "Idle Miner – Upgrade Click Power and Passive Gold", intro: "Mine manually, hire automatic production and reinvest into six upgrades while the game saves gold, total mined and upgrade state locally.", about: ["Idle Miner divides progression between active mining and passive income. Three upgrades improve gold per click and three improve gold per second, with larger tiers giving +5 and +25 jumps.", "Unlike several other clickers on the site, this game persists the complete economic state. It saves the current balance, total mined, production rates and per-upgrade count/cost."], howToPlay: ["Tap or click the mine to earn the current Per Click value.", "Buy click upgrades for stronger manual mining or auto upgrades for Per Second income.", "Let passive income continue while deciding the next purchase.", "Reload later and the locally saved progression will be restored in the same browser."], rules: ["Per Click starts at 1 and Per Second starts at 0.", "Upgrade price scales as floor(baseCost × 1.4^count).", "Passive income is added once per second.", "There is no fixed ending or reset mechanic."], tips: ["Mix click and auto upgrades instead of overcommitting to one income source early.", "Because the price multiplier is 1.4, repeated copies of one tier become expensive quickly; compare neighboring upgrade efficiency.", "Total Mined includes both manual and passive production and is useful as a lifetime progress measure."], faq: [{ q: "Does Idle Miner save progress?", a: "Yes. The game stores gold, total mined, production rates and upgrade state in localStorage." }, { q: "How fast do upgrade prices rise?", a: "Each upgrade uses floor(baseCost × 1.4^count)." }, { q: "How often is passive income added?", a: "Once per second." }, { q: "Is there a Game Over?", a: "No. The current implementation has no failure or final ending." }] },
      zh: { metaTitle: "Idle Miner 放置挖矿 – 6类升级并保存完整进度", metaDescription: "在线玩Idle Miner：6种点击/被动挖矿升级，价格按1.4指数上涨；Gold、Total Mined、产能和升级状态都会本地保存。", h1: "Idle Miner – 提高点击挖矿与被动金币", intro: "手动挖矿、雇佣自动生产，把金币继续投入6类升级；游戏会在本地保存余额、累计开采和升级状态。", about: ["Idle Miner 把成长拆成主动挖矿和被动收入。3种升级强化每次点击，另外3种提高每秒金币，高阶增量达到+5和+25。", "和站内部分不保存的clicker不同，这款会持久化完整经济状态，包括余额、Total Mined、生产率以及每种升级的数量和当前价格。"], howToPlay: ["点击矿石，每次获得当前Per Click数值。", "购买点击升级增强主动收益，或购买自动升级增加Per Second。", "利用持续被动收入规划下一次购买。", "之后刷新或再次打开时，同一浏览器会恢复本地保存进度。"], rules: ["Per Click初始1，Per Second初始0。", "升级价格=floor(baseCost×1.4^count)。", "被动收入每秒结算一次。", "没有固定结束或重置机制。"], tips: ["前期混合点击和自动升级，不要过度只堆一种收入。", "1.4倍价格增长较快，同一层买多后要比较相邻升级的投入产出。", "Total Mined同时包含手动和被动产出，可以作为累计成长指标。"], faq: [{ q: "Idle Miner 会保存进度吗？", a: "会，Gold、Total Mined、产能和升级状态都写入localStorage。" }, { q: "升级价格怎么涨？", a: "每种升级按 floor(baseCost×1.4^count) 计算下一次价格。" }, { q: "被动收入多久结算一次？", a: "每秒一次。" }, { q: "有Game Over吗？", a: "没有，当前实现没有失败或最终结束。" }] },
    },
  }),

  "idle-factory": reviewedProfile({
    slug: "idle-factory",
    primaryKeyword: "idle factory game",
    secondaryKeywords: ["idle factory online", "factory idle game", "factory management clicker", "idle business game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Buy five automatic businesses, grow income per second and use Prestige after reaching $10,000 to reset machines for a permanent multiplier.", zh: "购买5类自动生意提高每秒收入，并在达到$10,000后Prestige，重置机器换取永久倍率。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Idle Factory Machines", zh: "Idle Factory 机器" },
      scoringValueLabel: { en: "Base cost / Income each", zh: "基础价格 / 单个收入" },
      scoring: [
        { id: "lemon", label: { en: "Lemonade Stand", zh: "Lemonade Stand" }, value: { en: "$15 / $1 per second", zh: "$15 / 每秒$1" } },
        { id: "bakery", label: { en: "Bakery", zh: "Bakery" }, value: { en: "$100 / $5 per second", zh: "$100 / 每秒$5" } },
        { id: "car", label: { en: "Car Wash", zh: "Car Wash" }, value: { en: "$500 / $20 per second", zh: "$500 / 每秒$20" } },
        { id: "tech", label: { en: "Tech Startup", zh: "Tech Startup" }, value: { en: "$3,000 / $100 per second", zh: "$3000 / 每秒$100" } },
        { id: "space", label: { en: "Space Tourism", zh: "Space Tourism" }, value: { en: "$20,000 / $500 per second", zh: "$20000 / 每秒$500" } },
      ],
      specialMechanics: [
        { en: "Each machine's next price is floor(baseCost × 1.35^count).", zh: "每种机器下一次价格为 floor(baseCost×1.35^count)。" },
        { en: "Income equals the sum of machine count × base income × the global Prestige multiplier.", zh: "每秒收入=所有机器数量×基础收入×全局Prestige倍率的总和。" },
        { en: "Prestige unlocks at $10,000 cash, increases the multiplier to 1 + 0.5 × total prestiges, resets cash to zero and resets all machine counts/costs.", zh: "现金达到$10,000可Prestige；倍率变为1+0.5×累计Prestige次数，同时现金清零、所有机器数量和价格重置。" },
      ],
      endCondition: { en: "There is no Game Over. Prestige is an optional reset loop rather than an ending.", zh: "没有Game Over；Prestige是可选重置循环，不是通关终点。" },
      progress: { en: "Cash, multiplier, prestige count and machine counts/costs are saved in localStorage under idlefactory.", zh: "Cash、倍率、Prestige次数和机器数量/价格保存在 localStorage 的 idlefactory。" },
      gameplayTopics: ["idle", "management"],
    },
    content: {
      en: { metaTitle: "Idle Factory Game – 5 Businesses and $10K Prestige", metaDescription: "Play Idle Factory online with 5 automatic businesses. Machine costs scale by 1.35, income uses a global multiplier and $10K unlocks a Prestige reset with +0.5 multiplier.", h1: "Idle Factory – Build Income and Prestige at $10,000", intro: "Buy five automatic businesses, compound income per second and decide when to reset at $10K for a stronger permanent Prestige multiplier.", about: ["Idle Factory has no manual production button: progression comes from purchasing businesses that generate cash automatically. The five tiers range from a $15 Lemonade Stand to $20,000 Space Tourism.", "Prestige creates the long-term loop. At $10,000 cash you can reset cash and machine ownership while increasing the global multiplier by 0.5 for every Prestige earned."], howToPlay: ["Wait for enough cash to buy an available business.", "Purchase more copies to increase total automatic Income/s.", "Balance expensive high-output businesses against rising repeat-purchase costs.", "When cash reaches $10,000, choose whether to Prestige for a larger global multiplier and restart machine ownership."], rules: ["Machine prices scale as floor(baseCost × 1.35^count).", "All machine income is multiplied by the current Prestige multiplier.", "Prestige requires at least $10,000 cash.", "Prestige resets cash and machines but keeps/increases the multiplier and prestige count."], tips: ["Use the Income/s display to judge how long the next purchase will take rather than looking only at current cash.", "A Prestige sacrifices current machine investment, so trigger it when the stronger multiplier will meaningfully shorten the rebuild.", "Higher tiers have large base income, but their high starting costs may make additional lower-tier copies more efficient temporarily."], faq: [{ q: "What does Prestige do in Idle Factory?", a: "At $10,000 cash, Prestige increases total prestige count, sets multiplier to 1 + 0.5 × prestiges, resets cash to zero and resets all machines." }, { q: "How do machine prices scale?", a: "Each machine uses floor(baseCost × 1.35^count)." }, { q: "Does Idle Factory save progress?", a: "Yes. Cash, multiplier, prestige count and machine state are stored in localStorage." }, { q: "Is there a Game Over?", a: "No. Prestige is a voluntary reset loop rather than a failure state." }] },
      zh: { metaTitle: "Idle Factory 放置工厂 – 5类生意与$10K Prestige", metaDescription: "在线玩Idle Factory：5类自动生意，价格按1.35指数上涨；总收入受全局倍率影响，现金$10K可Prestige并让倍率每次+0.5。", h1: "Idle Factory – 自动赚钱并在$10,000 Prestige", intro: "购买5类自动生意持续提高Income/s，并决定何时在$10K重置机器，换取更强的永久Prestige倍率。", about: ["Idle Factory 没有手动生产按钮，成长完全来自购买会自动产生现金的生意。5个层级从$15的Lemonade Stand到$20,000的Space Tourism。", "Prestige构成长周期循环。现金达到$10,000后，可以清空现金和机器所有权，同时让全局倍率按累计Prestige次数每次增加0.5。"], howToPlay: ["等待现金达到某个可购买生意的价格。", "继续购买更多机器，提高总Income/s。", "在高阶高产机器和不断上涨的重复购买价格之间比较。", "现金达到$10,000后决定是否Prestige，用更高全局倍率重新建设。"], rules: ["机器价格按 floor(baseCost×1.35^count) 上涨。", "所有机器收入都乘以当前Prestige倍率。", "Prestige需要至少$10,000现金。", "Prestige清空现金和机器，但保留并提高Prestige次数/倍率。"], tips: ["结合Income/s判断攒到下一次购买需要多久，而不是只看当前现金。", "Prestige会牺牲现有机器投入，应该在倍率提升足以明显缩短重建时使用。", "高阶机器基础收益大，但价格也高，某些阶段继续买低阶副本可能更快。"], faq: [{ q: "Prestige 有什么作用？", a: "现金达到$10,000后可Prestige：累计次数+1，倍率变为1+0.5×次数，现金和机器全部重置。" }, { q: "机器价格怎么涨？", a: "每种机器按 floor(baseCost×1.35^count) 计算。" }, { q: "会保存进度吗？", a: "会，Cash、倍率、Prestige次数和机器状态都保存在localStorage。" }, { q: "有Game Over吗？", a: "没有，Prestige是主动重置而不是失败状态。" }] },
    },
  }),

  "lemonade-stand": reviewedProfile({
    slug: "lemonade-stand",
    primaryKeyword: "lemonade stand game",
    secondaryKeywords: ["lemonade stand online", "lemonade business game", "pricing game online", "lemonade shop simulator"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Manage money, cups, price, recipe level and changing weather to keep a lemonade business growing across days.", zh: "管理资金、杯数、售价、配方等级和变化天气，让柠檬水生意跨天持续增长。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Lemonade Stand Decisions", zh: "Lemonade Stand 经营规则" },
      scoringValueLabel: { en: "Cost / Range", zh: "成本 / 范围" },
      scoring: [
        { id: "lemons", label: { en: "Buy 5 cups", zh: "购买5杯原料" }, value: { en: "$3", zh: "$3" } },
        { id: "price", label: { en: "Price", zh: "售价" }, value: { en: "$0.5–$5.0 in $0.5 steps", zh: "$0.5–$5.0，每次±$0.5" } },
        { id: "recipe", label: { en: "Recipe upgrade", zh: "配方升级" }, value: { en: "$15", zh: "$15" }, note: { en: "Each level increases recipe demand effect by 0.3.", zh: "每级让配方需求系数增加0.3。" } },
      ],
      specialMechanics: [
        { en: "Weather multipliers are Sunny 1.5, Cloudy 1.0, Rainy 0.5, Hot 2.0 and Cold 0.3.", zh: "天气倍率分别为Sunny 1.5、Cloudy 1.0、Rainy 0.5、Hot 2.0、Cold 0.3。" },
        { en: "Daily base customers are a random integer from 5 to 12 before weather, price and recipe effects.", zh: "每天基础顾客随机为5到12人，然后再乘天气、价格和配方影响。" },
        { en: "Demand uses max(0.2, 2 − 0.4 × price) × (1 + 0.3 × recipe level), with customers capped by available cups.", zh: "需求系数使用 max(0.2, 2−0.4×price)×(1+0.3×recipe level)，实际顾客数不会超过现有杯数。" },
      ],
      endCondition: { en: "If cups reach zero and money is below the $3 supply cost, the game displays Bankrupt and instructs you to refresh to restart.", zh: "当杯数为0且资金低于$3补货成本时显示Bankrupt，并要求刷新页面重新开始。" },
      progress: { en: "Best is the highest floored money balance reached and is saved in localStorage under lemonade-best; the active business state is not otherwise persisted.", zh: "Best记录达到过的最高整数资金并保存到 localStorage 的 lemonade-best；其他当前经营状态不会持久化。" },
      gameplayTopics: ["idle", "management"],
    },
    content: {
      en: { metaTitle: "Lemonade Stand Game – Price, Weather and Recipe Strategy", metaDescription: "Play Lemonade Stand online with $20, 10 cups and changing weather. Buy 5 cups for $3, set prices from $0.5–$5 and upgrade recipes for $15 to influence daily demand.", h1: "Lemonade Stand – Manage Price, Weather and Daily Demand", intro: "Start with $20 and ten cups, set a price, improve the recipe and adapt to five weather multipliers that directly change daily customer demand.", about: ["Lemonade Stand is a day-by-day pricing and inventory game rather than an automatic clicker. Each Open for Business action simulates one day using available cups, current price, recipe level and a random weather multiplier.", "Pricing has a direct demand tradeoff. Raising price earns more per customer but reduces priceEffect, while upgrading the recipe increases recipeEffect for every future day."], howToPlay: ["Buy five additional cups for $3 when you need inventory.", "Raise or lower the selling price in $0.50 steps between $0.50 and $5.00.", "Spend $15 to raise the recipe level and improve demand.", "Open for Business to simulate the day, collect revenue and receive the next random weather condition."], rules: ["You start with $20, 10 cups, $1.00 price and Recipe Lv1.", "Weather multiplier ranges from Cold 0.3 to Hot 2.0.", "Customers cannot exceed available cups.", "If you have no cups and less than $3, the game declares bankruptcy."], tips: ["Raise price more aggressively on Hot or Sunny days because weather already boosts customer demand.", "Keep enough cash to buy another five cups unless you are deliberately investing in the $15 recipe upgrade.", "A higher recipe level improves every future demand calculation, so it has longer-term value than a one-day price change."], faq: [{ q: "How does weather affect Lemonade Stand?", a: "Weather multiplier is Hot 2.0, Sunny 1.5, Cloudy 1.0, Rainy 0.5 or Cold 0.3 and is multiplied into customer demand." }, { q: "What price can I set?", a: "Price is adjustable from $0.50 to $5.00 in $0.50 steps." }, { q: "What does a recipe upgrade cost?", a: "Each recipe upgrade costs $15 and increases the recipe demand factor by 0.3." }, { q: "What causes bankruptcy?", a: "If cups are zero and money is below the $3 cost to buy five more cups, the game shows a bankruptcy message." }] },
      zh: { metaTitle: "Lemonade Stand 柠檬水经营 – 定价、天气与配方策略", metaDescription: "在线玩Lemonade Stand：开局$20和10杯原料，$3补5杯，售价可在$0.5–$5调整，$15升级配方，并根据5种天气管理每天需求。", h1: "Lemonade Stand – 管理售价、天气和每日需求", intro: "从$20和10杯原料开始，调整价格、升级配方，并根据5种天气倍率决定每天如何经营。", about: ["Lemonade Stand 是按天推进的定价和库存经营，不是自动clicker。每次Open for Business会根据现有杯数、售价、配方等级和随机天气模拟一天。", "定价存在直接需求取舍：涨价提高单个顾客收入，但降低priceEffect；升级配方则会长期提高所有后续天数的recipeEffect。"], howToPlay: ["原料不足时花$3购买5杯。", "以$0.50步长把售价调整在$0.50到$5.00之间。", "花$15提高Recipe Level，增强未来需求。", "点击Open for Business模拟一天，获得收入并进入下一种随机天气。"], rules: ["开局$20、10杯、售价$1.00、Recipe Lv1。", "天气倍率从Cold 0.3到Hot 2.0。", "实际顾客数不会超过现有杯数。", "杯数为0且资金低于$3时进入Bankrupt。"], tips: ["Hot或Sunny天气已经提高需求，可以更积极提高售价。", "除非准备投资$15配方，否则尽量保留至少$3补货资金。", "配方等级会提高之后每一天的需求系数，长期价值高于单日价格微调。"], faq: [{ q: "天气怎么影响生意？", a: "Hot 2.0、Sunny 1.5、Cloudy 1.0、Rainy 0.5、Cold 0.3，会直接乘入顾客需求。" }, { q: "售价范围是多少？", a: "$0.50到$5.00，每次调整$0.50。" }, { q: "升级配方多少钱？", a: "每次$15，并让配方需求系数增加0.3。" }, { q: "什么时候破产？", a: "杯数为0且资金低于$3，无法再购买5杯原料时显示Bankrupt。" }] },
    },
  }),
};
