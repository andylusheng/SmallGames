import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ZeroPlay Games - Play Free Online Games",
    template: "%s | ZeroPlay Games",
  },
  description:
    "Play 100+ free online games in your browser. No downloads, no sign-ups. Just click and play!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
