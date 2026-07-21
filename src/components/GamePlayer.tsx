"use client";

import { useTranslations } from "@/lib/i18n";
import { Maximize, Loader2, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

interface GamePlayerProps {
  gameUrl: string;
  title: string;
}

export default function GamePlayer({ gameUrl, title }: GamePlayerProps) {
  const t = useTranslations();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const handleReload = () => {
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
        {/* Click to play overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 to-dark">
            <button
              onClick={handleStart}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/30 transition-transform hover:scale-110"
            >
              <svg
                className="ml-1 h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <p className="mt-4 text-lg font-semibold text-white">
              {t("game.clickToPlay")}
            </p>
            <p className="mt-1 text-sm text-gray-300">{title}</p>
          </div>
        )}

        {/* Loading state */}
        {hasStarted && isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-dark">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm text-gray-400">{t("game.loading")}</p>
          </div>
        )}

        {/* Game iframe */}
        {hasStarted && (
          <iframe
            ref={iframeRef}
            src={gameUrl}
            title={title}
            className="h-full w-full border-0"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            onLoad={handleLoad}
          />
        )}
      </div>

      {/* Controls bar */}
      {hasStarted && (
        <div className="flex items-center justify-between border-t border-white/10 bg-surface px-4 py-2">
          <span className="text-sm font-medium text-white">{title}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReload}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-light hover:text-white"
              title="Reload"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleFullscreen}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-light hover:text-white"
              title={t("game.fullscreen")}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile rotate hint */}
      <div className="hidden max-[480px]:flex items-center justify-center gap-2 bg-secondary/10 px-4 py-2 text-xs text-secondary">
        📱 {t("game.tips")}
      </div>
    </div>
  );
}
