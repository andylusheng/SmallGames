# ZeroPlay Games 开发文档

> 域名：https://zeroplaygames.com  
> 品牌：ZeroPlay Games  
> 定位：免费 H5 在线游戏门户，浏览器即开即玩，无需下载

---

## 1. 项目概览

ZeroPlay Games 是一个包含 **100 款自研 HTML5 游戏** 的免费在线游戏站。支持 **英文（主站）+ 中文** 双语，采用 Next.js 静态导出部署到 Cloudflare Pages。

### 核心指标

| 项目 | 数值 |
|---|---|
| 游戏总数 | 100 款 |
| 游戏分类 | 9 个（action/puzzle/arcade/racing/sports/shooting/strategy/casual/idle） |
| 页面总数 | ~440+（首页×2 + 分类页×18 + 游戏页×200 + 静态页×8 + 搜索页×2） |
| 语言 | en（默认/主站）、zh |
| 部署平台 | Cloudflare Pages |
| GA4 | G-XV35XKZ474 |

---

## 2. 技术栈

| 层级 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js (App Router) | 15.5+ |
| 渲染模式 | 静态导出 (`output: "export"`) | — |
| UI | React | 19.x |
| 样式 | Tailwind CSS v4 | 4.3+ |
| 图标 | lucide-react | 1.25+ |
| 语言 | TypeScript | 6.x |
| 部署 | Cloudflare Pages (wrangler) | 4.x |
| 分析 | Google Analytics 4 | G-XV35XKZ474 |
| 广告 | Google AdSense（预留） | ca-pub-XXXX |

