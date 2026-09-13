# ZeroPlay 消除类游戏产品线方案（Eliminate Series Plan）

> **状态**：v0.1 待评审 ｜ 日期：2026-09-13 ｜ 关联 SSOT：`docs/README.md`
> 本文通过评审后，需按 §8 同步 `docs/README.md` 与生产 Gate。

---

## 1. 背景与目标

### 1.1 动机

现有库存中约 10 款消除/拼图类游戏（`gem-crush`、`block-blast`、`bubble-pop`、`water-sort`、`screw-sort-master` 等）属于 SEO 覆盖物：验收标准是"能打开、能玩、不报错"，视觉为 SVG 极简、音频为合成单音、手感无反馈设计。用户定性：**没有真实的游戏感**。

### 1.2 已确认决策（2026-09-13）

| 决策项 | 选择 |
|---|---|
| 本轮交付 | 先出系列规划（本文） |
| 质量基准 | **精品管线**：GDD → 机制验证 → 手感打磨 → QA 验收 |
| 存量处理 | **全新重做**：按新标准重做，旧实现降权/下架 |

### 1.3 目标

1. 建立完整的**消除类产品线**：覆盖 三消 / 连连看 / 对对碰 / Block Out + 存量子类型重做。
2. 以精品管线树立 ZeroPlay 的**游戏感标杆**（视觉、音频、手感、深度四维可量化）。
3. 搜索侧覆盖消除类大词与长尾（`match 3`、`三消`、`连连看`、`对对碰`、`block puzzle`、`water sort` 等），延续站点 SEO 驱动模式。

---

## 2. 市场与需求依据

> 数据来源：AppMagic Casual Games Report H1 2026 / 2025；中国市场报告见引用链接。

| 事实 | 数据 | 对本系列的启示 |
|---|---|---|
| 消除/益智占休闲市场收入 >44% | H1 2026 益智品类 $4.9B | 品类基本盘稳固，值得做产品线 |
| **三消是最大子品类** | H1 2026：$2.5B（占益智品类一半以上）、下载 392M（+10% YoY） | 三消必须做，且作为**旗舰**定位 |
| Merge/合成增长最快 | H1 2026：$1.3B，2025 全年 +8% YoY | 项目已有 `hex-merge/2048/fusion-4096/pet-merge`，不新增 |
| 连连看、泡泡龙下载量高、内购弱 | 活跃于 T3/T4 与新兴市场（2024 消除报告） | **高搜索需求、低变现** → 正适合 SEO 免费站承接流量 |
| 中国消除类市场稳健 | 2024 约 128.6 亿元（+3.7%） | 简中/繁中语言有真实用户池 |
| 堆叠消除在下沉市场潜力大 | 2024 消除报告 | 候选池（Phase 4 后评估） |

**优先级结论**：三消（旗舰/大词）＞ Block Out（差异化单品）＞ 连连看 / 对对碰（流量型）＞ 存量重做（质量补齐）。

引用：
- https://appmagic.rocks/research/casual-report-H12026
- https://pocketgamer.biz/puzzle-accounts-for-44-of-casual-mobile-earnings-in-h1-2026/
- https://m.10100.com/article/5234758
- https://m.sohu.com/a/844470104_121823499/

---

## 3. 子类型全景与选型

### 3.1 全景与动作矩阵

| 子类型 | 玩法核心 | 代表产品 | 现有库存 | 本系列动作 | 优先级 |
|---|---|---|---|---|---|
| 三消 Match-3 | 交换相邻、三连消除 | Candy Crush / Royal Match | `gem-crush` | **全新重做（旗舰）** | P1 |
| Block Out | 同色门滑出消除 | Block Out! / Color Block Jam | `color-brick-jam`（WIP 未入库） | **收尾入库** | P0 |
| 连连看 Line Connect | 点同款、≤2 拐弯连线消除 | 宠物连连消 | **缺失** | **新建** | P1 |
| 对对碰 Match Pairs | 翻牌/点对配对消除 | Triple Match 类 | `memory-cards`（记忆翻牌，非对碰） | **新建** | P1 |
| 方块消行 Block Match | 拖块填行消除 | Block Blast | `block-blast` | 重做 | P2 |
| 水排序 Color Sort | 同色归桶 | Water Sort | `water-sort` | 重做 | P2 |
| 点击消除 Tap-to-pop | 点同色团爆破 | Bubble Pop | `bubble-pop` | 重做 | P2 |
| 泡泡龙 Bubble Shooter | 发射三连消除 | 泡泡龙 | `bubble-shooter` | 重做 | P3 |
| 排序收纳 Sort | 分类归位 | Screw Sort | `screw-sort-master`、`bus-queue-sort` | 重做 | P3 |
| 颜色路径 Color Route | 同色通道 | — | `color-block-route` | 重做 | P3 |
| 六边形堆叠 Hexa Stack | 堆叠消层 | — | `hexa-color-stack` | 重做 | P3 |

