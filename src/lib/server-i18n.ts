import en from "@/messages/en.json";
import zh from "@/messages/zh.json";

const messages: Record<string, any> = { en, zh };

export function getServerTranslations(locale: string) {
  const msgs = messages[locale] || en;
  return (key: string, params?: Record<string, any>) => {
    const keys = key.split(".");
    let value: any = msgs;
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== "string") return key;
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
    }
    return value;
  };
}
