import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "DMCA 政策",
  alternates: buildAlternates("/dmca", "zh"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