### 关键配置

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",       // 纯静态导出，生成 out/ 目录
  images: { unoptimized: true },  // 静态导出不支持 next/image 优化
};
```

---

## 3. 项目结构

```
├── public/
│   ├── games/{slug}/          # 100款游戏（每款含 index.html + thumb.svg）
│   ├── favicon.svg            # 品牌图标（indigo播放键）
│   ├── og-image.png           # 社交分享图（1200×630）
│   └── _redirects             # Cloudflare Pages 重定向规则
├── scripts/
│   ├── generate-og-image.js   # 生成 og-image.png（sharp）
│   ├── enrich-seo.js          # 批量生成游戏SEO内容
│   ├── generate-zh-seo.js     # 生成中文SEO数据
│   ├── enlarge-games.js       # 游戏画面扩大
│   └── fetch-gd-games.js      # GameDistribution游戏抓取（备用）
├── src/
│   ├── app/
│   │   ├── (en)/              # 英文路由组（默认语言，无URL前缀）
│   │   │   ├── layout.tsx     # 英文布局（GA4 + JSON-LD + AdSense）
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── [slug]/page.tsx        # 分类页（动态路由）
│   │   │   ├── game/[slug]/page.tsx   # 游戏详情页（动态路由）
│   │   │   ├── search/page.tsx        # 搜索页
│   │   │   ├── about/page.tsx         # 关于
│   │   │   ├── privacy/page.tsx       # 隐私政策
│   │   │   ├── terms/page.tsx         # 服务条款
│   │   │   └── dmca/page.tsx          # DMCA
│   │   ├── zh/                # 中文路由（/zh 前缀）
│   │   │   └── （结构同 (en)/）
│   │   ├── layout.tsx         # 根布局（仅 return children）
│   │   ├── globals.css        # 全局样式 + Tailwind 主题变量
│   │   ├── robots.ts          # robots.txt 生成
│   │   └── sitemap.ts         # sitemap.xml 生成
│   ├── components/
│   │   ├── Header.tsx         # 顶部导航（Logo + 搜索 + 分类导航）
│   │   ├── Footer.tsx         # 页脚（品牌 + 分类链接 + 法律链接）
│   │   ├── CategoryNav.tsx    # 分类横向导航栏
│   │   ├── SearchBar.tsx      # 搜索框
│   │   ├── GameCard.tsx       # 游戏卡片
│   │   ├── GameGrid.tsx       # 游戏网格布局
│   │   ├── GamePlayer.tsx     # 游戏播放器（iframe + 全屏/重载）
│   │   ├── AdBanner.tsx       # 广告位组件
│   │   └── Link.tsx           # 国际化链接（自动加 locale 前缀）
│   ├── views/
│   │   ├── GamePageView.tsx   # 游戏详情页视图（核心SEO页面）
│   │   └── CategoryPageView.tsx # 分类页视图（内容化SEO）
│   ├── lib/
│   │   ├── games.ts           # 游戏数据访问层
│   │   ├── metadata.ts        # SEO metadata 构建工具
│   │   ├── i18n.tsx           # 客户端 i18n（Context + useTranslations）
│   │   └── server-i18n.ts     # 服务端 i18n（Server Components用）
│   ├── data/
│   │   ├── games.json         # 100款游戏数据（含SEO字段）
│   │   ├── zh-seo.json        # 中文SEO数据（longDescription/features/tips/faq）
│   │   ├── category-seo.ts    # 分类页SEO内容（hook/intro/benefits/why/faq）
│   │   └── gd-games.json      # GameDistribution游戏数据（备用）
│   ├── messages/
│   │   ├── en.json            # 英文UI翻译
│   │   └── zh.json            # 中文UI翻译
│   └── types/
│       └── global.d.ts        # 全局类型声明
├── docs/                      # 文档目录
├── next.config.ts
├── tailwind → postcss.config.mjs
├── tsconfig.json
├── wrangler.toml              # Cloudflare Pages 配置
├── package.json
└── .env.example               # 环境变量模板
```

---

## 4. 路由系统

### URL 结构

| 页面类型 | 英文 URL | 中文 URL |
|---|---|---|
| 首页 | `/` | `/zh` |
| 分类页 | `/{category}` | `/zh/{category}` |
| 游戏页 | `/game/{slug}` | `/zh/game/{slug}` |
| 搜索 | `/search?q=xxx` | `/zh/search?q=xxx` |
| 法律页 | `/privacy` `/terms` `/dmca` `/about` | `/zh/privacy` 等 |

### 路由实现方式

- **英文**：使用 `(en)` 路由组（Route Group），URL 中不出现 `/en` 前缀
- **中文**：使用 `zh/` 目录，URL 带 `/zh` 前缀
- **动态路由**：`[slug]` 用于分类页和游戏页，通过 `generateStaticParams` 预生成所有页面

### 重定向规则（public/_redirects）

```
/category/* → /:splat       301（旧URL兼容）
/zh/category/* → /zh/:splat 301
/en/* → /:splat             301（去除/en前缀）
```

---

## 5. 国际化 (i18n)

### 架构

采用**自研轻量 i18n**（非 next-intl 运行时），分为客户端和服务端两套：

| 模块 | 文件 | 用途 |
|---|---|---|
| 客户端 | `src/lib/i18n.tsx` | React Context + `useTranslations()` hook |
| 服务端 | `src/lib/server-i18n.ts` | `getServerTranslations(locale)` 函数 |
| 翻译文件 | `src/messages/en.json` / `zh.json` | UI 文案 |

### 使用方式

```tsx
// 客户端组件
"use client";
const t = useTranslations();
t("home.featured")  // → "Featured Games"

// 服务端组件（Server Components / Views）
const t = getServerTranslations(locale);
t("categories.puzzle")  // → "Puzzle"
```

### 链接国际化

`src/components/Link.tsx` 自动根据当前 locale 添加前缀：
- en: `/game/2048` → `/game/2048`
- zh: `/game/2048` → `/zh/game/2048`

---

## 6. 数据层

### Game 接口

```ts
interface Game {
  id: string;            // 唯一标识
  title: string;         // 游戏名称
  slug: string;          // URL slug
  description: string;   // 简短描述（meta description用）
  category: string;      // 分类（9种之一）
  thumbnail: string;     // 缩略图路径 /games/{slug}/thumb.svg
  gameUrl: string;       // 游戏文件路径 /games/{slug}/index.html
  tags: string[];        // 标签
  featured: boolean;     // 是否精选
  popular: boolean;      // 是否热门
  dateAdded: string;     // 添加日期
  plays: number;         // 游玩次数
  rating: number;        // 评分（0-5）
  instructions: string;  // 操作说明
  // SEO 扩展字段（en 在 games.json，zh 在 zh-seo.json）
  longDescription?: string;
  features?: string[];
  tips?: string[];
  difficulty?: string;
  faq?: { q: string; a: string }[];
}
```

### 数据访问 API（src/lib/games.ts）

| 函数 | 说明 |
|---|---|
| `getAllGames()` | 获取全部100款游戏 |
| `getGameBySlug(slug)` | 按slug查找游戏 |
| `getFeaturedGames()` | 获取精选游戏 |
| `getPopularGames(limit)` | 按游玩量排序 |
| `getNewGames(limit)` | 按日期排序 |
| `getGamesByCategory(cat)` | 按分类筛选 |
| `getRelatedGames(game, limit)` | 相关推荐（同分类/同标签） |
| `searchGames(query)` | 搜索（标题/描述/标签） |
| `getGameSeo(game, locale)` | 获取locale对应的SEO内容 |
| `getCategories()` | 获取所有分类列表 |

### 游戏文件结构

每款游戏在 `public/games/{slug}/` 下包含：
- `index.html` — 完整独立的 HTML5 游戏（单文件，含 CSS/JS）
- `thumb.svg` — SVG 缩略图

游戏通过 iframe 加载，完全沙箱化运行。

---

## 7. SEO 实现

### 7.1 Meta 标签体系

**全局 metadata**（`src/lib/metadata.ts` → `buildLocaleMetadata(locale)`）：
- title（含 template: `%s | ZeroPlay Games`）
- description
- keywords
- Open Graph（type/locale/url/siteName/title/description/images）
- Twitter Card（summary_large_image）
- robots（index/follow）
- icons（favicon.svg）
- alternates（canonical + hreflang）

**页面级 metadata**（各 page.tsx 的 `generateMetadata`）：
- 游戏页：`Play {title} Free Online - No Download`
- 分类页：`{name} Games - Play Free Online, No Download`

### 7.2 Canonical & Hreflang

通过 `buildAlternates(path, locale)` 为每个页面生成自引用 canonical + 双语 hreflang：

```ts
// 示例：/game/2048 页面
canonical: "https://zeroplaygames.com/game/2048"
languages: {
  en: "https://zeroplaygames.com/game/2048",
  zh: "https://zeroplaygames.com/zh/game/2048",
  "x-default": "https://zeroplaygames.com/game/2048"
}
```

### 7.3 结构化数据（JSON-LD）

| 页面 | Schema 类型 | 内容 |
|---|---|---|
| Layout（全站） | `WebSite` | 站名 + SearchAction |
| 游戏页 | `VideoGame` | 名称/描述/URL/图片/类型/平台/评分/价格 |
| 游戏页 | `FAQPage` | 8条FAQ（5基础+3扩展） |
| 游戏页 | `BreadcrumbList` | 首页 > 分类 > 游戏名 |

### 7.4 Sitemap（src/app/sitemap.ts）

自动生成包含所有页面的 sitemap.xml：
- 首页（priority 1.0, daily）
- 游戏页 EN（priority 0.9, weekly）
- 游戏页 ZH（priority 0.8, weekly）
- 分类页 EN（priority 0.7, weekly）
- 分类页 ZH（priority 0.6, weekly）
- 静态页（priority 0.2-0.5）

### 7.5 Robots.txt（src/app/robots.ts）

```
Allow: /
Disallow: /api/, /_next/, /search, /zh/search
Sitemap: https://zeroplaygames.com/sitemap.xml
```

### 7.6 游戏页 SEO 内容模块（GamePageView.tsx）

每个游戏页包含以下 SEO 内容区块：

| 区块 | 说明 |
|---|---|
| H1 标题 | `{game.title}` + "Free Online Game" |
| Meta 信息行 | 评分 / 游玩量 / 分类 / 日期 / **Updated日期（新鲜度信号）** |
| 标签 | #tag 列表 |
| 信任徽章 | 100% Free / No Download / Kid-Friendly / No Forced Ads / All Devices |
| 对话式钩子 | 按分类生成的第二人称引导文案 |
| About 长描述 | 2-3段原创介绍 + **内链推荐（P2-1）** |
| How to Play | 分步操作说明 |
| Features 图标卡片 | 4-7个特色功能（Zap/Star/ShieldCheck/Heart图标） |
| Tips & Strategies | 游戏技巧列表 |
| Why Play Here | 3列对比（vs App Stores / vs Paid Games / vs Other Sites） |
| Game Info 表格 | 名称/分类/难度/平台/价格/玩家/评分/游玩次数 |
| FAQ（8条） | 5基础 + 3扩展（安全/离线/提高） |
| 同分类推荐 | 4款同分类游戏 |
| 侧边栏相关游戏 | 6款相关游戏 |

### 7.7 分类页 SEO 内容模块（CategoryPageView.tsx）

| 区块 | 说明 |
|---|---|
| H1 标题 | `Free {category} Games` |
| 描述段 | 游戏数量 + 免下载说明 |
| 对话式钩子 | 分类专属引导文案 |
| About 介绍 | 3段深度内容 |
| Benefits 图标卡片 | 4个分类特色（含lucide图标） |
| Why Play Here | 4条优势清单 |
| 热门游戏内链 | 8款游戏的pill链接 |
| 分类FAQ | 4条问答 |

### 7.8 首页 SEO

- H1: "Play Free Online Games - No Download, No Sign-Up"
- 介绍段: 70+ 词的品牌描述
- 内容区块: Featured / Popular / New / All Games

---

## 8. 组件系统

### Header（sticky 顶栏）
- Logo（Gamepad2 图标 + 站名）
- 搜索框（桌面/移动端各一个）
- 分类导航栏（横向滚动 pill 按钮，含 emoji 图标）
- 移动端汉堡菜单

### GamePlayer（游戏播放器）
- 点击播放覆盖层（性能优化：延迟加载 iframe）
- Loading 动画
- iframe 加载游戏（`allow="fullscreen; autoplay; gamepad"`）
- 控制栏：游戏名 + 重载按钮 + 全屏按钮
- 移动端横屏提示
- 尺寸：`clamp(420px, 65vh, 680px)`

### GameCard（游戏卡片）
- 4:3 缩略图 + hover 放大 + 播放按钮覆盖
- 评分角标
- 标题 + 描述 + 分类标签 + 游玩量

### AdBanner（广告位）
- 支持 horizontal / rectangle / vertical 三种格式
- AdSense `<ins>` 标签 + 开发占位符
- 通过 `NEXT_PUBLIC_ADSENSE_CLIENT` 环境变量配置

### Link（国际化链接）
- 自动根据当前 locale 添加 `/zh` 前缀
- 包装 next/link

---

## 9. 样式系统

### Tailwind CSS v4 主题

```css
@theme {
  --color-primary: #6366f1;       /* Indigo - 品牌主色 */
  --color-primary-dark: #4f46e5;
  --color-secondary: #f59e0b;     /* Amber - 辅助色 */
  --color-dark: #0f172a;          /* 背景深色 */
  --color-dark-light: #1e293b;
  --color-surface: #1e293b;       /* 卡片/面板背景 */
  --color-surface-light: #334155;
}
```

### 设计风格
- 暗色主题（Dark Mode Only）
- 圆角卡片（rounded-xl）
- 微妙边框（border-white/10）
- hover 效果（border-primary/50 + shadow）
- 字体：Inter / system-ui

---

## 10. 广告集成（AdSense）

### 当前状态：**预留位，待审核**

- 代码已集成 AdSense 加载脚本（layout `<head>` 中）
- AdBanner 组件已部署在：首页（2处）、游戏页（内容下方 + 侧边栏）、分类页
- Client ID 为占位符 `ca-pub-XXXXXXXXXXXXXXXX`
- 需通过 Google AdSense 审核后替换真实 Client ID

### 接入步骤
1. 网站运营 1-3 个月积累流量
2. 申请 AdSense（https://adsense.google.com）
3. 审核通过后获取 `ca-pub-XXXX` Client ID
4. 设置环境变量 `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-真实ID`
5. 重新构建部署

---

## 11. 分析追踪（GA4）

### 集成位置
- `src/app/(en)/layout.tsx` — 英文全站
- `src/app/zh/layout.tsx` — 中文全站

### 代码

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XV35XKZ474"></script>
<script>
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag('js',new Date());
  gtag('config','G-XV35XKZ474');
</script>
```

