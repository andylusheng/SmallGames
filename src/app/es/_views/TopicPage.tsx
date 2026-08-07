import { notFound } from "next/navigation";
import NextLink from "next/link";
import { CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { getGameBySlug, getGamesByGameplayTopic } from "@/lib/games";
import { getLocalizedTopicSeo, getTopicSeoConfig } from "@/data/topic-seo";
import { SITE_URL } from "@/lib/metadata";

export default async function EsTopicPage({ topic }: { topic: string }) {
  const config = getTopicSeoConfig(topic);
  const content = getLocalizedTopicSeo(topic, "es");
  if (!config || !content) notFound();
  const games = getGamesByGameplayTopic(topic, undefined, 50);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.h1,
    description: content.metaDescription,
    url: `${SITE_URL}/es${config.path}`,
    inLanguage: "es",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: games.map((game, index) => ({ "@type": "ListItem", position: index + 1, name: game.title, url: `${SITE_URL}/es/game/${game.slug}` })),
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400"><NextLink href="/es" className="hover:text-primary">Inicio</NextLink><span>/</span><span className="text-white">{content.label}</span></nav>

        <header className="max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">{content.h1}</h1>
          <p className="mt-3 text-base leading-relaxed text-gray-300 lg:text-lg">{content.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-300">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">{games.length} juegos</span>
            <span className="rounded-full border border-white/10 bg-surface px-3 py-1">Juego en navegador</span>
            <span className="rounded-full border border-white/10 bg-surface px-3 py-1">Sin descargar</span>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Jugar a {content.label.toLowerCase()}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">Elige por mecánica de juego. Cada título conserva su propia página con reglas, controles y detalles verificados.</p>
          <div className="mt-4"><GameGrid games={games} trackingSource="category" locale="es" /></div>
        </section>

        <AdBanner className="mt-8" />

        <div className="mt-10 max-w-5xl">
          <section><h2 className="text-xl font-semibold text-white">¿Qué son {content.label.toLowerCase()}?</h2><div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">{content.about.map((p, i) => <p key={i}>{p}</p>)}</div></section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">{content.playStylesTitle}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {content.playStyles.map((style) => {
                const game = getGameBySlug(style.gameSlug);
                if (!game) return null;
                return <NextLink key={style.gameSlug} href={`/es/game/${style.gameSlug}`} className="rounded-xl border border-white/10 bg-surface/50 p-4 hover:border-primary/40"><div className="flex items-start gap-3"><img src={game.thumbnail} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" /><div><h3 className="text-sm font-semibold text-white">{style.title}: {game.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-gray-400">{style.description}</p></div></div></NextLink>;
              })}
            </div>
          </section>

          <section className="mt-8"><h2 className="flex items-center gap-2 text-xl font-semibold text-white"><Sparkles className="h-5 w-5 text-primary" />{content.howItWorksTitle}</h2><ul className="mt-3 space-y-2">{content.howItWorks.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />{item}</li>)}</ul></section>

          <section className="mt-8"><h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />Preguntas frecuentes</h2><div className="mt-3 space-y-3">{content.faq.map((item, i) => <details key={i} className="rounded-lg border border-white/10 bg-surface/50"><summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white">{item.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{item.a}</p></details>)}</div></section>
        </div>
      </div>
    </>
  );
}
