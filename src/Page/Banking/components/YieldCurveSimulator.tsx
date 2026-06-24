import { type CSSProperties, type FC } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FeedbackPanel, RangeLedger, usePageTheme, useRechartsTheme } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { useYieldCurve } from "../hooks/useYieldCurve";

type Props = {
  /** Fired once the reader has moved the long-rate slider (manipulated). */
  onComplete?: () => void;
};

export const YieldCurveSimulator: FC<Props> = ({ onComplete }) => {
  const { colors, moduleTheme } = usePageTheme();
  const chart = useRechartsTheme();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { longRate, setLongRate, chartData, fixedShortRate } = useYieldCurve();
  const marginIsHealthy = longRate > 1.5;
  // Semantic margin color (healthy spread = success, thin/inverted = error) is
  // meaningful pedagogy — kept. Only the chart chrome moves to the ledger theme.
  const marginColor = marginIsHealthy
    ? colors.semantic.success.text
    : colors.semantic.error.text;

  const containerStyle: CSSProperties = {
    marginTop: "2rem",
    padding: "1rem 0.75rem",
    borderRadius: 0,
    border: `1px dashed ${colors[moduleTheme].border.primary}`,
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    width: "100%",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1rem",
    letterSpacing: "0.04em",
    lineHeight: 1.25,
    color: colors.base.text.primary,
    textAlign: "center",
    margin: 0,
  };

  const controlsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
  };

  const labelStyle: CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 500,
    textAlign: "center",
  };

  return (
    <FrText>
      <div style={containerStyle}>
        <p style={titleStyle}>{t("yieldCurve.title")}</p>
        <div style={{ height: "18rem", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={marginColor} stopOpacity={0.75} />
                  <stop offset="95%" stopColor={marginColor} stopOpacity={0.35} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray={chart.gridStrokeDasharray}
                stroke={chart.gridColor}
                vertical={false}
              />

              <XAxis
                dataKey="term"
                tick={chart.tickProp}
                tickLine={false}
                axisLine={{ stroke: chart.axisLineColor }}
                label={{
                  value: t("yieldCurve.years"),
                  position: "bottom",
                  offset: 0,
                  fill: chart.axisTickColor,
                  fontSize: 12,
                  fontFamily: chart.tickProp.fontFamily,
                }}
              />

              <YAxis
                domain={[0, 5]}
                tick={chart.tickProp}
                tickLine={false}
                axisLine={{ stroke: chart.axisLineColor }}
                unit="%"
              />

              <Tooltip
                contentStyle={chart.tooltipContentStyle}
                labelStyle={chart.tooltipLabelStyle}
                itemStyle={chart.tooltipItemStyle}
                labelFormatter={(value) => (fr ? `Terme : ${value} ans` : `Term: ${value} years`)}
                formatter={(value, name) => [`${(value as number).toFixed(2)}%`, name]}
              />

              <Area
                type="monotone"
                dataKey="longRate"
                stroke={marginColor}
                strokeWidth={2.5}
                fill="url(#colorMargin)"
                name={t("yieldCurve.longRateName")}
                baseValue={fixedShortRate}
              />

              <Line
                type="monotone"
                dataKey="shortRate"
                stroke={chart.axisTickColor}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                name={t("yieldCurve.shortRateName")}
              />

              <Line
                type="monotone"
                dataKey="longRate"
                stroke={marginColor}
                strokeWidth={2}
                dot={false}
                name={t("yieldCurve.longRateName")}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={controlsContainerStyle}>
          <div style={{ ...labelStyle, color: colors[moduleTheme].text.primary }}>
            {t("yieldCurve.shortRate")} : <strong>{fixedShortRate}%</strong>
          </div>
          <RangeLedger
            value={longRate}
            onChange={(value) => {
              setLongRate(value);
              onComplete?.();
            }}
            min={1}
            max={4}
            step={0.1}
            label={t("yieldCurve.longRate")}
            valueDisplay={`${longRate}%`}
            color={colors[moduleTheme].text.secondary}
            ariaLabel={t("yieldCurve.longRate")}
          />
        </div>

        <FeedbackPanel tone={marginIsHealthy ? "success" : "error"} title={t("yieldCurve.evaluation")}>
          {marginIsHealthy
            ? fr
              ? "Le moteur tourne ! La marge est suffisante pour couvrir les risques. La banque prête à l'économie réelle avec le sourire."
              : "The engine is running! The margin is sufficient to cover risks. The bank lends to the real economy with a smile."
            : fr
              ? "Alerte moteur ! La marge est trop faible pour couvrir les risques. La banque doit changer de stratégie d'urgence..."
              : "Engine alert! The margin is too thin to cover risks. The bank must urgently change strategy..."}
        </FeedbackPanel>
      </div>
    </FrText>
  );
};
