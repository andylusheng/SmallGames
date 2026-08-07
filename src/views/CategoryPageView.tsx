import { notFound } from "next/navigation";
import NextLink from "next/link";
import { getCategories, getGamesByCategory } from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { getCategorySeo } from "@/data/category-seo";
import { toZhTwDeep, toZhTwText } from "@/data/zh-tw/convert";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import {
  Brain, Clock, Layers, Smartphone, Zap, Trophy, Repeat, Gamepad2,
  Target, Shield, TrendingUp, Flame, Smile, Hand, Palette, Infinity as InfinityIcon,
  Activity, Medal, SlidersHorizontal, List, Coins, GitBranch, Bot,
  Sword, Skull, Map, Wrench, Moon, RefreshCw, Gauge, Navigation, Flag,
  CheckCircle2, HelpCircle, Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, clock: Clock, layers: Layers, smartphone: Smartphone,
  zap: Zap, trophy: Trophy, repeat: Repeat, gamepad: Gamepad2,
  target: Target, shield: Shield, "trending-up": TrendingUp, flame: Flame,
  smile: Smile, hand: Hand, palette: Palette, infinity: InfinityIcon,
  dribbble: Activity, medal: Medal, sliders: SlidersHorizontal, list: List,
  coins: Coins, "git-branch": GitBranch, bot: Bot,
  sword: Sword, skull: Skull, map: Map, wrench: Wrench,
  moon: Moon, "refresh-cw": RefreshCw, gauge: Gauge, navigation: Navigation, flag: Flag,
};

interface CategoryPageViewProps {
  locale: string;
  slug: string;
}

export function categoryStaticParams() {
  return getCategories().map((slug) => ({ slug }));
}

export default async function CategoryPageView({ locale, slug }: CategoryPageViewProps) {
  const t = getServerTranslations(locale);
  const categories = getCategories();
  const isEn = locale === "en";
  const isZhTw = locale === "zh-tw";
  const prefix = isEn ? "" : `/${locale}`;
  const z = (value: string) => isZhTw ? toZhTwText(value) : value;

  if (!categories.includes(slug)) notFound();

  const games = getGamesByCategory(slug);
  const categoryName = t(`categories.${slug}`);
  const rawSeo = getCategorySeo(slug, isZhTw ? "zh" : locale);
  const seo = rawSeo && isZhTw ? toZhTwDeep(rawSeo) : rawSeo;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-sm text-gray-400 md:mb-4">
        <NextLink href={`${prefix}/`} className="hover:text-primary">{t("nav.home")}</NextLink>
        <span>/</span><span className="text-white">{categoryName}</span>
      </nav>

      <div className="flex flex-col">
        <header className="order-1 mb-4 md:mb-6">
          <h1 className="text-2xl font-bold leading-tight text-white lg:text-3xl">{isEn ? `Free ${categoryName} Games` : z(`${categoryName}游戏`)}</h1>
          <p className="mt-2 max-w-3xl line-clamp-2 text-sm leading-relaxed text-gray-400 md:line-clamp-none">
            {isEn
              ? `Play ${games.length} free ${categoryName} games online instantly — no download, no sign-up. You can browse on desktop or mobile; control support varies by title.`
              : z(`在线畅玩${games.length}款免费${categoryName}游戏 — 无需下载，无需注册。你可以使用电脑或手机浏览，具体操作支持因游戏而异。`)}
          </p>
        </header>

        <div className="order-2 mb-6 md:order-4">
          <GameGrid games={games} trackingSource="category" locale={locale} />
        </div>

        {seo && (
          <div className="order-3 mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4 md:order-2 md:mb-6">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-gray-200">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {seo.hook}
            </p>
          </div>
        )}

        <div className="order-4 md:order-3">
          <AdBanner className="mb-6" />
        </div>
      </div>

      {seo && <div className="mt-8 max-w-4xl md:mt-10">
        <section><h2 className="text-xl font-semibold text-white">{isEn ? `About Free ${categoryName} Games` : z(`关于免费${categoryName}游戏`)}</h2><div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">{seo.intro.map((para, i) => <p key={i}>{para}</p>)}</div></section>
        <section className="mt-8"><h2 className="text-xl font-semibold text-white">{isEn ? `Why You'll Love ${categoryName} Games` : z(`为什么你会爱上${categoryName}游戏`)}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{seo.benefits.map((b, i) => { const Icon = iconMap[b.icon] || Sparkles; return <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15"><Icon className="h-5 w-5 text-primary" /></div><div><h3 className="text-sm font-semibold text-white">{b.title}</h3><p className="mt-1 text-xs leading-relaxed text-gray-400">{b.desc}</p></div></div>; })}</div></section>
        <section className="mt-8"><h2 className="text-xl font-semibold text-white">{isEn ? `Why Play ${categoryName} Games Here?` : z(`为什么在这里玩${categoryName}游戏？`)}</h2><ul className="mt-3 space-y-2">{seo.why.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />{item}</li>)}</ul></section>
        <section className="mt-8"><h2 className="text-xl font-semibold text-white">{isEn ? `Most Popular ${categoryName} Games` : z(`最受欢迎的${categoryName}游戏`)}</h2><p className="mt-2 text-sm text-gray-400">{isEn ? "Jump straight into the favorites our players keep coming back to:" : z("直接开玩玩家们反复回味的热门游戏：")}</p><div className="mt-3 flex flex-wrap gap-2">{games.slice(0, 8).map((g) => <NextLink key={g.id} href={`${prefix}/game/${g.slug}`} className="rounded-full border border-white/10 bg-surface px-4 py-1.5 text-sm text-gray-200 transition-colors hover:border-primary/40 hover:text-primary">{g.title}</NextLink>)}</div></section>
        <section className="mt-8"><h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />{isEn ? `${categoryName} Games FAQ` : z(`${categoryName}游戏常见问题`)}</h2><div className="mt-3 space-y-3">{seo.faq.map((f, i) => <details key={i} className="group rounded-lg border border-white/10 bg-surface/50"><summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white transition-colors hover:text-primary">{f.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{f.a}</p></details>)}</div></section>
      </div>}
    </div>
  );
}
