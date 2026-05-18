import { type CSSProperties, type FC } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Caption, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BITCOIN_REFS } from "../../../References";

export const HalvingChart: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const containerStyle: CSSProperties = {
    width: "100%",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
  };

  const chartWrapperStyle: CSSProperties = {
    padding: isMobile ? "0.75rem 0.25rem" : "1rem 0.5rem",
    borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    border: `1px solid ${withOpacity(world.border.primary, 0.3)}`,
  };

  const captionStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.6rem",
    color: colors.base.text.secondary,
    textAlign: "center",
    marginTop: "0.5rem",
    opacity: 0.7,
  };

  const accentColor = world.border.secondary;
  const gridColor = withOpacity(colors.base.text.secondary, 0.1);
  const axisColor = colors.base.text.secondary;
  const todayYear = new Date().getFullYear();

  // Format BTC: strip trailing zeros for axis/tooltips
  const fmtBTC = (v: number): string => {
    if (v >= 1) return `${v}`;
    return v.toFixed(8).replace(/\.?0+$/, "");
  };

  return (
    <div style={containerStyle}>
      <div
        className="gradient-border"
        style={
          { ...chartWrapperStyle, "--border-glow-color": world.border.primary } as CSSProperties
        }
      >
        <Caption
          tone="world"
          style={{ display: "block", textAlign: "center", marginBottom: "0.75rem" }}
        >
          {t("halvingChart.title")}
        </Caption>
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 280}>
          <AreaChart
            data={BITCOIN_REFS.HALVING_SCHEDULE as unknown as { year: number; reward: number }[]}
            margin={{ top: 10, right: 15, left: isMobile ? -15 : 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="halvingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accentColor} stopOpacity={0.35} />
                <stop offset="95%" stopColor={accentColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="year"
              type="number"
              domain={[2009, 2040]}
              ticks={[2009, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040]}
              tick={{ fontSize: isMobile ? 10 : 12, fill: axisColor }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              tickFormatter={(v: number) => `${v}`}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12, fill: axisColor }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              tickFormatter={(v: number) => fmtBTC(v)}
            />
            <Tooltip
              contentStyle={{
                background: colors.base.background.primary,
                border: `1px solid ${world.border.primary}`,
                borderRadius: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
              }}
              formatter={(value: number) => [
                `${fmtBTC(value)} BTC`,
                t("halvingChart.tooltipLabel"),
              ]}
              labelFormatter={(label: number) => `${t("halvingChart.tooltipYear")} ${label}`}
            />
            <ReferenceLine
              x={todayYear}
              stroke={withOpacity(colors.base.text.secondary, 0.4)}
              strokeDasharray="4 4"
              label={{
                value: t("halvingChart.today"),
                position: "top",
                fontSize: isMobile ? 9 : 11,
                fill: axisColor,
              }}
            />
            <Area
              type="stepAfter"
              dataKey="reward"
              stroke={accentColor}
              strokeWidth={2}
              fill="url(#halvingGradient)"
              dot={{ r: 3, fill: accentColor, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: accentColor, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div style={captionStyle}>{t("halvingChart.caption")}</div>
      </div>
    </div>
  );
};
