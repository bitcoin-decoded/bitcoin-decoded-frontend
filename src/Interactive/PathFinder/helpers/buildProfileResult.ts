import type { PathFinderCopy } from "../data";
import type {
  PathAnswers,
  Profile,
  ProfileKey,
  ProfilePlan,
  ProfileResult,
  SectionPlan,
  SubCategoryId,
  SubCategoryItem,
  WalletSection,
  WalletSolution,
} from "../types";

import { resolveProfile } from "./resolveProfile";
import { selectSubCategorySolutions } from "./selectSubCategorySolutions";

/**
 * Resolves the reader's profile and turns its plans into the two output
 * sections. Each step shows the profile's plan A (recommended, starred) and an
 * optional plan B. Returns `null` until the answers resolve to a profile.
 */
export const buildProfileResult = (
  answers: PathAnswers,
  solutions: WalletSolution[],
  copy: PathFinderCopy,
  profiles: Record<ProfileKey, Profile>,
): ProfileResult | null => {
  const key = resolveProfile(answers);
  if (!key) return null;
  const profile = profiles[key];

  const labelOf: Record<SubCategoryId, string> = {
    exchange: copy.sections.acquisition.sub.exchange.label,
    p2p: copy.sections.acquisition.sub.p2p.label,
    etf: copy.sections.acquisition.sub.etf.label,
    atm: copy.sections.acquisition.sub.atm.label,
    custodial: copy.sections.detention.sub.custodial.label,
    hot: copy.sections.detention.sub.hot.label,
    cold: copy.sections.detention.sub.cold.label,
  };

  const buildSection = (
    section: WalletSection,
    step: number,
    sectionLabel: string,
    plans: { planA: ProfilePlan; planB?: ProfilePlan },
  ): SectionPlan => {
    const seen = new Set<SubCategoryId>();
    const toItem = (plan: ProfilePlan, letter: string): SubCategoryItem => {
      const duplicate = seen.has(plan.subCategory);
      seen.add(plan.subCategory);
      return {
        id: plan.subCategory,
        label: plan.label ?? labelOf[plan.subCategory],
        comment: plan.text,
        plan: letter,
        // A shared family lists its solutions once (on the first plan).
        solutions: duplicate ? [] : selectSubCategorySolutions(solutions, plan.subCategory),
      };
    };

    const subCategories = [toItem(plans.planA, "A")];
    if (plans.planB) subCategories.push(toItem(plans.planB, "B"));
    return { section, step, label: sectionLabel, subCategories };
  };

  return {
    key,
    name: profile.name,
    verdict: profile.verdict,
    why: profile.why,
    sections: [
      buildSection("acquisition", 1, copy.sections.acquisition.label, profile.acquisition),
      buildSection("detention", 2, copy.sections.detention.label, profile.detention),
    ],
  };
};
