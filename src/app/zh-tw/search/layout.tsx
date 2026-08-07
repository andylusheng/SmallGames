import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "搜尋遊戲",
  description: "搜尋 ZeroPlay Games 的免費線上遊戲目錄。",
  robots: { index: false, follow: true },
  alternates: buildAlternates("/search", "zh-tw"),
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
