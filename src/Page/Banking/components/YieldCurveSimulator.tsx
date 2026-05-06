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

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useYieldCurve } from "../hooks/useYieldCurve";

export const YieldCurveSimulator: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { longRate, setLongRate, chartData, fixedShortRate } = useYieldCurve();
  const marginColor =
    longRate > 1.5
      ? `${colors.semantic.success.background}`
      : `${colors.semantic.error.background}`;
  const longLineColor = colors[moduleTheme].border.secondary;
  const shortLineColor = colors[moduleTheme].border.primary;

  const containerStyle: CSSProperties = {
    marginTop: "2rem",
    paddingTop: "0.5rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingBottom: "0.5rem",
    borderRadius: "0.5rem",
    border: `1px dashed ${colors[moduleTheme].border.primary}`,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "100%",
    boxShadow: colors.boxShadow.strong,
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.25rem",
    letterSpacing: "0.05rem",
    lineHeight: 1,
    color: colors.base.text.primary,
    textAlign: "center",
  };

  const controlsContainerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
    gap: "1rem",
  };

  const controlBoxStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const labelStyle: CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 500,
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <p style={titleStyle}>{t("yieldCurve.title")}</p>
      <div style={{ height: "20rem", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={marginColor} stopOpacity={0.6} />
                <stop offset="95%" stopColor={marginColor} stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.base.border.secondary}
              vertical={false}
            />

            <XAxis
              dataKey="term"
              stroke={colors.base.text.primary}
              fontSize={12}
              tickLine={false}
              axisLine={true}
              label={{
                value: t("yieldCurve.years"),
                position: "bottom",
                offset: 0,
                fill: colors.base.text.primary,
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 5]}
              stroke={colors.base.text.primary}
              fontSize={12}
              tickLine={false}
              axisLine={true}
              unit="%"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: colors.base.background.secondary,
                borderColor: colors.base.border.primary,
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: colors.base.text.primary }}
              labelFormatter={(value) => (fr ? `Terme : ${value} ans` : `Term: ${value} years`)}
              formatter={(value, name) => [`${(value as number).toFixed(2)}%`, name]}
            />

            <Area
              type="monotone"
              dataKey="longRate"
              stroke={longLineColor}
              strokeWidth={2}
              fill="url(#colorMargin)"
              name={t("yieldCurve.longRateName")}
              baseValue={fixedShortRate}
            />

            {/* Short Rate Line */}
            <Line
              type="monotone"
              dataKey="shortRate"
              stroke={shortLineColor}
              strokeWidth={2}
              dot={false}
              name={t("yieldCurve.shortRateName")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={controlsContainerStyle}>
        <div style={controlBoxStyle}>
          <label
            style={{
              ...labelStyle,
              color: colors[moduleTheme].text.primary,
            }}
          >
            {t("yieldCurve.shortRate")} : <strong>{fixedShortRate}%</strong>
          </label>
        </div>
        <div style={controlBoxStyle}>
          <label
            style={{
              ...labelStyle,
              color: colors[moduleTheme].border.secondary,
            }}
          >
            {t("yieldCurve.longRate")} : <strong>{longRate}%</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <input
              type="range"
              min="1"
              max="4"
              step="0.1"
              value={longRate}
              onChange={(e) => setLongRate(parseFloat(e.target.value))}
              style={{
                width: "100%",
                cursor: "pointer",
                accentColor: colors[moduleTheme].border.secondary,
              }}
            />
          </div>
        </div>
      </div>
      <span
        style={{
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          color: colors.semantic.info.text,
          marginBottom: "0.5rem",
          textAlign: "center",
          fontSize: "1rem",
          letterSpacing: "0.05rem",
          lineHeight: 1.625,
        }}
      >
        <u>{t("yieldCurve.evaluation")}</u> :{" "}
        {longRate > 1.5
          ? fr
            ? "Le moteur tourne ! La marge est suffisante pour couvrir les risques. La banque prête à l'économie réelle avec le sourire."
            : "The engine is running! The margin is sufficient to cover risks. The bank lends to the real economy with a smile."
          : fr
            ? "Alerte moteur ! La marge est trop faible pour couvrir les risques. La banque doit changer de stratégie d'urgence..."
            : "Engine alert! The margin is too thin to cover risks. The bank must urgently change strategy..."}
      </span>
    </div>
  );
};
