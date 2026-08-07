# ZeroPlay Games 项目总文档

> **Single Source of Truth（SSOT）**：本文件记录 ZeroPlay Games 的站点定位、100 游戏 SEO 状态、Gameplay Topic 架构、单游戏 SEO 标准、CI/Visual QA、移动端验证、部署和观察计划。
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
- **单游戏内容 SEO**：**100/100 `optimized`**
- **generated 游戏**：**0**
- **当前策略**：100 个单游戏页全部上线后，冻结大规模 SEO 重写 2 周，观察真实 GSC/GA4 变化

第一轮观察窗口：

```text
2026-08-07 → 2026-08-21
```

这 14 天默认不再进行大规模 Title/正文重写、不批量新增 Topic、不改变整体 URL 架构，只处理：

1. 索引/抓取/Canonical/Hreflang 等明确技术错误。
2. Runtime 无法加载、页面断版等产品 Bug。
3. 明确错误的玩法事实。
4. 严重影响用户开始游戏的移动端问题。

这样两周后的数据才有可比较性。

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

1. **每个正式游戏都必须有独立 SEO Profile。** 是否属于正式 Topic 不再决定单页是否优化。
2. 一个游戏页承接一组同主题长尾词，不为同义词制造薄页面。
3. Topic Hub 承接玩法级搜索意图，作为聚合和内链层，不替代单游戏 SEO。
4. 单游戏内容来自 Runtime 源码、产品事实、Git 历史、实际 QA 和 GSC Query；AI 只组织表达。
5. 同一游戏只维护一份 `GameSeoProfile`，可以同时属于多个 Topic。
6. `seoStatus` 与 `testedMobile` 完全分离：
   - `seoStatus` = 单游戏内容 SEO 是否完成。
   - `testedMobile` = 是否经过真人移动端核心玩法验证。
7. `optimized` 不代表 `testedMobile=true`，不要从 SEO 状态推断设备 QA。
8. SEO 内容不能挡住产品。用户应先看到游戏和开始入口，再看到扩展正文。

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
| CI | Node 22 + 100-game SEO Gate + production build |
| Visual QA | 100 Game Pages + 9 Topic Hubs + Mobile Shell 自动截图 |

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
- 100 个游戏全部使用独立 EN/ZH Title / Meta Description / H1。
- 已核验 Profile 描述优先覆盖旧 `games.json` 描述并进入站内卡片/Search Index。

---

## 5. 100 游戏库存

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

正式库存的一一对应关系由以下事实源共同保证：

```text
src/data/games.json                  100 个正式 slug
public/games/{slug}/index.html       真实 Runtime
src/data/game-profiles*              100 个源码级 SEO Profile
```

Production Build 会强制校验 `games.json` 与 Profile 数量、slug 一一对应；缺一个、多一个都会失败。

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

没有进入这 9 个 Hub 的游戏仍然拥有完整单游戏 SEO；Topic 只是搜索聚合层，不是 SEO 完成状态。

---

## 7. 单游戏 SEO 状态

状态定义：

```text
generated
= 只有基础页，尚未完成逐游戏源码级 SEO

reviewed
= 历史中间状态；源码级内容已建立但尚未通过完整 Completion Gate

optimized
= 单游戏内容 SEO 已通过生产 Completion Gate
  不代表 testedMobile=true
```

当前生产目标状态：

```text
100 total games
100 optimized
0 reviewed
0 generated
9 formal Topic Hubs
```

本轮新增的 62 个 Profile 不是按游戏名套通用文案。全部先读取对应 `public/games/{slug}/index.html`，再记录实际 Objective、Controls、Scoring、概率、时间、生命、失败条件、保存机制等事实。

本轮特别保留的实现差异包括：

- Tangram 当前没有自动解题判定；`Next Puzzle` 是手动推进。
- Sand Fall 是开放粒子沙盒，没有分数、胜负和 Game Over。
- Pipe Connect 的实际成功条件是左上 BFS 网络到达右下格，不宣称所有随机棋盘保证可解。
- Bubble Cannon 当前源码没有真正实现 Game Over，也不会像 Bubble Shooter 一样清除失去顶部连接的悬空组。
- Bowling 当前使用简化倒瓶累计，不冒充正式 strike/spare 奖励计分。
- Boat Race 当前没有对手船，是单人河道距离/避障玩法。
- Asteroid Dodge 当前没有射击，是纯躲避玩法。
- Subway Dash 当前只有三车道换道，没有跳跃/下蹲。
- Chess Puzzle 是 8 个固定 `from/to` 答案，不冒充完整国际象棋引擎。
- Gomoku 当前没有明确满盘平局处理，因此页面不虚构自动平局。

