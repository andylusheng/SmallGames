import type {
  GameScoringRule,
  GameSeoProfile,
  LocalizedText,
  SupportedLocale,
} from "@/data/game-profiles";
import { optimizedProfile } from "@/data/game-profiles/factory";

export interface CatalogGameProfileSeed {
  slug: string;
  title: string;
  zhTitle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  containsViolence: boolean | null;
  controls: string[];
  gameplayTopics: string[];
  objective: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  h1: LocalizedText;
  intro: LocalizedText;
  facts: LocalizedText[];
  howToPlay: LocalizedText[];
  rules: LocalizedText[];
  tips: LocalizedText[];
  scoring?: GameScoringRule[];
  scoringTitle?: LocalizedText;
  scoringValueLabel?: LocalizedText;
  durationSeconds?: number;
  endCondition?: LocalizedText;
  progress: LocalizedText;
  publishedAt?: string;
  updatedAt?: string;
}

function loc(items: LocalizedText[], locale: SupportedLocale): string[] {
  return items.map((item) => item[locale]);
}

function buildFaq(seed: CatalogGameProfileSeed, locale: SupportedLocale) {
  const name = locale === "en" ? seed.title : seed.zhTitle;
  const controls = locale === "en"
    ? seed.controls.map((control) => ({ mouse: "mouse", touch: "touch", keyboard: "keyboard" }[control] ?? control)).join(", ")
    : seed.controls.map((control) => ({ mouse: "鼠标", touch: "触屏", keyboard: "键盘" }[control] ?? control)).join("、");
  const scoreFact = seed.scoring?.length
    ? seed.scoring.map((rule) => {
        const label = rule.label[locale];
        const value = rule.points !== undefined
          ? `${rule.points > 0 ? "+" : ""}${rule.points}`
          : rule.value?.[locale] ?? "—";
        return `${label}: ${value}${rule.note ? ` (${rule.note[locale]})` : ""}`;
      }).join("; ")
    : seed.facts[0][locale];

  if (locale === "en") {
    return [
      { q: `How do I play ${name}?`, a: `${seed.objective.en} Controls: ${controls}.` },
      { q: `How does scoring or progress work in ${name}?`, a: scoreFact },
      { q: `When does ${name} end or reset?`, a: seed.endCondition?.en ?? seed.rules[seed.rules.length - 1].en },
      { q: `Does ${name} save progress?`, a: seed.progress.en },
    ];
  }

  return [
    { q: `${name}怎么玩？`, a: `${seed.objective.zh} 操作方式：${controls}。` },
    { q: `${name}怎么计分或推进进度？`, a: scoreFact },
    { q: `${name}什么时候结束或重置？`, a: seed.endCondition?.zh ?? seed.rules[seed.rules.length - 1].zh },
    { q: `${name}会保存进度吗？`, a: seed.progress.zh },
  ];
}

export function catalogProfile(seed: CatalogGameProfileSeed): GameSeoProfile {
  const buildContent = (locale: SupportedLocale) => ({
    metaTitle: seed.metaTitle[locale],
    metaDescription: seed.metaDescription[locale],
    h1: seed.h1[locale],
    intro: seed.intro[locale],
    about: [
      `${seed.objective[locale]} ${seed.facts[0][locale]}`,
      seed.facts.slice(1).map((fact) => fact[locale]).join(" "),
    ].filter(Boolean),
    howToPlay: loc(seed.howToPlay, locale),
    rules: loc(seed.rules, locale),
    tips: loc(seed.tips, locale),
    faq: buildFaq(seed, locale),
  });

  return optimizedProfile({
    slug: seed.slug,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondaryKeywords,
    containsViolence: seed.containsViolence,
    publishedAt: seed.publishedAt,
    updatedAt: seed.updatedAt,
    mechanics: {
      objective: seed.objective,
      durationSeconds: seed.durationSeconds,
      controls: seed.controls,
      scoring: seed.scoring ?? [],
      scoringTitle: seed.scoringTitle,
      scoringValueLabel: seed.scoringValueLabel,
      specialMechanics: seed.facts,
      endCondition: seed.endCondition,
      progress: seed.progress,
      gameplayTopics: seed.gameplayTopics,
    },
    content: {
      en: buildContent("en"),
      zh: buildContent("zh"),
    },
  });
}