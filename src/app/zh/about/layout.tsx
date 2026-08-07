import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "了解 ZeroPlay Games",
  alternates: buildAlternates("/about", "zh"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
