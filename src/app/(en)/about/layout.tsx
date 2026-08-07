import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About ZeroPlay Games",
  alternates: buildAlternates("/about", "en"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