---

## 8. 单游戏 Page Standard

100 个正式游戏都必须有：

```text
Primary Keyword
至少 2 个 Secondary Keywords
EN/ZH Meta Title
EN/ZH Meta Description
EN/ZH H1
EN/ZH Intro
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

- Title 必须体现该游戏真实独特机制，不使用全站统一模板作为最终 Title。
- Description = 游戏目标 + 核心玩法 + 1～2 个具体事实。
- How to Play、Rules、FAQ 必须是这个游戏自己的事实。
- 如果删掉游戏名后正文可以原封不动放到几十个游戏页，它不能作为核心事实内容。
- 保存进度、移动支持、计分、时间、等级、波次、概率、成本等声明必须可追溯。
- 没有某机制就明确不写；产品与常见同名玩法不同，以当前 Runtime 为准。
- 禁止虚构用户数、评分、播放量、评论、医学/科学基准。

---

## 9. 100-game SEO Completion Gate

`npm run build` 前先执行：

```text
npm run seo:verify
```

静态验证要求：

- `games.json` 必须正好 100 个正式游戏。
- 必须发现正好 100 个源码级 Profile。
- Inventory 与 Profile slug 必须一一对应。
- 不允许缺 Profile。
- 不允许存在库存外 Profile。

运行时内容 Gate 对每个游戏继续检查：

- Primary Keyword 存在。
- Secondary Keywords ≥ 2。
- EN/ZH Objective 完整。
- Controls ≥ 1。
- 至少 1 条源码级 Mechanics。
- EN/ZH Title / Description / H1 / Intro 完整。
- About ≥ 1 段。
- How to Play ≥ 3 步。
- Rules ≥ 3 条。
- Tips ≥ 2 条。
- FAQ ≥ 3 条。
- 同语言 Meta Title 不允许 100 个游戏之间重复。
- 同语言 H1 不允许 100 个游戏之间重复。

任何一个游戏失败：

```text
npm run build = FAIL
Cloudflare 不应进入正常发布
```

全部通过后生产导出的 Profile 统一为：

```text
seoStatus = optimized
```

---

## 10. 移动端 QA 与 SEO 状态分离

```text
seoStatus=optimized
≠
testedMobile=true
```

`testedMobile=true` 只能在真人完成至少一个移动端核心玩法循环后设置。

CI Mobile Screenshot 负责：

- 断版
- 溢出
- 遮挡
- Runtime 是否加载
- 导航
- 错误翻译
- 视觉回归

它不等于真人触控试玩。

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

## 11. Structured Data

- `VideoGame`：只输出可验证字段。
- `BreadcrumbList`：属于正式 Topic 时优先体现主 Topic，否则回到 Browse Category。
- `FAQPage`：页面显示什么，Schema 才输出什么。
- Topic Hub：`CollectionPage + ItemList + BreadcrumbList + FAQPage`。
- 禁止虚构 `AggregateRating` / ratingCount / plays / reviews。

---

## 12. CI / Visual SEO QA

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

自动发现：

```text
reviewed / optimized 显式 Profile
+ reviewedProfile({...})
+ optimizedProfile({...})
+ catalogProfile({...})
```

并且必须精确发现：

```text
100 Game Pages
```

每个游戏：

```text
games/{slug}/page-desktop.png
games/{slug}/page-mobile.png
games/{slug}/game-runtime.png
```

9 个 Topic：

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

最终全量截图规模预期：

```text
100 × 3 = 300 game screenshots
9 × 2   = 18 topic screenshots
+ Mobile Shell regression
```

---

## 13. Analytics 与两周观察指标

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
2. 100 optimized 游戏页的 impressions / clicks
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

## 14. 关键代码职责

```text
public/games/{slug}/
    100 个真实 HTML5 Runtime；玩法事实最终来源

src/data/games.json
    100 个正式游戏库存

src/data/game-profiles.ts
    Profile 类型、Topic成员、100-game Completion Gate、Profile聚合

src/data/game-profiles/factory.ts
    早期 source-grounded Profile 工厂；testedMobile 独立

