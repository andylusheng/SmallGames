# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：`docs/README.md` 是本项目唯一维护的项目文档。站点定位、产品结构、游戏目录、SEO 标准、开发/部署规则、运营基线和后续决策统一维护在这里。
>
> 最近整理：2026-08-07 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 项目定位

### 1.1 品牌与核心主题

- **品牌**：ZeroPlay Games
- **站点总主题**：**Free Play Games / Free Online Games**
- **核心价值**：浏览器打开即玩、无需下载、无需账号即可开始。
- **产品形态**：自有 HTML5 小游戏 + 每个游戏的独立 SEO 页面 + 分类/玩法主题聚合页。
- **语言**：英文主站 + 中文 `/zh`。
- **当前游戏数**：100。
- **当前传统分类数**：9。

ZeroPlay 不以“把大量小游戏堆成门户”为最终目标，而是建立一个可扩展的主题网络：

```text
Free Play Games / Free Online Games
│
├── 浏览分类：Puzzle / Arcade / Strategy / Casual / ...
│
├── 搜索玩法主题：Tap / Merge / Defense / Memory / Reaction / Number / ...
│   ├── Tap Games
│   │   ├── Quick Tap
│   │   ├── Tap Tower
│   │   └── Tap Tycoon
│   ├── Merge Games
│   │   ├── Hex Merge
│   │   ├── Merge Defense
│   │   └── Pet Merge
│   └── Defense Games
│       ├── Plant Defense
│       ├── Tower Defense
│       └── Merge Defense
│
└── 单游戏主题：每个游戏本身成为一个可承接长尾搜索的页面
    ├── how to play
    ├── controls
    ├── rules
    ├── scoring
    ├── win / fail condition
    ├── tips / strategy
    ├── best score / progress（适用时）
    └── mobile / no download / browser play
```

**原则：一个页面先完整解决一个真实搜索意图。不要为了每个长尾词批量创建薄页面；优先在对应游戏页中用真实玩法内容覆盖长尾。只有 GSC 证明存在独立、持续的搜索需求时，才拆出独立专题页。**

---

## 2. 当前产品与技术概览

| 项目 | 当前状态 |
|---|---|
| Framework | Next.js 15.5.2 / App Router |
| React | 19.2.7 |
| TypeScript | 6.x |
| CSS | Tailwind CSS 4 |
| Hosting | Cloudflare Pages |
| Build mode | `output: "export"`，静态输出到 `out/` |
| Game runtime | `/public/games/{slug}/index.html`，iframe 加载 |
| SEO page | `/game/{slug}`；中文 `/zh/game/{slug}` |
| Analytics | GA4 + 游戏行为事件 |
| Build validation | GitHub Actions：`npm ci --legacy-peer-deps` + `npm run build` |
| Visual validation | `Visual SEO QA`：自动抓取所有 `optimized` 游戏桌面/移动/Runtime 截图 |
| Current SEO phase | P0/P1 已完成；P2 内容优化进行中 |
| Game SEO status | 当前 **99/100 `generated`，1/100 `optimized`（Quick Tap）** |

### 2.1 路由

| 页面 | English | 中文 | 索引策略 |
|---|---|---|---|
| 首页 | `/` | `/zh` | index |
| 分类页 | `/{category}` | `/zh/{category}` | index |
| 游戏 SEO 页 | `/game/{slug}` | `/zh/game/{slug}` | index |
| 原始游戏源 | `/games/{slug}/index.html` | 同一资源 | `X-Robots-Tag: noindex, follow` |
| 搜索页 | `/search` | `/zh/search` | `noindex, follow`；不进 sitemap |
| 法律/关于 | `/about` `/privacy` `/terms` `/dmca` | `/zh/...` | index |

### 2.2 当前数据模型

基础游戏库存位于 `src/data/games.json`，历史中文 SEO 扩展位于 `src/data/zh-seo.json`；**P2 结构化产品事实与逐游戏 SEO 配置统一进入 `src/data/game-profiles.ts`**，读取层为 `src/lib/games.ts`。

运行时基础字段包括：

```ts
title / slug / description / category / thumbnail / gameUrl / tags
featured / popular / instructions
publishedAt / updatedAt
seoStatus: generated | reviewed | optimized
testedMobile
containsViolence
longDescription / features / tips / difficulty
```

进入 P2 的游戏额外维护：

```ts
primaryKeyword
secondaryKeywords[]
objective
controls[]
durationSeconds
scoring[]
specialMechanics[]
endCondition
progress
gameplayTopics[]
localized metaTitle / metaDescription / h1 / intro
localized about / howToPlay / rules / tips / faq
```

原则：**真实玩法字段优先于历史生成文案。页面内容由结构化产品事实驱动，而不是按分类批量扩写。**

---

## 3. 游戏分类与数量

| Category | 中文 | 数量 |
|---|---:|---:|
| `action` | 动作 | 6 |
| `arcade` | 街机 | 23 |
| `casual` | 休闲 | 13 |
| `idle` | 放置 | 6 |
| `puzzle` | 益智 | 22 |
| `racing` | 赛车 | 6 |
| `shooting` | 射击 | 8 |
| `sports` | 体育 | 9 |
| `strategy` | 策略 | 7 |
| **Total** |  | **100** |

传统分类主要解决**浏览与导航**；SEO 增长优先使用“玩法机制主题”组织搜索需求。

### 3.1 当前/候选玩法主题集群

- **Tap Games**：Quick Tap、Tap Tower、Tap Tycoon、Balloon Pop、Gravity Flip、Color Switch
- **Merge Games**：Hex Merge、Merge Defense、Pet Merge、2048
- **Defense Games**：Tower Defense、Plant Defense、Merge Defense
- **Memory Games**：Memory Cards、Memory Sequence、Reaction Speed Test
- **Reaction Games**：Reaction Speed Test、Quick Tap、Whack-a-Mole、Fruit Catch、Avoid Blocks、Tile Hop、Table Tennis
- **Number Games**：2048、Number Puzzle、Speed Math、Sudoku Lite、Hex Merge
- **Word Games**：Word Scramble、Word Search、Hangman
- **Classic Games**：Tetris、Minesweeper、Tic Tac Toe、Pong、Space Invaders、Brick Breaker、Pac-Man、Frogger
- **Idle / Clicker Games**：Cookie Clicker、Idle Miner、Idle Factory、Tap Tycoon、Lemonade Stand、Pet Merge

