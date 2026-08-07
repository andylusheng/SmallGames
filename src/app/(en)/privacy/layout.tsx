import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: buildAlternates("/privacy", "en"),
};

export default function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
