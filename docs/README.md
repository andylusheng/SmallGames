# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文件记录 ZeroPlay Games 的站点定位、100 游戏 SEO 状态、Gameplay Topic 架构、多语言结构、单游戏 SEO 标准、CI/Visual QA、移动端验证、部署和观察计划。
>
> 最近更新：2026-08-07 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 当前结论

- **品牌**：ZeroPlay Games
- **定位**：Free Play Games / Free Online Games
- **正式游戏**：100
- **传统 Browse Category**：9
- **正式 Gameplay Topic**：9
- **技术 SEO P0/P1**：完成
- **Topic Hub P2**：9/9 完成
- **单游戏内容 SEO**：**100/100 `optimized`**
- **generated 游戏**：**0**
- **英文主站**：`/`
- **繁體中文（台灣）**：`/zh-tw/`，独立路由与独立语言文件
- **既有 `/zh/`**：保留原代码，本轮不与 `/zh-tw/` 混合

第一轮观察窗口：

```text
2026-08-07 → 2026-08-21
```

这 14 天不再进行大规模游戏 SEO 重写、不批量新增 Topic、不改变游戏 URL 架构，只处理：

1. 索引 / Canonical / Hreflang / Sitemap 等明确技术错误。
2. Runtime 无法加载、页面断版等产品 Bug。
3. 明确错误的玩法事实。
4. 严重影响用户开始游戏的移动端问题。
5. `/zh-tw/` 首次上线所必需的多语言技术修复。

由于繁體中文版在观察窗口开始日上线，复盘时必须把 English 与 `/zh-tw/` 按页面前缀分别分析，不能把语言扩张带来的新增曝光误判为英文 SEO 本身的增长。

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
│   ├── /game/{slug}
│   └── /zh-tw/game/{slug}
│
└── L3  同一游戏页承接长尾意图
    ├── how to play
    ├── rules
    ├── controls
    ├── scoring / cost / reward
    ├── win / fail / end condition
    ├── duration / levels / waves
    ├── tips / strategy
    ├── best score / progress
    └── browser / mobile / no download
```

原则：

1. **每个正式游戏都必须有独立 SEO Profile。** 是否属于正式 Topic 不决定单页是否优化。
2. 一个游戏页承接一组同主题长尾词，不为同义词制造薄页面。
3. Topic Hub 是玩法级聚合与内链层，不替代单游戏 SEO。
4. 单游戏事实来自 Runtime 源码、产品行为、Git 历史、实际 QA 和 GSC Query；AI 只组织表达。
5. 同一游戏只维护一份真实机制 Profile，可以属于多个 Topic。
6. `seoStatus` 与 `testedMobile` 完全分离。
7. SEO 内容不能挡住产品。用户应先看到游戏和开始入口，再看到扩展正文。

---

## 3. 多语言结构

### 3.1 当前正式语言入口

```text
English
/
/game/{slug}
/{topic}-games
/{category}

Traditional Chinese (Taiwan)
/zh-tw/
/zh-tw/game/{slug}
/zh-tw/{topic}-games
/zh-tw/{category}
```

`/zh-tw/` 必须是独立目录，不和现有 `/zh/` 路由树混在一起。

### 3.2 文件隔离

```text
src/app/zh-tw/
    独立繁體中文路由、Legal、Search、Not Found

src/messages/zh-tw.json
    独立 UI 文案

src/data/zh-tw/
    独立繁體中文本地化层与台湾用语规则
```

禁止把第三种语言直接塞入 100 个现有 Profile 对象里，避免 `en / zh / zh-tw / ...` 无限膨胀导致事实与翻译耦合。

正确结构：

```text
Runtime / Game Mechanics（全球共享事实）
        ↓
GameSeoProfile.en / GameSeoProfile.zh（现有事实内容）
        ↓
src/data/zh-tw/ 独立本地化层
        ↓
