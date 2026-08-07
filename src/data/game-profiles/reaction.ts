import type { GameSeoProfile } from "@/data/game-profiles";
import { reviewedProfile } from "@/data/game-profiles/factory";

export const REACTION_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "reaction-test": reviewedProfile({
    slug: "reaction-test",
    primaryKeyword: "reaction speed test",
    secondaryKeywords: ["reaction time test", "reaction test online", "click reaction test", "reaction time game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Wait for the test zone to turn green, then tap as quickly as possible without clicking early.", zh: "等待测试区域变成绿色后尽快点击，同时避免提前点击。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Reaction Time Ratings", zh: "反应时间分级" },
      scoringValueLabel: { en: "Result", zh: "结果" },
      scoring: [
        { id: "lightning", label: { en: "Under 200ms", zh: "低于200ms" }, value: { en: "Lightning fast", zh: "Lightning fast" } },
        { id: "very-fast", label: { en: "200–299ms", zh: "200–299ms" }, value: { en: "Very fast", zh: "Very fast" } },
        { id: "average", label: { en: "300–399ms", zh: "300–399ms" }, value: { en: "Average", zh: "Average" } },
        { id: "practice", label: { en: "400ms or more", zh: "400ms及以上" }, value: { en: "Keep practicing", zh: "Keep practicing" }, note: { en: "These labels are the thresholds defined by this game, not a medical or population benchmark.", zh: "这些分级只是本游戏内部定义，不代表医学或人群统计标准。" } },
      ],
      specialMechanics: [
        { en: "After you start an attempt, the green signal appears after a random delay between 1 and 5 seconds.", zh: "开始一次测试后，绿色信号会在1到5秒的随机等待后出现。" },
        { en: "Clicking during the red waiting state cancels the timer and produces a Too early result instead of a reaction time.", zh: "红色等待阶段提前点击会取消计时，并显示 Too early，而不是生成反应时间。" },
        { en: "The page tracks Last, Best, Average, Attempts and the five most recent reaction times for the active session.", zh: "当前页面会话会统计Last、Best、Average、Attempts以及最近5次反应时间。" },
      ],
      endCondition: { en: "Each attempt ends on a valid green-signal tap or an early tap. You can immediately start another attempt.", zh: "每次测试在绿色信号后有效点击或提前点击时结束，可以立即再次尝试。" },
      progress: { en: "Reaction results are stored only in page memory; refreshing the page clears the history, average and best.", zh: "反应结果只保存在当前页面内存；刷新后历史、平均值和Best都会清空。" },
      gameplayTopics: ["reaction", "test"],
    },
    content: {
      en: {
        metaTitle: "Reaction Speed Test – Measure Your Click Time in Milliseconds",
        metaDescription: "Take a reaction speed test online. Wait 1–5 seconds for green, tap immediately, and compare Last, Best, Average and recent millisecond results.",
        h1: "Reaction Speed Test – Tap When the Screen Turns Green",
        intro: "Start the test, wait through a random 1–5 second red delay and tap the green signal as quickly as you can without jumping early.",
        about: ["Reaction Speed Test measures the time between the green signal appearing and your next tap using performance.now(). Each successful attempt is rounded to milliseconds.", "The page also calculates your best and average result for the current session. Its Lightning fast, Very fast and Average labels are game-defined thresholds, not medical benchmarks."],
        howToPlay: ["Tap the test zone to begin an attempt.", "Wait while the zone stays red; the delay is randomly chosen from 1 to 5 seconds.", "As soon as the zone turns green and says TAP NOW, tap once.", "Repeat to build Best, Average and recent-result history."],
        rules: ["Tapping before green produces Too early and no reaction-time result.", "Valid reaction time starts at the moment green appears and ends on your next tap.", "Best is the lowest valid millisecond result in the current session.", "Only the latest five attempts are displayed in the Recent line."],
        tips: ["Keep your finger or pointer already positioned inside the test zone before the signal changes.", "Do not guess the delay: it is randomized from 1–5 seconds specifically to punish anticipation.", "Compare several attempts instead of treating one unusually fast or slow result as the whole test."],
        faq: [
          { q: "How does this reaction speed test work?", a: "The green signal appears after a random 1–5 second delay. The game measures the milliseconds between the green state and your tap." },
          { q: "What happens if I tap too early?", a: "The attempt is cancelled and the zone shows Too early. No reaction time is added to your results." },
          { q: "What do the reaction ratings mean?", a: "This game labels under 200ms Lightning fast, 200–299ms Very fast, 300–399ms Average and 400ms+ Keep practicing. They are product-defined labels, not medical benchmarks." },
          { q: "Are reaction results saved after refresh?", a: "No. Results, Best, Average and history are held only for the active page session." },
        ],
      },
      zh: {
        metaTitle: "Reaction Speed Test 反应速度测试 – 毫秒级点击计时",
        metaDescription: "在线测试反应速度：等待1–5秒随机延迟后出现绿色信号，立即点击，并比较Last、Best、Average和最近毫秒成绩。",
        h1: "Reaction Speed Test – 屏幕变绿后立即点击",
        intro: "开始测试后等待1–5秒随机红色延迟，一看到绿色 TAP NOW 就立即点击，同时不要抢跑。",
        about: ["Reaction Speed Test 使用 performance.now() 测量绿色信号出现到下一次点击之间的时间，并四舍五入为毫秒。", "页面会计算当前会话的Best和Average。Lightning fast、Very fast、Average 等标签只是游戏内部阈值，并不是医学或人群统计标准。"],
        howToPlay: ["点击测试区域开始一次尝试。", "红色阶段等待，不要提前点；延迟随机为1–5秒。", "区域变绿并出现 TAP NOW 时立即点击。", "重复测试，积累Best、Average和Recent成绩。"],
        rules: ["绿色出现前点击会显示 Too early，不会记录反应时间。", "有效计时从绿色出现瞬间开始，到下一次点击结束。", "Best 是当前页面会话中最低的有效毫秒成绩。", "Recent 只展示最近5次有效成绩。"],
        tips: ["测试开始后把手指或鼠标保持在测试区域内，减少额外移动。", "不要猜信号出现时间；1–5秒随机延迟就是为了避免纯预判。", "多做几次再看平均值，不要把单次异常快或异常慢当成完整水平。"],
        faq: [
          { q: "这个反应速度测试怎么计时？", a: "绿色信号会在1–5秒随机等待后出现，游戏记录从变绿到你点击之间的毫秒数。" },
          { q: "提前点击会怎样？", a: "本次尝试会显示 Too early，并且不会把结果加入反应时间记录。" },
          { q: "反应时间分级是什么意思？", a: "本游戏把低于200ms标为Lightning fast、200–299ms为Very fast、300–399ms为Average、400ms以上为Keep practicing。这只是产品内部分级，不是医学标准。" },
          { q: "刷新后成绩还在吗？", a: "不在。Best、Average和历史都只保存在当前页面会话内存。" },
        ],
      },
    },
  }),

  "whack-a-mole": reviewedProfile({
    slug: "whack-a-mole",
    primaryKeyword: "whack a mole game",
    secondaryKeywords: ["whack a mole online", "mole clicking game", "30 second reaction game", "free whack a mole"],
    containsViolence: true,
    mechanics: {
      objective: { en: "Hit the active mole in a 3×3 grid as many times as possible during a 30-second round.", zh: "在30秒内不断点击3×3网格中当前出现的地鼠，尽可能获得更高分。" },
      durationSeconds: 30,
      controls: ["mouse", "touch"],
      scoring: [{ id: "mole", label: { en: "Correct mole hit", zh: "正确命中地鼠" }, points: 1 }],
      specialMechanics: [
        { en: "Only one of nine holes is active at a time.", zh: "9个洞中同一时间只有1个是有效目标。" },
        { en: "The mole starts with a 900ms visible window and that window shrinks by 10ms per point, with a minimum of 400ms.", zh: "地鼠初始显示窗口为900ms，每得1分缩短10ms，最低400ms。" },
        { en: "After a successful hit, the next mole appears after 300ms; an unhit mole is followed by a 200ms gap.", zh: "成功命中后约300ms出现下一只；未命中自动消失后约200ms再出现下一只。" },
      ],
      endCondition: { en: "The round ends when the 30-second timer reaches zero.", zh: "30秒倒计时归零时本局结束。" },
      progress: { en: "Final score is shown on the replay button but no best score is persisted.", zh: "最终分数会显示在重玩按钮上，但不会持久化最高分。" },
      gameplayTopics: ["reaction", "tap"],
    },
    content: {
      en: { metaTitle: "Whack-a-Mole Game – 30-Second Reaction Challenge", metaDescription: "Play Whack-a-Mole online on a 3×3 board. Score 1 per mole for 30 seconds while the target window shrinks from 900ms toward 400ms.", h1: "Whack-a-Mole – Hit Moving Targets for 30 Seconds", intro: "Find the one active mole among nine holes and hit it before it disappears; every point makes future moles stay visible for less time.", about: ["Whack-a-Mole is a fixed 30-second target-switching game. Only one hole is active at once, so every point requires locating a new random position.", "Difficulty scales directly from score: the mole display window is max(400ms, 900ms − 10ms × score)."], howToPlay: ["Press Start Game.", "Tap the hole showing the mole; other holes do nothing.", "Keep reacquiring the next random hole until the 30-second timer ends."], rules: ["Every correct hit adds 1 point.", "Only the active hole can score.", "The visible window cannot become shorter than 400ms.", "The round always lasts 30 seconds."], tips: ["Keep your gaze near the center of the 3×3 grid instead of staring at the last hole.", "As score rises, shorten your movement and avoid waiting to confirm the mole visually for too long.", "Wrong holes do not subtract score, but they waste the shrinking target window."], faq: [{ q: "How long is Whack-a-Mole?", a: "Every round lasts 30 seconds." }, { q: "How does Whack-a-Mole get faster?", a: "The mole stays visible for max(400ms, 900ms − 10ms × score), so higher scores shorten the reaction window." }, { q: "How many holes are there?", a: "The board has nine holes in a 3×3 grid, with one active mole at a time." }] },
      zh: { metaTitle: "Whack-a-Mole 打地鼠游戏 – 30秒反应挑战", metaDescription: "在线玩3×3打地鼠：30秒内每命中1只得1分，地鼠显示时间从900ms逐步缩短，最低400ms。", h1: "Whack-a-Mole – 30秒快速打地鼠", intro: "在9个洞中快速找到唯一出现的地鼠并点击；分数越高，后续目标停留时间越短。", about: ["Whack-a-Mole 每局固定30秒，同一时间只有1个洞会出现目标，因此每得1分都要重新寻找随机位置。", "难度直接随得分增长：地鼠显示时间为 max(400ms, 900ms−10ms×score)。"], howToPlay: ["点击 Start Game 开始。", "只点击当前出现地鼠的洞；其他洞不会得分。", "持续寻找下一个随机洞，直到30秒结束。"], rules: ["每次正确命中+1分。", "同一时间只有1个有效目标。", "地鼠显示窗口最低不会短于400ms。", "每局固定30秒。"], tips: ["视线保持在3×3网格中央附近，不要一直盯着上一个洞。", "分数升高后目标窗口更短，应减少手指移动距离。", "点错不会扣分，但会浪费越来越短的反应时间。"], faq: [{ q: "打地鼠一局多长？", a: "每局固定30秒。" }, { q: "游戏怎么变快？", a: "地鼠显示时间按 max(400ms, 900ms−10ms×score) 计算，分数越高停留越短。" }, { q: "有多少个洞？", a: "3×3共9个洞，同一时间只有1只地鼠出现。" }] },
    },
  }),

  "fruit-catch": reviewedProfile({
    slug: "fruit-catch",
    primaryKeyword: "fruit catch game",
    secondaryKeywords: ["catch fruit game", "fruit catching game online", "basket fruit game", "reaction catch game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Move a basket under falling fruit, catch as many as possible and avoid bombs while protecting five lives.", zh: "移动篮子接住不断下落的水果，尽量多得分，同时避开炸弹并保护5条生命。" },
      controls: ["mouse", "touch"],
      scoring: [{ id: "fruit", label: { en: "Caught fruit", zh: "接住水果" }, points: 1 }, { id: "bomb", label: { en: "Caught bomb", zh: "接到炸弹" }, value: { en: "−2 lives", zh: "−2生命" } }, { id: "miss", label: { en: "Missed fruit", zh: "漏掉水果" }, value: { en: "−1 life", zh: "−1生命" } }],
      specialMechanics: [
        { en: "Each spawned item has a 15% chance to be a bomb.", zh: "每个生成物有15%概率是炸弹。" },
        { en: "Spawn interval decreases toward a 20-frame minimum as score rises: max(20, 50 − score).", zh: "分数越高生成间隔越短，最低20帧：max(20, 50−score)。" },
        { en: "Base fall speed also increases by 0.03 per point, plus up to 1.5 random extra speed per item.", zh: "基础下落速度每分增加0.03，每个物体还会随机增加最多1.5速度。" },
      ],
      endCondition: { en: "The run ends when lives reach zero, either from missed fruit or caught bombs.", zh: "漏水果或接到炸弹导致生命降到0时结束。" },
      progress: { en: "Best updates during the current page session but is not stored in localStorage.", zh: "Best 会在当前页面会话中更新，但不会写入 localStorage。" },
      gameplayTopics: ["reaction", "catch"],
    },
    content: {
      en: { metaTitle: "Fruit Catch Game – Catch Fruit, Avoid 15% Bombs", metaDescription: "Play Fruit Catch online with 5 lives. Catch fruit for 1 point, avoid 15% bomb spawns that cost 2 lives, and survive faster falling items.", h1: "Fruit Catch – Catch Fruit and Avoid Bombs", intro: "Slide the basket under falling fruit, protect five lives and react faster as both spawn rate and falling speed increase with score.", about: ["Fruit Catch mixes target tracking with risk avoidance. Most falling items are fruit worth 1 point, but each spawn has a 15% chance to be a bomb.", "Difficulty scales in two ways at once: items spawn more often and their base fall speed rises as your score grows."], howToPlay: ["Move the basket horizontally with the mouse or touch drag.", "Catch fruit to add 1 point.", "Move away from bombs; catching one costs 2 lives.", "Do not let normal fruit fall past the basket because each miss costs 1 life."], rules: ["You start with 5 lives.", "Fruit is +1 point, a caught bomb is −2 lives, and a missed fruit is −1 life.", "Bombs appear on 15% of item spawns.", "The run ends at 0 lives."], tips: ["Do not chase every object blindly; first identify whether the falling item is fruit or a bomb.", "Keep the basket near the center when the screen is clear so you can reach either side faster.", "At higher scores the shorter spawn interval makes positioning more important than late reactive sweeps."], faq: [{ q: "How many lives do you get in Fruit Catch?", a: "You start with 5 lives." }, { q: "What happens if I catch a bomb?", a: "A bomb removes 2 lives. Each spawned item has a 15% chance to be a bomb." }, { q: "What happens if I miss fruit?", a: "A normal fruit that falls off the bottom removes 1 life." }] },
      zh: { metaTitle: "Fruit Catch 接水果游戏 – 接水果避开15%炸弹", metaDescription: "在线玩 Fruit Catch：开局5条生命，水果+1分；15%概率出现炸弹，接到会扣2命。分数越高，下落和生成越快。", h1: "Fruit Catch – 接水果并避开炸弹", intro: "左右移动篮子接水果、保护5条生命，并随着得分提高适应更快的生成频率和下落速度。", about: ["Fruit Catch 把目标追踪和风险判断放在一起。大多数物体是+1分水果，但每次生成都有15%概率变成炸弹。", "难度会同时从两个方向上升：分数越高，物体生成越频繁，基础下落速度也越快。"], howToPlay: ["用鼠标或手指拖动篮子左右移动。", "接住普通水果获得1分。", "看到炸弹就避开；接到炸弹扣2条生命。", "不要漏掉普通水果，每漏1个扣1条生命。"], rules: ["开局5条生命。", "水果+1分，炸弹−2命，漏水果−1命。", "每次生成有15%概率是炸弹。", "生命归零时结束。"], tips: ["不要看到下落物就盲目追，先判断是水果还是炸弹。", "屏幕空闲时让篮子靠近中间，更容易兼顾左右两侧。", "高分后生成间隔缩短，提前站位比最后一刻大幅横移更重要。"], faq: [{ q: "Fruit Catch 有几条生命？", a: "开局5条生命。" }, { q: "接到炸弹会怎样？", a: "会扣2条生命；每次生成有15%概率是炸弹。" }, { q: "漏掉水果会怎样？", a: "普通水果掉出底部会扣1条生命。" }] },
    },
  }),

  "avoid-blocks": reviewedProfile({
    slug: "avoid-blocks",
    primaryKeyword: "avoid blocks game",
    secondaryKeywords: ["dodge blocks game", "falling blocks dodge game", "avoid falling blocks online", "reaction dodge game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Move the player horizontally to avoid falling blocks and earn one point each time a block safely passes off the bottom.", zh: "左右移动角色躲避下落方块；每个方块安全落出底部时获得1分。" },
      controls: ["mouse", "touch", "keyboard"],
      scoring: [{ id: "pass", label: { en: "Block safely passes", zh: "成功躲过1个方块" }, points: 1 }],
      specialMechanics: [
        { en: "Falling speed starts at 2 + 0.03 × score, with up to 2 extra random speed per block.", zh: "基础下落速度为2+0.03×score，每个方块再随机增加最多2速度。" },
        { en: "Spawn cadence tightens with score using max(15, 40 − floor(score / 5)) frames.", zh: "生成间隔按 max(15, 40−floor(score/5)) 缩短。" },
        { en: "Block size is randomized between 20 and 50 pixels.", zh: "方块尺寸随机在20到50像素之间。" },
      ],
      endCondition: { en: "Any collision between the player square and a falling block ends the run immediately.", zh: "角色方块与任意下落方块碰撞时立即结束。" },
      progress: { en: "Best score is saved in localStorage under ab-best.", zh: "最高分保存在 localStorage 的 ab-best。" },
      gameplayTopics: ["reaction", "dodge"],
    },
    content: {
      en: { metaTitle: "Avoid Blocks Game – Dodge Faster Falling Blocks", metaDescription: "Play Avoid Blocks online. Move left or right, score when blocks pass safely, and survive a spawn interval that tightens toward 15 frames as score rises.", h1: "Avoid Blocks – Dodge Falling Blocks for a Higher Score", intro: "Move a small square left and right, let falling blocks pass safely and survive as block speed and spawn frequency scale with score.", about: ["Avoid Blocks scores survival by successful passes rather than elapsed seconds. Every falling block that exits the bottom without touching you adds 1 point.", "The pressure increases continuously: blocks fall faster and spawn more frequently as score rises, while their sizes vary randomly."], howToPlay: ["Tap to start the run.", "Move with pointer/touch position or the left and right arrow keys.", "Stay clear of every falling block and let it pass below you to score.", "After a collision, tap again to reset and start a new run."], rules: ["Every safely passed block is +1 point.", "Any collision ends the run instantly.", "Spawn interval shrinks toward a 15-frame minimum.", "Best score is saved in the current browser."], tips: ["Make small horizontal corrections instead of crossing the whole screen unless a large block forces it.", "Watch the gaps between blocks rather than tracking only the nearest block.", "Higher scores increase both speed and density, so leave yourself an escape lane before the next spawn arrives."], faq: [{ q: "How do you score in Avoid Blocks?", a: "You gain 1 point whenever a falling block moves past the bottom without hitting the player." }, { q: "How does Avoid Blocks get harder?", a: "Falling speed rises with score and the spawn interval shrinks toward a minimum of 15 frames." }, { q: "Is the best score saved?", a: "Yes. The best score is stored in localStorage in the current browser." }] },
      zh: { metaTitle: "Avoid Blocks 躲方块游戏 – 闪避越来越快的下落障碍", metaDescription: "在线玩 Avoid Blocks：左右移动躲避方块，每成功躲过1个+1分；分数越高，下落速度越快，生成间隔最低缩到15帧。", h1: "Avoid Blocks – 躲避下落方块挑战高分", intro: "左右移动小方块，让障碍从身边安全落下；随着得分提高，方块速度和密度都会持续增加。", about: ["Avoid Blocks 不是按存活秒数计分，而是按成功躲过的方块数量计分。每个障碍安全落出底部就增加1分。", "难度会连续上升：分数越高，方块下落越快、生成越密，同时障碍尺寸也随机变化。"], howToPlay: ["点击开始本局。", "用触屏/鼠标位置或键盘左右方向键移动。", "避开全部下落方块，让它们安全穿过底部即可得分。", "碰撞后再次点击即可重开。"], rules: ["每成功躲过1个方块+1分。", "任何碰撞都会立即结束。", "生成间隔最低缩到15帧。", "最高分会保存在当前浏览器。"], tips: ["尽量做小幅横向修正，除非大方块迫使你跨越较远距离。", "观察障碍之间形成的安全通道，而不是只盯最近一个方块。", "高分后速度和密度同时提高，要在下一批障碍出现前预留逃生方向。"], faq: [{ q: "Avoid Blocks 怎么得分？", a: "每当一个下落方块没有碰到玩家并安全落出底部，就获得1分。" }, { q: "游戏怎么变难？", a: "分数越高，下落速度越快，生成间隔也会逐渐缩短到最低15帧。" }, { q: "最高分会保存吗？", a: "会，最高分写入当前浏览器 localStorage。" }] },
    },
  }),

  "tile-hop": reviewedProfile({
    slug: "tile-hop",
    primaryKeyword: "tile hop game",
    secondaryKeywords: ["tile hopping game", "tap left right game", "endless tile game", "reaction tile game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Shift among three columns so the ball stays aligned with the scrolling tiles instead of falling off the bottom.", zh: "在3列之间左右切换，让小球持续对准滚动平台，避免掉出屏幕底部。" },
      controls: ["mouse", "touch", "keyboard"],
      scoring: [{ id: "distance", label: { en: "Every 80px of scroll", zh: "每滚动80px" }, points: 1, note: { en: "Score is floor(total scroll offset / 80).", zh: "得分公式为 floor(累计滚动距离/80)。" } }],
      specialMechanics: [
        { en: "The lane has three columns; tapping the left or right half moves one column in that direction.", zh: "道路共3列；点击屏幕左半边向左1列，右半边向右1列。" },
        { en: "The game maintains about ten scrolling tiles and generates a random column for each new tile.", zh: "游戏会维持约10个平台，并为每个新平台随机选择列。" },
        { en: "Scroll speed is 2 + 0.1 × score, so the world accelerates continuously.", zh: "滚动速度为2+0.1×score，因此会随分数持续加速。" },
      ],
      endCondition: { en: "The run ends when the ball is no longer supported and falls below the bottom of the play area.", zh: "小球失去平台支撑并掉出游戏区域底部时结束。" },
      progress: { en: "Best score is saved in localStorage under tilehop_best.", zh: "最高分保存在 localStorage 的 tilehop_best。" },
      gameplayTopics: ["reaction", "lane"],
    },
    content: {
      en: { metaTitle: "Tile Hop Game – Switch 3 Lanes on Scrolling Tiles", metaDescription: "Play Tile Hop online. Tap left or right to switch among 3 columns, score every 80 pixels of scroll and survive speed that rises by 0.1 per point.", h1: "Tile Hop – Switch Between 3 Columns and Stay on the Tiles", intro: "Read the next random platform column, shift left or right one lane at a time and keep the ball supported as the whole course accelerates.", about: ["Tile Hop is an endless three-lane alignment game. New tiles are generated above the screen in random columns while the existing course scrolls downward.", "Score is tied directly to distance: every 80 pixels of accumulated scroll adds 1 point, and that point also makes the scroll speed 0.1 faster."], howToPlay: ["Tap the left half of the game to move one column left or the right half to move one column right.", "On keyboard, use the left and right arrow keys.", "Line the ball up with the scrolling tile under it and anticipate the next random column.", "Keep going until the ball loses support and falls off the screen."], rules: ["There are three columns.", "Each tap moves at most one column.", "Score is floor(scroll distance / 80).", "Best score is saved locally."], tips: ["Look one or two tiles ahead so lane changes happen before the current tile scrolls away.", "Avoid unnecessary left-right oscillation; every move changes only one column and the course keeps accelerating.", "At high score, make decisions earlier because scroll speed is 2 + 0.1 × score."], faq: [{ q: "How many lanes are in Tile Hop?", a: "There are three columns, and each left/right input shifts the ball by one column when possible." }, { q: "How is Tile Hop score calculated?", a: "Score is floor(total scrolling offset divided by 80). Each point also raises scroll speed by 0.1." }, { q: "Is Tile Hop best score saved?", a: "Yes. Best is stored in localStorage in the current browser." }] },
      zh: { metaTitle: "Tile Hop 跳格游戏 – 3列左右切换不断加速", metaDescription: "在线玩 Tile Hop：在3列之间左右切换，每滚动80像素+1分；每得1分滚动速度再增加0.1，保持小球不掉落。", h1: "Tile Hop – 在3列平台之间持续切换", intro: "提前判断下一个随机平台在哪一列，每次左右移动1列，在不断加速的滚动路线中保持小球有平台支撑。", about: ["Tile Hop 是三列无限对位玩法。新平台会在屏幕上方随机选择一列生成，已有路线持续向下滚动。", "分数直接和距离绑定：累计滚动每80像素增加1分，同时该分数又会让滚动速度提高0.1。"], howToPlay: ["点击游戏左半边向左移动1列，点击右半边向右移动1列。", "键盘也可以使用左右方向键。", "让小球和当前滚动平台保持同列，并提前观察下一个随机平台。", "持续前进，直到小球失去支撑掉出屏幕。"], rules: ["一共3列。", "每次输入最多移动1列。", "得分=floor(累计滚动距离/80)。", "最高分会本地保存。"], tips: ["提前看1到2个平台，别等当前平台快消失才换列。", "避免无意义左右来回切换；每次只能移动1列，而路线一直在加速。", "高分后要更早做决定，因为滚动速度为2+0.1×score。"], faq: [{ q: "Tile Hop 有几列？", a: "共3列，每次左右输入在边界允许时移动1列。" }, { q: "Tile Hop 怎么计分？", a: "得分=floor(累计滚动距离/80)，并且每1分会让滚动速度提高0.1。" }, { q: "最高分会保存吗？", a: "会，Best 保存在当前浏览器 localStorage。" }] },
    },
  }),

  "table-tennis": reviewedProfile({
    slug: "table-tennis",
    primaryKeyword: "table tennis game",
    secondaryKeywords: ["table tennis online", "ping pong game online", "paddle reaction game", "free table tennis game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Control the left paddle against a CPU opponent and become the first side to score 7 points.", zh: "控制左侧球拍对抗CPU，率先获得7分即可赢下本局。" },
      controls: ["mouse", "touch", "keyboard"],
      scoring: [{ id: "point", label: { en: "Opponent misses the ball", zh: "对手漏球" }, points: 1 }, { id: "win", label: { en: "Match win", zh: "赢下比赛" }, value: { en: "First to 7", zh: "先到7分" } }],
      specialMechanics: [
        { en: "The CPU paddle follows the ball with a 0.06 easing factor rather than teleporting directly to it.", zh: "CPU球拍以0.06的追踪系数逐步靠近球，而不是瞬间移动。" },
        { en: "Every paddle return multiplies horizontal ball speed by 1.05 and also changes vertical speed based on where the ball hits the paddle.", zh: "每次球拍回击都会把水平球速乘以1.05，并根据击球位置改变垂直速度。" },
        { en: "Touch drag controls the player paddle continuously; arrow keys move it in 6-pixel steps per frame while held.", zh: "触屏拖动会连续控制玩家球拍；键盘上下键按住时按每帧6像素移动。" },
      ],
      endCondition: { en: "The first side to reach 7 points wins. Tap the game after the result to reset both scores and start again.", zh: "任意一方先到7分即获胜；结果出现后点击游戏会把双方分数清零重开。" },
      progress: { en: "Match scores are not persisted after a reload.", zh: "比赛分数不会在刷新后保留。" },
      gameplayTopics: ["reaction", "sports"],
    },
    content: {
      en: { metaTitle: "Table Tennis Game – First to 7 vs CPU", metaDescription: "Play Table Tennis online against a CPU. Drag or use arrow keys to return the ball, with every paddle hit increasing horizontal speed by 5%. First to 7 wins.", h1: "Table Tennis – First to 7 Against the CPU", intro: "Track the ball with the left paddle, change its angle by where you make contact and handle a rally that speeds up by 5% on every paddle return.", about: ["This Table Tennis game is a one-player paddle duel against a CPU. Points are simple—miss the ball and the opponent scores—but rallies become less forgiving because horizontal ball speed compounds by 5% on every paddle contact.", "Contact position also changes vertical velocity, so hitting away from the paddle center produces steeper returns rather than a fixed bounce."], howToPlay: ["Move the left paddle up or down with touch drag or the arrow keys.", "Meet the ball with the paddle before it passes the left edge.", "Use off-center contact to change the return angle.", "Score 7 points before the CPU."], rules: ["The first side to 7 points wins.", "Each missed return gives 1 point to the opponent.", "Horizontal ball speed increases by 5% after every paddle return.", "The CPU follows the ball automatically."], tips: ["Track the ball early instead of reacting only when it reaches your side.", "Use the upper or lower part of the paddle when you want a stronger vertical angle.", "Long rallies get faster, so reduce unnecessary paddle movement as ball speed builds."], faq: [{ q: "How many points win Table Tennis?", a: "The first side to reach 7 points wins the match." }, { q: "Does the ball speed up?", a: "Yes. Each paddle return multiplies horizontal ball speed by 1.05." }, { q: "How do mobile controls work?", a: "The game listens for pointer/touch dragging and moves the player paddle toward your vertical touch position." }] },
      zh: { metaTitle: "Table Tennis 乒乓游戏 – 对战CPU先到7分", metaDescription: "在线玩 Table Tennis 对战CPU：触屏拖动或方向键回球，每次球拍接触让水平球速提高5%，率先7分获胜。", h1: "Table Tennis – 对战CPU先拿7分", intro: "控制左侧球拍追踪来球，通过击球位置改变回球角度，并应对每次回击都会增加5%水平速度的越来越快回合。", about: ["这款 Table Tennis 是单人对CPU球拍对战。漏球就让对手得1分，但真正的压力来自长回合：每次球拍触球都会让水平速度再乘1.05。", "击球位置还会改变垂直速度，因此用球拍中心上方或下方接球会得到不同回球角度。"], howToPlay: ["用触屏上下拖动或键盘上下方向键控制左侧球拍。", "在球穿过左边界前用球拍接住。", "利用偏离球拍中心的击球位置改变回球角度。", "比CPU更早拿到7分。"], rules: ["先到7分的一方获胜。", "每次漏球让对手+1分。", "每次球拍回击后水平球速×1.05。", "CPU会自动追踪球的位置。"], tips: ["提前跟随来球，不要等球已经靠近左侧才开始移动。", "想制造更明显的垂直角度，可以用球拍上部或下部触球。", "回合越长速度越快，后期应减少不必要的大幅移动。"], faq: [{ q: "Table Tennis 几分获胜？", a: "先到7分的一方获胜。" }, { q: "球会越来越快吗？", a: "会，每次球拍回击都会把水平速度乘1.05。" }, { q: "手机怎么操作？", a: "游戏支持pointer/touch拖动，玩家球拍会跟随手指的垂直位置。" }] },
    },
  }),
};
