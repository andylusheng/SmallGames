# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文记录 ZeroPlay Games 当前正式架构、100 游戏库存、SEO、多语言、首页发现结构、QA、性能、部署和观察规则。后续项目状态以本文件和生产代码为准。
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
- 正式语言：English / 简体中文 / 繁體中文（台灣） / Español
- 首页：10 款热门游戏 + 9 个分类卡片 + 每分类 4 款代表游戏
- 全游戏目录：4 语言独立 `/all-games`
- 游戏页桌面右栏：4 款同类别推荐 + 4 款跨类别发现
- 移动端 Header：390px 宽度必须完整落在单屏内，不允许横向溢出
- 语言切换：地球图标下拉，顶部显示 `EN / 简 / 繁 / ES`

第一轮观察窗口：

```text
2026-08-07 → 2026-08-21
```

观察期内不进行无数据依据的大规模 SEO 重写，不为了页面数量批量新增 Topic，不改变现有单游戏 URL 架构。优先处理：索引技术错误、页面断版、Runtime 加载错误、玩法描述错误、明显产品 Bug、多语言问题和性能问题。

---

## 2. 首页与 Game Discovery 架构

首页职责不是把 100 款游戏全部平铺，而是帮助用户快速开始和继续发现。

正式首页顺序：

```text
Header
│
├── H1 + 简短说明
│
├── Popular Games
│   └── 固定展示 10 款
│
├── Browse Game Categories
│   └── 9 个 Category Cards
│
├── Ad
│
├── Action       4 款代表游戏 → View all
├── Puzzle       4 款代表游戏 → View all
├── Arcade       4 款代表游戏 → View all
├── Racing       4 款代表游戏 → View all
├── Sports       4 款代表游戏 → View all
├── Shooting     4 款代表游戏 → View all
├── Strategy     4 款代表游戏 → View all
├── Casual       4 款代表游戏 → View all
├── Idle         4 款代表游戏 → View all
│
└── Footer
```

首页规则：

1. 不再同时维护 Featured Games 与 Popular Games，避免用户意图重复。
2. Popular Games 固定 10 款，首屏只对前 2 张缩略图使用高优先级加载。
3. Category Card 展示分类名称和真实库存数量，直接链接正式 Category Page。
4. 每个 Category 在首页展示 4 款代表游戏；候选优先考虑 `popular`、`featured`、较新更新时间，再按 slug 保持稳定排序。
5. Category Section 继续输出在静态 HTML 中，但使用 `content-visibility: auto` 延迟屏幕外渲染。
6. Category 游戏图片继续 `loading="lazy"`，不使用 JS 无限滚动和额外 API 请求。
7. 首页不承担完整 100 游戏库存；完整库存统一进入 `/all-games`。

### All Games 页面

正式目录：

```text
/all-games
/zh/all-games
/zh-tw/all-games
/es/all-games
```

页面规则：

- 100 款游戏全部展示。
- 按 9 个正式 Category 分组。
- 顶部提供 Category Anchor 快捷入口。
- 每组可以进入独立 Category Page。
- 所有下方缩略图 lazy-load。
- 页面允许索引，有 self canonical / hreflang / x-default，并进入 sitemap。

**不使用 `/games` 作为 All Games SEO 页。**

原因：`/games/{slug}/index.html` 已经是 Raw Runtime 的正式命名空间。全游戏目录使用 `/all-games`，避免 SEO 页面与 Runtime 目录发生路径语义和静态输出冲突。

---

## 3. 搜索架构

