import type { Metadata } from "next";
import AllGamesPageView, { buildAllGamesMetadata } from "@/views/AllGamesPageView";

export function generateMetadata(): Metadata {
  return buildAllGamesMetadata("zh");
}

export default function AllGamesPage() {
  return <AllGamesPageView locale="zh" />;
}
