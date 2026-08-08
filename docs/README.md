# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文记录 ZeroPlay Games 当前正式架构、100 游戏库存、SEO、多语言、QA、部署和观察规则。后续项目状态以本文件和生产代码为准。
>
> 最近更新：2026-08-08 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 当前状态

- 品牌：ZeroPlay Games
- 定位：Free Play Games / Free Online Games
- 正式游戏：100
- Browse Category：9
- Gameplay Topic Hub：9
- 技术 SEO P0/P1：完成
- Topic Hub P2：9/9 完成
- 单游戏内容 SEO：100/100 `optimized`
- generated 游戏：0
- Production branch：`master`
- Hosting：Cloudflare Pages
- 当前正式语言：English / 简体中文 / 繁體中文（台灣） / Español
- 移动端 Header：390px 宽度必须完整落在单屏内，不允许横向溢出
- 语言切换：统一使用地球图标下拉菜单，顶部只显示当前语言简写 `EN / 简 / 繁 / ES`

第一轮观察窗口：

```text
2026-08-07 → 2026-08-21
```

观察期内不进行无数据依据的大规模 SEO 重写，不为了页面数量批量新增 Topic，不改变现有游戏 URL 架构。优先处理：索引技术错误、页面断版、Runtime 加载错误、玩法描述错误、明显产品 Bug 和多语言问题。

---

## 2. 搜索架构

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
├── L2  100 个独立游戏 SEO 页
│   └── /game/{slug}
│
└── L3  同一游戏页承接长尾意图
    ├── how to play
    ├── rules
    ├── controls
    ├── scoring / reward
    ├── win / fail / end condition
    ├── duration / levels / waves
    ├── tips / strategy
    └── browser / mobile / no download
```

原则：

1. 每个正式游戏有独立 SEO Profile。
2. 不为同义词制造薄页面。
3. Topic Hub 负责玩法聚合和内链，不替代单游戏 SEO。
4. 游戏事实来自 Runtime 源码、产品行为、Git 历史和 QA，不虚构常见同名玩法。
5. 一个游戏可以属于多个 Topic，但只维护一份真实机制 Profile。
6. SEO 内容不能挡住游戏入口；用户应先看到游戏和开始入口。

---

## 3. 多语言结构

### English

```text
/
/game/{slug}
/{topic}-games
/{category}
```

### 简体中文

```text
/zh
/zh/game/{slug}
/zh/{topic}-games
/zh/{category}
```

### 繁體中文（台灣）

```text
/zh-tw
/zh-tw/game/{slug}
/zh-tw/{topic}-games
/zh-tw/{category}
```

### Español

```text
/es
/es/game/{slug}
/es/{topic}-games
/es/{category}
```

语言目录彼此独立，不把不同语言页面混进同一 URL。

文件结构：

```text
src/app/zh/
src/app/zh-tw/
src/app/es/

src/messages/zh-tw.json
src/messages/es.json

src/data/zh-tw/
src/data/es/
```

语言切换规则：

- Header 使用 `Globe` 地球图标 + 下拉菜单。
- 顶部不再横向平铺 `English / Español / ...`。
- 当前语言使用简写：`EN / 简 / 繁 / ES`。
- 下拉菜单展示完整语言名称。
- 切换语言时尽量保持当前等价路径，例如 `/game/2048` → `/es/game/2048`。

多语言 SEO：

- 每个语言页面自引用 canonical。
- hreflang：`en`、`zh`、`zh-TW`、`es`。
- `x-default` 指向 English。
- Search 页面 `noindex, follow` 且不进 sitemap。
- Raw Runtime 不参与 SEO 页面竞争。
- Open Graph / Structured Data 使用对应 locale / inLanguage。

---

## 4. 技术与部署

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
| Runtime | `/public/games/{slug}/index.html` |
| CI | Node 22 + SEO Gate + production build |
| Analytics | GA4 + 游戏行为事件 |

部署链：

```text
GitHub master
    ↓
Cloudflare Pages
    ↓
npm run build
    ↓
seo:verify
    ↓
Next.js static export
    ↓
out/
    ↓
