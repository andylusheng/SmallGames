import type { Metadata } from "next";
import { getServerTranslations } from "@/lib/server-i18n";
import { buildAlternates, SITE_URL } from "@/lib/metadata";
import CategoryPageView, { categoryStaticParams } from "@/views/CategoryPageView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categoryStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getServerTranslations("zh");
  const name = t(`categories.${slug}`);
  return {
    title: `${name}游戏 - 免费在线玩`,
    description: `在线畅玩最好的免费${name}游戏，无需下载，无需注册。支持电脑和手机浏览器。`,
    alternates: buildAlternates(`/${slug}`, "zh"),
    openGraph: {
      title: `${name}游戏 - 免费在线玩`,
      description: `在线免费畅玩${name}游戏。`,
      type: "website",
      url: `${SITE_URL}/zh/${slug}`,
    },
  };
}

export default async function ZhCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <CategoryPageView locale="zh" slug={slug} />;
}