/zh-tw/ 独立静态页面
```

繁體中文层会：

- 转成繁体字。
- 对常见 Web/UI 词使用台湾习惯，例如：`線上`、`滑鼠`、`螢幕`、`資訊`、`資料`、`軟體`、`伺服器`、`記憶體`、`資料夾`、`載入`、`設定`、`連結`、`帳號`、`儲存`、`觸控`、`搜尋`。
- 不重新发明游戏规则；计分、概率、时间、结束条件仍来自同一个 Runtime 事实源。

### 3.3 多语言 SEO

- `/zh-tw/*` 自引用 canonical。
- hreflang 使用 `zh-TW`。
- English 保持 `en` 与 `x-default`。
- `/zh-tw/` 100 个游戏页、9 个 Category、9 个 Topic 进入 sitemap。
- Search 为 `noindex, follow`。
- `VideoGame.inLanguage` / `CollectionPage.inLanguage` 在繁體页使用 `zh-TW`。
- Open Graph locale 使用 `zh_TW`。
- Header 只提供 English ↔ 繁體中文的明确切换入口；不把语言内容混在同一 URL。

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
| English Game SEO | `/game/{slug}` |
| zh-TW Game SEO | `/zh-tw/game/{slug}` |
| English Topic | `/{topic}-games` |
| zh-TW Topic | `/zh-tw/{topic}-games` |
| Analytics | GA4 + 游戏行为事件 |
| CI | Node 22 + 100-game SEO Gate + production build |
| Visual QA | 100 English Game Pages + 9 Topic Hubs + Mobile Shell + zh-TW smoke QA |

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

| 页面 | English | 繁體中文 | Index |
|---|---|---|---|
| 首页 | `/` | `/zh-tw` | index |
| Browse Category | `/{category}` | `/zh-tw/{category}` | index |
| Gameplay Topic | `/{topic}-games` | `/zh-tw/{topic}-games` | index |
| Game SEO | `/game/{slug}` | `/zh-tw/game/{slug}` | index |
| Raw Runtime | `/games/{slug}/index.html` | 共用 | `X-Robots-Tag: noindex, follow` |
| Search | `/search` | `/zh-tw/search` | `noindex, follow` |
| About / Legal | `/about` 等 | `/zh-tw/...` | index |

技术 SEO 基线：

- 自引用 canonical。
- hreflang + x-default。
- sitemap 只提交应索引 URL。
- Topic Hub 自动进入 sitemap。
- Raw Runtime 可抓取但不索引，避免与 SEO 页面竞争。
- Search 页面不索引且不进 sitemap。
- 不伪造 `lastModified`。
- 不输出虚假 rating / plays / reviews / AggregateRating。
- 100 个游戏全部使用独立 Title / Meta Description / H1。
- 繁體中文的游戏正文继续使用已核验的真实玩法事实，不重新生成玩法。

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
src/data/games.json                  100 个正式 slug
public/games/{slug}/index.html       真实 Runtime
src/data/game-profiles*              100 个源码级 SEO Profile
```

Production Build 会强制校验 inventory 与 Profile slug 一一对应。

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

每个 Topic 的繁體路由为：

```text
/zh-tw{English Topic Path}
```

例如：

```text
/tap-games        → /zh-tw/tap-games
/merge-games      → /zh-tw/merge-games
/reaction-games   → /zh-tw/reaction-games
```

Topic 以真实主要机制划分，不只看名称和 tags。一个游戏可以属于多个 Topic，但 Profile 只有一份。

---

## 8. 单游戏 SEO 状态

```text
generated
= 只有基础页，尚未完成逐游戏源码级 SEO

reviewed
= 历史中间状态；源码级内容已建立但尚未通过完整 Completion Gate

optimized
= 单游戏内容 SEO 已通过生产 Completion Gate
  不代表 testedMobile=true
```

当前：

```text
100 total games
100 optimized
0 reviewed
0 generated
9 formal Topic Hubs
```

特别保留的产品事实差异：

- Tangram 当前没有自动解题判定；`Next Puzzle` 是手动推进。
- Sand Fall 是开放粒子沙盒，没有分数、胜负和 Game Over。
- Pipe Connect 的成功条件是左上 BFS 网络到达右下格，不宣称所有随机棋盘保证可解。
- Bubble Cannon 当前源码没有真正实现 Game Over，也不会像 Bubble Shooter 一样清除失去顶部连接的悬空组。
- Bowling 当前使用简化倒瓶累计，不冒充正式 strike/spare 奖励计分。
- Boat Race 当前没有对手船，是单人河道距离 / 避障玩法。
- Asteroid Dodge 当前没有射击，是纯躲避玩法。
- Subway Dash 当前只有三车道换道，没有跳跃 / 下蹲。
- Chess Puzzle 是 8 个固定 `from/to` 答案，不冒充完整国际象棋引擎。
- Gomoku 当前没有明确满盘平局处理，因此页面不虚构自动平局。

---

## 9. 单游戏 Page Standard

100 个正式游戏必须有：

```text
Primary Keyword
至少 2 个 Secondary Keywords
Meta Title
Meta Description
H1
Intro
Objective
Controls
Game-specific Mechanics
About
至少 3 步 How to Play
至少 3 条 Rules
Scoring / Cost / Reward（适用时）
End / Win / Fail Condition（适用时）
至少 2 条 Tips
至少 3 个 Game-specific FAQ
Related Games
Topic backlink（属于正式 Topic 时）
```

内容标准：

- Title 必须体现该游戏真实独特机制。
- Description = 游戏目标 + 核心玩法 + 1～2 个具体事实。
- How to Play、Rules、FAQ 必须是这个游戏自己的事实。
- 保存进度、移动支持、计分、时间、等级、波次、概率、成本等声明必须可追溯。
- 没有某机制就不写；产品与常见同名玩法不同，以当前 Runtime 为准。
- 禁止虚构用户数、评分、播放量、评论、医学 / 科学基准。

---

## 10. 100-game SEO Completion Gate

`npm run build` 前先执行：

```text
npm run seo:verify
```

静态验证：

- `games.json` 必须正好 100 个正式游戏。
- 必须发现正好 100 个源码级 Profile。
- Inventory 与 Profile slug 必须一一对应。
- 不允许缺 Profile。
- 不允许库存外 Profile。

内容 Gate：

- Primary Keyword 存在。
- Secondary Keywords ≥ 2。
- Objective 完整。
- Controls ≥ 1。
- 至少 1 条源码级 Mechanics。
- Title / Description / H1 / Intro 完整。
- About ≥ 1 段。
- How to Play ≥ 3 步。
- Rules ≥ 3 条。
- Tips ≥ 2 条。
- FAQ ≥ 3 条。
- 同语言 Meta Title 不允许重复。
- 同语言 H1 不允许重复。

任何一个游戏失败：

```text
npm run build = FAIL
Cloudflare 不应发布
```

---

## 11. 移动端 QA 与 SEO 状态分离

```text
seoStatus=optimized
≠
testedMobile=true
```

`testedMobile=true` 只能在真人完成至少一个移动端核心玩法循环后设置。

CI Screenshot 负责断版、溢出、遮挡、Runtime 加载、导航、翻译和视觉回归；不等于真人触控试玩。

当前明确人工验证：

```text
Quick Tap: testedMobile=true
其他游戏：按各 Profile 实际 testedMobile 字段为准
```

移动端产品优先级：

```text
可玩的游戏 / 游戏入口
>
H1 + 极短说明
>
导航 / 搜索
>
SEO 扩展内容
>
广告
```

---

## 12. Structured Data

- `VideoGame`：只输出可验证字段。
- `BreadcrumbList`：属于正式 Topic 时优先体现主 Topic，否则回到 Browse Category。
- `FAQPage`：页面显示什么，Schema 才输出什么。
- Topic Hub：`CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- zh-TW 页面使用正确的 URL 与 `inLanguage`。
- 禁止虚构 `AggregateRating` / ratingCount / plays / reviews。

---

## 13. CI / Visual SEO QA

### Build CI

```text
Node 22
npm ci --legacy-peer-deps
npm run build
```

其中 `prebuild`：

```text
seo:verify
→ generate-game-index
→ Next build
```

production build 不通过，不合并。

### Visual SEO QA

English 全量：

```text
100 Game Pages × desktop/mobile/runtime
9 Topic Hubs × desktop/mobile
Mobile Shell baselines
```

繁體中文固定 Smoke QA：

```text
/zh-tw
/zh-tw/action
/zh-tw/game/quick-tap
/zh-tw/tap-games
```

每个繁體 Smoke 页面同时抓：

```text
1440×1200 desktop
390×844 mobile
```

并在 CI 中检查繁體首页实际输出 `免費線上`，游戏页 HTML 包含 `zh-TW`。

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

早期 GSC 基线（截至 2026-08-04）：

```text
13 clicks
872 impressions
CTR ≈ 1.49%
EN game pages ≈ 607 impressions / 10 clicks
Mobile CTR > Desktop CTR
```

### 2026-08-21 第一轮复盘

至少对比：

```text
1. English impressions / clicks / CTR / avg position
2. /zh-tw/ impressions / clicks / indexed pages / Query
3. 100 optimized 英文游戏页表现
4. 9 Topic Hub 表现
5. 新出现 Query 数量
6. Position 4–20 的机会 Query
7. 有曝光无点击页面
8. game_start / game_30s / game_60s
9. related_game_click
10. Country × Language 路径
```

判定：

- 有曝光、无点击 → 优先改 Title / Description / 意图匹配。
- 有点击、无 `game_start` → 修首屏 / 产品入口。
- `game_start` 高但 30s 留存低 → 修游戏，不堆 SEO 文字。
- Query 与现有页面高度相关 → 回填当前页，默认不新建 URL。
- 某机制形成稳定 Query Cluster → 再决定是否扩新 Topic。

---

## 15. 关键代码职责

```text
public/games/{slug}/
    100 个真实 HTML5 Runtime；玩法事实最终来源

src/data/games.json
    100 个正式游戏库存

src/data/game-profiles.ts
src/data/game-profiles/*.ts
    100 个源码级 SEO Profile

src/data/topic-seo.ts
src/data/topic-seo/*.ts
    9 个 Topic Hub

src/app/zh-tw/
    独立繁體中文路由树

src/messages/zh-tw.json
    独立繁體 UI 文案

src/data/zh-tw/
    独立繁體 / 台湾用语本地化层

src/lib/games.ts
    游戏读取、Profile覆盖、locale内容解析、Topic关系

src/lib/metadata.ts
    canonical / hreflang / locale metadata

src/views/GamePageView.tsx
    单游戏 SEO 视图

src/views/TopicPageView.tsx
    Topic Hub 视图

scripts/verify-all-game-seo.mjs
    100 inventory slug ↔ 100 Profile Gate

scripts/generate-game-index.js
    Search Index

.github/workflows/ci.yml
    Production build

.github/workflows/visual-seo.yml
    English 全量 + zh-TW locale smoke visual regression

docs/README.md
    唯一 SSOT
```

---

## 16. 当前决策

### 已完成

```text
P0/P1 Technical SEO
100 game inventory cleanup
100 Runtime 源码复核
100 source-grounded single-game SEO profiles
100 / 100 game content SEO optimized
9 Gameplay Topic Hubs
English production routes
/zh-tw/ 独立繁體中文路由、UI、SEO本地化层
canonical / hreflang / sitemap
100-game SEO Completion Gate
Visual SEO QA pipeline
```

### 2026-08-07 → 2026-08-21

本批次部署后：

```text
冻结大规模单游戏 SEO 改写
不为了数量继续新增 Topic
不频繁修改 100 个页面的 Title / 正文

主要动作：
观察 English GSC
单独观察 /zh-tw/ GSC
观察 GA4 engagement
记录新 Query
修技术 Bug
修明显产品 Bug
```

### 2026-08-21 之后

根据数据决定：

1. 哪些英文游戏页真正获得曝光与点击。
2. `/zh-tw/` 是否开始被抓取、索引并出现台湾 / 港澳 / 海外繁中 Query。
3. 哪些 Topic 有真实增长。
4. 哪些单游戏页需要第二轮 Title / FAQ / 内容迭代。
5. 是否值得继续新增西班牙语、葡萄牙语等下一语言，而不是一次性铺大量翻译页。

---

## 17. 技术债

1. Next.js 15.5.2 存在安全升级提示，后续升级到已修复版本。
2. `@cloudflare/next-on-pages` 已不是正式部署链路；当前是 static export，后续删除旧依赖和 deploy scripts。
3. npm audit 仍有依赖安全告警，需要单独升级验证。
4. `VideoGame.operatingSystem` 等 Schema 字段继续按真实平台能力保守维护。
5. Topic 不以数量为 KPI；没有真实语义差异和搜索需求时不创建空 Hub。
6. 繁體本地化必须持续检查台湾词汇习惯，不能仅把简体字机械转换成繁体字就视为最终语言质量。

---

## 18. 文档维护规则

1. `docs/` 只维护本 `README.md`。
2. 新增 / 删除游戏要同步总数和分类计数。
3. 新 Topic 上线要同步成员和 URL。
4. 新语言必须有独立 route folder、message file 和 locale data layer，不与其他语言内容混写。
5. 所有正式游戏必须保持 `seoStatus=optimized`；新增游戏在 Profile 和 Gate 完成前不能进入正式库存。
6. `seoStatus` 和 `testedMobile` 永远分别记录。
7. SEO / Mobile / CI / 部署 / i18n 标准变化直接改本文，不创建平行规划文档。
8. GSC 出现有意义的新阶段基线再更新，不写每日流水账。
9. 过期规则直接删除，Git 历史保存历史。

当前最重要的项目状态：

> **100 个正式游戏单页 SEO 已完成；9 个 Topic Hub 已完成；繁體中文以独立 `/zh-tw/` 路由树上线，不与既有 `/zh/` 混写。部署后到 2026-08-21 分别观察 English 与 zh-TW 的 GSC + GA4 数据。**
