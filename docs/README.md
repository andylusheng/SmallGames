# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文记录 ZeroPlay Games 当前正式架构、游戏库存、核心游戏质量标准、SEO、多语言、首页发现结构、QA、性能、部署、数据观察和运营推广规则。后续项目状态以本文件和生产代码为准。
>
> 最近更新：2026-08-08 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 当前状态

- 品牌：ZeroPlay Games
- 定位：Free Play Games / Free Online Games
- 正式游戏：**120**
- Category：**9**
- Gameplay Topic Hub：**9**
- 正式语言：**English / 简体中文 / 繁體中文（台灣） / Español**
- 单游戏内容 SEO：**120/120 `optimized`**
- Technical SEO P0/P1：完成
- Topic Hub P2：9/9 完成
- Production branch：`master`
- Hosting：Cloudflare Pages
- Build：Next.js static export → `out/`
- Sitemap：**576 个应索引 URL**
- 首页：10 款 Popular Games + 9 个分类 Section，每类展示 5 款代表游戏
- `/all-games`：4 语言独立完整游戏目录，直接按 Category 展示
- 游戏页桌面右栏：4 款同类别推荐 + 4 款跨类别发现
- 移动端 Header：390px 宽度完整落在单屏内
- 语言切换：Globe 下拉，顶部简写 `EN / 简 / 繁 / ES`

### 当前产品质量层级

**第一批核心游戏（10）已完成：**

1. Merge Defense
2. Quick Tap
3. Hex Merge
4. Space Shooter
5. Fruit Catch
6. Tower Defense
7. Idle Miner
8. Avoid Blocks
9. Memory Sequence
10. Lemonade Stand

**Search-demand Core Pack（20）新增：**

1. Aurora Solitaire
2. Neon Snake
3. Pulse Jumper
4. Zen Sudoku
5. Cascade Solitaire
6. Maze Muncher
7. Grid Three
8. Fusion 4096
9. Open Cell Cards
10. Neon Stack
11. Fossil Sprint
12. Void Runner
13. Gravity Slope
14. Crown Draughts
15. Heart Trick
16. Star Spades
17. Word Hunt Grid
18. Dice Five
19. Neon Drift
20. Orb Shooter

这 20 款属于 **搜索需求试错包**：参考常青/高需求玩法，但使用 ZeroPlay 原创名称、视觉和实现，不复制第三方品牌名称、角色、素材或受保护视觉资产。

它们按“核心游戏”门槛建设，而不是只满足“能打开”：

- 站点 Start → Runtime → 核心循环 → Win/Fail/End → Restart 完整
- 390px 移动端优先，并兼顾 320 / 360
- Touch + Keyboard/Mouse 按玩法提供
- 有明确 Score / Best / Progress 反馈
- 有视觉反馈和清晰状态变化
- Runtime 内可直接重新开始
- SEO 事实必须与实际玩法一致
- Runtime 与缩略图必须通过生产 Gate

**注意：Search-demand Core Pack 不自动加入首页 Popular 10。** Popular 是实际流量/运营曝光概念；Core 是产品质量概念。新游戏是否进入 Popular，后续由 GSC + GA4 数据决定。

---

## 2. 当前观察窗口

第一轮 Google / 用户行为观察窗口：

```text
2026-08-07 → 2026-08-21
```

观察期原则：

- 不进行无数据依据的大规模单游戏 SEO 重写。
- 不为了数量继续扩 Topic。
- 不频繁修改已有 Title / Meta / 正文。
- 优先修索引、性能、页面破损、Runtime 错误、描述事实错误和真实产品问题。
- 新增 20 款属于明确的搜索需求试错，不代表恢复“大量堆游戏”的策略。
- 运营重点从“继续搭网站”转向：**Google 验证 + 用户验证 + 外部获客 + 游戏质量验证**。

---

## 3. 首页与发现架构

首页固定结构：

