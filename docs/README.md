# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文件记录 ZeroPlay Games 的站点定位、100 游戏库存状态、Gameplay Topic 架构、单游戏 SEO 标准、CI/Visual QA、移动端验证、部署和当前观察计划。
>
> 最近更新：2026-08-07 ｜ 站点：https://zeroplaygames.com ｜ 仓库：`andylusheng/SmallGames`

---

## 1. 当前结论

- **品牌**：ZeroPlay Games
- **定位**：Free Play Games / Free Online Games
- **语言**：英文主站 + 中文 `/zh`
- **正式游戏**：100
- **传统 Browse Category**：9
- **正式 Gameplay Topic**：9
- **技术 SEO P0/P1**：完成
- **Topic Hub P2**：9/9 完成
- **Topic 单游戏内容 SEO**：38/38 `optimized`
- **未进入正式 Topic 的游戏**：62 个，继续保持 `generated`
- **当前策略**：停止继续扩 Topic，先观察 2 周真实 GSC/GA4 表现

观察窗口：

```text
2026-08-07 → 2026-08-21
```

这 14 天默认冻结大规模 SEO 重写和新 Topic 扩张，只处理：

1. 索引/抓取/Canonical/Hreflang 等明显技术错误。
2. Runtime 无法加载、页面断版等产品 Bug。
3. 明确错误的玩法事实。
4. 严重影响用户开始游戏的移动端问题。

这样两周后的 GSC/GA4 变化才有可比较性。

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
├── L2  独立游戏 SEO 页
│   └── /game/{slug} ｜ /zh/game/{slug}
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

1. 一个游戏页承接一组同主题长尾词，不为同义词制造薄页面。
2. Topic Hub 承接玩法级搜索意图，必须解释成员真实机制差异。
3. 单游戏内容来自 Runtime 源码、产品事实、Git 历史、实际 QA 和 GSC Query；AI 只组织表达。
4. 同一游戏只维护一份 `GameSeoProfile`，可以同时属于多个 Topic。
5. `seoStatus` 与 `testedMobile` **完全分离**：
   - `seoStatus` = 单游戏内容 SEO 是否完成。
   - `testedMobile` = 是否经过真人移动端核心玩法验证。
6. `optimized` **不再等于**“真人移动端已试玩”。不要通过 SEO 状态推断设备 QA。
7. SEO 内容不能挡住产品。用户应先看到游戏和开始入口，再看到扩展正文。

---

## 3. 技术与部署

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
| Game SEO page | `/game/{slug}` / `/zh/game/{slug}` |
| Topic Hub | `/{topic}-games` / `/zh/{topic}-games` |
| Analytics | GA4 + 游戏行为事件 |
| CI | Node 22 + production build |
| Visual QA | P2 Game + Topic Hub + Mobile Shell 自动截图 |

部署链：

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

Cloudflare：

```text
Production branch: master
Build command: npm run build
Build output: out
NODE_VERSION=22
NEXT_PUBLIC_SITE_URL=https://zeroplaygames.com
```

---

## 4. 路由与索引策略

| 页面 | English | 中文 | Index |
|---|---|---|---|
| 首页 | `/` | `/zh` | index |
| Browse Category | `/{category}` | `/zh/{category}` | index |
| Gameplay Topic | `/{topic}-games` | `/zh/{topic}-games` | index |
| Game SEO | `/game/{slug}` | `/zh/game/{slug}` | index |
| Raw Runtime | `/games/{slug}/index.html` | 共用 | `X-Robots-Tag: noindex, follow` |
| Search | `/search` | `/zh/search` | `noindex, follow` |
| About / Legal | `/about` 等 | `/zh/...` | index |

技术 SEO 基线：

- 自引用 canonical。
- EN/ZH hreflang + x-default。
- sitemap 只提交应索引 URL。
- Topic Hub 自动进入 sitemap。
- Raw Runtime 可抓取但不索引，避免和 SEO 页面竞争。
- Search 页面不索引且不进 sitemap。
- 不伪造 `lastModified`。
- 不输出虚假 rating / plays / reviews / AggregateRating。
- P2 英文、中文独立 Title / Meta Description / H1。
- P2 描述优先覆盖旧 `games.json` 描述并进入站内卡片/Search Index。

---

## 5. Browse Category

| Category | 数量 |
|---|---:|
| action | 6 |
| arcade | 23 |
| casual | 13 |
| idle | 6 |
| puzzle | 22 |
| racing | 6 |
| shooting | 8 |
| sports | 9 |
| strategy | 7 |
| **Total** | **100** |

Browse Category 负责用户浏览，不等同于 SEO Gameplay Topic。

---

## 6. 9 个正式 Gameplay Topic

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

Topic 以真实主要机制划分，不只看名称和 tags。一个游戏可以属于多个 Topic，但 Profile 只有一份。

特殊边界：

- Quick Tap 同时属于 Tap / Reaction。
- Merge Defense 同时属于 Merge / Defense。
- 2048、Hex Merge 同时属于 Merge / Number。
- Reaction Speed Test 不属于 Memory。
- Sudoku Lite 必须写明 **6×6 / digits 1–6 / 2×3 boxes**，不能当成传统 9×9。

