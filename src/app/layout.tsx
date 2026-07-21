import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PlayFree Games - Play Free Online Games",
    template: "%s | PlayFree Games",
  },
  description:
    "Play thousands of free online games on your browser. No downloads, no sign-ups. Just click and play!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
