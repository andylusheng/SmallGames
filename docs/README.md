# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：`docs/README.md` 是本项目唯一长期维护文档。站点定位、游戏库存、Topic 架构、SEO 生产标准、移动端标准、CI、部署、当前状态和后续决策统一维护在这里。
>
> 最近更新：2026-08-07 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 站点定位

- **品牌**：ZeroPlay Games
- **总主题**：**Free Play Games / Free Online Games**
- **产品核心**：浏览器打开即玩；无需下载；无需账号即可开始。
- **语言**：英文主站 + 中文 `/zh`。
- **正式游戏数**：100。
- **传统浏览分类**：9。
- **正式 Gameplay Topic**：9。
- **SEO 阶段**：P0/P1 技术底座完成；P2 已覆盖当前全部正式 Topic。

ZeroPlay 不做“堆几百个小游戏 + 每页换名字”的普通门户，而是做可扩展的搜索主题网络：

```text
L0  Free Play Games / Free Online Games
│
├── L1  Gameplay Topic Hub
│   ├── Tap Games              /tap-games
│   ├── Merge Games            /merge-games
│   ├── Defense Games          /defense-games
│   ├── Memory Games           /memory-games
│   ├── Reaction Games         /reaction-games
│   ├── Number Games           /number-games
│   ├── Word Games             /word-games
│   ├── Classic Games          /classic-games
│   └── Idle & Clicker Games   /idle-games
│
├── L2  独立游戏主题
│   ├── Quick Tap              /game/quick-tap
│   ├── Tower Defense          /game/tower-defense
│   ├── Reaction Speed Test    /game/reaction-test
│   ├── Tetris                 /game/tetris
│   └── ...
│
└── L3  单游戏长尾搜索意图
    ├── how to play
    ├── rules
    ├── controls
    ├── scoring / cost / reward
    ├── win / fail / end condition
    ├── duration / levels / waves
    ├── tips / strategy
    ├── best score / progress
    ├── mobile
    └── no download / browser play
```

### 核心原则

1. **一个游戏页承接一组同主题长尾词。** 不为每个长尾词制造薄页面。
2. **一个 Topic Hub 承接玩法级搜索需求。** Hub 必须解释真实玩法差异，而不是只列卡片。
3. **内容来自真实产品机制。** 游戏源码、实际试玩、Git 历史、GSC Query 是事实源；AI 只负责组织表达。
4. **同一游戏只维护一份 P2 Profile。** 游戏可属于多个 Topic，但不复制第二份规则数据。
5. **Topic 批次必须完整交付。** Profile、Hub、双向内链、metadata、sitemap、Build、Visual QA 同批完成。
6. **`reviewed` 不等于 `optimized`。** 没有人类移动端实际试玩，不得虚标完成。
7. **SEO 内容不能挡住产品。** 移动端优先让用户看到并开始游戏，长内容放在游戏之后。

---

## 2. 技术与部署架构

| 项目 | 当前实现 |
|---|---|
| Framework | Next.js 15.5.2 / App Router |
| React | 19.2.7 |
| TypeScript | 6.x |
| CSS | Tailwind CSS 4 |
| Build | `output: "export"` |
| Static output | `out/` |
| Hosting | Cloudflare Pages |
| Production branch | `master` |
| Game runtime | `/public/games/{slug}/index.html` |
| Game SEO page | `/game/{slug}`；中文 `/zh/game/{slug}` |
| Topic Hub | `/{topic}-games`；中文 `/zh/{topic}-games` |
| Analytics | GA4 + 游戏行为事件 |
| Build CI | GitHub Actions：Node 22 + production build |
| Visual QA | GitHub Actions：P2 Game + Topic Hub + Mobile Shell 自动截图 |

正式部署：

```text
GitHub master
    ↓
Cloudflare Pages
    ↓
npm run build
    ↓
out/
    ↓
zeroplaygames.com
```

Cloudflare Pages：

