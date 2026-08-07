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
  const t = getServerTranslations("en");
  const name = t(`categories.${slug}`);
  return {
    title: `${name} Games - Play Free Online, No Download`,
    description: `Play the best free ${name} games online instantly. No download or sign-up required. Browse on desktop or mobile; control support varies by title.`,
    alternates: buildAlternates(`/${slug}`, "en"),
    openGraph: {
      title: `${name} Games - Play Free Online`,
      description: `Play free ${name} games online in your browser.`,
      type: "website",
      url: `${SITE_URL}/${slug}`,
    },
  };
}

export default async function EnCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <CategoryPageView locale="en" slug={slug} />;
}
