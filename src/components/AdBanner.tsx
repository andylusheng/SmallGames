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

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded yet
    }
  }, []);

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
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={slot}
        data-ad-format={formatMap[format]}
        data-full-width-responsive="true"
      />
      {/* Placeholder for development */}
      <div className="flex items-center justify-center rounded-lg border border-dashed border-white/10 bg-surface/50 py-6 text-xs text-gray-600">
        Ad Space
      </div>
    </div>
  );
}