```text
Production branch: master
Framework: Next.js Static HTML Export（或 None）
Build command: npm run build
Build output: out
Root directory: 留空
NODE_VERSION=22
NEXT_PUBLIC_SITE_URL=https://zeroplaygames.com
```

仓库 `.npmrc`：

```text
legacy-peer-deps=true
```

用于保证 Cloudflare npm install 与 GitHub CI 的 peer-dependency 行为一致。

---

## 3. 路由与索引策略

| 页面类型 | English | 中文 | Index |
|---|---|---|---|
| 首页 | `/` | `/zh` | index |
| 传统分类 | `/{category}` | `/zh/{category}` | index |
| Gameplay Topic | `/{topic}-games` | `/zh/{topic}-games` | index |
| 游戏 SEO 页 | `/game/{slug}` | `/zh/game/{slug}` | index |
| 原始 Runtime | `/games/{slug}/index.html` | 共用 | `X-Robots-Tag: noindex, follow` |
| 搜索页 | `/search` | `/zh/search` | `noindex, follow` |
| About / Legal | `/about` `/privacy` `/terms` `/dmca` | `/zh/...` | index |

技术 SEO 基线：

- 自引用 canonical。
- EN / ZH hreflang + x-default。
- sitemap 只提交应索引页面。
- 正式 Topic Hub 自动进入 sitemap。
- 原始 Runtime 可抓取但 `noindex, follow`，避免和 SEO 页面竞争。
- Search 页面 `noindex, follow` 且不进 sitemap。
- `lastModified` 使用真实或稳定日期，不在每次构建时伪造“今天更新”。
- 不输出虚假 rating / plays / reviews / AggregateRating。
- P2 英文、中文独立 metadata。
- P2 已核验 Description 优先覆盖旧 `games.json` 描述，并用于站内卡片与 Search Index。

---

## 4. Browse Category 与 Gameplay Topic 分离

### 4.1 传统分类：只负责浏览

| Category | 中文 | 数量 |
|---|---|---:|
| action | 动作 | 6 |
| arcade | 街机 | 23 |
| casual | 休闲 | 13 |
| idle | 放置 | 6 |
| puzzle | 益智 | 22 |
| racing | 赛车 | 6 |
| shooting | 射击 | 8 |
| sports | 体育 | 9 |
| strategy | 策略 | 7 |
| **Total** |  | **100** |

### 4.2 正式 Gameplay Topic：负责搜索主题

| Topic | URL | Members |
|---|---|---|
| Tap Games | `/tap-games` | Quick Tap, Tap Tower, Tap Tycoon, Balloon Pop, Gravity Flip, Color Switch |
| Merge Games | `/merge-games` | Hex Merge, Merge Defense, Pet Merge, 2048 |
| Defense Games | `/defense-games` | Tower Defense, Plant Defense, Merge Defense |
| Memory Games | `/memory-games` | Memory Cards, Memory Sequence |
| Reaction Games | `/reaction-games` | Quick Tap, Reaction Speed Test, Whack-a-Mole, Fruit Catch, Avoid Blocks, Tile Hop, Table Tennis |
| Number Games | `/number-games` | 2048, Number Puzzle, Speed Math, Sudoku Lite, Hex Merge |
| Word Games | `/word-games` | Word Scramble, Word Search, Hangman |
| Classic Games | `/classic-games` | Tetris, Minesweeper, Tic Tac Toe, Pong, Space Invaders, Brick Breaker, Pac-Man, Frogger |
| Idle & Clicker Games | `/idle-games` | Cookie Clicker, Idle Miner, Idle Factory, Tap Tycoon, Lemonade Stand, Pet Merge |

### Topic 边界原则

- Topic 以**真实主要机制**为准，不只看名字/tag。
- 一个游戏可以属于多个 Topic，用于 Hub 聚合和语义内链；P2 Profile 仍只有一份。
- 游戏 Breadcrumb 使用 Profile 中第一个 `gameplayTopics` 作为主 Topic。
- 例如 Quick Tap 同时属于 Tap / Reaction，但主 Breadcrumb 仍是 Tap。
- Reaction Speed Test 不放入 Memory；它测信号到点击的延迟，不需要跨步骤保存信息。
- Sudoku Lite 必须明确为 **6×6 / digits 1–6 / 2×3 boxes**，不能写成标准 9×9。

