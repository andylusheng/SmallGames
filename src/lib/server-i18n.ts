import en from "@/messages/en.json";
import zh from "@/messages/zh.json";
import zhTw from "@/messages/zh-tw.json";
import es from "@/messages/es.json";

const messages: Record<string, Record<string, any>> = { en, zh, "zh-tw": zhTw, es };

export function getServerMessages(locale: string): Record<string, any> {
  return messages[locale] || en;
}

export function getServerTranslations(locale: string) {
  const msgs = getServerMessages(locale);
  return (key: string, params?: Record<string, any>) => {
    const keys = key.split(".");
    let value: any = msgs;
    for (const k of keys) value = value?.[k];
    if (typeof value !== "string") return key;
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
    }
    return value;
  };
}