---

## 7. 当前单游戏 SEO 状态

状态定义：

```text
generated
= 只有基础游戏页/历史内容，尚未完成逐游戏源码级 P2 SEO

reviewed
= 保留的中间状态；内容已人工/源码核验但尚未通过完整 Topic SEO Gate

optimized
= 单游戏内容 SEO 已通过 Completion Gate
  不代表 testedMobile=true
```

当前：

```text
100 total games
38 optimized Topic games
0 reviewed Topic games
62 generated non-Topic games
9 formal Topic Hubs
```

### 38 个 optimized Topic 游戏

```text
quick-tap
tap-tower
tap-tycoon
balloon-pop
gravity-flip
color-switch
hex-merge
merge-defense
pet-merge
2048
tower-defense
plant-defense
memory-cards
memory-sequence
reaction-test
whack-a-mole
fruit-catch
avoid-blocks
tile-hop
table-tennis
number-puzzle
speed-math
sudoku
word-scramble
word-search
hangman
tetris
minesweeper
tic-tac-toe
pong
space-invaders
brick-breaker
pac-man
frogger
cookie-clicker
idle-miner
idle-factory
lemonade-stand
```

### 62 个 generated 游戏

仍保留在正式库存和 Browse Category 中，但当前观察期不批量改写。两周后只根据 GSC/GA4 和真实搜索机会决定下一批，而不是为了“100% optimized”强行制造 Topic。

---

## 8. 单游戏 P2 内容 SEO 标准

每个正式 Topic 成员必须有：

```text
Primary Keyword
Secondary Keywords
EN/ZH Meta Title
EN/ZH Meta Description
EN/ZH H1
EN/ZH Intro
Objective
Controls
Game-specific Mechanics
About
How to Play
Rules
Scoring / Cost / Reward（适用时）
End / Win / Fail Condition（适用时）
Tips
Game-specific FAQ
Topic backlink
Same-topic internal links
```

内容标准：

- Title 必须体现该游戏真实独特机制，不使用全站统一模板作为最终 Title。
- Description = 游戏目标 + 核心玩法 + 1～2 个具体事实。
- How to Play、Rules、FAQ 必须是这个游戏自己的事实。
- 如果删掉游戏名后正文可以原封不动放到几十个游戏页，它不能作为 P2 核心内容。
- 保存进度、移动支持、计分、时间、等级、波次、概率、成本等声明必须可追溯。
- 禁止虚构用户数、评分、播放量、评论、医学/科学基准。

### Topic SEO Completion Gate

生产 Build 会对所有正式 Topic 成员强制检查：

- Profile 必须存在。
- Primary Keyword 必须存在。
- Secondary Keywords 至少 2 个。
- EN/ZH objective 必须存在。
- controls 至少 1 个。
- 至少 1 条 game-specific mechanic。
- EN/ZH Title / Description / H1 / Intro 必须完整。
- About 至少 1 段。
- How to Play 至少 3 步。
- Rules 至少 3 条。
- Tips 至少 2 条。
- FAQ 至少 3 条。
- 同语言 Meta Title 不允许 Topic 游戏之间重复。
- 同语言 H1 不允许 Topic 游戏之间重复。

任何一个 Topic 游戏不满足，`npm run build` 直接失败。

通过 Gate 后，Topic 游戏统一输出：

```text
seoStatus = optimized
```

---

## 9. 移动端 QA 与 SEO 状态分离

```text
seoStatus=optimized
≠
testedMobile=true
```

`testedMobile=true` 只能在真人完成至少一个移动端核心玩法循环后设置。

CI Mobile Screenshot 只负责：

- 断版
- 溢出
- 遮挡
- Runtime 是否加载
- 导航
- 错误翻译
- 视觉回归

它不等于真人触控试玩。

当前已知：

```text
Quick Tap: testedMobile=true
其他 Topic 游戏：按各 Profile 实际 testedMobile 字段为准
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

## 10. Structured Data

- `VideoGame`：只输出可验证字段。
- `BreadcrumbList`：P2 优先体现主 Topic。
- `FAQPage`：页面显示什么，Schema 才输出什么。
- Topic Hub：`CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- 禁止虚构 `AggregateRating` / ratingCount / plays / reviews。

---

