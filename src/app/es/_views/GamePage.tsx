import { notFound } from "next/navigation";
import NextLink from "next/link";
import { Download, Gift, HelpCircle, Info, Lightbulb, ShieldCheck, Tag } from "lucide-react";
import GamePlayer from "@/components/GamePlayer";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import {
  getGameBySlug,
  getGamePageSeo,
  getGameProfile,
  getLocalizedGameProfile,
  getRelatedGames,
  getGamesByCategory,
  getGamesByGameplayTopic,
} from "@/lib/games";
import { getLocalizedTopicSeo, getTopicHubHref } from "@/data/topic-seo";
import { SITE_URL } from "@/lib/metadata";

const CONTROL_LABELS: Record<string, string> = { mouse: "Ratón", touch: "Pantalla táctil", keyboard: "Teclado" };

export default async function EsGamePage({ slug }: { slug: string }) {
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const profile = getGameProfile(game);
  const content = getLocalizedGameProfile(game, "es");
  const seo = getGamePageSeo(game, "es");
  if (!content) notFound();

  const primaryTopic = profile?.mechanics.gameplayTopics.find((topic) => getLocalizedTopicSeo(topic, "es"));
  const topicContent = primaryTopic ? getLocalizedTopicSeo(primaryTopic, "es") : undefined;
  const topicHref = primaryTopic ? getTopicHubHref(primaryTopic, "es") : undefined;
  const topicGames = primaryTopic ? getGamesByGameplayTopic(primaryTopic, game.slug, 6) : [];
  const relatedGames = getRelatedGames(game, 6);
  const categoryGames = getGamesByCategory(game.category).filter((item) => item.slug !== game.slug).slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: seo.metaDescription,
    url: `${SITE_URL}/es/game/${game.slug}`,
    image: `${SITE_URL}${game.thumbnail}`,
    genre: game.category,
    numberOfPlayers: "1",
    gamePlatform: ["Web Browser"],
    applicationCategory: "Game",
    operatingSystem: "Any (HTML5 Browser)",
    inLanguage: "es",
    datePublished: game.publishedAt,
    dateModified: game.updatedAt,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/es` },
      { "@type": "ListItem", position: 2, name: topicContent?.label ?? game.category, item: topicHref ? `${SITE_URL}${topicHref}` : `${SITE_URL}/es/${game.category}` },
      { "@type": "ListItem", position: 3, name: game.title, item: `${SITE_URL}/es/game/${game.slug}` },
    ],
  };

  const controls = profile?.mechanics.controls.map((c) => CONTROL_LABELS[c] ?? c).join(" / ") || "Según el juego";
  const infoRows = [
    ["Nombre", game.title],
    ["Categoría", game.category],
    ["Plataforma", "Navegador web"],
    ["Precio", "Gratis"],
    ["Jugadores", "1 jugador"],
    ["Controles", controls],
    ...(profile?.mechanics.durationSeconds ? [["Duración de la ronda", `${profile.mechanics.durationSeconds} segundos`]] : []),
    ["Última actualización", game.updatedAt],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400">
          <NextLink href="/es" className="hover:text-primary">Inicio</NextLink><span>/</span>
          {topicHref && topicContent ? <NextLink href={topicHref} className="hover:text-primary">{topicContent.label}</NextLink> : <NextLink href={`/es/${game.category}`} className="hover:text-primary">{game.category}</NextLink>}
          <span>/</span><span className="text-white">{game.title}</span>
        </nav>

        <header className="mb-5 max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{seo.h1}</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">{seo.intro}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main className="min-w-0">
            <GamePlayer gameUrl={game.gameUrl} title={game.title} slug={game.slug} />

            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400"><span className="flex items-center gap-1"><Tag className="h-4 w-4" /><NextLink href={`/es/${game.category}`} className="text-primary hover:underline">{game.category}</NextLink></span><span className="text-gray-500">Actualizado: {game.updatedAt}</span></div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-medium text-green-300"><Gift className="h-3.5 w-3.5" />Gratis</span>
                <span className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-medium text-green-300"><Download className="h-3.5 w-3.5" />Sin descargar</span>
                <span className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-medium text-green-300"><ShieldCheck className="h-3.5 w-3.5" />Sin cuenta</span>
              </div>

              <section className="mt-7"><h2 className="text-xl font-semibold text-white">Acerca de {game.title}</h2><div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">{content.about.map((p, i) => <p key={i}>{p}</p>)}</div></section>

              <section className="mt-7"><h2 className="text-xl font-semibold text-white">Cómo jugar a {game.title}</h2><div className="mt-3 space-y-2">{content.howToPlay.map((step, i) => <p key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{i + 1}</span><span>{step}</span></p>)}</div></section>

              <section className="mt-7"><h2 className="text-xl font-semibold text-white">Reglas de {game.title}</h2><ul className="mt-3 space-y-2">{content.rules.map((rule, i) => <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{rule}</li>)}</ul></section>

              {profile?.mechanics.scoring.length ? (
                <section className="mt-7"><h2 className="text-xl font-semibold text-white">Puntuación y recompensas</h2><div className="mt-3 overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[420px] text-sm"><thead className="bg-surface"><tr><th className="px-4 py-3 text-left text-gray-200">Regla</th><th className="px-4 py-3 text-left text-gray-200">Valor</th></tr></thead><tbody>{profile.mechanics.scoring.map((rule, i) => <tr key={rule.id} className="border-t border-white/5"><td className="px-4 py-3 text-white">Evento {i + 1}</td><td className="px-4 py-3 font-semibold text-primary">{rule.points !== undefined ? `${rule.points > 0 ? "+" : ""}${rule.points}` : "Variable"}</td></tr>)}</tbody></table></div></section>
              ) : null}

              <section className="mt-7"><h2 className="text-xl font-semibold text-white">Consejos y estrategias</h2><ul className="mt-3 space-y-2">{content.tips.map((tip, i) => <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />{tip}</li>)}</ul></section>

              <section className="mt-7"><h2 className="flex items-center gap-2 text-xl font-semibold text-white"><Info className="h-5 w-5 text-primary" />Información del juego</h2><div className="mt-3 overflow-hidden rounded-lg border border-white/10"><table className="w-full text-sm"><tbody>{infoRows.map(([label, value]) => <tr key={label} className="border-b border-white/5 last:border-0"><td className="bg-surface px-4 py-2.5 font-medium text-gray-300">{label}</td><td className="px-4 py-2.5 text-white">{value}</td></tr>)}</tbody></table></div></section>

              <section className="mt-7"><h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />Preguntas frecuentes</h2><div className="mt-3 space-y-3">{content.faq.map((item, i) => <details key={i} className="rounded-lg border border-white/10 bg-surface/50"><summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white">{item.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{item.a}</p></details>)}</div></section>

              {topicGames.length > 0 && topicContent ? <section className="mt-8"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-semibold text-white">Más {topicContent.label.toLowerCase()}</h2>{topicHref && <NextLink href={topicHref} className="text-sm font-medium text-primary hover:underline">Ver todos</NextLink>}</div><div className="mt-4"><GameGrid games={topicGames} trackingSource="related" locale="es" /></div></section> : relatedGames.length > 0 ? <section className="mt-8"><h2 className="text-xl font-semibold text-white">Juegos relacionados</h2><div className="mt-4"><GameGrid games={relatedGames} trackingSource="related" locale="es" /></div></section> : null}

              <AdBanner className="mt-8" />
            </div>
          </main>

          <aside className="hidden lg:block"><div className="sticky top-24 rounded-xl border border-white/10 bg-surface/40 p-4"><h2 className="text-sm font-semibold text-white">Más juegos de la categoría</h2><div className="mt-3 space-y-3">{categoryGames.map((item) => <NextLink key={item.slug} href={`/es/game/${item.slug}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5"><img src={item.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" loading="lazy" /><div className="truncate text-sm font-medium text-white">{item.title}</div></NextLink>)}</div></div></aside>
        </div>
      </div>
    </>
  );
}
