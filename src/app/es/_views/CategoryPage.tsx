import { notFound } from "next/navigation";
import NextLink from "next/link";
import { CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { getCategories, getGamesByCategory } from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { getEsCategorySeo } from "@/data/es/category-seo";

export default async function EsCategoryPage({ slug }: { slug: string }) {
  const categories = getCategories();
  if (!categories.includes(slug)) notFound();

  const t = getServerTranslations("es");
  const games = getGamesByCategory(slug);
  const categoryName = t(`categories.${slug}`);
  const seo = getEsCategorySeo(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400">
        <NextLink href="/es" className="hover:text-primary">Inicio</NextLink>
        <span>/</span><span className="text-white">{categoryName}</span>
      </nav>

      <header className="mb-5 max-w-4xl">
        <h1 className="text-2xl font-bold text-white lg:text-3xl">Juegos de {categoryName.toLowerCase()} gratis online</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-400 md:text-base">
          Juega a {games.length} juegos de {categoryName.toLowerCase()} gratis directamente en el navegador. Sin descargar ni registrarte; los controles concretos dependen de cada título.
        </p>
      </header>

      {seo && (
        <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-gray-200"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{seo.hook}</p>
        </div>
      )}

      <GameGrid games={games} trackingSource="category" locale="es" />
      <AdBanner className="mt-8" />

      {seo && (
        <div className="mt-10 max-w-5xl">
          <section>
            <h2 className="text-xl font-semibold text-white">Acerca de los juegos de {categoryName.toLowerCase()}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">{seo.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Por qué jugar a esta categoría</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {seo.benefits.map((item, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-surface/50 p-4">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Por qué jugar en ZeroPlay Games</h2>
            <ul className="mt-3 space-y-2">
              {seo.why.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />{item}</li>)}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">Juegos populares de {categoryName.toLowerCase()}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {games.slice(0, 8).map((game) => <NextLink key={game.slug} href={`/es/game/${game.slug}`} className="rounded-full border border-white/10 bg-surface px-4 py-1.5 text-sm text-gray-200 hover:border-primary/40 hover:text-primary">{game.title}</NextLink>)}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />Preguntas frecuentes</h2>
            <div className="mt-3 space-y-3">
              {seo.faq.map((item, i) => <details key={i} className="rounded-lg border border-white/10 bg-surface/50"><summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white">{item.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{item.a}</p></details>)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
