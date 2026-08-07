import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "服务条款",
  alternates: buildAlternates("/terms", "zh"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
