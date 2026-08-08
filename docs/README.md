# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文记录 ZeroPlay Games 当前正式架构、100 游戏库存、SEO、多语言、首页发现结构、QA、性能、部署、数据观察和运营推广规则。后续项目状态以本文件和生产代码为准。
>
> 最近更新：2026-08-08 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 当前状态

- 品牌：ZeroPlay Games
- 定位：Free Play Games / Free Online Games
- 正式游戏：100
- Category：9
- Gameplay Topic Hub：9
- 正式语言：English / 简体中文 / 繁體中文（台灣） / Español
- 单游戏内容 SEO：100/100 `optimized`
- Technical SEO P0/P1：完成
- Topic Hub P2：9/9 完成
- Production branch：`master`
- Hosting：Cloudflare Pages
- Build：Next.js static export → `out/`
- Sitemap：496 个应索引 URL
- 首页：10 款热门游戏 + 9 个分类 Section，每类展示 5 款代表游戏
- 首页不再显示独立的 Category Card 模块
- `/all-games`：4 语言独立完整游戏目录，直接按 Category 展示，不再显示顶部 Category Shortcut Cards
- 游戏页桌面右栏：4 款同类别推荐 + 4 款跨类别发现
- 移动端 Header：390px 宽度完整落在单屏内
- 语言切换：Globe 下拉，顶部简写 `EN / 简 / 繁 / ES`

第一轮观察窗口：

```text
2026-08-07 → 2026-08-21
```

观察期原则：

- 不进行无数据依据的大规模单游戏 SEO 重写。
- 不为了数量继续扩 Topic。
- 不频繁改 100 个页面 Title / 正文。
- 优先处理索引、性能、页面断版、Runtime 错误、描述错误和明显产品 Bug。
- 运营重点从“继续开发页面”切换到“Google 验证 + 用户验证 + 外部流量获取”。

---

## 2. 首页与 Game Discovery

首页职责：**快速开始 + 分类发现**，不是完整库存页。

正式首页顺序：

```text
Header
│
├── H1 + 简短说明
│
├── Popular Games
│   └── 固定展示 10 款
│
├── Ad
│
├── Action       5 款代表游戏 → View more games
├── Puzzle       5 款代表游戏 → View more games
├── Arcade       5 款代表游戏 → View more games
├── Racing       5 款代表游戏 → View more games
├── Sports       5 款代表游戏 → View more games
├── Shooting     5 款代表游戏 → View more games
├── Strategy     5 款代表游戏 → View more games
├── Casual       5 款代表游戏 → View more games
├── Idle         5 款代表游戏 → View more games
│
└── Footer
```

首页规则：

1. 不同时维护 Featured Games 与 Popular Games。
2. Popular Games 固定 10 款。
3. 首屏只对前 2 张热门缩略图使用高优先级加载。
4. 首页不再维护独立“浏览游戏分类 / Browse Game Categories”卡片模块。
5. 每个 Category 展示 5 款代表游戏。
6. 候选优先 `popular` → `featured` → `updatedAt` → `slug`，保持稳定排序。
7. Category Section 输出在静态 HTML 中，使用 `content-visibility: auto` 延迟屏幕外渲染。
8. Category 游戏图片继续 lazy-load。
9. 分类链接统一使用“查看更多游戏 / View more games / Ver más juegos”，不显示库存数字。
10. 首页不承担完整 100 游戏库存；完整库存进入 `/all-games`。

---

## 3. All Games

正式目录：

```text
/all-games
/zh/all-games
/zh-tw/all-games
/es/all-games
```

职责：**完整游戏库存目录**。

页面规则：

- 100 款游戏全部展示。
- 按 9 个正式 Category 分组。
- H1 / Intro 后直接进入各 Category 游戏列表。
- 不再显示顶部 Category Shortcut Cards，避免与下方分类内容重复。
- 每组保留进入独立 Category Page 的链接。
- 缩略图按视口 lazy-load。
- 页面允许索引。
- self canonical / hreflang / x-default 完整。
- 进入 sitemap。

**不使用 `/games` 作为 All Games SEO 页。**