---

## 12. 部署流程

### 构建

```bash
npm run build    # 执行 next build，生成 out/ 目录
```

### 部署到 Cloudflare Pages（生产）

```bash
npx wrangler pages deploy out --project-name=h5-game-portal --branch=main
```

> **重要**：必须加 `--branch=main`！  
> 该 Cloudflare 项目的生产分支是 `main`，而本地 git 默认分支是 `master`。  
> 若不加此参数，wrangler 会按当前分支部署到 Preview 预览环境，  
> 自定义域名 zeroplaygames.com 只服务 Production（main），导致线上不更新。

### 部署验证清单

- [ ] 首页标题含 "ZeroPlay Games"
- [ ] canonical 指向 `https://zeroplaygames.com/`
- [ ] GA4 代码 `G-XV35XKZ474` 存在
- [ ] sitemap.xml 域名正确
- [ ] 游戏页 canonical 指向自身

---

## 13. 环境变量

| 变量 | 说明 | 默认值 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 站点URL | `https://zeroplaygames.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense Client ID | `ca-pub-XXXXXXXXXXXXXXXX` |

配置文件：`.env.local`（gitignore 不追踪）

> 注意：Cloudflare Pages 构建时无 `.env.local`，使用代码中的默认值。

---

## 14. 脚本工具

| 脚本 | 用途 | 命令 |
|---|---|---|
| `scripts/generate-og-image.js` | 生成社交分享图 | `node scripts/generate-og-image.js` |
| `scripts/enrich-seo.js` | 批量生成游戏英文SEO内容 | `node scripts/enrich-seo.js` |
| `scripts/generate-zh-seo.js` | 生成中文SEO数据 | `node scripts/generate-zh-seo.js` |
| `scripts/enlarge-games.js` | 调整游戏画面尺寸 | `node scripts/enlarge-games.js` |
| `scripts/fetch-gd-games.js` | 抓取GameDistribution游戏 | `node scripts/fetch-gd-games.js` |

---

## 15. 分类页 SEO 数据（category-seo.ts）

每个分类包含完整的双语 SEO 内容：

```ts
interface CategorySeoLocale {
  hook: string;              // 对话式钩子（顶部引导文案）
  intro: string[];           // 介绍段落（3段）
  benefits: CategoryBenefit[]; // 特色卡片（4个，含图标）
  why: string[];             // 为什么选择我们（4条）
  faq: CategoryFaq[];        // FAQ（4条问答）
}
```

已覆盖分类：puzzle / arcade / shooting / casual / sports / strategy / action / idle / racing

### 游戏页对话式钩子（getGameHook）

按分类生成第二人称引导文案，例如：
- puzzle: "Looking for a quick brain teaser? {title} is perfect for..."
- racing: "Need for speed? {title} puts you in the driver's seat..."

---

## 16. 法律页面

| 页面 | 路径 | 联系邮箱 |
|---|---|---|
| Privacy Policy | `/privacy` | privacy@zeroplaygames.com |
| Terms of Service | `/terms` | legal@zeroplaygames.com |
| DMCA | `/dmca` | dmca@zeroplaygames.com |
| About Us | `/about` | — |

---

## 17. 性能优化策略

| 策略 | 实现 |
|---|---|
| 静态导出 | 所有页面预渲染为 HTML，CDN 直接服务 |
| 延迟加载游戏 | 点击"Play"才加载 iframe（节省首屏资源） |
| 图片懒加载 | 缩略图 `loading="lazy"` |
| SVG 缩略图 | 游戏缩略图使用 SVG（极小体积） |
| 无 JS 依赖游戏 | 游戏为独立 HTML 文件，不依赖主站 JS |
| CDN 分发 | Cloudflare Pages 全球 CDN |

---

## 18. 已完成 SEO 优化批次

### P0（基础）
- 分类页内容化（hook/intro/benefits/why/faq）
- 游戏页对话式钩子

### P1（信任与视觉）
- 信任徽章（100% Free / No Download / Kid-Friendly / No Forced Ads / All Devices）
- Features 图标卡片化（Zap/Star/ShieldCheck/Heart）
- Why Play Here 对比区块（vs App Stores / vs Paid Games / vs Other Sites）

### P2（深度SEO）
- 正文内链（About 末尾推荐3款相关游戏）
- Last Updated 新鲜度信号
- FAQ 扩充（5→8条，新增安全/离线/提高类问题）

### 审计修复
- **致命Bug修复**：canonical/hreflang 全站指向首页 → 改为每页自引用
- 首页 H1 + SEO 介绍段
- favicon.svg 品牌图标
- og-image.png 社交分享图（1200×630）
- robots.txt 屏蔽 /search

---

## 19. 待办 / 后续规划

| 优先级 | 项目 | 说明 |
|---|---|---|
| 中 | 自定义 404 页面 | 带热门游戏推荐，挽回跳出流量 |
| 中 | GSC 提交 | 验证 zeroplaygames.com + 提交 sitemap.xml |
| 低 | AdSense 申请 | 上线1-3个月后申请 |
| 低 | 多语言扩展 | 在 /zh 基础上增加更多语言 |
| 低 | 游戏数量扩充 | 接入 GameDistribution 等第三方游戏 |

---

## 20. Git 提交历史

| Hash | 说明 |
|---|---|
| 51e10a5 | 初始提交（276文件） |
| 2e3d44f | P1: 信任徽章 + 图标特色卡 + Why Play Here |
| d29e611 | P2: 内链 + 新鲜度信号 + FAQ扩充 |
| 816f0db | 域名切换 PlayFree → ZeroPlay |
| 9e850a7 | GA4 集成 |
| 最新 | fix(seo): canonical/hreflang + H1 + favicon + og-image |