优先级不是固定的，应根据 GSC impressions、排名、CTR、游戏行为数据动态调整。当前最明确的三类信号是 **Tap、Merge、Defense**。

---

## 4. 100 个游戏总目录

说明：这里记录产品库存与当前短介绍，是项目层面的目录，不替代游戏页面正文。`SEO Status` 后续随实际优化更新。

### 4.1 Action / 动作（6）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Ninja Runner | `ninja-runner` | Run, jump and slash through obstacles as a fearless ninja! Collect coins, avoid traps and survive as long as possible. | `generated` |
| Sword Fight | `sword-fight` | Master the blade in fast-paced one-on-one sword combat! Block, strike and outmaneuver your opponent. | `generated` |
| Pixel Platformer | `platformer` | Jump, run and explore a colorful pixel world filled with platforms, hazards and collectibles. | `generated` |
| Fruit Ninja | `fruit-ninja` | Slice flying fruit with quick swipes while avoiding dangerous bombs. Chain combos for a higher score. | `generated` |
| Ski Run | `ski-run` | Race down a snowy slope, dodge obstacles and survive as long as possible in this fast endless ski challenge. | `generated` |
| Surf Runner | `surfing` | Ride the waves, dodge hazards and keep your surfer moving through an endless ocean course. | `generated` |

### 4.2 Arcade / 街机（23）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Fruit Slash | `fruit-slash` | Slice and dice your way through a barrage of fruits! Swipe to cut fruits, avoid bombs, and build huge combos. | `generated` |
| Flappy Bird | `flappy-bird` | Guide the bird through endless pipes in this notoriously difficult game! One tap keeps you flying. | `generated` |
| Doodle Jump | `doodle-jump` | Bounce higher and higher across moving platforms while avoiding enemies and falls. | `generated` |
| Fruit Catch | `fruit-catch` | Catch falling fruit before it hits the ground. Move fast, build streaks and avoid missing too many pieces. | `generated` |
| Knife Hit | `knife-hit` | Throw knives into a spinning target without hitting the blades already stuck in it. | `generated` |
| Piano Tiles | `piano-tiles` | Tap the black piano tiles in rhythm and avoid missing notes as the tempo increases. | `generated` |
| Helicopter | `helicopter` | Hold to rise and release to fall as you fly a helicopter through a narrow endless cave. | `generated` |
| Car Dodge | `car-dodge` | Steer through traffic, dodge incoming cars and survive as long as possible on a crowded road. | `generated` |
| Color Switch | `color-switch` | Time each tap so the ball passes through obstacles that match its current color. | `generated` |
| Snake Battle | `snake-battle` | Grow your snake, collect food and battle for space while avoiding deadly collisions. | `generated` |
| Brick Breaker | `brick-breaker` | Bounce the ball, control the paddle and clear every brick in this classic arcade challenge. | `generated` |
| Tap Tower | `tap-tower` | Stack moving blocks with well-timed taps and build the tallest tower you can. | `generated` |
| Balloon Pop | `balloon-pop` | Pop colorful balloons as quickly as possible in a simple, satisfying tap challenge. | `generated` |
| Bounce Ball | `bounce-ball` | Guide a bouncing ball across platforms and obstacles using simple timing and movement. | `generated` |
| Avoid Blocks | `avoid-blocks` | Dodge incoming blocks and survive as long as possible as the arena gets more intense. | `generated` |
| Catch Stars | `catch-stars` | Move into position and catch falling stars before they disappear. | `generated` |
| Gravity Flip | `gravity-flip` | Flip gravity with one tap to dodge hazards and keep running through an endless course. | `generated` |
| Jump Rope | `jump-rope` | Time every jump to clear the rope and keep your streak alive as the rhythm speeds up. | `generated` |
| Tile Hop | `tile-hop` | Hop from tile to tile without falling as the path keeps moving forward. | `generated` |
| Pac-Man | `pac-man` | Navigate the maze, eat pellets and avoid ghosts in this browser take on the classic arcade formula. | `generated` |
| Frogger | `frogger` | Cross busy roads and dangerous lanes by timing each move carefully. | `generated` |
| Crossy Road | `crossy-road` | Keep moving forward across roads and obstacles without getting hit. | `generated` |
| Space Pinball | `space-pinball` | Keep the ball in play, hit targets and rack up points in a space-themed pinball table. | `generated` |

### 4.3 Casual / 休闲（13）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Whack-a-Mole | `whack-a-mole` | Whack as many moles as you can in 30 seconds! They pop up faster and faster. Test your reflexes! | `generated` |
| Reaction Speed Test | `reaction-test` | Test your reaction time! Wait for the screen to turn green, then click as fast as possible. | `generated` |
| Color Match | `color-match` | Match colors before time runs out in this quick brain and reflex challenge. | `generated` |
| Rock Paper Scissors | `rock-paper-scissors` | Play the classic rock-paper-scissors game against the computer and try to win a streak. | `generated` |
| Quick Tap | `quick-tap` | Hit moving targets for 20 seconds; normal targets score 1 point and 15% gold targets score 3 points. | **`optimized`** |
| Dice Duel | `dice-duel` | Roll the dice against an opponent and see who can win the round with the stronger result. | `generated` |
| Bubble Wrap | `bubble-wrap` | Pop virtual bubbles one by one for a simple, relaxing and satisfying break. | `generated` |
| Fidget Spinner | `fidget-spinner` | Spin a virtual fidget spinner and keep it moving as long as you can. | `generated` |
| Paper Toss | `paper-toss` | Aim and toss paper into the bin while accounting for distance and movement. | `generated` |
| Tangram | `tangram` | Arrange geometric pieces to recreate shapes in a calm spatial puzzle. | `generated` |
| Coin Flip | `coin-flip` | Flip a virtual coin instantly whenever you need a simple heads-or-tails result. | `generated` |
| Magic 8 Ball | `magic-8ball` | Ask a question and shake the Magic 8 Ball for a random fortune-style answer. | `generated` |
| Sand Fall | `sand-fall` | Drop sand and watch particles settle in a simple browser sandbox simulation. | `generated` |

