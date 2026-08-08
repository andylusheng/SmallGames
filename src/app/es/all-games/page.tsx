import type { Metadata } from "next";
import AllGamesPageView, { buildAllGamesMetadata } from "@/views/AllGamesPageView";

export function generateMetadata(): Metadata {
  return buildAllGamesMetadata("es");
}

export default function AllGamesPage() {
  return <AllGamesPageView locale="es" />;
}