原因：`/games/{slug}/index.html` 是 Raw Runtime 命名空间；完整目录固定使用 `/all-games`。

---

## 4. 搜索架构

```text
L0  Home / All Games
│
├── L1  9 Category Pages
│
├── L1  9 Gameplay Topic Hubs
│
├── L2  100 Game SEO Pages
│
└── L3  同一游戏页承接 Long-tail Intent
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

1. 每个正式游戏只有一个真实机制 Profile。
2. 不为同义词制造薄页面。
3. Topic Hub 负责玩法聚合与内链，不替代 Game Page。
4. Category 负责库存分类。
5. All Games 负责完整目录。
6. Home 负责发现。
7. 游戏事实来自 Runtime 源码、产品行为、Git 历史和 QA。
8. SEO 内容不能挡住 Start / Game Runtime。

---

## 5. 多语言结构

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

多语言规则：

- 语言路由彼此独立。
- Header 使用 Globe + dropdown。
- 当前语言简写：`EN / 简 / 繁 / ES`。
- 每个语言页面 self canonical。
- hreflang：`en`、`zh`、`zh-TW`、`es`。
- `x-default` → English。
- Search：`noindex, follow`，不进 sitemap。
- Structured Data / Open Graph 使用对应 locale / `inLanguage`。

简体中文额外规则：

- `/zh/search` 使用独立 `public/games-index-zh.json`。
- 9 Category 使用事实化中文内容层。
- 不统一宣称所有游戏支持触屏、固定 60fps、自动保存或不存在的游戏机制。

---

## 6. Sitemap 与索引

当前 Sitemap：

```text
400 Game URLs        100 × 4 languages
36 Category URLs     9 × 4 languages
36 Topic URLs        9 × 4 languages
20 Home/Legal URLs   5 × 4 languages
4 All Games URLs
--------------------
496 indexable URLs
```

应索引：

- Home
- All Games
- Category
- Gameplay Topic
- Game SEO Page
- About / Legal

不应索引：

- Search：`noindex, follow`
- Raw Runtime：不作为 SEO 落地页

SEO 基线：

- self canonical
- hreflang + x-default
- Sitemap 仅提交应索引 URL
- 100 个游戏独立 Title / Meta Description / H1
- 不虚构 rating / plays / reviews / AggregateRating
- 不伪造更新时间
- 多语言正文继承同一套已核验玩法事实

---

## 7. 100 游戏库存

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

## 8. 9 个 Gameplay Topic

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

Topic 数量不是 KPI。只有出现真实 Query Cluster 和语义差异时才扩新 Topic。

---

## 9. Game Page Standard

100 个正式 Game Page 必须包含：

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

- 玩法以本站 Runtime 为准。
- 保存进度、计分、时间、等级、波次、概率、成本等必须可追溯。
- 没有某机制就不写。
- 常见同名游戏与本站实现不一致时，不照搬外部玩法。

桌面游戏页右栏：

```text
More {Current Category} Games
└── 4 款同类别游戏

