import { type CSSProperties, type FC } from "react";

import { BRAND, Button,
  Caption,
  Disclosure,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { usePathFinder } from "../hooks";
import type { ProfileKey, WalletSection } from "../types";

import { QuestionStep } from "./QuestionStep";
import { SectionCard } from "./SectionCard";

import {
  ArrowLeft,
  Briefcase,
  Check,
  Compass,
  Fish,
  Ghost,
  GraduationCap,
  Handshake,
  HelpCircle,
  type IconType,
  Info,
  RotateCcw,
  ShieldCheck,
  Telescope,
} from "@icons";

const ICON_BY_PROFILE: Record<ProfileKey, IconType> = {
  curieux: Telescope,
  debutant: GraduationCap,
  discretFrugal: Ghost,
  investisseur: Briefcase,
  souverainDiscret: ShieldCheck,
  baleine: Fish,
  indecis: HelpCircle,
  delegant: Handshake,
};

export const PathFinder: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const {
    copy,
    answers,
    step,
    lastStep,
    submitted,
    allAnswered,
    result,
    answer,
    back,
    submit,
    reset,
  } = usePathFinder();

  const accent = colors[moduleTheme].text.secondary;
  const sectionAccent = (section: WalletSection) =>
    section === "acquisition" ? colors.blue.text.secondary : colors.violet.text.secondary;
  const { questions } = copy;
  const ProfileIcon = result ? ICON_BY_PROFILE[result.key] : null;

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
    margin: isMobile ? "1.75rem 0" : "2.5rem 0",
  };

  const stepperHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
  };

  const dotsStyle: CSSProperties = { display: "flex", gap: "0.4rem", alignItems: "center" };

  const dotStyle = (i: number): CSSProperties => ({
    width: i === step ? "0.75rem" : "0.5rem",
    height: "0.5rem",
    borderRadius: "999px",
    background: i <= step ? accent : withOpacity(colors.base.text.secondary, 0.22),
    transition: "all 0.25s var(--ease-smooth)",
  });

  const questionFadeStyle: CSSProperties = { animation: "donationFade 0.22s var(--ease-smooth)" };

  const actionRowStyle: CSSProperties = { display: "flex", gap: "0.6rem", flexWrap: "wrap" };

  const resultsStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "1rem" };

  const profileHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
  };

  // Structural icon badge — a square (radius 0), per the block-vs-coin rule.
  const profileIconChipStyle: CSSProperties = {
    flexShrink: 0,
    width: isMobile ? "3rem" : "3.4rem",
    height: isMobile ? "3rem" : "3.4rem",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: accent,
    background: withOpacity(accent, 0.14),
    border: `1px solid ${withOpacity(accent, 0.4)}`,
  };

  const profileTitleColStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    minWidth: 0,
  };

  const profileLeadStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(accent, 0.85),
  };

  const profileNameStyle: CSSProperties = {
    margin: 0,
    fontSize: isMobile ? "1.25rem" : "1.5rem",
    fontWeight: 500,
    lineHeight: 1.15,
    color: accent,
  };

  const verdictStyle: CSSProperties = {
    margin: 0,
    fontSize: BRAND.fontSize.body,
    lineHeight: 1.6,
    fontWeight: 500,
    color: colors.base.text.primary,
  };

  return (
    <div style={wrapStyle}>
      <SurfaceCard glowColor={accent} size="lg" gap="1.25rem">
        <Caption size="md" color={accent} icon={<Compass size={18} strokeWidth={2} />}>
          {copy.title}
        </Caption>

        <div style={stepperHeaderStyle}>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft size={14} strokeWidth={2.2} />}
            onClick={back}
            disabled={step === 0 || submitted}
            style={{ paddingLeft: 0 }}
          >
            {copy.back}
          </Button>
          <div style={dotsStyle} aria-label={copy.progress(step + 1, lastStep + 1)}>
            {Array.from({ length: lastStep + 1 }).map((_, i) => (
              <span key={i} style={dotStyle(i)} />
            ))}
          </div>
        </div>

        <div key={step} style={questionFadeStyle}>
          {step === 0 && (
            <QuestionStep
              number={1}
              question={questions.q1.text}
              options={questions.q1.options}
              selected={answers.capital}
              accent={accent}
              disabled={submitted}
              onSelect={(value) => answer("capital", value)}
            />
          )}
          {step === 1 && (
            <QuestionStep
              number={2}
              question={questions.q2.text}
              options={questions.q2.options}
              selected={answers.frequency}
              accent={accent}
              disabled={submitted}
              onSelect={(value) => answer("frequency", value)}
            />
          )}
          {step === 2 && (
            <QuestionStep
              number={3}
              question={questions.q3.text}
              options={questions.q3.options}
              selected={answers.custody}
              accent={accent}
              disabled={submitted}
              onSelect={(value) => answer("custody", value)}
            />
          )}
          {step === 3 && (
            <QuestionStep
              number={4}
              question={questions.q4.text}
              options={questions.q4.options}
              selected={answers.privacy}
              accent={accent}
              disabled={submitted}
              onSelect={(value) => answer("privacy", value)}
              footer={
                <Disclosure
                  title={questions.q4.disclosureTitle}
                  icon={<HelpCircle size={14} strokeWidth={2} />}
                >
                  {questions.q4.disclosureBody}
                </Disclosure>
              }
            />
          )}
        </div>

        {allAnswered && (
          <div style={actionRowStyle}>
            <Button
              variant="primary"
              color={accent}
              icon={<Check size={14} strokeWidth={2.4} />}
              onClick={submit}
              disabled={submitted}
            >
              {copy.finish}
            </Button>
            <Button
              variant="secondary"
              icon={<RotateCcw size={13} strokeWidth={2} />}
              onClick={reset}
              disabled={!submitted}
            >
              {copy.reset}
            </Button>
          </div>
        )}
      </SurfaceCard>

      {submitted && result && (
        <div style={resultsStyle}>
          <SurfaceCard glowColor={accent} gap="0.9rem">
            <div style={profileHeaderStyle}>
              {ProfileIcon && (
                <span style={profileIconChipStyle}>
                  <ProfileIcon size={isMobile ? 26 : 30} strokeWidth={1.8} />
                </span>
              )}
              <div style={profileTitleColStyle}>
                <span style={profileLeadStyle}>{copy.profileLead}</span>
                <h3 style={profileNameStyle}>{result.name}</h3>
              </div>
            </div>

            <p style={verdictStyle}>{result.verdict}</p>

            <FeedbackPanel
              tone="info"
              title={copy.whyLabel}
              icon={<Info size={12} strokeWidth={2} />}
            >
              {result.why}
            </FeedbackPanel>
          </SurfaceCard>

          {result.sections.map((section) => (
            <SectionCard
              key={section.section}
              plan={section}
              copy={copy}
              accent={sectionAccent(section.section)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
