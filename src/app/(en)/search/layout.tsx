import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Search Games",
  description: "Search the ZeroPlay Games catalog.",
  robots: { index: false, follow: true },
  alternates: buildAlternates("/search", "en"),
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