```text
Header
H1 + short intro
Popular Games (fixed 10)
Ad
Action 5 → View more games
Puzzle 5 → View more games
Arcade 5 → View more games
Racing 5 → View more games
Sports 5 → View more games
Shooting 5 → View more games
Strategy 5 → View more games
Casual 5 → View more games
Idle 5 → View more games
Footer
```

规则：

- 不同时存在 Featured + Popular 两套首屏模块。
- Popular 固定 10 款，不因为新增库存自动变化。
- 只有前 2 个 Popular 缩略图使用高加载优先级。
- Category Section 每类展示 5 款代表游戏。
- 稳定候选顺序：`popular → featured → updatedAt → slug`。
- Category Section 使用 `content-visibility: auto`。
- Category 图片 lazy-load。
- 完整库存统一进入 `/all-games`。

### All Games

```text
/all-games
/zh/all-games
/zh-tw/all-games
/es/all-games
```

规则：

- 展示全部 **120** 款游戏。
- 按 9 个 Category 分组。
- 不放顶部 Category Shortcut Cards。
- 每个分组链接到对应 Category 页面。
- 缩略图 lazy-load。
- 页面 indexable。
- self canonical + hreflang + x-default。
- 纳入 sitemap。
- `/games` 不是 SEO All Games 路由；`/games/{slug}/index.html` 属于 Raw Runtime namespace。

---

## 4. 搜索架构

```text
L0 Home / All Games
├─ L1 9 Category Pages
├─ L1 9 Gameplay Topic Hubs
├─ L2 120 Game SEO Pages
└─ L3 单游戏页面承载长尾意图
   ├─ how to play
   ├─ rules
   ├─ controls
   ├─ scoring / reward / progress
   ├─ win / fail / end condition
   ├─ duration / levels / waves（仅真实存在时）
   ├─ tips / strategy
   └─ browser / mobile / no download
```

原则：

- 一个真实机制 Profile 对应一个正式游戏。
- 不批量制造同义词薄页。
- Topic Hub = gameplay aggregation + internal links。
- Category = inventory classification。
- All Games = full directory。
- Home = discovery。
- 游戏事实来源：Runtime / 产品行为 / Git history / QA。
- SEO 内容不能阻塞 Start / Runtime。

---

## 5. 多语言路由

English：

```text
/
/all-games
/game/{slug}
/{category}
/{topic-path}
```

简体中文：

```text
/zh
/zh/all-games
/zh/game/{slug}
/zh/{category}
/zh/{topic-path}
```

繁體中文（台灣）：

```text
/zh-tw
/zh-tw/all-games
/zh-tw/game/{slug}
/zh-tw/{category}
/zh-tw/{topic-path}
```

Español：

```text
/es
/es/all-games
/es/game/{slug}
/es/{category}
/es/{topic-path}
```

规则：

- 独立语言路由。
- self canonical。
- hreflang：`en / zh / zh-TW / es`。
- x-default → English。
- Search 页面 `noindex, follow`，不进入 sitemap。
- Schema / OG locale 本地化。
- 简中独立 `public/games-index-zh.json`。
- 繁中独立 `public/games-index-zh-tw.json`。
- 翻译必须继承同一套已验证玩法事实，不允许虚构触控、固定帧率、自动保存或不存在机制。

---

## 6. Sitemap

当前组合：

```text
480 Game URLs        120 × 4 languages
36 Category URLs     9 × 4
36 Topic URLs        9 × 4
20 Home/Legal URLs   5 × 4
4 All Games URLs
--------------------
576 indexable URLs
```

Indexable：

- Home
- All Games
- Category
- Topic
- Game SEO Page
- About / Legal

Not indexable：

- Search
- Raw Runtime（不是搜索落地页）

SEO baseline：

- self canonical
- hreflang + x-default
- sitemap 只包含应索引 URL
- 120 个 Game Page 均有独立 Title / Meta / H1
- 不造假 rating / plays / review / AggregateRating
- 不造假更新时间
- 多语言内容必须继承相同真实机制