### 4.4 Idle / 放置（6）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Cookie Clicker | `cookie-clicker` | Click to bake cookies, buy upgrades and grow your production in a simple idle clicker loop. | `generated` |
| Idle Miner | `idle-miner` | Mine resources, buy upgrades and grow your mining income over time. | `generated` |
| Idle Factory | `idle-factory` | Build and upgrade production lines to increase your factory output. | `generated` |
| Lemonade Stand | `lemonade-stand` | Run a small lemonade business, make upgrades and grow your earnings. | `generated` |
| Tap Tycoon | `tap-tycoon` | Tap to earn money, buy upgrades and grow a simple browser business empire. | `generated` |
| Pet Merge | `pet-merge` | Merge matching pets to unlock higher-level animals and grow your collection. | `generated` |

### 4.5 Puzzle / 益智（22）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| 2048 | `2048` | Slide numbered tiles to combine them and reach the elusive 2048 tile! Simple rules, addictive strategy. | `generated` |
| Tetris | `tetris` | The legendary block-stacking game! Rotate and place falling tetrominoes to complete lines. | `generated` |
| Bubble Pop | `bubble-pop` | Pop colorful bubbles in this satisfying casual game! Match 3 or more bubbles of the same color. | `generated` |
| Minesweeper | `minesweeper` | The classic mine-finding puzzle game! Clear the board without detonating any hidden mines. | `generated` |
| Tic Tac Toe | `tic-tac-toe` | Challenge an unbeatable AI in this classic game of X's and O's! Choose Easy or Ultimate mode. | `generated` |
| Maze Runner | `maze-runner` | Find your way through increasingly difficult mazes as quickly as possible. | `generated` |
| Gem Crush | `gem-crush` | Match colorful gems in groups and clear the board with satisfying chain reactions. | `generated` |
| Bubble Shooter | `bubble-shooter` | Aim, shoot and match bubbles of the same color to clear clusters from the board. | `generated` |
| Memory Cards | `memory-cards` | Flip cards, remember their positions and match every pair using as few moves as possible. | `generated` |
| Word Scramble | `word-scramble` | Unscramble mixed-up letters to find the hidden word before time runs out. | `generated` |
| Number Puzzle | `number-puzzle` | Slide numbered tiles into order in this classic number puzzle challenge. | `generated` |
| Speed Math | `speed-math` | Solve quick arithmetic problems under time pressure and test your mental math speed. | `generated` |
| Sokoban | `sokoban` | Push boxes onto target tiles without trapping them in this classic logic puzzle. | `generated` |
| Word Search | `word-search` | Find hidden words in a letter grid in this relaxing browser word puzzle. | `generated` |
| Memory Sequence | `memory-sequence` | Watch a sequence, remember the order and repeat it as the pattern gets longer. | `generated` |
| Pipe Connect | `pipe-connect` | Rotate and connect pipe pieces to create a complete path. | `generated` |
| Color Fill | `color-fill` | Fill the board with the target color using as few moves as possible. | `generated` |
| Hangman | `hangman` | Guess the hidden word one letter at a time before you run out of chances. | `generated` |
| Sudoku Lite | `sudoku` | Fill the Sudoku grid so every row, column and box contains each number once. | `generated` |
| Water Sort Puzzle | `water-sort` | Pour colored water between tubes until every tube contains a single color. | `generated` |
| Block Blast | `block-blast` | Place blocks on the board, complete lines and keep space open for new pieces. | `generated` |
| Nonogram | `nonogram` | Use row and column clues to reveal a hidden pixel-art image. | `generated` |

### 4.6 Racing / 赛车（6）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Speed Racer | `speed-racer` | Race through neon-lit highways at breakneck speed! Dodge traffic, collect nitro and chase a high score. | `generated` |
| Hill Climb | `hill-climb` | Drive over steep hills and uneven terrain while balancing speed and control. | `generated` |
| Drift Racer | `drift-racer` | Drift through traffic and corners while maintaining control at high speed. | `generated` |
| Moto Trial | `moto-trial` | Balance a motorcycle over obstacles and rough terrain without crashing. | `generated` |
| Subway Dash | `subway-dash` | Run and race through an endless subway course while dodging obstacles. | `generated` |
| Boat Race | `boat-race` | Race a boat through water courses, avoid hazards and push for the fastest run. | `generated` |

### 4.7 Shooting / 射击（8）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Space Shooter | `space-shooter` | Blast through waves of alien enemies in this thrilling space shooter! Dodge bullets and collect power-ups. | `generated` |
| Space Invaders | `space-invaders` | Defend against descending alien formations in this retro-inspired space shooter. | `generated` |
| Asteroid Dodge | `asteroid-dodge` | Pilot through a dangerous asteroid field and survive as long as possible. | `generated` |
| Zombie Shooter | `zombie-shoot` | Defend yourself against waves of zombies and survive the onslaught. | `generated` |
| Tank Battle | `tank-battle` | Control a tank, aim your shots and defeat enemy armor in compact battles. | `generated` |
| Duck Hunt | `duck-hunt` | Aim quickly and hit moving targets in a browser shooting challenge inspired by classic arcade hunting games. | `generated` |
| Cannon Blast | `cannon-blast` | Aim a cannon, judge the trajectory and hit distant targets. | `generated` |
| Bubble Cannon | `bubble-cannon` | Fire colored bubbles and match groups to clear them from the playfield. | `generated` |

