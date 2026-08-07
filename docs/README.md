# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：`docs/README.md` 是本项目唯一维护的项目文档。站点定位、游戏库存、Topic 结构、SEO 标准、P2 状态、开发/部署、数据与后续决策统一维护在这里。
>
> 最近整理：2026-08-07 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 站点定位

- **品牌**：ZeroPlay Games
- **站点总主题**：**Free Play Games / Free Online Games**
- **产品核心**：浏览器打开即玩，无需下载，无需账号即可开始。
- **语言**：英文主站 + 中文 `/zh`。
- **当前正式游戏数**：100。
- **传统浏览分类**：9。
- **当前 SEO 阶段**：P0/P1 已完成，P2 按 Gameplay Topic 批次推进。

ZeroPlay 的目标不是把大量小游戏堆成普通门户，而是建立可扩展的搜索主题网络：

```text
L0  Free Play Games / Free Online Games
│
├── L1  Gameplay Topic Hub
│   ├── Tap Games              /tap-games
│   ├── Merge Games            /merge-games
│   ├── Defense Games          /defense-games      （下一批）
│   ├── Memory Games           （候选）
│   ├── Reaction Games         （候选）
│   └── Number Games           （候选）
│
├── L2  独立游戏主题
│   ├── Quick Tap              /game/quick-tap
│   ├── Hex Merge              /game/hex-merge
│   ├── Merge Defense          /game/merge-defense
│   ├── 2048                   /game/2048
│   └── ...
│
└── L3  游戏内长尾搜索意图
    ├── how to play
    ├── rules
    ├── controls
    ├── scoring / rewards
    ├── win / fail / end condition
    ├── tips / strategy
    ├── best score / progress
    ├── mobile
    └── no download / browser play
```

### 核心原则

1. **一个游戏页面承接该游戏的一组同主题长尾词。** 不为每个长尾词创建薄页面。
2. **一个 Topic Hub 承接玩法级需求。** Hub 解释玩法差异，并导向真实可玩的子游戏。
3. **内容来自真实产品机制。** 源码、真实试玩、GSC Query 和已有产品数据是事实源；AI 负责组织表达，不负责发明规则。
4. **Topic 一次做完整。** 源码核验、Profile、Hub、双向内链、Build、Visual QA 作为同一批次交付。
5. **只有达到 Definition of Done 的页面才标记为 `optimized`。** 自动截图不能代替真人移动端试玩。

---

## 2. 产品与技术架构

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
| SEO game page | `/game/{slug}`；中文 `/zh/game/{slug}` |
| Topic Hub | `/{topic}-games`；中文 `/zh/{topic}-games` |
| Analytics | GA4 + 游戏行为事件 |
| Build CI | GitHub Actions：install + production build |
| Visual QA | GitHub Actions：`reviewed + optimized` 游戏 + 全部正式 Topic Hub 自动截图 Artifact |

### 2.1 路由与索引策略

| 页面类型 | English | 中文 | Index |
|---|---|---|---|
| 首页 | `/` | `/zh` | index |
| 传统分类 | `/{category}` | `/zh/{category}` | index |
| Gameplay Topic | `/tap-games` `/merge-games` | `/zh/tap-games` `/zh/merge-games` | index |
| 游戏 SEO 页 | `/game/{slug}` | `/zh/game/{slug}` | index |
| 原始游戏 Runtime | `/games/{slug}/index.html` | 共用 | `X-Robots-Tag: noindex, follow` |
| 搜索页 | `/search` | `/zh/search` | `noindex, follow`，不进 sitemap |
| 关于/法律 | `/about` `/privacy` `/terms` `/dmca` | `/zh/...` | index |

### 2.2 正式部署

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

用于让 Cloudflare 的 npm install 行为与 GitHub CI 保持一致。

---

## 3. 游戏组织：Browse Category 与 Gameplay Topic 分离

### 3.1 传统分类只负责浏览

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

传统分类解决“我想逛 Arcade / Puzzle”这类导航需求，不承担全部 SEO 主题建设。

### 3.2 Gameplay Topic 负责搜索主题

正式 Topic：

- **Tap Games**：Quick Tap、Tap Tower、Tap Tycoon、Balloon Pop、Gravity Flip、Color Switch
- **Merge Games**：Hex Merge、Merge Defense、Pet Merge、2048

下一批/候选 Topic：

- **Defense Games**：Tower Defense、Plant Defense、Merge Defense
- **Memory Games**：Memory Cards、Memory Sequence、Reaction Speed Test
- **Reaction Games**：Quick Tap、Reaction Speed Test、Whack-a-Mole、Fruit Catch、Avoid Blocks、Tile Hop、Table Tennis
- **Number Games**：2048、Number Puzzle、Speed Math、Sudoku Lite、Hex Merge
- **Word Games**：Word Scramble、Word Search、Hangman
- **Classic Games**：Tetris、Minesweeper、Tic Tac Toe、Pong、Space Invaders、Brick Breaker、Pac-Man、Frogger
- **Idle / Clicker Games**：Cookie Clicker、Idle Miner、Idle Factory、Tap Tycoon、Lemonade Stand、Pet Merge