---

## 7. 游戏库存

当前 Category 数量：

| Category | 数量 |
|---|---:|
| action | 6 |
| arcade | 29 |
| casual | 14 |
| idle | 6 |
| puzzle | 30 |
| racing | 7 |
| shooting | 8 |
| sports | 9 |
| strategy | 11 |
| **Total** | **120** |

基础库存：

```text
src/data/games.json                 100
```

Search-demand Core Pack：

```text
src/data/games-search-top20.json     20
```

站点生产层通过 `src/lib/games.ts` 合并为 120 款统一库存。

事实/Profile 来源：

```text
src/data/game-profiles.ts
src/data/game-profiles/*.ts
public/games/{slug}/index.html
```

生产 Gate 要求：

- Inventory slug 唯一
- Inventory id 唯一
- 每个库存游戏存在且仅存在一个 GameSeoProfile
- Runtime 文件真实存在
- Thumbnail 文件真实存在
- EN / ZH SEO 内容完整
- Title / H1 不重复

---

## 8. Gameplay Topic Hubs

当前仍为 **9 个 Hub**，Topic 数量不是 KPI。

### Tap Games

`/tap-games`

Quick Tap, Tap Tower, Tap Tycoon, Balloon Pop, Gravity Flip, Color Switch

### Merge Games

`/merge-games`

Hex Merge, Merge Defense, Pet Merge, 2048, **Fusion 4096**

### Defense Games

`/defense-games`

Tower Defense, Plant Defense, Merge Defense

### Memory Games

`/memory-games`

Memory Cards, Memory Sequence

### Reaction Games

`/reaction-games`

Quick Tap, Reaction Speed Test, Whack-a-Mole, Fruit Catch, Avoid Blocks, Tile Hop, Table Tennis, **Neon Snake, Pulse Jumper, Fossil Sprint, Void Runner, Gravity Slope**

### Number Games

`/number-games`

2048, Number Puzzle, Speed Math, Sudoku Lite, Hex Merge, **Zen Sudoku, Fusion 4096**

### Word Games

`/word-games`

Word Scramble, Word Search, Hangman, **Word Hunt Grid**

### Classic Games

`/classic-games`

Tetris, Minesweeper, Tic Tac Toe, Pong, Space Invaders, Brick Breaker, Pac-Man, Frogger, **Aurora Solitaire, Cascade Solitaire, Maze Muncher, Grid Three, Open Cell Cards, Neon Stack, Crown Draughts, Heart Trick, Star Spades**

### Idle & Clicker Games

`/idle-games`

Cookie Clicker, Idle Miner, Idle Factory, Tap Tycoon, Lemonade Stand, Pet Merge

新增 Topic 的条件：

- GSC 出现真实 Query Cluster；或
- 已有足够游戏形成语义清晰、用户有独立意图的集合。

不要为了数量扩 Hub。

---

## 9. 单游戏页面标准

每个正式页面至少包含：

- Primary Keyword
- >= 2 Secondary Keywords
- Meta Title
- Meta Description
- H1
- Intro
- Objective
- Controls
- Game-specific Mechanics
- About
- How to Play >= 3
- Rules >= 3
- Tips >= 2
- FAQ >= 3
- Related Games
- Topic backlink（适用时）

原则：

- Runtime 是最终事实来源。
- save / score / time / levels / waves / probability / cost 必须可追溯。
- 不存在的机制就不写。
- 不照搬同名传统游戏规则覆盖当前实现。
- SEO 不影响首屏 Start 和游戏区。

桌面推荐结构：

```text
More {Current Category} Games → 4
Explore Other Games → 4 cross-category
```

跨类别推荐：

- 排除当前游戏。
- 排除当前 Category。
- 尽量多 Category 分散。
- deterministic，不随机刷新。
- 优先 popular / featured / recent updated。
- EN / zh / zh-TW / es 标题本地化。