### 3.2 候选池（Phase 4 后评估）

- 麻将连连看（Mahjong Connect）：连连看变体，边沿取牌 + 连线。
- Zuma / 射击消除：弹珠轨道三连。
- 堆叠消除（Stack Blast）：下沉市场潜力，玩法差异化强。

### 3.3 选型原则

1. **搜索需求**：优先承接真实大词（GSC/榜单验证）。
2. **差异化**：避免与头部直接竞争内容量，主打"加载快、无内购、即时开玩、干净视觉 + 手感扎实"。
3. **引擎复用**：优先选择能共享消除核心（网格/匹配/动画/反馈）的子类型，摊薄开发成本。

---

## 4. 系列架构：共享消除核心引擎

### 4.1 总体结构

参考 `_color-puzzle/` 已验证模式（共享 `core.js` + `core.css` + 各游戏独立玩法），演进为消除线专用引擎：

```text
public/games/_eliminate/
├── core.js        # 共享运行时：音频、粒子、事件、进度、工具（复用 _color-puzzle 能力）
├── core.css       # 视觉基座：HUD、按钮、模态、动效、响应式
├── match.js       # 三消：网格模型、匹配检测、下落/生成、连锁
├── line.js        # 连连看：路径算法（≤2 拐弯）、棋盘生成、死局检测
├── pair.js        # 对对碰：配对检测、翻牌/点对状态机
├── blockout.js    # Block Out：砖块物理、门判定（color-brick-jam 迁移）
└── block.js       # 消行：形状拖拽、填行判定（Phase 3）
```

### 4.2 分层职责

| 层 | 职责 | 对应模块 |
|---|---|---|
| 模型层 | 网格/棋盘状态、匹配/路径/配对算法、难度参数 | match.js / line.js / pair.js … |
| 表现层 | 动画时序、粒子、音效分层、震动、屏幕反馈 | core.js（sfx/confetti/vibrate） |
| HUD/壳层 | 顶栏、计分、进度、暂停/重开、结算模态、本地存档 | core.css + core.js |
| 玩法层 | 每款游戏输入规则与循环 | 各游戏 `index.html` + game.js |

### 4.3 与 `_color-puzzle` 的关系

- 能力重叠：`core.js`（音频合成、confetti、toast、emit/store/vibrate）直接复用或合并。
- 推荐：**统一收敛为 `_eliminate/`**，`_color-puzzle` 保留为历史命名或重定向，避免两套核心漂移。
- 待评审：是否将现有 4 款已入库 color-puzzle 游戏（`screw-sort-master` 等）迁移到新引擎（见 §8 存量整合）。

### 4.4 引擎验收标准（Phase 0 交付）

- 5 个玩法模块可独立运行 demo 关卡。
- 每模块带 `?selftest=1` 自测：自动完成 N 关 + 断言关键状态（沿用 color-brick-jam 自测规范）。
- postMessage 事件契约：`runtime_ready / first_input / game_end{win|fail, level, moves|score}`。
- 390px 移动端优先，320/360 无横向溢出。

---

## 5. 首批游戏规格（GDD 精简）

> 每款开发前出完整 GDD（沿用 `docs/color-brick-jam-GDD.md` 模板：对标矩阵 → 核心循环 → 规则 → 手感 → HUD/道具 → 数值曲线 → 美术规范 → 技术集成 → 自测）。

### 5.1 Color Brick Jam（Block Out 类）— P0 收尾

- **现状**：V1 原型已出（`public/games/color-brick-jam/`，GDD v1.0 待评审），L1/L4 可玩、本地渲染零报错。
- **收尾项**：全量关卡 solver 报告 → 手感验收（跟手拖拽、combo 音效、破碎粒子）→ QA → 入库。
- **入库动作**：`games.json` +1、新增 Profile、SEO Gate 总数 124→125、SSOT 同步（sitemap 576→约 580）。
- **SEO 词**：`block puzzle`、`color sort`、`color brick game`。

