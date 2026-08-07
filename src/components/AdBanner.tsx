"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export default function AdBanner({
  slot = "auto",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const enabled = Boolean(client && /^ca-pub-\d+$/.test(client));

  useEffect(() => {
    if (!enabled) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may not be ready yet.
    }
  }, [enabled]);

  if (!enabled) return null;

  const formatMap = {
    horizontal: "auto",
    rectangle: "rectangle",
    vertical: "vertical",
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={formatMap[format]}
        data-full-width-responsive="true"
      />
    </div>
  );
}
