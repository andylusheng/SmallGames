"use client";

import { trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/lib/i18n";
import { Loader2, Maximize, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface GamePlayerProps {
  gameUrl: string;
  title: string;
  slug: string;
}

export default function GamePlayer({ gameUrl, title, slug }: GamePlayerProps) {
  const t = useTranslations();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted || isLoading) return;

    const timer30 = window.setTimeout(
      () => trackEvent("game_30s", { game_slug: slug }),
      30_000
    );
    const timer60 = window.setTimeout(
      () => trackEvent("game_60s", { game_slug: slug }),
      60_000
    );

    return () => {
      window.clearTimeout(timer30);
      window.clearTimeout(timer60);
    };
  }, [hasStarted, isLoading, slug]);

  const handleStart = () => {
    trackEvent("game_start", { game_slug: slug });
    setHasStarted(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
    trackEvent("game_loaded", { game_slug: slug });
  };

  const handleError = () => {
    setIsLoading(false);
    trackEvent("game_error", { game_slug: slug });
  };

  const handleFullscreen = () => {
    trackEvent("fullscreen_click", { game_slug: slug });
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void containerRef.current.requestFullscreen();
    }
  };

  const handleReload = () => {
    trackEvent("game_restart", { game_slug: slug });
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = gameUrl;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black"
    >
      <div className="relative h-[clamp(420px,65vh,680px)] w-full">
        {!hasStarted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 to-dark">
            <button
              onClick={handleStart}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/30 transition-transform hover:scale-110"
              aria-label={`${t("game.clickToPlay")}: ${title}`}
            >
              <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <p className="mt-4 text-lg font-semibold text-white">{t("game.clickToPlay")}</p>
            <p className="mt-1 text-sm text-gray-300">{title}</p>
          </div>
        )}

        {hasStarted && isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-dark">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm text-gray-400">{t("game.loading")}</p>
          </div>
        )}

        {hasStarted && (
          <iframe
            ref={iframeRef}
            src={gameUrl}
            title={title}
            className="h-full w-full border-0"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>

      {hasStarted && (
        <div className="flex items-center justify-between border-t border-white/10 bg-surface px-4 py-2">
          <span className="text-sm font-medium text-white">{title}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReload}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-light hover:text-white"
              title="Reload"
              aria-label={`Reload ${title}`}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleFullscreen}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-light hover:text-white"
              title={t("game.fullscreen")}
              aria-label={`${t("game.fullscreen")}: ${title}`}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="hidden max-[480px]:flex items-center justify-center gap-2 bg-secondary/10 px-4 py-2 text-xs text-secondary">
        📱 {t("game.tips")}
      </div>
    </div>
  );
}
