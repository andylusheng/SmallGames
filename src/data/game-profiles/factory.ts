import type { GameSeoProfile } from "@/data/game-profiles";

type SourceGroundedProfileSeed = Omit<
  GameSeoProfile,
  "publishedAt" | "updatedAt" | "seoStatus" | "testedMobile"
> & {
  publishedAt?: string;
  updatedAt?: string;
};

/**
 * Build a source-grounded single-game SEO profile.
 *
 * `seoStatus` describes content SEO completeness only. Mobile gameplay QA is
 * tracked independently through `testedMobile`, so a page can be SEO-optimized
 * while still waiting for manual device testing.
 */
export function optimizedProfile(seed: SourceGroundedProfileSeed): GameSeoProfile {
  return {
    ...seed,
    publishedAt: seed.publishedAt ?? "2026-07-21",
    updatedAt: seed.updatedAt ?? "2026-08-07",
    seoStatus: "optimized",
    testedMobile: false,
  };
}

/**
 * Legacy alias retained so existing source-grounded profile files do not need a
 * noisy mechanical rewrite. These profiles now represent completed content SEO;
 * device QA remains visible through `testedMobile=false` until manually tested.
 */
export const reviewedProfile = optimizedProfile;