Explore Other Games
└── 4 款跨类别游戏
```

跨类别推荐：

- 排除当前游戏和当前 Category。
- 尽量来自不同 Category。
- 使用 slug 做确定性轮换，不做刷新随机推荐。
- 优先 popular / featured / 较新更新时间。
- EN / zh / zh-TW / es 使用独立标题。

特别事实差异：

- Tangram：没有自动解题判定，`Next Puzzle` 手动推进。
- Sand Fall：开放粒子沙盒，没有分数、胜负和 Game Over。
- Pipe Connect：不宣称所有随机棋盘保证可解。
- Bubble Cannon：当前没有真正 Game Over，也不清除悬空组。
- Bowling：简化倒瓶累计，不冒充正式 strike/spare 计分。
- Boat Race：单人距离 / 避障，没有对手船。
- Asteroid Dodge：没有射击。
- Subway Dash：三车道换道，没有跳跃 / 下蹲。
- Chess Puzzle：固定题目答案，不冒充完整国际象棋引擎。
- Gomoku：当前没有明确满盘平局处理。

---

## 10. QA 标准

### 当前阶段不要求 100 款逐个真人移动端通关

上线门槛：

1. 页面正确
   - 320 / 360 / 390px 不出现明显横向溢出。
   - Header / Breadcrumb / H1 / Game Container / SEO Body 不破版。
2. 内容正确
   - Title / Description / H1 / Intro 与 Runtime 一致。
   - How to Play / Rules / FAQ 不虚构机制。
   - 多语言不改变玩法事实。
3. Runtime 正常
   - HTML5 Runtime 可加载。
   - Start 可进入游戏。
   - 无明显 JS / 加载错误和致命 Bug。
   - 核心操作不被页面 UI 阻挡。

CI / Visual QA 覆盖：

```text
Production Build
页面生成
Runtime 文件存在
Desktop screenshot
390×844 mobile screenshot
断版 / 溢出 / 遮挡
多语言 smoke QA
```

出现用户问题、GA4 异常、设备兼容问题或重点游戏需要深测时，再做针对性真人 QA。

---

## 11. 性能

已实施：

- 删除 Featured Games 重复大图区块。
- Popular 固定 10 款。
- 首屏只优先前 2 张热门缩略图。
- 其余图片 lazy-load。
- GameCard 图片明确 `width / height` + `decoding="async"`。
- Client i18n 只接收当前 locale messages。
- 首页 Category Section 使用 `content-visibility: auto`。
- `/all-games` 完整库存 lazy-load。
- 不为了 Lighthouse 跑分移除必要 Analytics。

最近一份优化前 Mobile PSI 基线：

```text
Performance 84
FCP 1.5s
LCP 4.1s
TBT 60ms
CLS 0
Accessibility 96
Best Practices 100
SEO 100
```

下一步必须重新跑 3 次 Mobile PSI，重点看中位数：

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

## 12. Analytics 与观察指标

GA4：

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

1. EN / zh / zh-TW / es impressions / clicks / CTR / avg position。
2. 各语言 indexed pages。
3. 新 Query 数量。
4. Position 4–20 Query。
5. 高曝光低 CTR Page / Query。
6. 100 Game Page 表现。
7. 9 Topic Hub 表现。
8. `/all-games` / Category 的发现表现。
9. `game_start → game_30s → game_60s`。
10. `related_game_click`。
11. Country × Language。

判定：

- 有曝光无点击 → Title / Description / Intent。
- 有点击无 `game_start` → Above-fold / Start UX。
- `game_start` 高但 30s 低 → Game Product 问题，不堆 SEO 文案。
- `related_game_click` 低 → 推荐位置 / 相关度 / Discovery。
- Query 已有对应页面 → 默认增强现有页面，不先新建 URL。
- 形成稳定新 Query Cluster → 再决定 Situation / Constraint / Similar Page。

---

## 13. 当前运营推广阶段

### 目标

接下来两周不是继续扩库存，而是回答两个问题：

1. Google 最先认可哪批 Page / Query？
2. 用户最愿意玩哪批 Game，并且是否继续进入第二、第三款游戏？

### 当前优先级

```text
P0  GSC / Sitemap / Index 状态
P0  PageSpeed 复测
P1  短视频 Gameplay 分发
P1  品牌外部账号完善
P1  游戏分发平台小批量测试
P1  第一批真实外部引用 / 外链
P2  Query Mining 后再扩 3–5 个新 Cluster Page
```

### 暂时冻结

- 第五语言。
- 再批量新增 100 个游戏。
- 批量 Games Like 页面。
- 批量 Best Games 文章。
- 为数量扩 Topic。
- 大规模改 100 个 Game Page 正文。
- 垃圾目录群发 / 付费外链包。

---

## 14. 外部平台与品牌资产

### 必须维护的品牌平台

```text
GitHub
YouTube
TikTok
Instagram
Facebook Page
X
itch.io
Game Jolt
IndieDB
Newgrounds
```

统一要求：

- 品牌统一使用 `ZeroPlay Games`。
- 头像 / Logo / 简介尽量统一。
- 可填写 Website 的位置统一指向 `https://zeroplaygames.com/`。
- 游戏内容尽量链接到具体 `/game/{slug}`，而不是所有内容都只链首页。
- 不为了 SEO 制造垃圾账号和垃圾评论。