## 11. CI / Visual SEO QA

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
reviewed / optimized 显式 Profile
+ reviewedProfile({...})
+ optimizedProfile({...})
+ 全部正式 Topic Hubs
```

每个 P2 游戏：

```text
games/{slug}/page-desktop.png
games/{slug}/page-mobile.png
games/{slug}/game-runtime.png
```

每个 Topic：

```text
topics/{topic}/page-desktop.png
topics/{topic}/page-mobile.png
```

固定 Mobile Shell：

```text
/
/action
/game/tetris
/games/tetris/index.html
```

当前全量目标：

```text
38 Topic game pages
9 Topic Hubs
+ Mobile Shell regression
```

---

## 12. Analytics 与两周观察指标

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

已有搜索信号：

```text
quick tap game
tap tower game
tap tycoon
no download just tap to play
merge defense
hex merge
gem crush
```

### 2026-08-21 第一轮复盘

至少对比：

```text
1. 全站 impressions / clicks / CTR / avg position
2. 38 optimized 游戏页的 impressions / clicks
3. 9 Topic Hub 的 impressions / clicks
4. 新出现 Query 数量
5. Position 4–20 的机会 Query
6. 有曝光无点击页面
7. game_start / game_30s / game_60s
8. related_game_click
```

判定逻辑：

- 有曝光、无点击 → 优先改 Title/Description/意图匹配。
- 有点击、无 `game_start` → 优先修首屏/产品入口。
- `game_start` 高但 30s 留存低 → 修游戏，不堆 SEO 文字。
- Query 与现有页面高度相关 → 回填当前页 FAQ/Rules/Metadata，默认不新建 URL。
- 某机制形成稳定 Query Cluster → 再决定是否扩下一 Topic。

14 天只是第一轮反馈窗口，不代表所有新页面都已完成 Google 的长期排名评估。

---

## 13. 关键代码职责

```text
public/games/{slug}/
    真实 HTML5 Runtime；玩法事实最终来源

src/data/games.json
    100 游戏基础库存；generated fallback

src/data/game-profiles.ts
    P2 类型、Topic成员、Profile聚合、Topic SEO Completion Gate

src/data/game-profiles/factory.ts
    source-grounded optimized Profile 工厂；testedMobile 独立

src/data/game-profiles/*.ts
    38 个 Topic 游戏的真实机制、关键词、EN/ZH P2 内容

src/data/topic-seo.ts
src/data/topic-seo/*.ts
    9 个 Topic Hub

src/lib/games.ts
    游戏读取、P2覆盖、Topic关系、metadata

src/views/GamePageView.tsx
    P2 / generated fallback 单游戏视图

src/views/TopicPageView.tsx
    Topic Hub 视图

src/app/sitemap.ts
    Static / Category / Topic / Game sitemap

scripts/generate-game-index.js
    Search Index；P2描述优先

scripts/list-p2-qa-games.mjs
    Visual QA 自动发现 reviewed/optimized 和两种 Profile factory

scripts/list-topic-hubs.mjs
    自动发现全部正式 Topic Hub

.github/workflows/ci.yml
    Production build

.github/workflows/visual-seo.yml
    Game + Topic + Mobile visual regression

docs/README.md
    唯一 SSOT
```

---

## 14. 当前决策

### 已完成

```text
P0/P1 Technical SEO
100 game inventory cleanup
9 Gameplay Topic Hubs
38 source-grounded single-game P2 profiles
38 Topic game content SEO optimized
EN/ZH metadata + content
Hub ↔ Game internal links
sitemap
Production Build gate
Visual SEO QA
```

### 2026-08-07 → 2026-08-21

```text
不继续盲目扩 Topic
不批量改 62 generated 页面
不频繁重写 38 optimized 页面的 Title/正文

主要动作：
观察 GSC
观察 GA4 engagement
记录新 Query
修技术 Bug
修明显产品 Bug
```

### 2026-08-21 之后

根据数据决定：

1. 哪些 Topic 有真实增长。
2. 哪些单游戏页需要第二轮 Title/FAQ/内容迭代。
3. 62 个 generated 游戏中哪些已经出现搜索信号。
4. 是否存在值得建立的新 Gameplay Topic Cluster。
5. 哪些页面应该继续投入，哪些保持现状。

不要为了“100 个全 optimized”而给没有搜索价值的游戏强行制造内容资产。

---

## 15. 技术债

1. Next.js 15.5.2 存在安全升级提示，后续升级到已修复版本。
2. `@cloudflare/next-on-pages` 已不是正式部署链路；当前是静态 export，后续删除旧依赖和 deploy scripts。
3. 62 个 generated 游戏仍使用历史基础内容/默认日期；根据真实搜索信号逐批迁移。
4. `VideoGame.operatingSystem` 等 Schema 字段继续按真实平台能力保守维护。
5. Topic 不以数量为 KPI；没有真实语义差异和搜索需求时不创建空 Hub。

---

## 16. 文档维护规则

1. `docs/` 只维护本 `README.md`。
2. 新增/删除游戏要同步总数和分类计数。
3. 新 Topic 上线要同步成员和 URL。
4. `generated / reviewed / optimized` 状态变化同步本文。
5. `seoStatus` 和 `testedMobile` 永远分别记录。
6. SEO / Mobile / CI / 部署标准变化直接改本文，不创建平行规划文档。
7. GSC 出现有意义的新阶段基线再更新，不写每日流水账。
8. 过期规则直接删除，Git 历史保存历史。

任何 ChatGPT / Codex / 开发者接手项目时，应先读本文件。当前最重要的项目状态只有一句话：

> **9 个正式 Topic 和其中 38 个单游戏内容 SEO 已全部完成；接下来冻结大规模 SEO 变更两周，用 GSC + GA4 决定下一步。**
