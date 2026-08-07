import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Buscar juegos",
  description: "Busca juegos gratis en el catálogo de ZeroPlay Games.",
  robots: { index: false, follow: true },
  alternates: buildAlternates("/search", "es"),
};

export default function EsSearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
