import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zeroplaygames.com";
const SITE_NAME = "ZeroPlay Games";

export { SITE_URL, SITE_NAME };

/**
 * Build self-referencing canonical + en/zh hreflang alternates for a page.
 * @param path  page path without locale prefix, e.g. "" (home), "/puzzle", "/game/2048"
 * @param locale  current locale, "en" or "zh"
 */
export function buildAlternates(path: string, locale: string) {
  const enUrl = `${SITE_URL}${path}`;
  const zhUrl = `${SITE_URL}/zh${path}`;
  return {
    canonical: locale === "zh" ? zhUrl : enUrl,
    languages: {
      en: enUrl,
      zh: zhUrl,
      "x-default": enUrl,
    },
  };
}

export function buildLocaleMetadata(locale: string): Metadata {
  const isEn = locale === "en";
  const prefix = isEn ? "" : "/zh";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isEn
        ? `${SITE_NAME} - Play Free Online Games, No Download`
        : `${SITE_NAME} - 免费在线小游戏，无需下载`,
      template: `%s | ${SITE_NAME}`,
    },
    description: isEn
      ? "Play 100+ free online games instantly. No downloads, no sign-ups. Action, puzzle, arcade, racing games and more - just click and play!"
      : "即刻畅玩100多款免费在线小游戏。无需下载，无需注册。动作、益智、街机、赛车游戏应有尽有，点击即玩！",
    keywords: ["free online games", "play games online", "no download games", "browser games", "HTML5 games", "free games"],
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "zh_CN",
      url: `${SITE_URL}${prefix}`,
      siteName: SITE_NAME,
      title: `${SITE_NAME} - Play Free Online Games`,
      description: "Play free online games instantly. No downloads required. Action, puzzle, arcade, racing and more!",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Free Online Games`,
      description: "Play free browser games instantly. No downloads, no sign-ups.",
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: { icon: [{ url: `${SITE_URL}/favicon.svg`, type: "image/svg+xml" }] },
    alternates: buildAlternates("", locale),
  };
}