### HTML5 游戏分发 / 提交平台候选

第一批优先测试：

```text
itch.io
Newgrounds
Game Jolt
IndieDB
GameMonetize
CrazyGames
GameDistribution
GamePix
Poki for Developers
```

平台分两类：

1. **品牌 / 外链 / 社区资产**：GitHub、YouTube、itch.io、Game Jolt、IndieDB、Newgrounds 等。
2. **游戏分发网络**：CrazyGames、GameDistribution、GamePix、Poki、GameMonetize 等。

注意：分发平台的主要价值是游戏曝光、测试和新增玩家，**不能默认等于高权重 dofollow backlink**。

### 外链原则

- 优先真实相关页面，不追求数量。
- 优先 Game Page / Developer Profile / Project Page / Video Description 等有上下文的链接。
- 社区发布先贡献内容，再放链接。
- 付费、广告、UGC 链接应遵守平台和 Google 对 sponsored / ugc / nofollow 的规则。
- 不买站群链接、不群发论坛签名、不做无关评论外链。

---

## 15. 短视频分发

第一阶段选约 20 款视觉反馈明显的游戏，不一次覆盖 100 款。

建议优先候选：

```text
Knife Hit
Fruit Catch
Quick Tap
2048
Hex Merge
Flappy Bird
Bubble Shooter
Tetris
Color Switch
Whack-a-Mole
```

覆盖全部 9 Category 后再补足到约 20 款。

素材标准：

```text
9:16
8–15 秒
0–1 秒直接出现 Gameplay Hook
主体展示完整一轮核心反馈
结尾只保留轻量 ZeroPlay Games 品牌
```

一份素材优先复用到：

```text
YouTube Shorts
TikTok
Instagram Reels
Facebook Reels
```

不制作泛品牌宣传片优先，先让 Gameplay 自己获得点击和搜索兴趣。

---

## 16. 部署

| 项目 | 当前实现 |
|---|---|
| Framework | Next.js 15.5.2 / App Router |
| React | 19.2.7 |
| TypeScript | 6.x |
| CSS | Tailwind CSS 4 |
| Build | `output: "export"` |
| Hosting | Cloudflare Pages |
| Production branch | `master` |
| Runtime | `/public/games/{slug}/index.html` |
| CI | Node 22 + SEO Gate + production build |

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

---

## 17. 技术债

1. Next.js 15.5.2 存在安全升级提示，后续单独验证升级。
2. `@cloudflare/next-on-pages` 是旧部署遗留依赖；当前正式链路是 static export。
3. npm audit 仍有依赖安全告警，需要独立升级验证。
4. Schema 字段继续按真实平台能力保守维护。
5. 多语言继续做语言质量检查，不做机械翻译。

---

## 18. 文档维护规则

1. `docs/README.md` 是唯一 SSOT。
2. 新增 / 删除 Game 要同步总数和 Category Count。
3. 新 Topic 要同步成员和 URL。
4. 新语言必须有独立 route folder、locale data、canonical / hreflang / sitemap / smoke QA。
5. Home / All Games / Category / Recommendation 逻辑变化必须同步本文。
6. 正式游戏进入库存前必须通过 Profile 与 SEO Gate。
7. 当前 QA 门槛是页面、内容、Runtime 正常，不要求 100 款逐个人工通关。
8. GSC 出现有意义的新阶段基线再更新，不写每日流水账。
9. 过期规则直接删除，历史交给 Git 保存。

当前项目状态：

> **ZeroPlay Games 已完成 100 个正式游戏、9 个 Category、9 个 Gameplay Topic、4 套语言和 496 个应索引 URL 的生产底座。首页当前是 Popular 10 → 9 个 Category Section（每类 5 款）→ View more games；`/all-games` 直接按分类展示完整库存。当前工作中心已经从开发转向 Google 索引 / Query / CTR、PageSpeed、短视频获客、品牌外部资产、游戏分发平台测试和用户从第一款游戏继续进入第二款游戏的行为数据。**