### 4.8 Sports / 体育（9）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Pong | `pong` | Play the timeless paddle-and-ball arcade sports game and keep the ball away from your goal. | `generated` |
| Archery | `archery` | Aim your bow, judge distance and hit the target as accurately as possible. | `generated` |
| Basketball Shots | `basketball` | Time and aim basketball shots to build a high score. | `generated` |
| Penalty Kick | `penalty-kick` | Take penalty kicks, aim for the corners and beat the goalkeeper. | `generated` |
| Table Tennis | `table-tennis` | Return fast shots and outplay your opponent in a compact table tennis match. | `generated` |
| Hoop Master | `basketball-hoop` | Sink consecutive basketball shots and build the longest scoring streak you can. | `generated` |
| Golf Putt | `golf-putt` | Line up the putt, control power and sink the ball in as few shots as possible. | `generated` |
| Bowling | `bowling` | Aim the ball down the lane and knock down as many pins as possible. | `generated` |
| Volleyball | `volleyball` | Play a simple one-on-one volleyball match and keep the ball from touching your side. | `generated` |

### 4.9 Strategy / 策略（7）

| Game | Slug | 一句话介绍（当前英文源） | SEO Status |
|---|---|---|---|
| Tower Defense | `tower-defense` | Place towers, stop incoming waves and protect your base with smart positioning. | `generated` |
| Connect Four | `connect-four` | Drop pieces into the grid and connect four before your opponent does. | `generated` |
| Gomoku | `gomoku` | Place stones on the board and create a line of five before your opponent. | `generated` |
| Chess Puzzle | `chess-puzzle` | Solve tactical chess positions by finding the best move. | `generated` |
| Merge Defense | `merge-defense` | Merge units to strengthen your defense and stop waves of enemies. | `generated` |
| Plant Defense | `plant-defense` | Place and upgrade plants to hold defensive lanes against incoming enemies. | `generated` |
| Hex Merge | `hex-merge` | Merge matching numbered hex tiles to create larger values and keep the board from filling up. | `generated` |

---

## 5. SEO 总体战略：从“门户”升级为“主题网络”

### 5.1 四层主题结构

**L0：站点主题**

`Free Play Games / Free Online Games / Browser Games / No Download Games`

**L1：玩法主题 / 搜索 Hub**

例如：`Tap Games`、`Merge Games`、`Defense Games`、`Memory Games`、`Reaction Games`、`Number Games`。

**L2：独立游戏主题**

例如：`Quick Tap`、`Tap Tower`、`Hex Merge`。每个游戏 URL 应成为该游戏全部相关搜索意图的主页面。

**L3：游戏内长尾意图**

例如：

- `quick tap game`
- `how to play quick tap`
- `quick tap score`
- `quick tap controls`
- `quick tap mobile`
- `20 second tap game`
- `tap speed game online`

L3 默认通过 L2 页面的不同内容模块承接，不自动拆成多个 URL。

### 5.2 关键词选择原则

1. **先有真实需求，再优化页面。** 优先使用 GSC 已经出现的 Query，其次再做外部关键词研究。
2. **关键词必须和真实产品机制匹配。** 不能为了词强行改写一个不相关的游戏。
3. **主词只选一个，副词围绕同一意图。** 一个页面避免同时竞争多个完全不同的主题。
4. **不追大词数量，先追“可赢的长尾”。** 新站优先机制词、动作词、规则词、分数词。
5. **产品页优先，文章页后置。** 能用可玩的产品满足需求，就不要先写纯文章。

---

## 6. memorytest.io 拆解与可复制原则

> 参考站：https://memorytest.io/ ｜ 拆解日期：2026-08-07。站点随时可能变化，本节记录的是我们学习其 SEO/产品结合方式，而不是逐像素复制。

### 6.1 它做对了什么

1. **关键词、域名、产品、页面高度一致**：核心需求是 `memory test`，打开页面就直接进行 memory test。
2. **产品优先**：不是先堆长文章；用户首先完成测试，正文负责解释产品。
3. **产品机制本身就是 SEO 内容**：页面使用真实规则和数字，例如 20 levels、1→20 digits、5-second memorization、计分系统、总分和表现区间。
4. **一个主意图覆盖多个自然子意图**：About、How to Play、Scoring、Performance、Benefits 等模块围绕同一个产品。
5. **内容不可随便换产品名复用**：具体数字、规则、评分都来自这个产品，因此信息唯一性高。
6. **页面轻、任务明确**：没有为了“SEO 字数”堆大量无关模块。

### 6.2 我们复制的是生产逻辑

```text
真实搜索需求
    ↓
可直接完成需求的游戏/工具
    ↓
读取真实游戏源码与规则
    ↓
结构化产品事实
    ↓
Title / H1 / Description
    ↓
How to Play / Rules / Scoring / Win-Fail / Tips / FAQ
    ↓
人工试玩 + Visual SEO QA
    ↓
同机制游戏内链
    ↓
GSC + 行为数据验证
    ↓
持续更新
```

### 6.3 不复制的部分

- 不复制未经证实的科学、健康、认知提升等高风险声明。
- 不因为对方用了某个模块就机械添加同样模块；模块必须由我们的游戏事实支持。
- 不为了“更多关键词”制造大量同义薄页面。

---

## 7. ZeroPlay 游戏页 SEO 标准（P2 Page Standard）

**`optimized` 不是“写完文案”的状态，而是一个 Definition of Done。** 每个游戏页必须满足下列产品、内容、技术和 QA 标准后，才能标记为 `optimized`。

### 7.1 首屏标准

```text
Breadcrumb
H1：明确游戏 + 核心玩法/搜索意图
一句话价值说明：用真实机制说明“用户马上能做什么”
Game Player
关键事实：时间 / 操作 / 目标 / 计分（适用时）
```

H1 不机械堆关键词，但必须让用户和搜索引擎立刻知道页面是什么。

### 7.2 内容模块标准

根据游戏实际情况使用，不能为了凑模板编造：

1. **About / What is [Game]**：用产品事实解释游戏。
2. **How to Play**：真实操作步骤。
3. **Objective**：玩家目标。
4. **Controls**：mouse / touch / keyboard，并与源码及人工测试一致。
5. **Rules / Mechanics**：核心规则、速度变化、生成逻辑、特殊元素。
6. **Scoring System**：有分数则解释奖励/惩罚；无分数不要硬造。
7. **Win / Fail / End Condition**：真实结束、胜负或失败条件。
8. **Duration / Levels**：有明确局时、关卡、回合时才展示。
9. **Best Score / Progress**：只有真实存在 localStorage/账户/关卡记录时展示。
10. **Tips & Strategies**：必须能从规则推导或经实际试玩验证。
11. **FAQ**：优先来自 GSC 和真实产品问题，不使用全站统一四问作为最终内容。
12. **Related Games**：优先同机制，其次同搜索意图，再到传统分类。
13. **Visual Evidence**：必须保留真实页面/游戏视觉 QA 证据；用户页面是否额外展示截图，根据搜索意图决定，不为了凑内容强塞截图。

