declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
