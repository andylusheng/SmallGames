import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "搜索游戏",
  description: "搜索 ZeroPlay Games 游戏目录。",
  robots: { index: false, follow: true },
  alternates: buildAlternates("/search", "zh"),
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