Topic 是否正式建立 URL，要看：

```text
真实游戏数量
+ GSC/query 信号
+ 游戏之间是否共享清晰机制
+ Hub 是否能提供独立于普通分类页的价值
```

---

## 4. 100 个游戏库存与 SEO 状态

状态定义：

- `generated`：基础页面存在，但未逐游戏核验。
- `reviewed`：源码、关键词和独特 P2 内容已经完成，处于 QA/人工验证阶段。
- `optimized`：完成全部 P2 Definition of Done，计入“SEO 已完成页面”。

### 当前汇总

```text
100 total
90 generated
9 reviewed
1 optimized
```

### 4.1 Action（6）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Ninja Runner | `ninja-runner` | 跑、跳并穿越陷阱的忍者动作挑战。 | generated |
| Sword Fight | `sword-fight` | 一对一格挡、攻击和走位的剑斗游戏。 | generated |
| Pixel Platformer | `platformer` | 像素平台跳跃、移动与收集玩法。 | generated |
| Fruit Ninja | `fruit-ninja` | 快速切水果并避开炸弹。 | generated |
| Ski Run | `ski-run` | 雪坡滑行、躲障碍的生存挑战。 | generated |
| Surf Runner | `surfing` | 海浪中持续前进并躲避危险。 | generated |

### 4.2 Arcade（23）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Fruit Slash | `fruit-slash` | 连续切水果、避开炸弹并追求连击。 | generated |
| Flappy Bird | `flappy-bird` | 单键控制飞行高度穿过管道。 | generated |
| Doodle Jump | `doodle-jump` | 连续向上弹跳平台并避免掉落。 | generated |
| Fruit Catch | `fruit-catch` | 移动接住掉落水果并减少漏接。 | generated |
| Knife Hit | `knife-hit` | 向旋转目标投刀并避免撞到已有刀。 | generated |
| Piano Tiles | `piano-tiles` | 按节奏点击黑色钢琴块。 | generated |
| Helicopter | `helicopter` | 按住上升、松开下降穿越洞穴。 | generated |
| Car Dodge | `car-dodge` | 在车流中躲避迎面车辆。 | generated |
| Color Switch | `color-switch` | 点击控制小球，只穿过与球色匹配的旋转障碍。 | **reviewed** |
| Snake Battle | `snake-battle` | 吃食物成长并避免碰撞。 | generated |
| Brick Breaker | `brick-breaker` | 控制挡板反弹球清除砖块。 | generated |
| Tap Tower | `tap-tower` | 点击落下移动方块，保留重叠宽度并堆高塔。 | **reviewed** |
| Balloon Pop | `balloon-pop` | 30秒内戳气球，漏掉10个会提前结束。 | **reviewed** |
| Bounce Ball | `bounce-ball` | 控制弹跳球穿越平台和障碍。 | generated |
| Avoid Blocks | `avoid-blocks` | 躲避来袭方块并尽量存活。 | generated |
| Catch Stars | `catch-stars` | 移动位置接住掉落星星。 | generated |
| Gravity Flip | `gravity-flip` | 一键反转重力并穿过随机障碍缺口。 | **reviewed** |
| Jump Rope | `jump-rope` | 根据绳子节奏把握跳跃时机。 | generated |
| Tile Hop | `tile-hop` | 连续在移动路径的方块之间跳跃。 | generated |
| Pac-Man | `pac-man` | 迷宫吃豆并躲避幽灵。 | generated |
| Frogger | `frogger` | 判断车流时机穿越道路。 | generated |
| Crossy Road | `crossy-road` | 持续向前穿越道路和障碍。 | generated |
| Space Pinball | `space-pinball` | 太空主题弹珠台击打目标冲分。 | generated |

### 4.3 Casual（13）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Whack-a-Mole | `whack-a-mole` | 30秒快速打地鼠反应挑战。 | generated |
| Reaction Speed Test | `reaction-test` | 等待变绿后尽快点击的反应测试。 | generated |
| Color Match | `color-match` | 限时颜色匹配反应游戏。 | generated |
| Rock Paper Scissors | `rock-paper-scissors` | 与电脑进行石头剪刀布对局。 | generated |
| Quick Tap | `quick-tap` | 20秒点击随机目标；普通1分，15%金色目标3分。 | **optimized** |
| Dice Duel | `dice-duel` | 掷骰子与对手比较点数。 | generated |
| Bubble Wrap | `bubble-wrap` | 点击虚拟气泡的轻量解压玩法。 | generated |
| Fidget Spinner | `fidget-spinner` | 旋转虚拟指尖陀螺。 | generated |
| Paper Toss | `paper-toss` | 判断方向与距离把纸团投进垃圾桶。 | generated |
| Tangram | `tangram` | 用几何拼片还原目标图形。 | generated |
| Coin Flip | `coin-flip` | 即时得到正反面的虚拟抛硬币工具。 | generated |
| Magic 8 Ball | `magic-8ball` | 输入问题并获得随机答案。 | generated |
| Sand Fall | `sand-fall` | 观察沙粒下落与堆积的粒子沙盒。 | generated |