### 7.3 Metadata 标准

Title 不再统一使用 `Play {name} Free Online - No Download`，而是围绕主意图和真实机制定制，例如：

```text
Quick Tap Game – 20-Second Tap Challenge
Tap Tower Game – Stack the Tower Online
Hex Merge – Free Number Merge Puzzle Online
```

要求：

- 主关键词尽量靠前。
- 表达游戏最独特的真实机制。
- 不写页面不存在的能力。
- Description 说明目标 + 玩法 + 1~2 个具体事实，不堆词。
- English / 中文分别维护，不允许中文页复用英文 description。

### 7.4 Structured Data 标准

- `VideoGame`：只输出可验证属性。
- `BreadcrumbList`：与真实页面层级一致。
- `FAQPage`：页面显示什么，Schema 就输出什么。
- 禁止虚构 `AggregateRating`、ratingCount、plays、reviews。

### 7.5 内容质量红线

禁止以下写法成为核心内容：

- 可直接套 100 个页面的 “easy to learn, hard to master”。
- 无依据的 `works on every device / kid-friendly / safe / no ads / scientifically proven`。
- 假播放量、假评分、假发布日期、自动把更新时间刷成今天。
- 只替换游戏名的 FAQ / Features / Tips。
- 为关键词密度重复主词。

**判断标准：删掉游戏名后，如果一段话还能原封不动用于几十个游戏，这段话通常不是合格的核心 SEO 内容。**

### 7.6 P2 Visual SEO QA 标准

所有 `optimized` 游戏统一执行 `.github/workflows/visual-seo.yml`。

自动流程：

```text
npm ci --legacy-peer-deps
        ↓
npm run build
        ↓
scripts/list-optimized-games.mjs
自动发现 game-profiles.ts 中所有 seoStatus=optimized 的游戏
        ↓
启动 out/ 静态服务器
        ↓
Chrome Headless 截图
        ↓
Artifact 留档 30 天
```

每个 `optimized` 游戏必须至少生成 3 张真实截图：

| 截图 | Viewport | 用途 |
|---|---|---|
| `page-desktop.png` | `1440 × 1200` | 桌面首屏、H1、播放器、导航视觉回归 |
| `page-mobile.png` | `390 × 844` | 移动端布局、首屏、溢出/遮挡视觉回归 |
| `game-runtime.png` | `900 × 700` | `/games/{slug}/index.html` 原始 Runtime 是否真实可加载 |

Artifact 结构：

```text
optimized-game-visual-seo/
└── {slug}/
    ├── page-desktop.png
    ├── page-mobile.png
    └── game-runtime.png
```

Visual QA 会在相关 PR、`master` 变更和手动触发时执行，重点监听：

```text
src/data/game-profiles.ts
src/views/GamePageView.tsx
src/components/GamePlayer.tsx
src/app/**/game/**
src/messages/**
public/games/**
scripts/list-optimized-games.mjs
.github/workflows/visual-seo.yml
```

CI 截图是**自动视觉回归**，不能替代真人试玩。`testedMobile=true` 表示已经有人在移动端视口或实际移动设备中进入并操作过游戏；浏览器自动截图本身不能把它从 `false` 改成 `true`。

### 7.7 `optimized` Definition of Done

一个游戏只有全部满足以下条件，才允许计入“SEO 已完成页面”：

- [ ] 读取并核对真实游戏源码。
- [ ] Primary keyword 明确，Secondary keywords 围绕同一搜索意图。
- [ ] 真实 objective / controls / scoring / rules / end condition 等结构化进入 `game-profiles.ts`。
- [ ] EN/ZH Title、Description、H1、Intro 独立维护。
- [ ] About / How to Play / Rules / Scoring / Mechanics / Tips / FAQ 按实际玩法生成。
- [ ] 同玩法/同意图内链完成。
- [ ] canonical / hreflang / VideoGame / Breadcrumb / FAQ 等技术 SEO 正常。
- [ ] 人工试玩页面和游戏，关键事实与实际表现一致。
- [ ] 有移动端声明时完成移动端人工 QA，并正确设置 `testedMobile`。
- [ ] `npm run build` 通过。
- [ ] Visual SEO QA 通过，桌面/移动/Runtime 三张真实截图 Artifact 已生成。
- [ ] `docs/README.md` 同步更新状态和关键事实。

---

## 8. SEO 生产系统：从游戏源码到 `optimized`

### 8.1 Step 1：读取真实游戏

检查 `public/games/{slug}/index.html`，提取：

- objective
- controls
- duration
- levels / rounds
- scoring
- reward / penalty
- special mechanics
- win condition
- fail/end condition
- speed/difficulty progression
- saved progress / best score
- mobile/touch support

### 8.2 Step 2：结构化事实

P2 使用 `src/data/game-profiles.ts` 保存已核对游戏的结构化产品与 SEO 数据：

```ts
primaryKeyword
secondaryKeywords[]
objective
controls[]
durationSeconds
scoring[]
specialMechanics[]
endCondition
progress
gameplayTopics[]
publishedAt
updatedAt
seoStatus
testedMobile
containsViolence
content.en / content.zh
```

未进入 P2 的游戏继续使用 `games.json + zh-seo.json` fallback；被审核后再迁移进入 `game-profiles.ts`。

### 8.3 Step 3：搜索意图映射

输入优先级：

1. GSC 已出现 Query。
2. 游戏名 + 产品问题：game / online / free / how to play / score / controls / mobile / tips。
3. 玩法机制词：tap / merge / defense / reaction / number / memory 等。
4. 外部关键词工具补充搜索量与变体。