zeroplaygames.com
```

Cloudflare：

```text
Production branch: master
Build command: npm run build
Build output: out
NODE_VERSION=22
NEXT_PUBLIC_SITE_URL=https://zeroplaygames.com
```

---

## 5. 路由与索引策略

应索引：

- Home
- Category
- Gameplay Topic
- Game SEO Page
- About / Legal

不应索引：

- Search：`noindex, follow`
- Raw Runtime：不作为搜索落地页

技术 SEO 基线：

- self canonical
- hreflang + x-default
- sitemap 仅提交应索引 URL
- 不伪造 rating / plays / reviews / AggregateRating
- 不凭空编造更新时间
- 100 个游戏使用独立 Title / Meta Description / H1
- 多语言正文必须继承已核验的玩法事实

当前 sitemap 按 4 套语言生成 Game / Category / Topic / Home / Legal URL。

---

## 6. 100 游戏库存

| Category | 数量 | 单页 SEO |
|---|---:|---:|
| action | 6 | 6 optimized |
| arcade | 23 | 23 optimized |
| casual | 13 | 13 optimized |
| idle | 6 | 6 optimized |
| puzzle | 22 | 22 optimized |
| racing | 6 | 6 optimized |
| shooting | 8 | 8 optimized |
| sports | 9 | 9 optimized |
| strategy | 7 | 7 optimized |
| **Total** | **100** | **100 optimized** |

事实源：

```text
src/data/games.json
public/games/{slug}/index.html
src/data/game-profiles.ts
src/data/game-profiles/*.ts
```

Production Build 强制校验 inventory 与 Profile slug 一一对应。

---

## 7. 9 个正式 Gameplay Topic

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

Topic 以真实主要机制划分，不只看名字和 tags。

---

## 8. 单游戏 Page Standard

100 个正式游戏必须有：

```text
Primary Keyword
Secondary Keywords >= 2
Meta Title
Meta Description
H1
Intro
Objective
Controls
Game-specific Mechanics
About
How to Play >= 3
Rules >= 3
Tips >= 2
FAQ >= 3
Related Games
Topic backlink（适用时）
```

内容规则：

- Title / Description 必须对应当前 Runtime 的真实玩法。
- How to Play、Rules、FAQ 必须是该游戏自己的事实。
- 保存进度、计分、时间、等级、波次、概率、成本等声明必须可追溯。
- 没有某机制就不写。
- 产品与常见同名玩法不一致时，以本站 Runtime 为准。

特别保留的事实差异：

- Tangram 没有自动解题判定，`Next Puzzle` 手动推进。
- Sand Fall 是开放粒子沙盒，没有分数、胜负和 Game Over。
- Pipe Connect 不宣称所有随机棋盘保证可解。
- Bubble Cannon 当前没有真正 Game Over，也不清除悬空组。
- Bowling 使用简化倒瓶累计，不冒充正式 strike/spare 计分。
- Boat Race 是单人河道距离 / 避障玩法，没有对手船。
- Asteroid Dodge 没有射击。
- Subway Dash 只有三车道换道，没有跳跃 / 下蹲。
- Chess Puzzle 是固定题目答案，不冒充完整国际象棋引擎。
- Gomoku 当前没有明确满盘平局处理。

---

## 9. SEO Completion Gate

`npm run build` 前执行 SEO 验证。

必须保证：

- games inventory = 100
- Profile = 100
- slug 一一对应
- Primary Keyword 存在
- Secondary Keywords >= 2
- Objective / Controls / Mechanics 完整
- Title / Description / H1 / Intro 完整
- About / How to Play / Rules / Tips / FAQ 达标
- 同语言 Meta Title 不重复
- 同语言 H1 不重复

任何正式游戏失败，production build 应失败。

---

## 10. 当前 QA 标准

### 当前阶段不要求逐款真人移动端通关验证

`testedMobile=true` **不再作为当前版本上线门槛，也不是当前阶段必须补齐的 KPI**。

当前发布验收重点只有三类：

1. **页面正确**
   - 320px / 360px / 390px 等移动宽度不出现明显横向溢出。
   - Header、Breadcrumb、H1、游戏容器和正文不破版。
   - Desktop / Mobile 页面均可正常打开。

2. **内容正确**
   - Title / Description / H1 / Intro 与游戏真实玩法一致。
   - How to Play / Rules / FAQ 不虚构机制。
   - 多语言内容不改变玩法事实。

3. **游戏 Runtime 正常**
   - HTML5 Runtime 可加载。
   - 页面能点击 Start 并进入游戏。
   - 无明显 JS / 加载错误或致命 Bug。
   - 游戏核心操作和页面容器不被 UI 阻挡。

CI / Visual QA 用于覆盖：

```text
Build
页面生成
Runtime 文件存在
Desktop screenshot
390x844 mobile screenshot
断版 / 溢出 / 遮挡
多语言 smoke QA
```

不要求为了 `testedMobile` 字段人工逐个玩完 100 款游戏。

后续只有出现真实用户问题、GA4 异常、设备兼容问题或重点游戏需要深测时，再做针对性真人 QA。

---

## 11. 移动端 UI 标准

移动端优先级：

```text
可玩的游戏 / Start
>
H1 + 简短说明
>
导航 / 语言 / 搜索
>
SEO 扩展内容
>
广告
```

Header 规则：

- 390px 宽度必须完整落在一个 viewport 内。
- Logo / 品牌区域允许收缩，但不能把右侧操作推出屏幕。
- 语言入口只显示地球图标 + 当前语言简写。
- 语言列表放到 dropdown，不横向平铺。
- Mobile Menu 独立保留汉堡按钮。
- Header 不允许产生横向滚动条。

---

## 12. Structured Data

- `VideoGame`：只输出可验证字段。
- `BreadcrumbList`：优先体现主 Gameplay Topic，否则回到 Category。
- `FAQPage`：页面显示什么，Schema 才输出什么。
- Topic Hub：`CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- 多语言页面使用对应 URL 与 `inLanguage`。
- 禁止虚构 AggregateRating / ratingCount / plays / reviews。

---

## 13. CI / Visual SEO QA

Build CI：

```text
Node 22
npm ci --legacy-peer-deps
npm run build
```

Visual QA 当前覆盖：

```text
English 100 Game Pages × desktop/mobile/runtime
9 Topic Hubs × desktop/mobile
Mobile Shell baselines
zh-TW smoke QA
Spanish smoke QA
```

移动截图标准尺寸包含：

```text
390 × 844
```

该检查代表页面布局 / 加载 / visual regression，不代表必须人工通关每款游戏。

---

## 14. Analytics 与观察指标

GA4 当前事件：

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

GSC 早期基线，截至 2026-08-04：

```text
13 clicks
872 impressions
CTR ≈ 1.49%
EN game pages ≈ 607 impressions / 10 clicks
Mobile CTR > Desktop CTR
```

2026-08-21 第一轮复盘重点：

- English / zh / zh-tw / es 按路径拆分表现
- indexed pages
- impressions / clicks / CTR / avg position
- 新 Query
- Position 4–20 Query
- 有曝光无点击页面
- game_start / game_loaded / game_30s / game_60s
- related_game_click
- game_error

判断规则：

- 有曝光无点击 → 查 Title / Description / Search Intent。
- 有点击无 `game_start` → 查首屏、Start 和页面产品入口。
- `game_start` 高但 30s 低 → 查 Runtime / 游戏体验，不继续堆 SEO 文本。
- Query 与现有页高度相关 → 优先更新当前页，不新造 URL。
- 稳定机制 Query Cluster 出现后再考虑新 Topic。

---

## 15. 当前已完成

```text
P0/P1 Technical SEO
100 game inventory cleanup
100 source-grounded game SEO profiles
100 / 100 game content SEO optimized
9 Gameplay Topic Hubs
English production routes
/zh/ routes
/zh-tw/ 独立繁體路由和本地化层
/es/ 独立西班牙语路由和本地化层
canonical / hreflang / sitemap
100-game SEO Completion Gate
Visual SEO QA pipeline
GA4 game events
390px mobile Header 修复
Globe language dropdown
```

---

## 16. 当前决策

到 2026-08-21 之前：

```text
不大规模重写 100 个 Game SEO 页面
不为了数量新增 Topic
不频繁改 Title / 正文
不要求逐款真人移动端验证

重点：
检查页面 / 文案 / Runtime 是否正常
修 Bug
观察 Google 索引
观察 GSC Query
观察 GA4 engagement
记录真实用户问题
```

下一阶段是否扩 Situation Pages、Games Like、New Games、榜单类页面，以真实 GSC + GA4 数据决定，不批量制造薄页面。

---

## 17. 技术债

1. Next.js 15.5.2 后续升级到已修复安全版本。
2. 清理旧 `@cloudflare/next-on-pages` 依赖和遗留 deploy scripts。
3. npm audit 告警单独升级验证。
4. Schema 字段继续保守维护。
5. Topic 不以数量为 KPI。
6. 多语言翻译继续做语言质量抽查，不能机械翻译玩法事实。

---

## 18. 文档维护规则

1. `docs/README.md` 是唯一 SSOT。
2. 新增 / 删除游戏必须同步库存与分类计数。
3. 新 Topic 必须同步 URL 与 Members。
4. 新语言使用独立 route folder / message / locale data layer。
5. 正式游戏保持 `seoStatus=optimized`。
6. 当前阶段 `testedMobile` 不作为上线门槛。
7. UI / SEO / CI / 部署 / i18n / QA 标准变化直接更新本文。
8. GSC 出现新阶段基线再更新，不写每日流水账。
9. 过期规则直接删除，历史交给 Git 保存。

当前最重要的项目状态：

> **100 个正式游戏 SEO、9 个 Topic Hub、English / zh / zh-TW / es 四套路由均已进入生产体系；当前重点从继续堆页面转向页面与 Runtime 稳定性、Google 索引、GSC Query 和 GA4 行为验证。移动端不再要求逐款真人验证，当前验收以页面无破版、内容描述准确、游戏可正常加载运行且无明显 Bug 为准。**
