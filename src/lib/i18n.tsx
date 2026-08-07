"use client";

import React, { createContext, useContext } from "react";
import en from "@/messages/en.json";
import zh from "@/messages/zh.json";
import zhTw from "@/messages/zh-tw.json";

const messages: Record<string, any> = { en, zh, "zh-tw": zhTw };

type MessagesContextType = {
  locale: string;
  messages: Record<string, any>;
};

const MessagesContext = createContext<MessagesContextType>({
  locale: "en",
  messages: en,
});

export function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <MessagesContext.Provider value={{ locale, messages: messages[locale] || en }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useLocale() {
  return useContext(MessagesContext).locale;
}

export function useTranslations(namespace?: string) {
  const { messages: msgs } = useContext(MessagesContext);

  return (key: string, params?: Record<string, any>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split(".");
    let value: any = msgs;
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== "string") return fullKey;
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
    }
    return value;
  };
}
