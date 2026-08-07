import NextLink from "next/link";

export default function EsNotFound() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl">🎮</div>
      <h1 className="mt-5 text-3xl font-bold text-white">Página no encontrada</h1>
      <p className="mt-3 text-gray-400">La página o el juego que buscas no está disponible.</p>
      <NextLink href="/es" className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-medium text-white">Volver al inicio</NextLink>
    </div>
  );
}