### 5.2 三消（重做 `gem-crush`）— 旗舰

- **定位**：品类最大词承接，ZeroPlay 消除线门面。
- **机制**：8×8 网格、5 色、交换匹配 3+、连锁下落、combo 计分；每局限步/限时目标。
- **爽感设计**：消除爆裂粒子 + 分层音效（match/chain/clear）、连锁计时条、分数飘字、combo 震屏。
- **差异化（vs 头部）**：无 IAP、无关卡墙、加载 <1s、单局 2 分钟可完整体验；视觉走霓虹/宝石主题而非糖果农场。
- **规模**：首批 60 关（solver 可生成与校验），后续数据驱动扩容。
- **SEO 词**：`match 3 game`、`match 3 puzzle`、`三消游戏`、`消消乐`。

### 5.3 连连看 Line Connect — 新建

- **机制**：N×M 图标棋盘，点两个同款、连线 ≤2 拐弯且路径空 → 消除；死局洗牌；限时目标。
- **爽感设计**：连线路径高亮动画、消除炸裂、连续快速消除 combo、剩余数提示。
- **难度曲线**：8×8 → 12×12，图标种类 8 → 16；每关 `?selftest=1` 断言"存在可解开局"（生成器带解法校验）。
- **SEO 词**：`connect game`、`matching game`、`连连看`。

### 5.4 对对碰 Match Pairs — 新建

- **机制**：A）翻牌配对（记忆型，2 人可竞速）B）点对消除（盘面直接可见同款点对消除）。首版做 B（更爽、更适配"消除"定位），A 作模式扩展。
- **爽感设计**：配对成功连击 + 满盘消除全屏反馈、时间奖励链。
- **SEO 词**：`match pairs`、`pair matching`、`对对碰`。

---

## 6. 优先级与里程碑

| Phase | 内容 | 交付物 | 验收 |
|---|---|---|---|
| **P0**（第 1 周） | 消除核心引擎 `_eliminate/` | core.js/css + 5 个玩法模块 + demo 关卡 | §4.4 验收标准全过 |
| **P1**（第 1-2 周） | Color Brick Jam 收尾入库 | 全量关卡 solver、QA、入库（125 款） | 精品管线 QA Gate 通过 |
| **P2**（第 2-4 周） | 连连看 + 对对碰（新建） | 两款精品游戏入库（127 款） | 同上 + SEO Gate |
| **P3**（第 4-6 周） | 三消重做（旗舰）+ block-blast 重做 | `gem-crush`/`block-blast` 换新 Runtime | 同 slug 替换，SEO 资产保留 |
| **P4**（持续） | 存量消除类逐批重做/降权 | water-sort、bubble-pop 等 | 见 §8 整合规则 |

> 节奏原则：**每次只推进 1 个 Phase**，上一 Phase 验收通过才进入下一 Phase；不并行铺量。

---

## 7. 精品管线（质量基准）

### 7.1 每款强制流程

```text
GDD（对标矩阵 + 规则 + 数值）→ 机制原型（可玩）→ solver/自测（机制正确性）
→ 手感打磨（动效/音效/粒子/时序）→ QA 验收（4 端）→ 入库 Gate（数据 + SEO + SSOT）
```

### 7.2 游戏感四维标准（可量化）

| 维度 | 最低标准 |
|---|---|
| **视觉** | 主题化美术（非纯色块）、消除/破碎粒子 ≥1 套、按钮/卡片有按压与悬停反馈、加载与结算页完整 |
| **音频** | 分层音效（操作/match/连锁/胜利/失败 ≥5 类）、WebAudio 合成可静音、支持震动反馈 |
| **手感** | 输入跟手（拖拽吸附/点击命中容差）、反馈时序 <120ms、combo/连锁有节奏递进、无输入吞失 |
| **深度** | 明确的难度曲线、关卡目标或分数系统、进度持久化（localStorage）、Restart 即时 |

### 7.3 入库 Gate（沿用现有生产 Gate）

- `games.json` 条目（slug 唯一、id 唯一）。
- `game-profiles/*.ts` Profile（`optimized` 级，EN/zh 完整，zh-TW/es 继承同一玩法事实）。
- Runtime 与 Thumbnail 文件真实存在（`scripts/verify-all-game-seo.mjs`）。
- `EXPECTED_PRODUCTION_GAMES` 同步更新；SSOT（`docs/README.md`）同步总数、Category 数量、sitemap URL 数。
- 多语言 SEO 内容与 Runtime 事实一致（QA Gate 2）。