---

## 10. Search-demand Core Pack Runtime 架构

20 款新游戏采用统一 Core Runtime Shell，但每款有独立玩法模式。

```text
src/data/games-search-top20.json
src/data/game-profiles/search-top20.ts
scripts/generate-search-top20-assets.mjs
public/games/_search-top20/runtime.js
public/games/_search-top20/runtime.css
↓ build/dev
public/games/{new-slug}/index.html
public/games/{new-slug}/thumb.svg
```

这样做的目的：

- 每款仍有独立 Runtime URL。
- 每款仍有独立 Thumbnail。
- 共享移动端 Shell / HUD / Restart / Best / feedback。
- 核心引擎集中维护，避免 20 份复制代码漂移。
- 构建时强制生成，SEO Gate 再确认实际文件存在。

20 个玩法模式不是统一换皮：

- Card / Solitaire：Aurora Solitaire, Cascade Solitaire, Open Cell Cards
- Trick-taking：Heart Trick, Star Spades
- Board / Logic：Zen Sudoku, Grid Three, Fusion 4096, Crown Draughts
- Word / Dice：Word Hunt Grid, Dice Five
- Arcade / Reaction：Neon Snake, Pulse Jumper, Maze Muncher, Neon Stack, Fossil Sprint, Void Runner, Gravity Slope
- Racing / Aim：Neon Drift, Orb Shooter

---

## 11. QA 标准

不要求人工把 120 款全部完整通关后才能部署。

### Launch Gate 1：Page correctness

- 320 / 360 / 390 无主要横向溢出。
- Header / Breadcrumb / H1 / Game Container / SEO Body 不破损。

### Launch Gate 2：Content correctness

- Title / Description / H1 / Intro 与 Runtime 一致。
- How to Play / Rules / FAQ 不虚构机制。
- 多语言继承相同玩法事实。

### Launch Gate 3：Runtime

- 文件存在。
- iframe 能加载。
- Start 可进入。
- 核心玩法可操作。
- Win / Fail / End 状态存在或玩法本身有合理持续循环。
- Restart 可用。
- Touch / Keyboard / Mouse 不被页面层阻断。
- 无明显 fatal JS / loading error。

### CI / Visual QA

生产 PR 需要：

- Node 22
- Runtime asset generation
- 120-game SEO verification
- Search index generation
- Next.js production build
- 120 Game Page discovery
- Desktop screenshot
- 390×844 screenshot
- Runtime screenshot
- EN / zh / zh-TW / es smoke QA
- Topic Hub capture

深度人工 QA 的触发条件：

- 用户反馈问题
- GA4 异常
- 特定设备兼容问题
- 高流量/高价值游戏
- 核心游戏进行重大机制更新

---

## 12. 性能

已执行：

- 删除首页重复 Featured 大图模块。
- Popular 固定 10。
- 只有前 2 个 Popular thumbnail 高优先。
- 其他图片 lazy-load。
- GameCard 明确 width / height + `decoding="async"`。
- client i18n 只接收当前 locale。
- 首页 Category Section 使用 `content-visibility: auto`。
- `/all-games` 全库存 lazy-load。
- 不为了 Lighthouse 删除必要 Analytics。

最近记录的 Mobile PSI 基线（优化前）：

| 指标 | 值 |
|---|---:|
| Performance | 84 |
| FCP | 1.5s |
| LCP | 4.1s |
| TBT | 60ms |
| CLS | 0 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

P0：重新跑 Mobile PSI **3 次取中位数**，重点看 Performance / LCP / FCP / Speed Index / TBT / CLS。

新增 20 游戏采用按 Runtime 加载的共享静态 JS/CSS，不应把游戏引擎打进首页主 JS bundle；部署后仍需用实际 PSI / Network 验证。

---

## 13. Analytics

站点层已使用事件：

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

Search-demand Core Runtime 另外通过 postMessage 暴露内部状态事件：