### 4.4 Idle（6）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Cookie Clicker | `cookie-clicker` | 点击生产并购买升级的 Clicker。 | generated |
| Idle Miner | `idle-miner` | 挖矿、升级并提高资源收入。 | generated |
| Idle Factory | `idle-factory` | 升级生产线提升工厂产出。 | generated |
| Lemonade Stand | `lemonade-stand` | 经营柠檬水小生意并提升收益。 | generated |
| Tap Tycoon | `tap-tycoon` | 点击赚钱并投资8类主动/被动收益升级。 | **reviewed** |
| Pet Merge | `pet-merge` | 5×5棋盘任意位置合并同tier宠物；满盘不会自动结束。 | **reviewed** |

### 4.5 Puzzle（22）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| 2048 | `2048` | 4×4滑动合并；有效移动后90%生成2、10%生成4；Best不持久化。 | **reviewed** |
| Tetris | `tetris` | 旋转落块并完成整行。 | generated |
| Bubble Pop | `bubble-pop` | 匹配同色泡泡并清除。 | generated |
| Minesweeper | `minesweeper` | 根据数字提示排除隐藏地雷。 | generated |
| Tic Tac Toe | `tic-tac-toe` | 与 AI 进行井字棋。 | generated |
| Maze Runner | `maze-runner` | 寻找不断变难的迷宫出口。 | generated |
| Gem Crush | `gem-crush` | 匹配彩色宝石并触发连锁消除。 | generated |
| Bubble Shooter | `bubble-shooter` | 发射泡泡并组成同色群。 | generated |
| Memory Cards | `memory-cards` | 翻牌记忆位置并配对。 | generated |
| Word Scramble | `word-scramble` | 将打乱字母重新组成单词。 | generated |
| Number Puzzle | `number-puzzle` | 滑动数字块恢复正确顺序。 | generated |
| Speed Math | `speed-math` | 在时间压力下完成心算。 | generated |
| Sokoban | `sokoban` | 推箱子到目标位置且避免卡死。 | generated |
| Word Search | `word-search` | 在字母网格中寻找隐藏单词。 | generated |
| Memory Sequence | `memory-sequence` | 记住并复现不断变长的顺序。 | generated |
| Pipe Connect | `pipe-connect` | 旋转管道形成完整连接。 | generated |
| Color Fill | `color-fill` | 用尽量少的步骤完成颜色填充。 | generated |
| Hangman | `hangman` | 在机会用完前猜出隐藏单词。 | generated |
| Sudoku Lite | `sudoku` | 完成标准数独行、列和宫格。 | generated |
| Water Sort Puzzle | `water-sort` | 倒水直到每根试管只含一种颜色。 | generated |
| Block Blast | `block-blast` | 放置方块完成行列并保持空间。 | generated |
| Nonogram | `nonogram` | 根据行列数字提示还原像素图。 | generated |

### 4.6 Racing（6）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Speed Racer | `speed-racer` | 高速公路避车并收集加速。 | generated |
| Hill Climb | `hill-climb` | 在坡地驾驶并平衡速度与车身。 | generated |
| Drift Racer | `drift-racer` | 高速转弯和漂移控制。 | generated |
| Moto Trial | `moto-trial` | 摩托越障并保持平衡。 | generated |
| Subway Dash | `subway-dash` | 地铁场景持续奔跑和躲障碍。 | generated |
| Boat Race | `boat-race` | 水上赛道驾驶并争取更快成绩。 | generated |

### 4.7 Shooting（8）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Space Shooter | `space-shooter` | 太空射击、躲弹与收集强化。 | generated |
| Space Invaders | `space-invaders` | 对抗逐步逼近的外星编队。 | generated |
| Asteroid Dodge | `asteroid-dodge` | 在小行星群中躲避并生存。 | generated |
| Zombie Shooter | `zombie-shoot` | 抵挡一波波僵尸。 | generated |
| Tank Battle | `tank-battle` | 控制坦克瞄准并击败敌方装甲。 | generated |
| Duck Hunt | `duck-hunt` | 快速瞄准移动目标。 | generated |
| Cannon Blast | `cannon-blast` | 判断弹道用大炮命中目标。 | generated |
| Bubble Cannon | `bubble-cannon` | 发射彩色泡泡组成匹配群。 | generated |

### 4.8 Sports（9）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Pong | `pong` | 经典双挡板回球游戏。 | generated |
| Archery | `archery` | 判断距离并瞄准靶心。 | generated |
| Basketball Shots | `basketball` | 控制篮球投篮时机与角度。 | generated |
| Penalty Kick | `penalty-kick` | 点球瞄准并击败门将。 | generated |
| Table Tennis | `table-tennis` | 快速回球的一对一乒乓玩法。 | generated |
| Hoop Master | `basketball-hoop` | 连续投篮建立得分连胜。 | generated |
| Golf Putt | `golf-putt` | 控制推杆方向和力度。 | generated |
| Bowling | `bowling` | 瞄准球道击倒更多球瓶。 | generated |
| Volleyball | `volleyball` | 简单一对一排球对抗。 | generated |

### 4.9 Strategy（7）