每个游戏维护：

```text
Primary keyword: 1
Secondary keywords: 3–8
Search intent: 1 个主意图
Supporting intents: 若干同主题问题
```

### 8.4 Step 4：页面生产

页面文案只允许来自两种来源：

- **产品事实**：源码、真实试玩、已有数据。
- **搜索事实**：GSC Query、真实用户问题、可信外部资料。

AI 的职责是组织和表达，不是创造不存在的产品事实。

`GamePageView` 对有 P2 profile 的游戏自动渲染：

```text
H1 + unique intro
Game Player
About
How to Play
Rules
Scoring
Game Mechanics
Tips & Strategies
Game Info
FAQ
More same-mechanic games
```

### 8.5 Step 5：人工 QA

人工至少确认：

- 页面能打开。
- 游戏能开始、操作和重开。
- SEO 文案写到的规则与实际游戏一致。
- 控制方式真实可用。
- 页面没有明显遮挡、溢出、断版。
- 如果页面声称支持移动端，则在移动端视口或实际移动设备中真正操作游戏后才设置 `testedMobile=true`。

### 8.6 Step 6：自动 Visual SEO QA

`scripts/list-optimized-games.mjs` 使用 TypeScript AST 自动读取 `GAME_PROFILES`，找出所有 `seoStatus: "optimized"` 游戏，不再在 workflow 里手工维护 slug 列表。

然后 `Visual SEO QA` 对全部 optimized 页面执行：

```text
build
→ 检查 SEO export 页面存在
→ 检查原始 game runtime 存在
→ desktop screenshot
→ mobile screenshot
→ runtime screenshot
→ test PNG 非空
→ 上传 Artifact
```

只要其中任何一个游戏页面或 Runtime 不存在、截图失败、图片为空，workflow 即失败。

### 8.7 Step 7：状态管理

| Status | 定义 |
|---|---|
| `generated` | 只有基础模板/历史生成内容，技术上可索引但未逐页审核 |
| `reviewed` | 已核对源码、玩法事实、关键声明和数据，内容可信，但尚未完成完整搜索意图/视觉/上线 QA |
| `optimized` | 已完成关键词、独特内容、技术 SEO、同机制内链、人工试玩、移动端适用 QA、Build 和 Visual SEO QA，并进入数据监测 |

### 8.8 Step 8：上线后验证

观察窗口以 GSC 和 GA4 为准，重点看：

- impressions
- average position
- CTR
- clicks
- `game_start`
- `game_loaded`
- `game_30s`
- `game_60s`
- `game_restart`
- `related_game_click`
- `game_error`

SEO 页面不是发布即结束；GSC 出现新 Query 后，应回填 Title、正文模块和 FAQ。

---

## 9. Quick Tap：第一个完整 P2 标准页

### 9.1 状态

- URL：`/game/quick-tap`；中文 `/zh/game/quick-tap`
- `seoStatus`：**`optimized`**
- Primary keyword：`quick tap game`
- Secondary：`tap speed game` / `quick tapping game` / `reaction tap game` / `20 second tap game`
- 玩法主题：`tap` / `reaction` / `score-challenge`
- 首次进入仓库：**2026-07-21**
- P2 更新时间：**2026-08-07**
- `testedMobile`：**`true`**；已在浏览器移动端视口人工试玩，操作与布局表现正常。
- Visual SEO QA：**已通过**；桌面、390×844 移动端、Game Runtime 三类截图成功生成。

### 9.2 真实源码规则

这些事实来自 `public/games/quick-tap/index.html`：

- 每局 **20 秒**。
- 普通目标命中 **+1 分**。
- 金色目标出现概率 **15%**，命中 **+3 分**。
- 每次命中后目标随机移动。
- 点击空白区域不加分，也不扣分。
- Best Score 使用浏览器 `localStorage` 保存。
- 使用 `pointerdown`，支持鼠标和触控交互。

### 9.3 Metadata

```text
EN Title: Quick Tap Game – 20-Second Tap Challenge
EN H1: Quick Tap – 20-Second Tap Speed Game

ZH Title: Quick Tap 快速点击游戏 – 20秒反应挑战
ZH H1: Quick Tap – 20秒快速点击游戏
```

Description 使用独立中英文内容，并直接写入 20 秒、普通目标 1 分、金色目标 15% / 3 分等真实机制。

### 9.4 页面模块

```text
Breadcrumb
H1 + unique intro
Game Player
About Quick Tap
How to Play Quick Tap
Quick Tap Rules
Quick Tap Scoring
Quick Tap Game Mechanics
Tips & Strategies
Game Info（含 20 seconds / Mouse / Touch）
5 个 Quick Tap 专属 FAQ
More Tap Games
```

FAQ：

- How long is a Quick Tap game?
- How does Quick Tap scoring work?
- What is the gold target in Quick Tap?
- Does Quick Tap save my best score?
- Can I play Quick Tap on a phone?

### 9.5 同玩法内链

Quick Tap 优先进入 `tap` 主题关系，可连接：

- Tap Tower
- Tap Tycoon
- Balloon Pop
- Gravity Flip
- Color Switch

该机制由 `GAMEPLAY_TOPIC_MEMBERS` 管理。

### 9.6 Visual QA 实战价值

Quick Tap 是第一个运行 Visual SEO QA 的页面。首轮真实截图曾发现导航中的 `categories.idle` 未翻译，随后补充 `Idle / 放置` 翻译并重新通过截图流程。

这说明截图 CI 不只是“留一张图”，而是用于发现：

- 翻译 key 泄漏。
- 首屏断版。
- 移动端溢出/遮挡。
- 游戏 Runtime 加载失败。
- 页面模板变更造成的视觉回归。

### 9.7 结论

Quick Tap 现在是 ZeroPlay 的 P2 基准：**共享的是 SEO/QA 生产流程，不共享虚构文案。后续每个游戏都必须按同一 Definition of Done 才能进入 `optimized`。**

---

## 10. 内部链接与主题权重传递

### 10.1 推荐结构

