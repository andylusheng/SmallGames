"use client";

import NextLink from "next/link";
import { useLocale } from "@/lib/i18n";

export function Link({
  href,
  children,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const localizedHref =
    typeof href === "string"
      ? locale === "en"
        ? href
        : `/${locale}${href === "/" ? "" : href}`
      : href;
  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
