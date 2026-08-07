import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: buildAlternates("/terms", "en"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
