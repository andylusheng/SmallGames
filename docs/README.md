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

ZeroPlay 不再以“把 100 个小游戏堆成门户”为最终目标，而是建立一个可扩展的主题网络：

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
| Game runtime | `/public/games/{slug}/index.html`，iframe 加载 |
| SEO page | `/game/{slug}`；中文 `/zh/game/{slug}` |
| Analytics | GA4 + 游戏行为事件 |
| Build validation | GitHub Actions：`npm ci --legacy-peer-deps` + `npm run build` |
| Current SEO phase | P0/P1 已完成；P2 内容优化进行中 |
| Game SEO status | 当前 100/100 为 `generated`，0/100 为 `optimized` |

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

核心游戏数据位于 `src/data/games.json`，中文 SEO 扩展位于 `src/data/zh-seo.json`，读取层为 `src/lib/games.ts`。当前运行时标准字段包括：

```ts
title / slug / description / category / thumbnail / gameUrl / tags
featured / popular / instructions
publishedAt / updatedAt
seoStatus: generated | reviewed | optimized
testedMobile
containsViolence
longDescription / features / tips / difficulty
```

P2 起应逐步把“真实产品机制”也结构化进数据，而不是只存 AI 生成文案，见第 8 节。

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

传统分类主要解决**浏览与导航**；未来 SEO 增长优先使用“玩法机制主题”组织搜索需求。

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
| Quick Tap | `quick-tap` | Hit moving targets as fast as possible before the timer runs out. Gold targets are worth bonus points. | `generated` |
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

### 6.2 我们要复制的不是文案，而是生产逻辑

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

每个进入 `optimized` 状态的游戏页必须满足下面标准。

### 7.1 首屏

推荐结构：

```text
Breadcrumb
H1：明确游戏 + 核心玩法/搜索意图
一句话价值说明：用真实机制说明“用户马上能做什么”
Game Player
关键事实：时间 / 操作 / 目标 / 计分（适用时）
```

H1 不要求机械加入所有关键词，但必须让用户和搜索引擎立刻知道页面是什么。

### 7.2 必备内容模块

根据游戏实际情况使用，不能为了凑模板编造：

1. **About / What is [Game]**：用产品事实解释游戏，不写通用广告话术。
2. **How to Play**：真实操作步骤。
3. **Objective**：玩家目标。
4. **Controls**：mouse / touch / keyboard，以及移动端实际支持情况。
5. **Rules / Mechanics**：核心规则、速度变化、生成逻辑、特殊元素。
6. **Scoring System**：有分数则必须说明如何得分、奖励/惩罚；无分数不要硬造。
7. **Win / Fail Condition**：什么时候赢、什么时候结束或失败。
8. **Duration / Levels**：有明确局时、关卡、回合时才展示。
9. **Best Score / Progress**：只有真实存在 localStorage/账户/关卡记录时展示。
10. **Tips & Strategies**：技巧必须能从规则推导或经实际试玩验证。
11. **FAQ**：优先来自 GSC / 真实产品问题，而不是全站统一四问。
12. **Related Games**：优先同机制，其次同分类，形成主题内链。
13. **Screenshots / Visual Evidence**：P2 页面应逐步增加真实游戏截图，而不是纯装饰图。

### 7.3 Metadata 标准

**Title** 不再全部机械使用 `Play {name} Free Online - No Download`。根据主意图定制，例如：

```text
Quick Tap Game – 20-Second Tap Speed Challenge
Tap Tower Game – Stack the Tower Online
Hex Merge – Free Number Merge Puzzle Online
```

标准：

- 主关键词尽量靠前。
- 说明游戏最独特的机制。
- 不写页面里不存在的功能。
- Description 说明目标 + 玩法 + 1~2 个具体事实，不堆关键词。
- English / 中文分别维护，不允许中文页沿用英文 meta description。

### 7.4 Structured Data

- `VideoGame`：只输出可验证属性。
- `BreadcrumbList`：与真实页面层级一致。
- `FAQPage`：仅在页面真正显示相同 FAQ 时输出；不把它视为排名捷径。
- 禁止虚构 `AggregateRating`、ratingCount、plays、reviews。

### 7.5 内容质量红线

禁止以下写法成为主内容：

- “easy to learn, hard to master” 类可套 100 个页面的话术。
- 无依据的 “works on every device / kid-friendly / safe / no ads / scientifically proven”。
- 假播放量、假评分、假发布日期、每天自动刷新更新时间。
- 只替换游戏名的 FAQ / Features / Tips。
- 为关键词密度重复主词。

**判断标准：把游戏名删掉后，如果一段话还能原封不动用于另外几十个游戏，这段话通常不是合格的核心 SEO 内容。**