| Game | Slug | 简介 | SEO |
|---|---|---|---|
| Tower Defense | `tower-defense` | 放置防御塔抵挡敌人波次。 | generated |
| Connect Four | `connect-four` | 先在棋盘上连成四子。 | generated |
| Gomoku | `gomoku` | 五子棋，先形成连续五子。 | generated |
| Chess Puzzle | `chess-puzzle` | 寻找国际象棋战术最佳着法。 | generated |
| Merge Defense | `merge-defense` | 10塔位合并升级并抵挡随波次增强的敌人。 | **reviewed** |
| Plant Defense | `plant-defense` | 布置和升级植物守住路线。 | generated |
| Hex Merge | `hex-merge` | 5×5六边形棋盘合并相邻同数字格；满盘且无可合并项才结束。 | **reviewed** |

---

## 5. memorytest.io 拆解后形成的 SEO 生产原则

参考站：`memorytest.io`。我们学习的是产品与 SEO 的结合方式，不复制具体文案。

### 5.1 最值得复制的部分

```text
明确搜索需求
    ↓
用户打开即可完成任务
    ↓
产品真实机制本身成为内容
    ↓
How to Play
Rules
Scoring
Result / Progress
Tips
FAQ
    ↓
搜索意图被一个页面完整满足
```

它真正强的地方不是“文章长”，而是具体：关卡、时间、计分、结果等信息只属于这个产品，无法把名字换掉后复用到几十个页面。

### 5.2 ZeroPlay 的对应生产系统

```text
GSC / 真实搜索需求
        ↓
选择一个 Gameplay Topic
        ↓
读取 Topic 内所有真实游戏源码
        ↓
提取 objective / controls / duration / scoring
rules / reward / penalty / end condition / progress
        ↓
逐游戏结构化到 game-profiles/{topic}.ts
        ↓
独立关键词 + EN/ZH Title/H1/Description
        ↓
How to Play / Rules / Scoring / Mechanics / Tips / FAQ
        ↓
Topic Hub
        ↓
Hub ↔ 游戏双向内链
        ↓
Build + Visual SEO QA + 人工试玩
        ↓
reviewed → optimized
        ↓
GSC + GA4 持续验证
```

### 5.3 不复制的做法

- 不写没有依据的科学、健康或安全声明。
- 不为了关键词数量制造大量同义薄页。
- 不虚构评分、播放量、评论、用户数量。
- 不为了“SEO 字数”添加与游戏机制无关的长文。

---

## 6. 单游戏 P2 Page Standard

### 6.1 首屏

```text
Breadcrumb（优先 Topic Hub）
H1：游戏 + 核心机制/主搜索意图
一句真实玩法说明
Game Player
关键事实
```

### 6.2 内容模块

按实际游戏选择，禁止为了模板编造：

1. About / What is [Game]
2. How to Play
3. Objective
4. Controls
5. Rules / Mechanics
6. Scoring / Earnings / Rewards（适用时）
7. Win / Fail / End Condition
8. Duration / Levels / Rounds（适用时）
9. Best Score / Progress（真实存在才写）
10. Tips & Strategies
11. 游戏专属 FAQ
12. Same-topic Related Games
13. Topic Hub backlink

固定分数可以直接展示数值；动态公式应在 Rules / FAQ 中明确说明，并可在表格中使用真实示例，不为了统一 UI 编造固定分值。

### 6.3 Metadata

- Primary keyword 尽量靠前。
- Title 必须体现这个游戏最独特的真实机制。
- Description 写目标 + 玩法 + 1～2 个具体事实。
- 英文和中文独立维护。
- 不使用所有游戏统一的 `Play {name} Free Online - No Download` 作为最终 P2 Title。

### 6.4 Structured Data

- `VideoGame`：只输出可验证属性。
- `BreadcrumbList`：P2 游戏优先体现 Topic Hub 层级。
- `FAQPage`：页面展示什么，Schema 就输出什么。
- Topic Hub 使用 `CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- 禁止虚构 `AggregateRating`、ratingCount、plays、reviews。

### 6.5 内容质量红线

如果删掉游戏名后，一段正文还能原封不动放到几十个游戏页面，这段文字通常不能作为 P2 核心内容。

禁止：

- `easy to learn, hard to master` 类通用填充。
- 无依据的 `works on every device / kid-friendly / no ads / safe`。
- 假发布日期、构建时自动把所有更新时间刷新为今天。
- 只换游戏名的 FAQ / Features / Tips。
- 关键词堆砌。

---

## 7. P2 状态与 Definition of Done

### 7.1 状态

| Status | 定义 |
|---|---|
| generated | 基础技术页存在，但未逐页源码核验 |
| reviewed | 源码事实、关键词、双语 P2 内容已完成，进入 Build / Visual / 人工 QA |
| optimized | 全部 Definition of Done 通过，正式计入 SEO 已完成 |

### 7.2 `optimized` 必须全部满足

- [ ] 读取并核对真实游戏源码。
- [ ] Primary keyword 明确，Secondary keywords 同一主题。
- [ ] objective / controls / scoring / rules / end condition 等结构化。
- [ ] EN/ZH Title、Description、H1、Intro 独立维护。
- [ ] About / How to Play / Rules / Scoring / Mechanics / Tips / FAQ 基于真实机制。
- [ ] Topic Hub ↔ 游戏双向内链完成。
- [ ] canonical / hreflang / schema / sitemap 正常。
- [ ] 人工试玩，确认页面内容与游戏真实表现一致。
- [ ] 有移动端支持声明时完成人工移动端试玩，之后才设置 `testedMobile=true`。
- [ ] `npm run build` 通过。
- [ ] Visual SEO QA 通过。
- [ ] 游戏页桌面截图生成。
- [ ] 游戏页 390×844 移动截图生成。
- [ ] 原始 Runtime 截图生成。
- [ ] 所属 Topic Hub 桌面/移动截图通过。
- [ ] `docs/README.md` 同步。

### 7.3 人工移动 QA 与自动截图不是一回事

```text
CI 390×844 Screenshot
= 视觉回归、溢出、遮挡、加载、导航检查