```text
L0  Home / All Games / Category Discovery
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
├── L1  Category Pages
│   └── 9 个 /{category}
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
4. Category 负责库存分类；All Games 负责完整目录；Home 负责发现，不让三种页面承担重复职责。
5. 游戏事实来自 Runtime 源码、产品行为、Git 历史和 QA，不虚构常见同名玩法。
6. 一个游戏可以属于多个 Topic，但只维护一份真实机制 Profile。
7. SEO 内容不能挡住游戏入口；用户应先看到游戏和开始入口。

---

## 4. 多语言结构

### English

```text
/
/all-games
/game/{slug}
/{topic}-games
/{category}
/search
/about
/privacy
/terms
/dmca
```

### 简体中文

```text
/zh
/zh/all-games
/zh/game/{slug}
/zh/{topic}-games
/zh/{category}
/zh/search
/zh/about
/zh/privacy
/zh/terms
/zh/dmca
```

### 繁體中文（台灣）

```text
/zh-tw
/zh-tw/all-games
/zh-tw/game/{slug}
/zh-tw/{topic}-games
/zh-tw/{category}
/zh-tw/search
/zh-tw/about
/zh-tw/privacy
/zh-tw/terms
/zh-tw/dmca
```

### Español

```text
/es
/es/all-games
/es/game/{slug}
/es/{topic}-games
/es/{category}
/es/search
/es/about
/es/privacy
/es/terms
/es/dmca
```

语言目录彼此独立，不把不同语言页面混进同一 URL。

主要文件：

```text
src/app/zh/
src/app/zh-tw/
src/app/es/

src/messages/zh.json
src/messages/zh-tw.json
src/messages/es.json

src/data/zh/category-seo.ts
src/data/zh-tw/
src/data/es/
```

语言切换规则：

- Header 使用 `Globe` 地球图标 + 下拉菜单。
- 顶部不横向平铺语言全称。
- 当前语言简写：`EN / 简 / 繁 / ES`。
- 下拉菜单展示完整语言名称。
- 切换语言时保持当前等价路径，例如 `/game/2048` → `/zh/game/2048` → `/es/game/2048`。

多语言 SEO：

- 每个语言页面自引用 canonical。
- hreflang：`en`、`zh`、`zh-TW`、`es`。
- `x-default` 指向 English。
- Search 页面 `noindex, follow` 且不进 sitemap。
- Raw Runtime 不作为 SEO 落地页。
- Open Graph / Structured Data 使用对应 locale / inLanguage。

---

## 5. 简体中文版标准

简体版是正式语言版本，不是占位版本。

已包含：

- `/zh` 首页
- `/zh/all-games`
- 100 个 `/zh/game/{slug}`
- 9 个 `/zh/{category}`
- 9 个 `/zh/{topic}-games`
- `/zh/search`
- About / Privacy / Terms / DMCA / Not Found

游戏内容：

- 100 个游戏继续使用 `GameSeoProfile.zh` 事实内容。
- Title / Description / H1 / How to Play / Rules / FAQ 以真实 Runtime 为准。
- 不重新发明中文版本玩法。

9 个简体 Category 使用事实化内容层：

```text
src/data/zh/category-seo.ts
```

规则：

- 不统一宣称所有游戏支持触屏。
- 不统一宣称固定 60fps。
- 不统一宣称自动保存。
- 不统一宣称有离线收益 / Boss / 氮气 / 正式体育计分等机制。
- 手机、键盘、鼠标支持按具体游戏说明。
- 保存、计分、关卡和结束条件按当前 Runtime 说明。

该事实化 Category 内容同时作为繁體版 Category 的事实源，再做繁体 / 台湾用语转换。

简体搜索独立索引：

```text
public/games-index-zh.json
```

Build 生成：

```text
games-index.json          English
games-index-zh.json       简体中文
games-index-zh-tw.json    繁體中文
```

`/zh/search` 不读取英文搜索索引。

---

## 6. 技术与部署

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
generate-game-index
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

## 7. 路由与索引策略

应索引：

- Home
- All Games
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

当前 sitemap 包含：

```text
400 Game URLs        100 × 4 languages
36 Category URLs     9 × 4 languages
36 Topic URLs        9 × 4 languages
20 Home/Legal URLs   5 × 4 languages
4 All Games URLs
--------------------
496 indexable URLs
```

Search 不进 sitemap；Raw Runtime 不作为 SEO sitemap URL。

---

## 8. 100 游戏库存

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

## 9. 9 个正式 Gameplay Topic

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

## 10. 单游戏 Page Standard 与推荐结构

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

桌面游戏页右栏：

```text
More {Current Category} Games
└── 4 款同类别游戏