---

## 8. SEO 生产系统：从游戏源码生成独特页面

### 8.1 Step 1：读取真实游戏

对每个游戏先检查 `public/games/{slug}/index.html`，提取：

- objective
- controls
- duration
- levels / rounds
- scoring
- reward / penalty
- special mechanics
- win condition
- fail condition
- speed/difficulty progression
- saved progress / best score
- mobile/touch support

### 8.2 Step 2：结构化事实

P2 推荐把以下字段逐步加入正式游戏数据：

```ts
primaryKeyword
secondaryKeywords[]
objective
controls[]
duration
levels
scoring
winCondition
failCondition
specialMechanics[]
difficultyProgression
progressStorage
mobileSupport
screenshots[]
publishedAt
updatedAt
seoStatus
```

### 8.3 Step 3：搜索意图映射

输入优先级：

1. GSC 已出现 Query。
2. 游戏名 + 常见产品问题：game / online / free / how to play / score / controls / mobile / tips。
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

### 8.5 Step 5：QA 与状态

| Status | 定义 |
|---|---|
| `generated` | 只有基础模板/历史生成内容，技术上可索引但未逐页审核 |
| `reviewed` | 已核对源码、玩法事实、移动端和声明，内容可信 |
| `optimized` | 已完成关键词映射、独特内容、内部链接、截图/证据、metadata 与 QA，并进入数据监测 |

任何页面只有达到 `optimized` 标准，才计入“SEO 已完成页面”。

### 8.6 Step 6：上线后验证

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

SEO 页面不是发布即完成；GSC 出现新 Query 后，应回填 Title、正文模块和 FAQ。

---

## 9. Quick Tap：标准示例

真实源码规则（不是 SEO 编写）：

- 每局 **20 秒**。
- 普通目标命中 **+1 分**。
- 金色目标出现概率 **15%**，命中 **+3 分**。
- 每次命中后目标随机移动。
- Best Score 使用浏览器 `localStorage` 保存。
- 使用 pointer 事件，可点击/触控。

对应 SEO 页面应自然产生：

```text
Primary: quick tap game
Secondary: tap speed game / quick tapping game / 20 second tap game / tap reaction game

Title: Quick Tap Game – 20-Second Tap Speed Challenge
H1: Quick Tap – 20-Second Tap Speed Game

Sections:
- How to Play Quick Tap
- Quick Tap Rules
- Quick Tap Scoring
- Normal vs Gold Targets
- How Your Best Score Is Saved
- Quick Tap Tips
- FAQ based on actual gameplay/search queries
```

这就是 ZeroPlay 后续 100 个游戏的标准：**每个页面共享结构方法，但不共享虚构/通用正文。**

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
4. 最后才是泛“热门游戏”。

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

### 11.1 当前已知技术债

- Next.js 15.5.2 有安全升级警告，应升级到已修复版本。
- `@cloudflare/next-on-pages` 已进入弃用路线，后续迁移 OpenNext for Cloudflare。
- 当前 `publishedAt / updatedAt` 仍由数据层统一归一化；P2 应迁移为每个游戏真实独立日期。
- 中文游戏页 metadata 应随 P2 使用真正中文 short description，而不是复用英文 description。

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

按当前 GSC 信号优先：

1. `quick-tap`
2. `tap-tower`
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
- Mobile-first；触屏支持必须实际测试后才标记。
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

### 15.1 常用命令

```bash
npm ci --legacy-peer-deps
npm run build
npm run pages:build
npm run pages:deploy
```

`prebuild` 会运行 `scripts/generate-game-index.js`，生成轻量搜索索引。

### 15.2 合并要求

- 代码变更必须生产构建通过。
- SEO 页面修改需要核对最终 HTML / metadata / canonical / schema。
- 新游戏必须确认 `games.json` 与 `public/games/{slug}` 一致，避免孤立资源。
- 任何“安全、儿童适用、无广告、移动端支持”等声明必须有事实依据。

---

## 16. 代码架构与关键文件

### 16.1 目录职责

```text
public/games/{slug}/        独立 HTML5 游戏源码与缩略图
src/app/                    Next.js 路由、metadata、robots、sitemap
src/views/                  首页/分类页/游戏页视图
src/components/             Header、GamePlayer、GameGrid、GameCard 等 UI
src/data/games.json         100 个游戏的主数据与英文基础内容
src/data/zh-seo.json        中文 SEO 扩展内容
src/data/category-seo.ts    分类页内容与页面钩子
src/lib/games.ts            游戏读取、清洗、SEO 状态与关联逻辑
src/lib/metadata.ts         canonical / hreflang / 全站 metadata 工具
src/lib/analytics.ts        GA4 事件封装
src/messages/               中英文 UI 文案
scripts/                    搜索索引、SEO/游戏数据辅助脚本
docs/README.md              本项目唯一总文档
.github/workflows/ci.yml     生产构建 CI
```