```text
runtime_ready
game_end
game_restart_internal
```

目前核心漏斗仍以站点层 GA4 为主：

```text
game_start
→ game_30s
→ game_60s
→ related_game_click / second game
```

判断：

- impressions 高、clicks 低 → Title / Description / Intent 问题。
- clicks 有、`game_start` 低 → Above-fold / Start UX 问题。
- `game_start` 高、`game_30s` 低 → 游戏产品问题，不优先改 SEO 文案。
- `game_30s` 可接受但 `game_60s` 低 → 深度/难度/重复反馈问题。
- `related_game_click` 低 → 推荐位置、相关性或发现结构问题。

---

## 14. GSC 基线

截至 2026-08-04 的记录：

- 13 clicks
- 872 impressions
- CTR ≈ 1.49%
- EN Game Pages ≈ 607 impressions / 10 clicks
- Mobile CTR > Desktop CTR

2026-08-21 第一轮复盘重点：

1. 每语言 impressions / clicks / CTR / avg position
2. indexed pages
3. 新 Query 数量
4. Position 4–20 Query
5. 高 impressions 低 CTR 的 Page / Query
6. 120 Game Pages
7. 9 Topic Hubs
8. `/all-games` / Category discovery
9. `game_start → game_30s → game_60s`
10. `related_game_click`
11. Country × Language
12. 新 Search-demand Core Pack 的曝光、点击和真实开玩数据

Search-demand Pack 的判断方式：

- 不因为“玩法对应大词”就默认能拿品牌搜索流量。
- 优先观察原创页面是否获得 generic query：`solitaire game`, `snake game`, `sudoku online`, `number merge game`, `word search game`, `drift game` 等。
- 20 款中出现真实 Query / Player Signal 的，升级为下一批重点运营游戏。
- 完全没有信号的不继续投入，仅保留库存。

---

## 15. 当前运营阶段

未来两周核心回答两个问题：

1. **Google 最先认可哪些 Page / Query？**
2. **用户真正玩哪些 Games，并且会不会继续第 2 / 第 3 款？**

当前优先级：

```text
P0 120-game production QA / runtime errors
P0 GSC / Sitemap / Index
P0 Mobile PageSpeed retest
P1 Search-demand 20-game validation
P1 short-form Gameplay distribution
P1 brand external accounts
P1 small-batch game distribution platform tests
P1 first real external references / backlinks
P2 Query Mining → 3–5 new Cluster Pages
```

冻结：

- 第五语言
- 再无依据批量扩 100 游戏
- bulk Games Like pages
- bulk Best Games articles
- 为数量扩 Topic
- 大规模重写 120 个 Game Page 正文
- spam directories / paid link packages

---

## 16. 外部品牌与分发

品牌资产优先维护：

- GitHub
- YouTube
- TikTok
- Instagram
- Facebook Page
- X
- itch.io
- Game Jolt
- IndieDB
- Newgrounds

要求：

- ZeroPlay Games 统一品牌名 / Logo / Bio。
- Profile 链接回 `zeroplaygames.com`。
- 内容对应具体游戏时优先 deep-link Game Page。
- 不建垃圾账号，不做垃圾评论链接。

HTML5 分发候选：

- itch.io
- Newgrounds
- Game Jolt
- IndieDB
- GameMonetize
- CrazyGames
- GameDistribution
- GamePix
- Poki for Developers

区分：

1. 品牌 / 社区 /引用资产：GitHub, YouTube, itch.io, Game Jolt, IndieDB, Newgrounds
2. 游戏分发网络：CrazyGames, GameDistribution, GamePix, Poki, GameMonetize

分发价值主要是：曝光、玩家、产品验证。不要默认它们会产生高权重 dofollow 外链。

---

## 17. 外链规则

