import type { GameSeoProfile } from "@/data/game-profiles";

type ReviewedProfileSeed = Omit<
  GameSeoProfile,
  "publishedAt" | "updatedAt" | "seoStatus" | "testedMobile"
> & {
  publishedAt?: string;
  updatedAt?: string;
};

export function reviewedProfile(seed: ReviewedProfileSeed): GameSeoProfile {
  return {
    ...seed,
    publishedAt: seed.publishedAt ?? "2026-07-21",
    updatedAt: seed.updatedAt ?? "2026-08-07",
    seoStatus: "reviewed",
    testedMobile: false,
  };
}
