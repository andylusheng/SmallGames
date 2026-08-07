"use client";

export type AnalyticsEvent =
  | "game_start"
  | "game_loaded"
  | "game_30s"
  | "game_60s"
  | "game_restart"
  | "fullscreen_click"
  | "related_game_click"
  | "game_error";

export function trackEvent(
  eventName: AnalyticsEvent,
  parameters: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, parameters);
}