src/data/game-profiles/tap.ts
src/data/game-profiles/merge.ts
src/data/game-profiles/defense.ts
src/data/game-profiles/memory.ts
src/data/game-profiles/reaction.ts
src/data/game-profiles/number.ts
src/data/game-profiles/word.ts
src/data/game-profiles/classic.ts
src/data/game-profiles/idle.ts
    早期 38 个 Topic 游戏的独立 Profile

src/data/game-profiles/catalog-factory.ts
    剩余正式库存的结构化事实 Profile 工厂；只消费显式源码事实

src/data/game-profiles/catalog-action.ts
src/data/game-profiles/catalog-arcade.ts
src/data/game-profiles/catalog-casual-puzzle.ts
src/data/game-profiles/catalog-racing-shooting.ts
src/data/game-profiles/catalog-sports-strategy.ts
    后续 62 个游戏的独立关键词、机制和 EN/ZH 内容

src/data/topic-seo.ts
src/data/topic-seo/*.ts
    9 个 Topic Hub

src/lib/games.ts
    游戏读取、Profile覆盖、Topic关系、metadata

src/views/GamePageView.tsx
    统一单游戏 SEO 视图

src/views/TopicPageView.tsx
    Topic Hub 视图

scripts/verify-all-game-seo.mjs
    静态检查 100 inventory slug ↔ 100 Profile

scripts/generate-game-index.js
    Search Index；Profile描述优先

scripts/list-p2-qa-games.mjs
    Visual QA 自动发现全部 100 个游戏

scripts/list-topic-hubs.mjs
    自动发现全部正式 Topic Hub

.github/workflows/ci.yml
    Production build

.github/workflows/visual-seo.yml
    100 Game + Topic + Mobile visual regression

docs/README.md
    唯一 SSOT
```

---

## 15. 当前决策

### 已完成

```text
P0/P1 Technical SEO
100 game inventory cleanup
100 Runtime 源码复核
100 source-grounded single-game SEO profiles
100 / 100 game content SEO optimized
9 Gameplay Topic Hubs
EN/ZH metadata + content
Topic Hub ↔ member Game internal links
sitemap
100-game SEO Completion Gate
Visual SEO QA pipeline
```

### 2026-08-07 → 2026-08-21

在本批次部署并确认生产 CI 后：

```text
冻结大规模 SEO 改写
不为了数量继续新增 Topic
不频繁修改 100 个页面的 Title/正文

主要动作：
观察 GSC
观察 GA4 engagement
记录新 Query
修技术 Bug
修明显产品 Bug
```

### 2026-08-21 之后

根据数据决定：

1. 100 个游戏中哪些页面真正获得曝光与点击。
2. 哪些 Topic 有真实增长。
3. 哪些单游戏页需要第二轮 Title/FAQ/内容迭代。
4. 哪些 Query 已形成新的玩法 Cluster，值得新增 Hub。
5. 哪些游戏产品本身需要改善留存，而不是继续增加 SEO 文字。

---

## 16. 技术债

1. Next.js 15.5.2 存在安全升级提示，后续升级到已修复版本。
2. `@cloudflare/next-on-pages` 已不是正式部署链路；当前是静态 export，后续删除旧依赖和 deploy scripts。
3. npm audit 仍有依赖安全告警，需要单独升级验证，不能和本轮 SEO 大改混在一起。
4. `VideoGame.operatingSystem` 等 Schema 字段继续按真实平台能力保守维护。
5. Topic 不以数量为 KPI；没有真实语义差异和搜索需求时不创建空 Hub。

---

## 17. 文档维护规则

1. `docs/` 只维护本 `README.md`。
2. 新增/删除游戏要同步总数和分类计数。
3. 新 Topic 上线要同步成员和 URL。
4. 所有正式游戏必须保持 `seoStatus=optimized`；新增游戏在 Profile 和 Gate 完成前不能进入正式库存。
5. `seoStatus` 和 `testedMobile` 永远分别记录。
6. SEO / Mobile / CI / 部署标准变化直接改本文，不创建平行规划文档。
7. GSC 出现有意义的新阶段基线再更新，不写每日流水账。
8. 过期规则直接删除，Git 历史保存历史。

任何 ChatGPT / Codex / 开发者接手项目时，应先读本文件。当前最重要的项目状态只有一句话：

> **100 个正式游戏的单游戏内容 SEO 已全部完成；9 个 Topic Hub 作为聚合层保留。生产验证完成后冻结大规模 SEO 变更到 2026-08-21，再用 GSC + GA4 做第一轮结果复盘。**
