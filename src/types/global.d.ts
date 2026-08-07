declare module "*.css";
declare module "*.scss";
declare module "*.sass";

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
