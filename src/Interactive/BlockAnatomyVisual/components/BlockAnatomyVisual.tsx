import { type CSSProperties, type FC } from "react";

import { getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { BlockPlate, BlockPlateRow, BlockPlateSection } from "../../components";
import { BODY_FIELDS, HEADER_FIELDS } from "../data";
import type { BlockField } from "../types";

export const BlockAnatomyVisual: FC = () => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const iconSize = isMobile ? 20 : 22;

  const valueStyle: CSSProperties = {
    ...typo.figure,
    color: world.text.secondary,
    wordBreak: "break-word",
  };

  const renderFields = (fields: BlockField[]) =>
    fields.map((field, i) => (
      <BlockPlateRow
        key={field.labelEn}
        icon={<field.icon size={iconSize} />}
        label={fr ? field.labelFr : field.labelEn}
        zebra={i % 2 === 0}
      >
        <span style={valueStyle}>{fr ? field.valueFr : field.valueEn}</span>
      </BlockPlateRow>
    ));

  return (
    <FrText>
      <div
        style={{
          width: "100%",
          maxWidth: "38rem",
          margin: isMobile ? "1.5rem auto" : "2.5rem auto",
        }}
      >
        <BlockPlate title={t("blockAnatomy.title")}>
          <BlockPlateSection>{t("chain.header")}</BlockPlateSection>
          {renderFields(HEADER_FIELDS)}

          <BlockPlateSection>{t("chain.body")}</BlockPlateSection>
          {renderFields(BODY_FIELDS)}
        </BlockPlate>
      </div>
    </FrText>
  );
};