人工移动端试玩
= 真正点击、触控、操作、完成至少一个核心玩法循环
```

自动截图不能把 `testedMobile` 从 `false` 改成 `true`。

---

## 8. Topic Batch Standard：一次优化一个主题

### Step 1：确定 Topic

优先依据：

```text
GSC Query / impressions / ranking opportunity
+ 现有游戏数量
+ 玩法机制一致性
+ 是否能形成有价值 Hub
```

### Step 2：一次读完 Topic 所有游戏源码

统一提取：

```text
objective
controls
duration / levels / rounds
scoring / income / rewards
reward / penalty
special mechanics
win / fail / end condition
difficulty progression
saved best / progress
mobile/touch implementation
```

### Step 3：一次建立整组 P2 Profile

```text
src/data/game-profiles.ts
    类型定义 + 聚合入口

src/data/game-profiles/tap.ts
src/data/game-profiles/merge.ts
src/data/game-profiles/defense.ts     （后续）
```

新游戏先：

```text
seoStatus: "reviewed"
testedMobile: false
```

### Step 4：建立 Topic Hub

Topic SEO 同样按主题拆文件：

```text
src/data/topic-seo.ts
    类型定义 + 聚合入口

src/data/topic-seo/tap.ts
src/data/topic-seo/merge.ts
src/data/topic-seo/defense.ts        （后续）
```

每个正式 Hub 至少包含：

```text
独立 Primary / Secondary Keywords
独立 EN/ZH Title / Description / H1
Topic 定义
Topic 内真实游戏列表
按玩法差异选择游戏
Topic 机制解释
FAQ
CollectionPage + ItemList
Breadcrumb
```

### Step 5：双向内链

```text
Home / 其他入口
      ↓
Topic Hub
 ↙  ↓  ↓  ↘
Game A Game B Game C
 ↖  ↑  ↑  ↗