- 优先真实上下文、相关性和真实用户价值，不追求链接数量。
- 优先 Game Page / Developer Profile / Project Page / Video Description。
- 社区先贡献再链接。
- sponsored / UGC / nofollow 按平台和 Google 规则处理。
- 禁止 link farm、论坛签名垃圾链接、无关评论 spam。

---

## 18. 短视频

第一阶段不需要为 120 款全部做视频。

继续优先视觉反馈强的约 20 款，并将 Search-demand Core Pack 中实际好看的玩法加入候选。

既有候选：

- Knife Hit
- Fruit Catch
- Quick Tap
- 2048
- Hex Merge
- Flappy Bird
- Bubble Shooter
- Tetris
- Color Switch
- Whack-a-Mole

新包优先测试：

- Neon Snake
- Pulse Jumper
- Fusion 4096
- Neon Stack
- Fossil Sprint
- Void Runner
- Gravity Slope
- Neon Drift
- Orb Shooter

视频标准：

- 9:16
- 8–15 秒
- 0–1 秒直接 Gameplay Hook
- 展示一个完整核心反馈循环
- 结尾轻量 ZeroPlay Branding
- 同素材复用 YouTube Shorts / TikTok / Instagram Reels / Facebook Reels

不要优先做泛品牌宣传片；让 Gameplay 本身带搜索和点击。

---

## 19. 部署链

```text
GitHub master
↓
Cloudflare Pages
↓
npm run build
↓
generate-search-top20-assets
↓
seo:verify (120 inventory/profile/runtime/thumbnail gate)
↓
generate-game-index (120 × multilingual search indexes)
↓
Next.js static export
↓
out/
↓
zeroplaygames.com
```

Raw Runtime：

```text
public/games/{slug}/index.html
```

Search-demand Core Pack 的 Runtime / Thumbnail 在 build/dev 前由脚本生成，公共核心引擎保存在：

```text
public/games/_search-top20/runtime.js
public/games/_search-top20/runtime.css
```

---

## 20. 技术债

1. Next.js 15.5.2 仍有安全升级提示，需要单独验证升级。
2. `@cloudflare/next-on-pages` 是历史依赖；当前生产核心仍是 static export。
3. npm audit 依赖安全告警需要单独验证升级，不与游戏实验混合处理。
4. Schema 保守，只声明真实能力。
5. 多语言继续做事实质量检查，避免机械翻译。
6. Search-demand Runtime 当前共享一个核心 JS；若单文件体积或缓存策略后续影响体验，再按实际 Network 数据拆包，不提前过度工程化。

---

## 21. SSOT 维护规则

- `docs/README.md` 是唯一项目状态 SSOT。
- 新增/删除游戏必须更新总数和 Category 数量。
- Topic 变化必须更新成员和 URL 说明。
- 新语言必须包含独立 route / data / canonical / hreflang / sitemap / smoke QA。
- Home / All Games / Category / Recommendation 逻辑变化必须更新本文。
- 正式游戏必须通过 Profile + SEO Gate + Runtime asset Gate。
- QA Gate 是 page / content / runtime，不要求人工完整通关全部库存。
- GSC 只在有意义 baseline / review point 更新，不做每日流水账。
- 过时规则直接删除；Git 历史负责保留旧版本。

---

## 22. 当前结论

ZeroPlay 已完成三个层次：

```text
A. Production foundation
120 Games × 4 Languages × 576 indexable URLs
Category / Topic / Game / All Games / Technical SEO

B. Product quality
10 first flagship/core games
+ 20 search-demand original core-game experiments

C. Validation stage
GSC → Index → Query → CTR
GA4 → Start → 30s → 60s → second game
Short video / game distribution / external references
```

下一阶段不再以“页面数量”作为主要进度指标。

核心指标变为：

- 哪些 generic queries 开始出现？
- 哪些游戏获得真实 clicks？
- 哪些游戏真正被 Start？
- 哪些能留住 30s / 60s？
- 哪些能把用户带去第二款游戏？
- 哪些 Search-demand 实验值得继续深挖？
