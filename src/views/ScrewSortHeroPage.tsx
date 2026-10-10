import NextLink from "next/link";
import { ChevronRight, Gamepad2, HelpCircle, Lightbulb, ListChecks, Sparkles, Target } from "lucide-react";
import GamePlayer from "@/components/GamePlayer";
import type { Game } from "@/lib/games";

interface ScrewSortHeroPageProps {
  game: Game;
  locale: string;
  nextGames: Game[];
  content: {
    about: string[];
    howToPlay: string[];
    rules: string[];
    tips: string[];
    faqs: Array<{ q: string; a: string }>;
  };
}

function localizedGameHref(locale: string, slug: string) {
  return locale === "en" ? `/game/${slug}` : `/${locale}/game/${slug}`;
}

export default function ScrewSortHeroPage({ game, locale, nextGames, content }: ScrewSortHeroPageProps) {
  const isEn = locale === "en";
  const copy = isEn
    ? {
        objective: "Objective",
        objectiveText: "Tap only screws that are not covered by a higher layer. Sort each color into its matching tray to clear the board.",
        next: "Up next",
        more: "More Puzzle Games",
        seeAll: "See all",
      }
    : {
        objective: "游戏目标",
        objectiveText: "点击没有被上层遮挡的螺丝，将同色螺丝放入对应托盘，清空整个棋盘。",
        next: "接下来玩",
        more: "更多益智游戏",
        seeAll: "查看全部",
      };

  return (
    <div className="mx-auto w-full max-w-[1920px] px-2 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4">
      <h1 className="sr-only">{game.title}</h1>
      <nav aria-label="Breadcrumb" className="mb-3 hidden items-center gap-2 px-1 text-xs text-gray-400 md:flex md:text-sm">
        <NextLink href={locale === "en" ? "/" : `/${locale}`} className="hover:text-primary">{isEn ? "Home" : "首页"}</NextLink>
        <ChevronRight className="h-3.5 w-3.5" />
        <NextLink href={locale === "en" ? "/puzzle" : `/${locale}/puzzle`} className="hover:text-primary">{isEn ? "Puzzle" : "益智"}</NextLink>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-white">{game.title}</span>
      </nav>

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-4">
        <GamePlayer gameUrl={game.gameUrl} title={game.title} slug={game.slug} presentation="hero" showFrameControls={false} />

        <aside className="grid gap-3 sm:grid-cols-2 lg:sticky lg:top-20 lg:block">
          <section className="rounded-2xl border border-primary/20 bg-surface/65 p-4">
            <div className="flex items-center gap-2 text-base font-bold text-white"><Target className="h-5 w-5 text-primary" />{copy.objective}</div>
            <p className="mt-3 text-sm leading-6 text-gray-300">{copy.objectiveText}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface/65 p-4 lg:mt-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white"><Gamepad2 className="h-5 w-5 text-primary" />{copy.next}</h2>
              <NextLink href={locale === "en" ? "/puzzle" : `/${locale}/puzzle`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-light">{copy.seeAll}<ChevronRight className="h-3.5 w-3.5" /></NextLink>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {nextGames.slice(0, 3).map((item) => (
                <NextLink key={item.slug} href={localizedGameHref(locale, item.slug)} className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-dark/30 p-2 transition-colors hover:border-primary/40 hover:bg-white/5">
                  <img src={item.thumbnail} alt="" width="58" height="58" className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" decoding="async" />
                  <div className="min-w-0"><div className="truncate text-sm font-bold text-white">{item.title}</div><div className="mt-1 line-clamp-2 text-xs leading-4 text-gray-400">{item.description}</div></div>
                </NextLink>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <article className="mx-auto mt-5 max-w-5xl border-t border-white/10 px-1 pt-5 sm:mt-6 sm:pt-6">
        <section>
          <h2 className="text-xl font-bold text-white">{isEn ? `About ${game.title}` : `关于 ${game.title}`}</h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-gray-300">
            {content.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white"><ListChecks className="h-5 w-5 text-primary" />{isEn ? `How to Play ${game.title}` : `${game.title} 怎么玩`}</h2>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {content.howToPlay.map((step, index) => <li key={index} className="flex gap-3 rounded-xl border border-white/10 bg-surface/45 p-3 text-sm leading-6 text-gray-300"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{index + 1}</span><span>{step}</span></li>)}
          </ol>
        </section>

        {content.rules.length > 0 && (
          <section className="mt-7">
            <h2 className="text-xl font-bold text-white">{isEn ? `${game.title} Rules` : `${game.title} 游戏规则`}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {content.rules.map((rule, index) => <li key={index} className="flex gap-2 text-sm leading-6 text-gray-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{rule}</li>)}
            </ul>
          </section>
        )}

        {content.tips.length > 0 && (
          <section className="mt-7">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white"><Lightbulb className="h-5 w-5 text-yellow-400" />{isEn ? "Tips & Strategies" : "技巧与攻略"}</h2>
            <ul className="mt-3 space-y-2">
              {content.tips.map((tip, index) => <li key={index} className="flex gap-2 text-sm leading-6 text-gray-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />{tip}</li>)}
            </ul>
          </section>
        )}

        <section className="mt-7">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white"><HelpCircle className="h-5 w-5 text-primary" />{isEn ? "Frequently Asked Questions" : "常见问题"}</h2>
          <div className="mt-3 space-y-3">
            {content.faqs.map((faq, index) => <details key={index} className="rounded-xl border border-white/10 bg-surface/45"><summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-white hover:text-primary">{faq.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-6 text-gray-300">{faq.a}</p></details>)}
          </div>
        </section>
      </article>

      <section className="mt-4 border-t border-white/10 px-1 pt-4 sm:mt-5">
        <div className="flex items-center justify-between gap-3"><h2 className="flex items-center gap-2 text-base font-bold text-white sm:text-lg"><Sparkles className="h-5 w-5 text-primary" />{copy.more}</h2><NextLink href={locale === "en" ? "/puzzle" : `/${locale}/puzzle`} className="text-xs font-semibold text-primary hover:text-primary-light">{copy.seeAll}</NextLink></div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {nextGames.slice(0, 6).map((item) => (
            <NextLink key={item.slug} href={localizedGameHref(locale, item.slug)} className="group overflow-hidden rounded-xl border border-white/10 bg-dark/35 p-1.5 transition-colors hover:border-primary/50">
              <img src={item.thumbnail} alt="" width="220" height="124" className="aspect-[16/9] w-full rounded-lg object-cover" loading="lazy" decoding="async" />
              <div className="truncate px-1 pb-1 pt-2 text-xs font-semibold text-gray-200 group-hover:text-white">{item.title}</div>
            </NextLink>
          ))}
        </div>
      </section>
    </div>
  );
}