Explore Other Games
└── 4 款来自不同 Category 的游戏
```

跨类别推荐规则：

- 排除当前游戏和当前 Category。
- 尽量从不同 Category 各取一款。
- 每个游戏使用 slug 生成确定性轮换，不使用每次刷新变化的随机数。
- 候选优先 popular / featured / 较新更新时间。
- 显示目标游戏所属 Category。
- EN / zh / zh-TW / es 使用独立标题。

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

## 11. SEO Completion Gate

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

## 12. 当前 QA 标准

### 当前阶段不要求逐款真人移动端通关验证

`testedMobile=true` 不作为当前版本上线门槛，也不是当前阶段必须补齐的 KPI。

当前发布验收重点：

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
390×844 mobile screenshot
断版 / 溢出 / 遮挡
多语言 smoke QA
```

不要求为了 `testedMobile` 字段人工逐个玩完 100 款游戏。出现真实用户问题、GA4 异常、设备兼容问题或重点游戏需要深测时，再做针对性真人 QA。

---

## 13. 移动端 UI 标准

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

## 14. 性能标准

当前 PageSpeed 优化方向基于移动端报告：首屏 JS 阻塞较低，优先处理 LCP、图片加载和不必要客户端资源。

当前实施：

- 首页删除重复 Featured Games 大图区块。
- 首页热门游戏只展示 10 款。
- 首屏只优先加载前 2 张热门缩略图，其余图片 lazy-load。
- GameCard 图片设置明确 `width / height` 与 `decoding="async"`。
- 客户端 i18n 不再同时打包 EN / zh / zh-TW / es 四套 messages；服务端只把当前 locale messages 传给 `I18nProvider`。
- 首页 9 个 Category Section 使用 `content-visibility: auto` 延迟屏幕外渲染。
- `/all-games` 的完整库存图片全部按视口 lazy-load，不做无限滚动 API。
- 不为了 Lighthouse 跑分延迟或删除必要 Analytics。

性能复测重点：

```text
Performance
LCP
FCP
Speed Index
TBT
CLS
Unused JavaScript
```

---

## 15. Structured Data

- `VideoGame`：只输出可验证字段。
- `BreadcrumbList`：优先体现主 Gameplay Topic，否则回到 Category。
- `FAQPage`：页面显示什么，Schema 才输出什么。
- Topic Hub：`CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- 多语言页面使用对应 URL 与 `inLanguage`。
- 禁止虚构 AggregateRating / ratingCount / plays / reviews。

---

## 16. CI / Visual SEO QA

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

Simplified Chinese smoke:
/zh
/zh/action
/zh/game/quick-tap
/zh/tap-games
+ public/games-index-zh.json existence

Traditional Chinese smoke:
/zh-tw
/zh-tw/action
/zh-tw/game/quick-tap
/zh-tw/tap-games

Spanish smoke:
/es
/es/action
/es/game/quick-tap
/es/tap-games
```

Locale smoke 页面抓取：

```text
1440×1200 desktop
390×844 mobile
```

---

## 17. Analytics 与观察指标

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

早期 GSC 基线（截至 2026-08-04）：

```text
13 clicks
872 impressions
CTR ≈ 1.49%
EN game pages ≈ 607 impressions / 10 clicks
Mobile CTR > Desktop CTR
```

2026-08-21 第一轮复盘至少观察：

1. English impressions / clicks / CTR / avg position
2. `/zh/` impressions / clicks / indexed pages / Query
3. `/zh-tw/` impressions / clicks / indexed pages / Query
4. `/es/` impressions / clicks / indexed pages / Query
5. 100 optimized 英文游戏页表现
6. 9 Topic Hub 表现
7. `/all-games` 与 Category 的发现 / 内链表现
8. 新出现 Query 数量
9. Position 4–20 的机会 Query
10. 有曝光无点击页面
11. game_start / game_30s / game_60s
12. related_game_click
13. Country × Language 路径

