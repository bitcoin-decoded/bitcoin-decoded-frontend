import { type CSSProperties, type FC } from "react";

import type { IdentityCharacteristic, MonetaryItem } from "../../../Design";
import { getMonetaryHistory, IdentityCard, RatingRow, useBreakpoint } from "../../../Design";
import { useLanguageContext, useTranslation } from "../../../I18n";

export const MonetaryGallery: FC = () => {
  const { language } = useLanguageContext();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  // Large screens fit three trading-card-sized columns; tablets two; phones one.
  const columns = breakpoint === "desktop" ? 3 : breakpoint === "tablet" ? 2 : 1;
  const isMobile = breakpoint === "mobile";

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
          />
        );
      })}
    </div>
  );
};