---

## 5. 100 个游戏库存与当前 SEO 状态

状态：

```text
generated  = 基础页面存在，未逐游戏源码核验
reviewed   = 源码 + 关键词 + 双语 P2 内容完成，等待/进行人工 QA
optimized  = Definition of Done 全部通过
```

当前汇总：

```text
100 total
62 generated
37 reviewed
1 optimized
38 P2 profiles total
9 formal Topic Hubs
```

### 5.1 Action（6）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Ninja Runner | `ninja-runner` | 跑、跳并穿越陷阱的忍者动作挑战。 | generated |
| Sword Fight | `sword-fight` | 一对一格挡、攻击和走位的剑斗游戏。 | generated |
| Pixel Platformer | `platformer` | 像素平台跳跃、移动与收集。 | generated |
| Fruit Ninja | `fruit-ninja` | 快速切水果并避开炸弹。 | generated |
| Ski Run | `ski-run` | 雪坡滑行并躲避障碍。 | generated |
| Surf Runner | `surfing` | 海浪中持续前进并躲危险。 | generated |

### 5.2 Arcade（23）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Fruit Slash | `fruit-slash` | 连续切水果、避炸弹并追求连击。 | generated |
| Flappy Bird | `flappy-bird` | 单键控制飞行高度穿过管道。 | generated |
| Doodle Jump | `doodle-jump` | 连续向上弹跳平台并避免掉落。 | generated |
| Fruit Catch | `fruit-catch` | 5条命接水果；炸弹15%概率且扣2命。 | **reviewed** |
| Knife Hit | `knife-hit` | 向旋转目标投刀并避免撞刀。 | generated |
| Piano Tiles | `piano-tiles` | 按节奏点击黑色钢琴块。 | generated |
| Helicopter | `helicopter` | 按住上升、松开下降穿越洞穴。 | generated |
| Car Dodge | `car-dodge` | 在车流中躲避迎面车辆。 | generated |
| Color Switch | `color-switch` | 点击控制小球，只穿过匹配颜色障碍。 | **reviewed** |
| Snake Battle | `snake-battle` | 吃食物成长并避免碰撞。 | generated |
| Brick Breaker | `brick-breaker` | 3条命打砖块；每砖10分，逐关增加行数。 | **reviewed** |
| Tap Tower | `tap-tower` | 按重叠宽度落下方块并堆高塔。 | **reviewed** |
| Balloon Pop | `balloon-pop` | 30秒戳气球，漏10个提前结束。 | **reviewed** |
| Bounce Ball | `bounce-ball` | 控制弹跳球穿越平台和障碍。 | generated |
| Avoid Blocks | `avoid-blocks` | 躲下落方块，成功通过+1并持续加速。 | **reviewed** |
| Catch Stars | `catch-stars` | 移动位置接住掉落星星。 | generated |
| Gravity Flip | `gravity-flip` | 一键反转重力穿过障碍。 | **reviewed** |
| Jump Rope | `jump-rope` | 根据绳子节奏把握跳跃时机。 | generated |
| Tile Hop | `tile-hop` | 3列切换，滚动越远速度越快。 | **reviewed** |
| Pac-Man | `pac-man` | 11×11迷宫吃豆并避开3个幽灵。 | **reviewed** |
| Frogger | `frogger` | 穿车道、踩移动木头，每次过关+50分。 | **reviewed** |
| Crossy Road | `crossy-road` | 持续向前穿越道路和障碍。 | generated |
| Space Pinball | `space-pinball` | 太空主题弹珠台冲分。 | generated |