```text
Home
 ↓
Mechanic Hub: /tap-games
 ↓       ↘
Quick Tap  Tap Tower  Tap Tycoon
 ↑   ↔       ↔       ↑
Related same-mechanic links
```

游戏页 Related Games 的优先级：

1. 同玩法机制。
2. 同搜索意图。
3. 同传统分类。
4. 最后才是泛热门游戏。

玩法 Hub 应链接核心游戏；核心游戏正文反向链接 Hub，形成清晰主题集群。

---

## 11. 技术 SEO 标准

当前 P0/P1 基线：

- 每个可索引页面必须有自引用 canonical。
- English / 中文维护 `hreflang`，含 `x-default`。
- `/games/*` 是 iframe 源文件，响应 `X-Robots-Tag: noindex, follow`。
- `/search` 与 `/zh/search`：`noindex, follow`，且不进入 sitemap。
- `robots.txt` 不屏蔽 `/_next/`。
- Sitemap 只提交需要索引的 URL。
- `lastModified` 不能在每次构建时全部自动变成“今天”。
- 页面不能使用虚假 rating / plays / review schema。
- 静态/法律页面也维护自己的 canonical。
- 首页和搜索使用轻量数据，不把全部游戏 SEO JSON 打进客户端 bundle。
- CI 必须通过生产构建后再视为可合并。
- P2 页面进入 `optimized` 前还必须通过 Visual SEO QA。

### 11.1 当前已知技术债

- Next.js 15.5.2 有安全升级警告，应升级到已修复版本。
- `@cloudflare/next-on-pages` 已进入弃用路线；当前站点已使用 `output: export`，正式 Pages Git 部署使用 `npm run build` → `out/`，后续删除旧 `pages:build/pages:deploy` 依赖与脚本。
- 旧的 99 个 `generated` 游戏当前使用统一日期基线；进入 P2 后必须维护独立真实 `publishedAt / updatedAt`。
- 中文游戏页已有本地化 metadata fallback；进入 P2 的游戏必须进一步维护专属中英文 Title/Description/H1。

---

## 12. 当前 SEO 基线与优先队列

### 12.1 GSC 基线（截至 2026-08-04 的早期数据）

- 13 clicks
- 872 impressions
- CTR ≈ 1.49%
- 英文游戏页：约 607 impressions / 10 clicks
- 移动端 CTR 明显高于桌面端，移动玩法与移动 SERP 是重点。

已出现的有效 Query/机制信号包括：

- `quick tap game`
- `tap tower game`
- `gem crush`
- `merge defense`
- `no download just tap to play`
- Tap / Merge / Defense 相关意图

### 12.2 第一批 P2 游戏

当前进度：

1. ✅ `quick-tap` — `optimized`
2. ⏭ `tap-tower`
3. `tap-tycoon`
4. `hex-merge`
5. `merge-defense`
6. `gem-crush`
7. `plant-defense`
8. `sand-fall`
9. `number-puzzle`

站点级同时优化：首页、`/strategy`、`/casual`，并逐步建立 Tap / Merge / Defense 玩法 Hub。

---

## 13. 新游戏开发标准

新增游戏不再只满足“能玩”，发布前应同时具备产品与搜索数据。

### 13.1 产品最低标准

- 首次打开可直接理解核心操作。
- 10–30 秒内产生第一次明确反馈。
- 失败/完成后可快速重开。
- Mobile-first；移动支持必须经过人工操作验证后才标记。
- 不依赖登录即可玩。
- 有清晰目标、规则、反馈；避免只做视觉 Demo。

### 13.2 SEO 最低标准

发布前至少明确：

- 游戏对应什么搜索意图。
- Primary keyword 是什么。
- 属于哪个传统分类。
- 属于哪个玩法主题集群。
- 源码中的 objective / controls / scoring / win-fail / special mechanics。
- 未来可以围绕哪些真实长尾问题扩展。

如果一个新游戏无法回答这些问题，不应为了“游戏数量”优先开发。

---

## 14. 分析与行为事件

当前 GA4 游戏事件：

```text
game_start
game_loaded
game_30s
game_60s
game_restart
fullscreen_click
related_game_click
game_error
```

SEO 决策不能只看 impressions。优先级应综合：

```text
搜索曝光 × 排名机会 × CTR × game_start × 30/60s 留存 × 重玩/相关游戏点击
```

例如：有曝光但 `game_start` 很低，先修搜索意图/首屏；有点击但 `game_30s` 很低，优先修游戏本身，而不是继续写 SEO 文案。

---

## 15. 部署与工程约束

### 15.1 Cloudflare Pages 正式部署

当前 Next.js 配置：

```ts
output: "export"
```

正式链路：

```text
GitHub master
→ Cloudflare Pages
→ npm run build
→ out/
→ 自动发布
```

Cloudflare Pages：

```text
Production branch: master
Framework preset: Next.js (Static HTML Export)；没有该预设时可选 None
Build command: npm run build
Build output directory: out
Root directory: 留空
NODE_VERSION: 22
NEXT_PUBLIC_SITE_URL: https://zeroplaygames.com
```

仓库 `.npmrc` 使用：

```text
legacy-peer-deps=true
```

使 Cloudflare 自动 `npm ci` 与 GitHub CI 的依赖解析行为一致。

`prebuild` 自动运行 `scripts/generate-game-index.js`。

旧的：

```text
npm run pages:build
npm run pages:deploy
@cloudflare/next-on-pages
```

不再作为正式部署路径。

### 15.2 合并要求

普通代码：

- `npm run build` 必须通过。

P2 游戏页面：

- metadata / canonical / schema 必须与源码事实一致。
- 人工试玩完成。
- 移动支持声明经过人工 QA。
- `testedMobile` 与实际验证状态一致。
- Visual SEO QA 必须通过。
- Artifact 必须成功包含每个 `optimized` 游戏三类截图。
- 文档同步更新。

新增游戏还必须确认 `games.json` 与 `public/games/{slug}` 一致，避免孤立资源。

---

## 16. 代码架构与关键文件

### 16.1 目录职责

