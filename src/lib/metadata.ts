import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zeroplaygames.com";
const SITE_NAME = "ZeroPlay Games";

export { SITE_URL, SITE_NAME };

function localePrefix(locale: string): string {
  return locale === "en" ? "" : `/${locale}`;
}

export function buildAlternates(path: string, locale: string) {
  const enUrl = `${SITE_URL}${path}`;
  const zhUrl = `${SITE_URL}/zh${path}`;
  const zhTwUrl = `${SITE_URL}/zh-tw${path}`;
  const esUrl = `${SITE_URL}/es${path}`;
  const canonical = `${SITE_URL}${localePrefix(locale)}${path}`;

  return {
    canonical,
    languages: {
      en: enUrl,
      zh: zhUrl,
      "zh-TW": zhTwUrl,
      es: esUrl,
      "x-default": enUrl,
    },
  };
}

export function buildLocaleMetadata(locale: string): Metadata {
  const isEn = locale === "en";
  const isZhTw = locale === "zh-tw";
  const isEs = locale === "es";
  const prefix = localePrefix(locale);

  const title = isEn
    ? `${SITE_NAME} - Play Free Online Games, No Download`
    : isZhTw
      ? `${SITE_NAME} - 免費線上遊戲，無需下載`
      : isEs
        ? `${SITE_NAME} - Juegos online gratis, sin descargar`
        : `${SITE_NAME} - 免费在线小游戏，无需下载`;

  const description = isEn
    ? "Play 100 free online games instantly. No downloads, no sign-ups. Action, puzzle, arcade, racing games and more - just click and play!"
    : isZhTw
      ? "立即暢玩 100 款免費線上遊戲。無需下載、無需註冊，包含動作、益智、街機、賽車、體育與策略遊戲，點開即可玩。"
      : isEs
        ? "Juega a 100 juegos online gratis directamente en tu navegador. Sin descargas ni registro: acción, puzles, arcade, carreras, deportes, estrategia y más."
        : "即刻畅玩100多款免费在线小游戏。无需下载，无需注册。动作、益智、街机、赛车游戏应有尽有，点击即玩！";

  const ogLocale = isEn ? "en_US" : isZhTw ? "zh_TW" : isEs ? "es_ES" : "zh_CN";
  const keywords = isZhTw
    ? ["免費線上遊戲", "線上小遊戲", "免下載遊戲", "瀏覽器遊戲", "HTML5 遊戲", "免費遊戲"]
    : isEs
      ? ["juegos online gratis", "juegos gratis", "juegos sin descargar", "juegos de navegador", "juegos HTML5"]
      : ["free online games", "play games online", "no download games", "browser games", "HTML5 games", "free games"];

  const ogTitle = isZhTw
    ? `${SITE_NAME} - 免費線上遊戲`
    : isEs
      ? `${SITE_NAME} - Juegos online gratis`
      : `${SITE_NAME} - Play Free Online Games`;
  const ogDescription = isZhTw
    ? "在瀏覽器中立即玩免費線上遊戲，無需下載或註冊。"
    : isEs
      ? "Juega gratis directamente en el navegador, sin descargas ni registro."
      : "Play free online games instantly. No downloads required. Action, puzzle, arcade, racing and more!";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    keywords,
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `${SITE_URL}${prefix}`,
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: { icon: [{ url: `${SITE_URL}/favicon.svg`, type: "image/svg+xml" }] },
    alternates: buildAlternates("", locale),
  };
}