### 5.3 Casual（13）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Whack-a-Mole | `whack-a-mole` | 30秒3×3打地鼠，目标窗口逐步缩短。 | **reviewed** |
| Reaction Speed Test | `reaction-test` | 随机1–5秒后变绿，毫秒级反应测试。 | **reviewed** |
| Color Match | `color-match` | 限时颜色匹配反应游戏。 | generated |
| Rock Paper Scissors | `rock-paper-scissors` | 与电脑石头剪刀布。 | generated |
| Quick Tap | `quick-tap` | 20秒随机目标；普通1分、15%金色目标3分。 | **optimized** |
| Dice Duel | `dice-duel` | 掷骰子与对手比较点数。 | generated |
| Bubble Wrap | `bubble-wrap` | 点击虚拟气泡的解压玩法。 | generated |
| Fidget Spinner | `fidget-spinner` | 旋转虚拟指尖陀螺。 | generated |
| Paper Toss | `paper-toss` | 判断方向和距离投纸团。 | generated |
| Tangram | `tangram` | 用几何拼片还原图形。 | generated |
| Coin Flip | `coin-flip` | 虚拟抛硬币工具。 | generated |
| Magic 8 Ball | `magic-8ball` | 输入问题并获得随机答案。 | generated |
| Sand Fall | `sand-fall` | 沙粒下落与堆积的粒子沙盒。 | generated |

### 5.4 Idle（6）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Cookie Clicker | `cookie-clicker` | 7类升级；6种被动CPS + 重复×2点击收益。 | **reviewed** |
| Idle Miner | `idle-miner` | 3点击+3自动升级，完整经济状态本地保存。 | **reviewed** |
| Idle Factory | `idle-factory` | 5类自动生意，$10K开启Prestige倍率循环。 | **reviewed** |
| Lemonade Stand | `lemonade-stand` | 按天经营价格、库存、配方和天气。 | **reviewed** |
| Tap Tycoon | `tap-tycoon` | 点击赚钱并投资8类主动/被动收益升级。 | **reviewed** |
| Pet Merge | `pet-merge` | 5×5棋盘任意位置合并同tier宠物。 | **reviewed** |

### 5.5 Puzzle（22）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| 2048 | `2048` | 4×4滑动合并；有效移动后90%出2、10%出4。 | **reviewed** |
| Tetris | `tetris` | 10×20四格方块消行，Level越高下落越快。 | **reviewed** |
| Bubble Pop | `bubble-pop` | 匹配同色泡泡并清除。 | generated |
| Minesweeper | `minesweeper` | 10×10、10雷，第一次点击周围3×3安全。 | **reviewed** |
| Tic Tac Toe | `tic-tac-toe` | 3×3执X，对战Easy或minimax Unbeatable。 | **reviewed** |
| Maze Runner | `maze-runner` | 寻找逐渐变难的迷宫出口。 | generated |
| Gem Crush | `gem-crush` | 匹配彩色宝石并触发连锁。 | generated |
| Bubble Shooter | `bubble-shooter` | 发射泡泡组成同色群。 | generated |
| Memory Cards | `memory-cards` | 16张牌找8对，以更少Move完成。 | **reviewed** |
| Word Scramble | `word-scramble` | 10轮提示词字母重组，连续答对加成。 | **reviewed** |
| Number Puzzle | `number-puzzle` | 4×4十五数字滑块，200次合法移动打乱。 | **reviewed** |
| Speed Math | `speed-math` | 30秒加减乘多选，答对+1、答错不扣分。 | **reviewed** |
| Sokoban | `sokoban` | 推箱子到目标位置并避免卡死。 | generated |
| Word Search | `word-search` | 8×8字母网格找5个隐藏词。 | **reviewed** |
| Memory Sequence | `memory-sequence` | 4色序列每级+1步，点错从Level 1重开。 | **reviewed** |
| Pipe Connect | `pipe-connect` | 旋转管道形成完整连接。 | generated |
| Color Fill | `color-fill` | 用更少步骤完成颜色填充。 | generated |
| Hangman | `hangman` | 20词库带Hint，在6个错误字母前解词。 | **reviewed** |
| Sudoku Lite | `sudoku` | 6×6、数字1–6、2×3宫的轻量数独。 | **reviewed** |
| Water Sort Puzzle | `water-sort` | 倒水直到每管只含一种颜色。 | generated |
| Block Blast | `block-blast` | 放置方块完成行列并保持空间。 | generated |
| Nonogram | `nonogram` | 根据行列数字提示还原像素图。 | generated |

