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
} from "../types";

import { resolveProfile } from "./resolveProfile";

export const buildProfileResult = (
  answers: PathAnswers,
  copy: PathFinderCopy,
  profiles: Record<ProfileKey, Profile>,
): ProfileResult | null => {
  const key = resolveProfile(answers);
  if (!key) return null;
  const profile = profiles[key];

  const labelOf: Record<SubCategoryId, string> = {
    exchange: copy.sections.acquisition.sub.exchange.label,
    p2p: copy.sections.acquisition.sub.p2p.label,
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
    const toItem = (plan: ProfilePlan, letter: string): SubCategoryItem => ({
      id: plan.subCategory,
      label: plan.label ?? labelOf[plan.subCategory],
      comment: plan.text,
      plan: letter,
    });

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