---

## 8. 存量整合与数据管理

### 8.1 重做清单（保留 slug / 路由 / SEO 资产，替换 Runtime + 更新 Profile）

| slug | 子类型 | 计划 Phase |
|---|---|---|
| `gem-crush` | 三消 | P3（旗舰） |
| `block-blast` | 方块消行 | P3 |
| `water-sort` | 水排序 | P4 |
| `bubble-pop` | 点击消除 | P4 |
| `bubble-shooter` | 泡泡龙 | P4 |
| `screw-sort-master` / `bus-queue-sort` | 排序收纳 | P4 |
| `color-block-route` / `hexa-color-stack` | 颜色路径 / 堆叠 | P4 |

> 重做期间：旧版保持在线，新版就绪后同 slug 替换，避免 404 与索引波动。

### 8.2 降权/下架规则

- 重做前：从首页 Popular / 分类代表位移除，保留目录与 SEO 页（避免索引丢失）。
- 重做完成后：按新质量恢复推荐位。
- 明确不重做的低质库存：从 `games.json` 移除（**下架 = 从 inventory 删除 + Profile 删除 + Gate 总数同步**），不留僵尸页。

### 8.3 库存台账（当前事实）

- 当前总数 **124**（`games.json` 104 + `games-search-top20.json` 20）；SSOT 写 120 已过时 → **本次同步修复为 124**。
- Category：puzzle 34 款为最大分类（含 4 款已入库 color-puzzle）。
- 规划后预期：入库 color-brick-jam（+1）与连连看、对对碰（+2）→ **127**；重做不改变总数。
- `verify-all-game-seo.mjs` 的 `EXPECTED_PRODUCTION_GAMES` 随每次入库同步。

---

## 9. 技术落地

### 9.1 目录与文件

```text
public/games/_eliminate/          # 共享引擎（Phase 0）
public/games/color-brick-jam/     # 已存在，收尾
public/games/line-connect/        # 新建（连连看）
public/games/match-pairs/         # 新建（对对碰）
src/data/game-profiles/eliminate.ts   # 消除线 Profile 聚合（或沿用现有文件组织）
```

### 9.2 生成 vs 静态提交

- 消除线每款玩法差异大，**采用"共享引擎 + 每款独立 index.html 静态提交"**（同 color-puzzle 路线），不引入构建期脚本生成（除非后续出现同玩法多皮肤需求）。
- 引擎文件（`_eliminate/*.js/css`）提交 Git，与 `_search-top20` 的生成物策略区分。

### 9.3 数据与 SEO 链路

- 入库动作全链：`games.json` + Profile + Runtime/Thumbnail + Gate 更新 + `generate-game-index`（多语言搜索索引）+ sitemap 自动纳入。
- 4 语言（en/zh/zh-TW/es）SEO 继承同一套已验证玩法事实（SSOT 既有规则）。

---

## 10. 风险与开放问题

| 项 | 风险/问题 | 建议 |
|---|---|---|
| 三消红海 | 与头部直接竞争内容量必败 | 主打"免下载即时开玩 + 无内购 + 手感扎实"的浏览器定位；差异化主题 |
| 引擎共享度 | 5 个玩法模块共享收益 vs 过度抽象成本 | Phase 0 只建"能力清单 + demo"，不做完备框架；先服务首批 3 款 |
| 精品节奏 | 精品管线单款成本高（估算 3-5 天/款） | 严守 1 Phase 推进，不并行；数量不是 KPI |
| `_color-puzzle` 存量 | 已入库 4 款迁移新引擎 vs 保留 | P4 评估；迁移前不新增依赖 |
| SSOT 一致性 | 120→124 已漂移 | 本次规划评审通过后一并修复 |

---

## 11. 待评审决策点

1. 引擎命名与收敛：`_eliminate/` 是否合并 `_color-puzzle`？
2. 对对碰首版模式：B（点对消除，推荐）还是 A（翻牌记忆）？
3. 三消旗舰主题方向：霓虹宝石（推荐）还是其他？
4. 下架策略：明确不重做的低质消除类（如 `color-match`、`color-fill`）是否下架？
5. 里程碑节奏：P0-P3 连续推进是否需要先暂停当前其他线（如 search-demand 观察）？
