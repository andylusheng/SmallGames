import NextLink from "next/link";

export default function EsLegalPage({ title, intro, sections }: { title: string; intro: string; sections: { title: string; body: string[] }[] }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-5 text-sm text-gray-400"><NextLink href="/es" className="hover:text-primary">Inicio</NextLink> / {title}</nav>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-300">{intro}</p>
      <div className="mt-8 space-y-7">
        {sections.map((section) => <section key={section.title}><h2 className="text-xl font-semibold text-white">{section.title}</h2><div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">{section.body.map((p, i) => <p key={i}>{p}</p>)}</div></section>)}
      </div>
    </div>
  );
}
