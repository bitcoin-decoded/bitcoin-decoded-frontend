import type { FC } from "react";
import type { IdentityCharacteristic, MonetaryItem } from "../../../Design";
import { IdentityCard, RatingRow, getMonetaryHistory } from "../../../Design";
import { useLanguageContext, useTranslation } from "../../../I18n";

export const MonetaryGallery: FC = () => {
  const { language } = useLanguageContext();
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
        gap: "2rem",
        padding: "2rem",
        alignItems: "start",
      }}
    >
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
                  gap: "0.25rem",
                  fontStyle: "normal",
                }}
              >
                {item.characteristics.map((characteristic, i) => (
                  <RatingRow
                    key={i}
                    icon={characteristic.icon}
                    label={characteristic.label}
                    score={characteristic.score}
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
          />
        );
      })}
    </div>
  );
};