Related same-topic links
```

P2 游戏 Breadcrumb 优先：

```text
Home > Merge Games > Hex Merge
```

而不是只依赖传统 `Strategy / Puzzle / Idle` 分类。

### Step 6：自动 QA

`.github/workflows/visual-seo.yml`：

- 自动发现 `reviewed + optimized` 的 P2 游戏。
- 自动扫描 `src/data/topic-seo/*.ts` 发现正式 Topic Hub。
- 构建静态站。
- Headless Chrome 截图。
- Artifact 保留30天。

游戏至少生成：

```text
games/{slug}/page-desktop.png
games/{slug}/page-mobile.png
games/{slug}/game-runtime.png
```

Topic 至少生成：

```text
topics/{topic}/page-desktop.png
topics/{topic}/page-mobile.png
```

### Step 7：人工试玩

自动 QA 通过后，人工检查尚未验证的游戏，尤其是移动端触控。

### Step 8：晋级

满足标准的游戏：

```text
reviewed
→ testedMobile=true（实际验证触控后）
→ optimized
```

下一 Topic 的代码/内容批次可以在上一 Topic 的人工移动验收排队期间继续，但任何未人工通过的游戏仍必须保持 `reviewed`，不能提前算作完成。

---

## 9. Tap Games：第一个正式 Topic 批次

### 9.1 Topic Hub

```text
EN: https://zeroplaygames.com/tap-games
ZH: https://zeroplaygames.com/zh/tap-games
Primary: tap games
```

| 游戏 | Tap 被用来做什么 | P2 |
|---|---|---|
| Quick Tap | 快速重新锁定随机目标，20秒冲分 | optimized |
| Tap Tower | 决定移动方块落下时机与重叠宽度 | reviewed |
| Tap Tycoon | 产生现金并驱动 Clicker/Idle 升级 | reviewed |
| Balloon Pop | 30秒准确点击上升气球 | reviewed |
| Gravity Flip | 一键反转重力穿过障碍 | reviewed |
| Color Switch | 控制高度并匹配旋转障碍颜色 | reviewed |

### 9.2 已确认真实机制

**Quick Tap**

- 20秒；普通目标 +1；金色目标15%概率、+3。
- 命中后随机换位；空点不扣分。
- Best 保存 localStorage。
- 用户已人工移动端试玩，`testedMobile=true`，`optimized`。

**Tap Tower**

- 点击/触屏/Space 落下方块。
- 普通重叠 +1；横向误差 `<5px` Perfect +2。
- 非 Perfect 只保留重叠宽度。
- 速度 `2.5 + score × 0.15`。
- 完全落空或剩余宽度 `<8px` 结束。
- Best 保存 localStorage。

**Tap Tycoon**

- 开局 $1/tap；主动点击 + 被动每秒收益。
- 8类升级；价格 `floor(baseCost × 1.15^level)`。
- 被动收益每0.1秒结算。
- 只保存历史最高累计收入，不保存当前升级状态。
- 没有固定 Game Over。

**Balloon Pop**

- 最长30秒；每个气球 +1；漏掉10个提前结束。
- 分数越高，生成间隔越短、上升速度越高。

**Gravity Flip**

- 点击/触屏/Space 反转重力并把垂直速度归零。
- 障碍每70帧生成；通过 +1；障碍速度 `3 + score × 0.04`。
- 撞障碍结束；Best 保存 localStorage。

**Color Switch**

- 点击/触屏/Space 将垂直速度设为 -8；重力 +0.35/update。
- 障碍为四色圆环/杆；通过 +1 后随机切换球色。
- 碰错颜色或掉出底部结束；Best 保存 localStorage。

### 9.3 Tap Topic 剩余门槛

```text
Tap Tower / Tap Tycoon / Balloon Pop / Gravity Flip / Color Switch
→ 人工移动端试玩
→ testedMobile=true
→ reviewed → optimized
```

---

## 10. Merge Games：第二个正式 Topic 批次

### 10.1 Topic Hub

```text
EN: https://zeroplaygames.com/merge-games
ZH: https://zeroplaygames.com/zh/merge-games
Primary: merge games
```

Secondary：

```text
merge games online
number merge games
merge puzzle games
tower merge games
pet merge games
```

| 游戏 | 核心 Merge 规则 | P2 |
|---|---|---|
| Hex Merge | 相邻同数字六边形合并升级 | reviewed |
| Merge Defense | 同等级防御塔合并成高一级塔 | reviewed |
| Pet Merge | 任意位置同tier宠物直接合并 | reviewed |
| 2048 | 整盘滑动时相同数字碰撞合并 | reviewed |

### 10.2 Hex Merge

源码事实：

- 5×5错位六边形棋盘，一个格子最多6邻居。
- 只有相邻、非空、数字相同才能合并。
- 成功后目标格 +1级，来源格清空。
- 得分公式：`新目标等级 × 2`。
- 每次成功合并后随机空位生成1～3级新格。
- 棋盘满并不立即结束；只有满盘且无相邻同数字组合才 Game Over。
- Best 保存 localStorage。
- 当前结束后需要刷新页面重开。
- `reviewed / testedMobile=false`。

### 10.3 Merge Defense

源码事实：

- 10个塔位；开局50金币、Wave 1、20 HP。
- 1级塔价格20金币；满塔位时购买费用退回。
- 两个同等级塔合并成高1级塔，同时 +5金币；最高10级。
- N级塔单次攻击造成N伤害，而且高等级攻击间隔更短。
- 第N波敌人数 `3 + 2N`。
- 敌人HP `2 + N`；速度 `0.3 + 0.05N`。
- 击杀奖励 `3 + 当前波次`金币。
- 敌人漏过防线 -1 HP；HP归0结束。
- Best 保存最高到达波次到 localStorage。
- Game Over 后当前实现需要双击 Buy Tower 重开。
- `containsViolence=true`。
- `reviewed / testedMobile=false`。

### 10.4 Pet Merge

源码事实：

- 5×5，共25格。
- 两个相同内部tier宠物可以直接合并，**不要求相邻**。
- 合并后目标内部tier +1，来源格清空。
- HUD 显示 `Level = 内部tier + 1`。
- 得分公式是 `2^新内部tier`，因此：

```text
显示 Level 2 → +2
显示 Level 3 → +4
显示 Level 4 → +8
```

- Add Pet 在随机空位生成低tier宠物；当前真实生成只使用内部tier 0/1/2。
- 25格满不会自动 Game Over，只会阻止 Add Pet；如果还有重复tier仍能合并。
- Reset 清盘并重新放入3个宠物。
- Best 保存 localStorage，但当前棋盘不持久化。
- `reviewed / testedMobile=false`。

### 10.5 2048

源码事实：

- 4×4棋盘。
- 键盘方向键或触屏滑动；滑动 `<30px` 被忽略。
- 相同数字合并后，新格数值直接加入 score，例如 `8+8→16` 同时 +16分。
- 每次真正改变棋盘的有效移动后生成一个新格：90% 为2，10% 为4。
- 满16格且不存在横向/纵向相同邻格时 Game Over。
- **当前 Best 只存在本次页面会话内存，不写 localStorage；刷新后重置。**
- 当前棋盘也不持久化。
- `reviewed / testedMobile=false`。

### 10.6 Merge Topic 已完成与剩余门槛

已完成：

```text
4个游戏真实源码核验
4个 P2 Profile
EN/ZH 独立 metadata + 页面内容
/merge-games + /zh/merge-games
Hub ↔ Game 双向内链
CollectionPage / ItemList / Breadcrumb / FAQ Schema
sitemap
Production build
Visual SEO QA
4×(desktop + mobile + runtime)
Merge Hub desktop + mobile
```

剩余：

```text
Hex Merge
Merge Defense
Pet Merge
2048
→ 人工移动端试玩
→ testedMobile=true
→ reviewed → optimized
```

---

## 11. 内部链接标准

优先级：

1. Gameplay Topic。
2. 同搜索意图。
3. 传统分类。
4. 泛热门推荐。

正式 Topic 游戏示例：

```text
Home > Merge Games > Hex Merge

正文末尾:
More Merge Games Like Hex Merge
+ View all Merge Games
```

传统分类仍保留在 Game Info / 标签和站点导航中，但不再是唯一语义层级。

---

## 12. 技术 SEO 基线（P0/P1）

- 自引用 canonical。
- English / 中文 hreflang，含 x-default。
- 原始 `/games/*` Runtime 使用 `X-Robots-Tag: noindex, follow`。
- 搜索页 `noindex, follow`，不进 sitemap。
- robots 不阻止搜索引擎抓取 `_next` 必要资源。
- sitemap 只提交应该索引的页面。
- 正式 Topic Hub 自动加入 sitemap。
- sitemap lastModified 使用真实/稳定日期，不在每次构建时全部变成今天。
- 不输出假 rating / plays / reviews。
- P2 游戏使用可追溯的 `publishedAt / updatedAt`。
- 中文 P2 页面维护独立 metadata。
- P2 Profile 的已核验 Description 优先用于站内卡片和 Search Index，避免旧 `games.json` 文案污染。

---

## 13. Analytics 与 SEO 验证闭环

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

SEO 决策综合：

```text
GSC impressions
× ranking opportunity
× CTR
× game_start
× 30s / 60s engagement
× restart
× related_game_click
```

判断方式：

- 有曝光、没点击：先看 Title / Description / intent。
- 有点击、没 `game_start`：看首屏和页面/搜索意图是否匹配。
- `game_start` 高但30秒留存低：优先修游戏本身，而不是继续写 SEO 文案。
- 出现新的高相关 Query：回填对应页面 FAQ / Rules / Title，不自动新建 URL。

### 13.1 早期 GSC 基线（截至 2026-08-04）

- 13 clicks
- 872 impressions
- CTR ≈ 1.49%
- 英文游戏页约 607 impressions / 10 clicks
- 移动端 CTR 高于桌面端

已出现的有价值信号：

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

## 14. CI / Visual SEO QA

### 14.1 Build CI

`.github/workflows/ci.yml`

```text
Node 22
npm ci --legacy-peer-deps
npm run build
```

生产构建不通过，不合并。

### 14.2 Visual SEO QA

`.github/workflows/visual-seo.yml`

自动发现：

```text
reviewed + optimized P2 games
+ src/data/topic-seo/*.ts 中注册的 Topic Hubs
```

脚本：

```text
scripts/list-p2-qa-games.mjs
scripts/list-topic-hubs.mjs
```

输出 Artifact：

```text
p2-visual-seo/
├── games/
│   └── {slug}/
│       ├── page-desktop.png      1440×1200
│       ├── page-mobile.png       390×844
│       └── game-runtime.png      900×700
└── topics/
    └── {topic}/
        ├── page-desktop.png
        └── page-mobile.png
```

用途：页面是否构建、首屏/响应式、Runtime 加载、Topic Hub、翻译 key、事实卡片和视觉回归。Artifact 保留30天。

当前 Merge PR 验收时，自动 QA 覆盖：

```text
10 个 P2 游戏（1 optimized + 9 reviewed）
2 个 Topic Hub（Tap + Merge）
```

---

## 15. 关键代码与数据职责

```text
public/games/{slug}/
    真实 HTML5 Runtime，玩法事实最终来源

src/data/games.json
    100 个正式游戏基础库存；generated 游戏 fallback

src/data/zh-seo.json
    未进入 P2 游戏的历史中文 fallback

src/data/game-profiles.ts
    P2 类型定义 + Profile 聚合入口

src/data/game-profiles/tap.ts
    Tap Topic 6 个游戏真实机制、关键词和双语内容

src/data/game-profiles/merge.ts
    Merge Topic 4 个游戏真实机制、关键词和双语内容

src/data/topic-seo.ts
    Topic 类型定义 + Hub 配置聚合入口

src/data/topic-seo/tap.ts
src/data/topic-seo/merge.ts
    各 Topic 独立关键词、Hub 双语内容和路径

src/lib/games.ts
    游戏读取、P2 profile、metadata、Topic 关系；P2 描述优先覆盖旧库存描述

src/views/GamePageView.tsx
    单游戏 P2 页面

src/views/TopicPageView.tsx
    Gameplay Topic Hub 通用视图

src/app/(en)/tap-games/page.tsx
src/app/zh/tap-games/page.tsx
src/app/(en)/merge-games/page.tsx
src/app/zh/merge-games/page.tsx
    正式 Topic Hub 路由与 metadata

src/app/sitemap.ts
    Static / Category / Topic / Game sitemap

scripts/generate-game-index.js
    Search 索引；P2 metaDescription 优先于旧 games.json description

.github/workflows/ci.yml
    Production build CI

.github/workflows/visual-seo.yml
    P2 Game + Topic visual regression

docs/README.md
    唯一 SSOT
```

### 数据一致性规则

- `games.json` 正式游戏必须有 `/public/games/{slug}/index.html`。
- `public/games/` 不保留未进入库存的孤立游戏。
- 真实规则以源码与试玩为最终依据。
- 文档和 SEO 文案不能反向定义不存在的玩法。
- `publishedAt / updatedAt / scoring / controls / saved progress` 必须可追溯到 Git、源码或人工 QA。
- P2 Profile 建立后，站内卡片、Topic Hub、Search Index 应优先使用 P2 已核验描述，避免多入口出现相互冲突的规则。

---

## 16. 新游戏开发标准

新增游戏不能只满足“能打开”。

### 产品最低标准

- 首屏可理解核心操作。
- 10～30秒内产生第一次明确反馈。
- 失败/完成后可以快速重开。
- Mobile-first。
- 不登录也能玩。
- 有明确目标、规则和反馈。

### SEO 最低标准

开发前回答：

```text
它属于哪个 Gameplay Topic？
Primary keyword 是什么？
真实搜索需求是什么？
玩法如何区别于 Topic 内已有游戏？
objective / controls / score / end condition 是什么？
可以自然承接哪些长尾问题？
```

如果无法回答，不为了“游戏数量”优先开发。

---

## 17. 广告、UI 与声明规则

### UI

- 移动端优先。
- H1 + 一句话机制说明让搜索用户立即理解页面。
- 玩家尽快进入 Game Player。
- 规则表、计分表和真实产品事实优先于装饰性长文。

### 广告

- 保留 AdSense 接入能力。
- 未配置真实 Publisher ID 时不加载占位广告脚本。
- 广告不能伪装成游戏按钮或阻断首个核心操作。

### 声明

不能无依据写：

```text
Kid-friendly
No ads
No forced ads
Works on every device
Safe for everyone
```

移动支持按游戏实际测试记录。

---

## 18. 当前技术债

1. Next.js 15.5.2 存在安全升级提示，后续升级到已修复版本。
2. `@cloudflare/next-on-pages` 已不是当前正式部署方式；站点现在是静态 `output: export`，后续删除旧依赖和 `pages:build/pages:deploy` 脚本。
3. 90 个尚未进入 P2 的 `generated` 游戏仍使用基础日期/历史生成内容，进入对应 Topic 时逐批迁移。
4. Topic Hub 只在真实玩法集群形成时建立；当前正式 Hub 为 Tap、Merge，不批量生成空 Hub。

---

## 19. 当前执行顺序

### 已完成代码/内容批次：Tap Topic

```text
Quick Tap      optimized
Tap Tower      reviewed
Tap Tycoon     reviewed
Balloon Pop    reviewed
Gravity Flip   reviewed
Color Switch   reviewed
Tap Hub        implemented
```

剩余：5 个 reviewed 游戏人工移动端试玩后晋级。

### 当前批次：Merge Topic

```text
Hex Merge       reviewed
Merge Defense   reviewed
Pet Merge       reviewed
2048            reviewed
Merge Hub        implemented
```

源码、P2 内容、Hub、双向内链、sitemap、Build、Visual QA 已完成。剩余：4 个游戏人工移动端试玩后晋级。

### 下一 Topic

```text
Defense Games
├── Tower Defense
├── Plant Defense
└── Merge Defense（已有 P2 Profile，可复用真实机制）
```

最终节奏：

```text
一个 Topic 做完整代码/内容/自动QA
→ 上线
→ 人工移动验收决定 reviewed→optimized
→ GSC/GA4 观察
→ 下一个 Topic
```

暂不优先：

- 从100个游戏盲目扩到500个。
- 批量制造没有真实内容的 Topic Hub。
- 给每个长尾词单独建页面。
- 恢复假评分/播放量 Schema。

---

## 20. 文档维护规则

1. `docs/` 只保留 `README.md`。
2. 新增/删除游戏，同步更新总数、分类、库存。
3. 一个 Topic 开始 P2 时，同步记录 Topic、成员和状态。
4. `generated → reviewed → optimized` 必须同步本文。
5. 新 Topic Hub 上线时同步路由、关键词与内部链接架构。
6. SEO/CI/部署规则改变时直接修改本文，不创建第二份规划文档。
7. GSC 出现有意义的新阶段基线时更新关键数据，不写每日流水账。
8. 废弃规则直接删除；Git 历史就是历史记录。

任何新的 ChatGPT / Codex / 开发者接手项目时，先阅读本文件，即可知道：站点定位、100个游戏、当前 Topic、真实 SEO 标准、哪些页面完成、哪些页面还差 QA，以及下一步应该做什么。