判定：

- 有曝光、无点击 → 优先改 Title / Description / 意图匹配。
- 有点击、无 `game_start` → 修首屏 / 产品入口。
- `game_start` 高但 30s 留存低 → 修游戏，不堆 SEO 文字。
- `related_game_click` 低 → 优化推荐位置、推荐相关度或发现结构。
- Query 与现有页面高度相关 → 回填当前页，默认不新建 URL。
- 某机制形成稳定 Query Cluster → 再决定是否扩新 Topic。

---

## 18. 当前决策

### 已完成

```text
P0/P1 Technical SEO
100 game inventory
100 Runtime 源码复核
100 source-grounded single-game SEO profiles
100 / 100 game content SEO optimized
9 Gameplay Topic Hubs
English production routes
/zh/ 简体中文正式版本
/zh/ 独立中文搜索索引
/zh/ 9 Category 事实化内容
/zh/ 独立 locale smoke QA
/zh-tw/ 独立繁體中文版本
/es/ 独立西班牙语版本
canonical / hreflang / sitemap
100-game SEO Completion Gate
Visual SEO QA pipeline
390px mobile Header 修复
Globe language dropdown
首页 Popular 10 + 9 Category Cards + Category Highlights
4-language /all-games catalog
Game Page same-category + cross-category discovery
```

### 当前阶段

```text
冻结无数据依据的大规模单游戏 SEO 改写
不为了数量继续新增 Topic
不频繁修改 100 个页面 Title / 正文

主要动作：
观察 GSC 各语言索引和 Query
观察 GA4 engagement / related_game_click
观察 Home → Category / Game Discovery
继续复测 PageSpeed / LCP
记录新 Query
修技术 Bug
修明显产品 Bug
处理 Runtime 错误
```

---

## 19. 技术债

1. Next.js 15.5.2 存在安全升级提示，后续升级到已修复版本。
2. `@cloudflare/next-on-pages` 属于旧部署遗留依赖；当前正式链路是 static export。
3. npm audit 仍有依赖安全告警，需要单独升级验证。
4. `VideoGame.operatingSystem` 等 Schema 字段继续按真实平台能力保守维护。
5. Topic 不以数量为 KPI；没有真实语义差异和搜索需求时不创建空 Hub。
6. 多语言内容继续检查本地语言质量，不能只做字面翻译。

---

## 20. 文档维护规则

1. `docs/` 只维护本 `README.md` 作为 SSOT。
2. 新增 / 删除游戏要同步总数和分类计数。
3. 新 Topic 上线要同步成员和 URL。
4. 新语言必须有独立 route folder、message / locale data，并加入 canonical / hreflang / sitemap / smoke QA。
5. 首页发现结构、All Games、Category 和推荐逻辑发生正式变化时同步本文。
6. 正式游戏进入库存前必须通过 Profile 与 SEO Gate。
7. 页面、内容、Runtime 正常是当前 QA 上线门槛；不要求 100 款逐个人工通关。
8. SEO / Mobile / CI / 部署 / i18n / Performance 标准变化直接改本文，不创建平行规划文档。
9. GSC 出现有意义的新阶段基线再更新，不写每日流水账。
10. 过期规则直接删除，Git 历史保存历史。

当前项目状态：

> **ZeroPlay Games 已形成 100 个正式游戏、9 个 Category、9 个 Gameplay Topic、4 套语言的稳定生产架构。首页从“堆游戏”调整为 Popular → Category → Category Highlights 的发现漏斗，并新增 4-language `/all-games` 完整目录；当前重点转向 Google 索引 / Query / CTR、页面性能和用户从第一款游戏继续发现第二款游戏的行为数据。**