### 5.6 Racing（6）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Speed Racer | `speed-racer` | 高速公路避车并收集加速。 | generated |
| Hill Climb | `hill-climb` | 坡地驾驶并平衡速度与车身。 | generated |
| Drift Racer | `drift-racer` | 高速转弯和漂移控制。 | generated |
| Moto Trial | `moto-trial` | 摩托越障并保持平衡。 | generated |
| Subway Dash | `subway-dash` | 地铁场景持续奔跑躲障碍。 | generated |
| Boat Race | `boat-race` | 水上赛道驾驶争取更快成绩。 | generated |

### 5.7 Shooting（8）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Space Shooter | `space-shooter` | 太空射击、躲弹与收集强化。 | generated |
| Space Invaders | `space-invaders` | 3条命清外星编队，波次增加行数和速度。 | **reviewed** |
| Asteroid Dodge | `asteroid-dodge` | 小行星群中躲避并生存。 | generated |
| Zombie Shooter | `zombie-shoot` | 抵挡一波波僵尸。 | generated |
| Tank Battle | `tank-battle` | 坦克瞄准并击败敌方装甲。 | generated |
| Duck Hunt | `duck-hunt` | 快速瞄准移动目标。 | generated |
| Cannon Blast | `cannon-blast` | 判断弹道用大炮命中目标。 | generated |
| Bubble Cannon | `bubble-cannon` | 发射彩色泡泡组成匹配群。 | generated |

### 5.8 Sports（9）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Pong | `pong` | 对战CPU，回球持续加速，先到7分。 | **reviewed** |
| Archery | `archery` | 判断距离并瞄准靶心。 | generated |
| Basketball Shots | `basketball` | 控制篮球投篮时机与角度。 | generated |
| Penalty Kick | `penalty-kick` | 点球瞄准并击败门将。 | generated |
| Table Tennis | `table-tennis` | CPU球拍对战，每次回击水平速度×1.05。 | **reviewed** |
| Hoop Master | `basketball-hoop` | 连续投篮建立得分连胜。 | generated |
| Golf Putt | `golf-putt` | 控制推杆方向和力度。 | generated |
| Bowling | `bowling` | 瞄准球道击倒更多球瓶。 | generated |
| Volleyball | `volleyball` | 简单一对一排球对抗。 | generated |

### 5.9 Strategy（7）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Tower Defense | `tower-defense` | 4种塔、100金币、20HP、Boss每3波。 | **reviewed** |
| Connect Four | `connect-four` | 先在棋盘上连成四子。 | generated |
| Gomoku | `gomoku` | 五子棋，先形成连续五子。 | generated |
| Chess Puzzle | `chess-puzzle` | 寻找国际象棋战术最佳着法。 | generated |
| Merge Defense | `merge-defense` | 10塔位合并升级并抵挡逐波增强敌人。 | **reviewed** |
| Plant Defense | `plant-defense` | 8×5草坪，用向日葵、射手和墙守5路。 | **reviewed** |
| Hex Merge | `hex-merge` | 5×5六边形棋盘合并相邻同数字格。 | **reviewed** |

---

## 6. memorytest.io 拆解后形成的 SEO 生产系统

学习的是“产品事实即内容”，不是照抄文案：