```text
public/games/{slug}/              独立 HTML5 游戏源码与缩略图
src/app/                          Next.js 路由、metadata、robots、sitemap
src/views/                        首页/分类页/游戏页视图
src/components/                   Header、GamePlayer、GameGrid、GameCard 等 UI
src/data/games.json               100 个游戏的基础库存与英文历史内容
src/data/zh-seo.json              中文历史 SEO fallback
src/data/game-profiles.ts         P2 真实机制、关键词、双语内容、QA 状态、主题关系
src/data/category-seo.ts          分类页内容与页面钩子
src/lib/games.ts                  游戏读取、清洗、P2 profile、metadata 与关联逻辑
src/lib/metadata.ts               canonical / hreflang / 全站 metadata 工具
src/lib/analytics.ts              GA4 事件封装
src/messages/                     中英文 UI 文案
scripts/generate-game-index.js    生成轻量搜索索引
scripts/list-optimized-games.mjs  自动发现所有 optimized 游戏供 Visual SEO QA 使用
docs/README.md                    本项目唯一总文档
.github/workflows/ci.yml           生产构建 CI
.github/workflows/visual-seo.yml   P2 自动截图与视觉回归 CI
```

### 16.2 核心组件

- `GamePlayer`：iframe 加载游戏、重开/全屏、游戏生命周期事件。
- `GamePageView`：对 `optimized` profile 自动渲染 P2 页面标准。
- `CategoryPageView`：传统分类页；未来玩法 Hub 可以复用部分结构，但内容意图必须独立。
- `HomePageView`：首页精选/热门/最新入口。
- `GameCard / GameGrid`：轻量卡片数据。

### 16.3 数据一致性规则

- `games.json` 中正式游戏必须存在对应 `public/games/{slug}/index.html`。
- `public/games/` 不保留未进入正式库存的孤立游戏。
- 搜索索引由 `prebuild` 生成，不手工维护。
- 游戏真实规则以源码/试玩为最终事实来源。
- `game-profiles.ts` 中的日期、计分、Controls 等字段必须能追溯到 Git 历史、源码或人工 QA。
- `seoStatus=optimized` 会自动进入 Visual SEO QA 目标集合，不需要再手工修改 CI slug 列表。

---

## 17. UI、广告、法律与环境配置

### 17.1 UI 原则

- 移动端优先，游戏尽快进入可玩状态。
- 页面视觉服务于“立即玩”，不做文章站式首屏。
- H1 和一句话玩法说明在首屏明确表达产品。
- 规则表、计分表、真实游戏视觉证据优先于装饰性长文。
- 自动截图用于 QA；如果某个搜索意图确实需要教程截图，再将真实截图作为用户可见内容加入页面。

### 17.2 广告

- 项目保留 AdSense 接入能力。
- 未配置真实 Publisher ID 时不加载占位广告脚本。
- 广告不得阻挡首个核心操作或伪装成游戏按钮。
- 不写 `No Ads / No Forced Ads` 等未经确认的全站承诺。

### 17.3 法律页

维护：`About / Privacy / Terms / DMCA` 及中文对应页；同样遵循独立 canonical/hreflang。

### 17.4 环境变量

```text
NODE_VERSION=22
NEXT_PUBLIC_SITE_URL=https://zeroplaygames.com
NEXT_PUBLIC_ADSENSE_CLIENT=<真实 AdSense ID，未获批时留空/不配置>
```

---

## 18. 当前阶段与执行顺序

### 已完成

- P0：索引、robots、canonical/hreflang、sitemap、结构化数据真实性等技术 SEO 基线。
- P1：首页/搜索轻量化、行为事件、孤立资源清理、CI 构建验证等。
- P2 标准样板：**Quick Tap**。
- P2 自动化标准：`Visual SEO QA` + `list-optimized-games.mjs`，自动对所有 optimized 游戏抓取三类真实截图并留 Artifact。

### 当前主任务：P2

1. 以 Quick Tap 的完整 Definition of Done 继续 `tap-tower`。
2. 再处理 `tap-tycoon`，完成第一批 Tap 游戏核心页。
3. 处理 Hex Merge / Merge Defense，建立 Merge 主题基础。
4. 处理 Plant Defense，建立 Defense 主题基础。
5. 再处理 Gem Crush / Sand Fall / Number Puzzle。
6. 核心游戏足够后，正式建立 `/tap-games`、`/merge-games`、`/defense-games` Hub。
7. 上线后观察 GSC + GA4，再决定下一批，而不是一次性重写 100 个。

### 暂不优先

- 为了游戏数量从 100 扩到 500。
- 批量生成只有换关键词的专题页。
- 在没有真实评分/播放数据前恢复 rating / plays schema。
- 在没有 GSC 证据前把每个长尾词拆成独立 URL。

---

## 19. 文档维护规则

从现在开始：

1. `docs/` **只保留这一份 `README.md`**。
2. 新增/删除游戏时，同步更新总数、分类数量、游戏目录。
3. 新增玩法 Hub 时，同步更新站点主题树和内部链接规划。
4. 游戏从 `generated → reviewed → optimized` 时，同步更新游戏目录和 P2 队列。
5. `optimized` 标准变化时，必须同时更新第 7 节 Definition of Done、Visual SEO QA 和相应代码流程，避免文档与 CI 脱节。
6. 移动端人工 QA 完成后再更新 `testedMobile`；自动移动截图不能单独证明实际可操作。
7. Visual SEO QA 发现的页面问题应在合并前修复；Artifact 是 QA 证据，不是永久产品资产。
8. SEO 技术规则、部署方式、分析事件变化时同步更新。
9. GSC 每形成有意义的新阶段基线，将关键数据更新到第 12 节，不写每日流水账。
10. 已废弃规划直接从本文删除；Git 历史就是历史记录。

### 文档的最终用途

任何新的 ChatGPT / Codex / 开发者接手项目时，先阅读本文件，即可理解：

- 站点为什么存在。
- 现在有哪些游戏。
- 游戏如何组织。
- SEO 为什么这样做。
- 一个游戏页怎样从源码进入 `optimized`。
- 哪些 QA 是人工、哪些 QA 是 CI 自动完成。
- 下一步应该优先做什么。
- 哪些数据和声明不能编造。