### 16.2 核心页面组件

- `GamePlayer`：iframe 加载游戏、重开/全屏、游戏生命周期事件。
- `GamePageView`：游戏页产品与 SEO 内容主体；P2 的主要改造位置。
- `CategoryPageView`：传统分类页；未来玩法 Hub 可以复用部分结构，但内容意图必须独立。
- `HomePageView`：首页精选/热门/最新入口；P1 已避免一次性把全部 100 个完整 SEO 数据送到客户端。
- `GameCard / GameGrid`：使用轻量卡片数据。

### 16.3 数据一致性规则

- `games.json` 中正式游戏必须存在对应的 `public/games/{slug}/index.html`。
- `public/games/` 中不保留未进入正式库存的孤立游戏。
- 搜索索引由 `prebuild` 根据正式数据生成，不手工维护。
- 游戏真实规则以实际源码/试玩为最终事实来源；SEO 文案与文档不能反向“定义”不存在的玩法。

---

## 17. UI、广告、法律与环境配置

### 17.1 UI 原则

- 移动端优先，游戏应尽快进入可玩状态。
- 页面视觉服务于“立即玩”，SEO 内容位于产品之后/周围，不做文章站式首屏。
- H1 和一句话玩法说明应在首屏明确表达产品，不让用户先理解门户导航再找游戏。
- 真实截图、规则表、计分表优先于装饰性长文。

### 17.2 广告

- 项目保留 AdSense 接入能力。
- 未配置真实 Publisher ID 时不加载占位广告脚本。
- 广告不得阻挡首个核心操作、伪装成游戏按钮或制造“必须看广告才能开始”的虚假声明。
- 页面文案只写“网站可能展示广告”等可验证表述，不写 `No Ads / No Forced Ads` 等未经确认的全站承诺。

### 17.3 法律页

维护：`About / Privacy / Terms / DMCA` 及中文对应页。法律/关于页面同样遵循独立 canonical/hreflang。

### 17.4 环境变量

主要变量：

```text
NEXT_PUBLIC_SITE_URL=https://zeroplaygames.com
NEXT_PUBLIC_ADSENSE_CLIENT=<真实 AdSense ID，未获批时留空/不配置>
```

GA4 当前由项目配置接入；若 Measurement ID 或数据策略变化，应同步更新本文件。

---

## 18. 当前阶段与执行顺序

### 已完成

- P0：索引、robots、canonical/hreflang、sitemap、结构化数据真实性等技术 SEO 基线。
- P1：首页/搜索轻量化、行为事件、孤立资源清理、CI 构建验证等。

### 当前主任务：P2

1. 先优化已有 GSC 信号的 9 个游戏。
2. 从真实源码提取机制事实，建立新的游戏 SEO 数据字段。
3. 重写每页 Title/H1/Description、How to Play、Rules、Scoring、Tips、FAQ。
4. 建 Tap / Merge / Defense 第一批玩法 Hub。
5. 加真实游戏截图和同机制内链。
6. 观察 GSC + GA4，再决定下一批，而不是一次性重写 100 个。

### 暂不优先

- 为了“游戏数量”从 100 扩到 500。
- 批量生成几百个只有换关键词的专题页。
- 在没有真实评分/播放数据前恢复 rating / plays schema。
- 在没有 GSC 证据前把每个长尾词拆成独立 URL。

---

## 19. 文档维护规则

从现在开始：

1. `docs/` **只保留这一份 `README.md`**。
2. 新增/删除游戏时，同步更新：总数、分类数量、游戏目录。
3. 新增玩法 Hub 时，同步更新站点主题树和内部链接规划。
4. 某游戏从 `generated → reviewed → optimized` 时，同步更新游戏目录和 P2 队列。
5. SEO 技术规则、部署方式、分析事件发生变化时同步更新。
6. GSC 每形成一个有意义的新阶段基线，将关键数据更新到第 12 节；不要每天写流水账。
7. 已废弃的规划直接从本文删除，不保留多份互相冲突的旧方案。Git 历史就是历史记录。

### 文档的最终用途

任何新的 ChatGPT / Codex / 开发者接手项目时，先阅读本文件，即可理解：

- 站点为什么存在。
- 现在有哪些游戏。
- 游戏如何组织。
- SEO 为什么这样做。
- 一个游戏页达到“SEO 完成”的标准是什么。
- 下一步应该优先做什么。
- 哪些数据和声明不能编造。