```text
真实搜索需求 / GSC Query
        ↓
选择 Gameplay Topic
        ↓
读取 Topic 内真实 Runtime 源码
        ↓
提取 objective / controls / duration / scoring
cost / reward / penalty / end condition / progress
        ↓
结构化到 game-profiles/{topic}.ts
        ↓
Primary / Secondary Keywords
        ↓
EN/ZH Title / Description / H1 / Intro
        ↓
How to Play / Rules / Scoring / Mechanics / Tips / FAQ
        ↓
Topic Hub
        ↓
Hub ↔ Game 双向内链
        ↓
Production Build + Visual QA + 人工试玩
        ↓
reviewed → optimized
        ↓
GSC + GA4 持续回填
```

核心判断：

> 如果删掉游戏名后，一段正文还能原封不动放到几十个游戏页面，它通常不能作为 P2 核心内容。

禁止：

- 为SEO字数写与玩法无关的长文。
- 虚构评分、播放量、用户数、评论。
- 虚构保存进度、移动支持、计分和安全声明。
- `easy to learn, hard to master` 一类通用填充当核心内容。
- 为每个同义长尾词单独建薄URL。
- 把产品内部阈值冒充科学/医学标准。

---

## 7. 单游戏 P2 Page Standard

### 首屏顺序

```text
Breadcrumb（优先主 Topic）
H1：游戏 + 核心机制 / 主搜索意图
1句真实玩法说明
Game Player
```

### 页面核心模块

按真实玩法选择，不为模板编造：

1. About
2. How to Play
3. Rules
4. Scoring / Cost / Earnings / Rewards（适用时）
5. Objective
6. Special Mechanics
7. Win / Fail / End Condition
8. Duration / Levels / Waves（适用时）
9. Best Score / Progress（真实存在才写）
10. Tips & Strategies
11. Game Info
12. 游戏专属 FAQ
13. Same-topic Related Games
14. Topic Hub backlink

Scoring 数据模型支持两种值：

```text
points: 数值加分
value: 价格 / 扣生命 / 公式 / 定性结果
```

页面不能再把非分数规则强行渲染成 `+undefined`。

### Metadata

- Primary Keyword 靠前。
- Title 必须体现真实独特机制。
- Description = 目标 + 核心玩法 + 1～2个具体事实。
- EN/ZH 独立维护。
- P2 不使用全站统一 `Play {name} Free Online - No Download` 作为最终 Title。

### Structured Data

