import { type CSSProperties, type FC } from "react";

import type { IdentityCharacteristic, MonetaryItem } from "../../../Design";
import {
  ExploredCounter,
  getMonetaryHistory,
  IdentityCard,
  RatingRow,
  useBreakpoint,
  useExplorationGate,
} from "../../../Design";
import { useLanguageContext, useTranslation } from "../../../I18n";

// Reading a few cards is the pedagogical act here, so the block gates on it:
// explore any 3 of the monetary specimens to unlock the rest of the chapter.
const REQUIRED_EXPLORED = 3;

type Props = {
  /** Fired once 3 distinct cards have been opened (gates the reading block). */
  onComplete?: () => void;
};

export const MonetaryGallery: FC<Props> = ({ onComplete }) => {
  const { language } = useLanguageContext();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const { exploredCount, markExplored } = useExplorationGate({
    threshold: REQUIRED_EXPLORED,
    onComplete,
  });

  // Large screens fit three trading-card-sized columns; tablets two; phones one.
  const columns = breakpoint === "desktop" ? 3 : breakpoint === "tablet" ? 2 : 1;
  const isMobile = breakpoint === "mobile";

  const headerRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: isMobile ? "0.5rem" : "1rem",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    // A lone column (mobile / narrow viewports) is capped and centered so the
    // card stays card-sized instead of stretching full-width on wide phones.
    gridTemplateColumns: columns === 1 ? "minmax(0, 26rem)" : `repeat(${columns}, minmax(0, 1fr))`,
    justifyContent: columns === 1 ? "center" : undefined,
    gap: isMobile ? "1.25rem" : "1.5rem",
    padding: isMobile ? "1rem 0" : "1.5rem 0",
    alignItems: "start",
  };

  return (
    <>
      <div style={headerRowStyle}>
        <ExploredCounter
          explored={Math.min(exploredCount, REQUIRED_EXPLORED)}
          total={REQUIRED_EXPLORED}
          label={t("monetaryGallery.explored")}
        />
      </div>
      <div style={gridStyle}>
        {getMonetaryHistory(language).map((item: MonetaryItem, index: number) => {
          const characteristics: IdentityCharacteristic[] = [
            {
              label: t("monetaryGallery.history"),
              value: <>{item.history}</>,
            },
            {
              label: t("monetaryGallery.characteristics"),
              value: (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    fontStyle: "normal",
                  }}
                >
                  {item.characteristics.map((characteristic, i) => (
                    <RatingRow
                      key={i}
                      icon={characteristic.icon}
                      label={characteristic.label}
                      score={characteristic.score}
                      compact
                    />
                  ))}
                </div>
              ),
            },
            {
              label: t("monetaryGallery.limitations"),
              value: <>{item.death}</>,
            },
          ];

          return (
            <IdentityCard
              key={index}
              name={item.name}
              profile={item.profile}
              profilePicture={
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
              characteristics={characteristics}
              isExpandable
              compact
              onExpand={() => markExplored(index)}
            />
          );
        })}
      </div>
    </>
  );
};
