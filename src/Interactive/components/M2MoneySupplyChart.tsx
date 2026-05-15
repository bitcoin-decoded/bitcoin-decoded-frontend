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

import { Caption, useBreakpoint, usePageTheme, withOpacity } from "../../Design";
import { useLanguageContext } from "../../I18n";
import { M2_MONEY_SUPPLY } from "../data";

type Props = {
  showTitle?: boolean;
};

export const M2MoneySupplyChart: FC<Props> = ({ showTitle = true }) => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const world = colors[moduleTheme];

  const containerStyle: CSSProperties = {
    width: "100%",
    marginTop: "1.5rem",
    marginBottom: "1rem",
  };

  const chartWrapperStyle: CSSProperties = {
    padding: isMobile ? "0.75rem 0.25rem" : "1rem 0.5rem",
    borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    border: `1px solid ${withOpacity(world.border.primary, 0.3)}`,
  };

  const sourceStyle: CSSProperties = {
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

  return (
    <div style={containerStyle}>
      <div
        className="gradient-border"
        style={
          { ...chartWrapperStyle, "--border-glow-color": world.border.primary } as CSSProperties
        }
      >
        {showTitle && (
          <Caption
            tone="world"
            style={{ display: "block", textAlign: "center", marginBottom: "0.75rem" }}
          >
            {fr
              ? "Masse monétaire M2 - États-Unis (1960–2024)"
              : "M2 Money Supply - United States (1960–2024)"}
          </Caption>
        )}
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <AreaChart
            data={M2_MONEY_SUPPLY}
            margin={{ top: 5, right: 10, left: isMobile ? -15 : 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="m2Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accentColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={accentColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="year"
              type="number"
              domain={[1960, 2024]}
              tick={{ fontSize: isMobile ? 10 : 12, fill: axisColor }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              tickFormatter={(v: number) => `${v}`}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12, fill: axisColor }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              tickFormatter={(v: number) => `${v}T`}
            />
            <Tooltip
              contentStyle={{
                background: colors.base.background.primary,
                border: `1px solid ${world.border.primary}`,
                borderRadius: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
              }}
              formatter={(value: number) => [`${value.toFixed(2)}T $`, "M2"]}
              labelFormatter={(label: number) => `${label}`}
            />
            <ReferenceLine
              x={2008}
              stroke={withOpacity(colors.base.text.secondary, 0.4)}
              strokeDasharray="4 4"
              label={{
                value: "2008",
                position: "top",
                fontSize: isMobile ? 9 : 11,
                fill: axisColor,
              }}
            />
            <ReferenceLine
              x={2020}
              stroke={withOpacity(colors.base.text.secondary, 0.4)}
              strokeDasharray="4 4"
              label={{
                value: "Covid",
                position: "top",
                fontSize: isMobile ? 9 : 11,
                fill: axisColor,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={accentColor}
              strokeWidth={2}
              fill="url(#m2Gradient)"
              dot={false}
              activeDot={{ r: 4, fill: accentColor, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div style={sourceStyle}>
          Source : Federal Reserve (FRED) - fred.stlouisfed.org/series/M2SL
        </div>
      </div>
    </div>
  );
};