- `VideoGame`：只输出可验证字段。
- `BreadcrumbList`：P2 优先体现主 Topic。
- `FAQPage`：页面显示什么，Schema 就输出什么。
- Topic Hub：`CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- 禁止虚构 `AggregateRating` / ratingCount / plays / reviews。

---

## 8. P2 Definition of Done

`optimized` 必须全部满足：

- [ ] 读取并核对真实 Runtime 源码。
- [ ] Primary / Secondary Keywords 明确。
- [ ] objective / controls / scoring / rules / end condition 等结构化。
- [ ] EN/ZH Title / Description / H1 / Intro 独立维护。
- [ ] About / How to Play / Rules / Mechanics / Tips / FAQ 基于真实机制。
- [ ] Topic Hub ↔ Game 双向内链完成。
- [ ] canonical / hreflang / schema / sitemap 正常。
- [ ] 人工试玩，确认页面事实与游戏表现一致。
- [ ] 声明触屏支持时，人工完成至少一个移动端核心玩法循环后才 `testedMobile=true`。
- [ ] `npm run build` 通过。
- [ ] Visual SEO QA 通过。
- [ ] 游戏桌面截图生成。
- [ ] 游戏 390×844 移动截图生成。
- [ ] Runtime 截图生成。
- [ ] 所属 Topic Hub 桌面/移动截图通过。
- [ ] `docs/README.md` 同步。

```text
CI mobile screenshot
≠
人工移动端试玩
```

CI负责断版、溢出、遮挡、Runtime加载、导航、错误翻译和视觉回归；人工试玩负责真正点击、触控和完成核心玩法。

---

## 9. Mobile-first UX Standard

产品优先级：

```text
可玩的游戏 / 游戏入口
>
必要 H1 + 极短说明
>
导航 / 搜索
>
SEO 扩展内容
>
广告
```

### 首页移动端

- Header 保持紧凑。
- Search 不常驻占满首屏；放入展开菜单。
- Hero 说明最多约2行，不能把 Featured Games 推出首屏。
- Featured 使用紧凑两列卡片。

### 移动菜单

- 分类不能用看不全的横向长条作为主菜单。
- 展开后使用可完整阅读的两列布局。
- 点击目标后关闭菜单。

### 分类页

```text
Breadcrumb
H1
短说明
游戏网格
SEO Hook / 长内容
广告
```

不能把长介绍和广告放在游戏之前。

### 游戏页 / Runtime

- Game Player 在手机上优先获得可用 viewport。
- Runtime 不能只把桌面画面塞进 iframe；需要真实响应式和触控机制。
- Tetris 已作为移动端 Runtime 基线：棋盘、Score/Lines/Level 和5个触控按钮必须在手机 viewport 可用。

### 广告

- 未配置合法 AdSense Publisher ID 时 `AdBanner` 必须 `return null`。
- 生产环境禁止显示开发用 `Ad Space` 占位块。
- 广告不能阻断首个核心操作。

---

## 10. CI / Visual SEO QA

### Build CI

```text
Node 22
npm ci --legacy-peer-deps
npm run build
```

production build 不通过，不合并。

### Visual SEO QA

自动发现：

```text
reviewed + optimized P2 games
+ reviewedProfile({...}) 工厂创建的 P2 games
+ src/data/topic-seo/*.ts 中全部正式 Topic Hubs
```

游戏证据：

```text
games/{slug}/page-desktop.png
games/{slug}/page-mobile.png
games/{slug}/game-runtime.png
```

Topic 证据：

```text
topics/{topic}/page-desktop.png
topics/{topic}/page-mobile.png
```

Mobile Shell 固定基线：

```text
/
/action
/game/tetris
/games/tetris/index.html
```

Artifact 保留30天。

当前全量目标：

```text
38 P2 games
9 Topic Hubs
+ Mobile Shell regression
```

---

## 11. Analytics 与 SEO 闭环

当前 GA4 事件：

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

决策结合：

```text
GSC impressions
× ranking opportunity
× CTR
× game_start
× 30s / 60s engagement
× restart
× related_game_click
```

判断：

- 有曝光没点击 → Title / Description / intent。
- 有点击没 `game_start` → 首屏和搜索意图。
- `game_start` 高但30秒留存低 → 修游戏产品，不继续堆SEO文字。
- 新高相关 Query → 回填现有页面 FAQ / Rules / Metadata，默认不新建URL。

早期 GSC 基线（截至 2026-08-04）：

```text
13 clicks
872 impressions
CTR ≈ 1.49%
英文游戏页 ≈607 impressions / 10 clicks
移动端 CTR 高于桌面端
```

已出现信号：

```text
quick tap game
tap tower game
tap tycoon
no download just tap to play
merge defense
hex merge
gem crush
```

---

## 12. 关键代码职责

```text
public/games/{slug}/
    真实 HTML5 Runtime；玩法事实最终来源

src/data/games.json
    100 游戏基础库存；generated fallback

src/data/game-profiles.ts
    P2 类型 + Topic成员 + Profile聚合

src/data/game-profiles/factory.ts
    新 P2 reviewed 流程字段工厂

src/data/game-profiles/tap.ts
src/data/game-profiles/merge.ts
src/data/game-profiles/defense.ts
src/data/game-profiles/memory.ts
src/data/game-profiles/reaction.ts
src/data/game-profiles/number.ts
src/data/game-profiles/word.ts
src/data/game-profiles/classic.ts
src/data/game-profiles/idle.ts
    各 Topic 单游戏真实机制 + 关键词 + 双语内容

src/data/topic-seo.ts
    Topic 类型 + Hub聚合

src/data/topic-seo/*.ts
    9 个 Topic Hub 双语搜索内容

src/lib/games.ts
    游戏读取、P2覆盖、Topic关系、metadata数据

src/views/GamePageView.tsx
    单游戏 P2 / generated fallback 通用视图

src/views/TopicPageView.tsx
    Topic Hub 通用视图

src/app/(en)/[slug]/page.tsx
src/app/zh/[slug]/page.tsx
    传统分类 + 新 Topic 动态静态导出路由

src/app/(en)/tap-games/
src/app/(en)/merge-games/
src/app/zh/tap-games/
src/app/zh/merge-games/
    历史显式 Topic 路由；继续保留

src/app/sitemap.ts
    Static / Category / Topic / Game sitemap

scripts/generate-game-index.js
    Search Index；P2描述优先

scripts/list-p2-qa-games.mjs
    自动发现显式 reviewed/optimized 和 reviewedProfile() P2 页面

scripts/list-topic-hubs.mjs
    自动发现全部正式 Topic Hub

.github/workflows/ci.yml
    Production build

.github/workflows/visual-seo.yml
    Game + Topic + Mobile visual regression

docs/README.md
    唯一 SSOT
```

数据一致性：

- `games.json` 正式游戏必须存在对应 Runtime。
- `public/games/` 不保留库存外孤立目录。
- 真实规则以源码 + 实际试玩为最终依据。
- 文档和SEO不能反向定义不存在的产品机制。
- P2 Profile 建立后，站内卡片、Hub、Search Index 优先使用已核验描述。
- 保存进度、日期、移动支持、计分都必须可追溯。

---

## 13. 当前状态与下一阶段

### 已完成代码/内容/自动QA范围

当前全部正式 Topic：

```text
Tap
Merge
Defense
Memory
Reaction
Number
Word
Classic
Idle & Clicker
```

对应：

```text
38 个 P2 Profile
9 个 Topic Hub
EN/ZH metadata + content
Hub ↔ Game 内链
sitemap
production build
Visual QA pipeline
```

### SEO 状态

```text
Quick Tap = optimized + testedMobile=true
其余 37 个 P2 游戏 = reviewed + testedMobile=false（除非后续人工验证）
62 个未进入当前正式 Topic 的游戏 = generated
```

### 接下来不是再盲目造 Topic

优先顺序：

```text
1. 对37个 reviewed 游戏进行移动端人工核心玩法 QA
2. 通过后批量 reviewed → optimized
3. Cloudflare上线后观察 GSC / GA4
4. 用真实 Query 决定62个 generated 游戏下一批 Topic
5. 对有信号的 generated 游戏继续源码级 P2
```

不要为了“把100个都变optimized”强行创建没有搜索价值的 Topic。

---

## 14. 技术债

1. Next.js 15.5.2 存在安全升级提示，后续升级到已修复版本。
2. `@cloudflare/next-on-pages` 已不是正式部署链路；当前是静态 export，后续删除旧依赖和旧 deploy scripts。
3. 62 个 generated 游戏仍使用历史基础内容/默认日期；等进入有价值 Topic 时逐批迁移。
4. `VideoGame.operatingSystem` 等 Schema 字段继续按真实平台能力做保守维护。
5. Topic 不以数量为 KPI；没有真实语义差异和搜索需求时不创建空 Hub。

---

## 15. 文档维护规则

1. `docs/` 永远只保留 `README.md`。
2. 新增/删除游戏，同步总数、分类和库存表。
3. 新 Topic 上线，同步成员、URL和状态。
4. `generated → reviewed → optimized` 同步本文。
5. SEO / Mobile / CI / 部署标准变化直接修改本文，不创建第二份规划文档。
6. GSC 出现有意义的新阶段基线再更新，不写每日流水账。
7. 过期规则直接删除；Git 历史负责保存历史。

任何 ChatGPT / Codex / 开发者接手项目时，先读本文件，即可知道：站点定位、100个游戏、9个Topic、P2生产标准、当前38个P2页面、哪些仍待人工QA，以及下一步应该做什么。
