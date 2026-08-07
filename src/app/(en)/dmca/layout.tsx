import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "DMCA Policy",
  alternates: buildAlternates("/dmca", "en"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
