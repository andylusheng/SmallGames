"use client";

import React, { createContext, useContext } from "react";

type MessagesContextType = {
  locale: string;
  messages: Record<string, any>;
};

const MessagesContext = createContext<MessagesContextType>({
  locale: "en",
  messages: {},
});

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Record<string, any>;
  children: React.ReactNode;
}) {
  return (
    <MessagesContext.Provider value={{ locale, messages }}>
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
    for (const k of keys) value = value?.[k];
    if (typeof value !== "string") return fullKey;
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
    }
    return value;
  };
}
