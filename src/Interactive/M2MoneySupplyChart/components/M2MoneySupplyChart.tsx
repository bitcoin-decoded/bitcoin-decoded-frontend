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

import { BRAND, Caption, getTypography, useBreakpoint, useRechartsTheme } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { M2_MONEY_SUPPLY } from "../data";

type Props = {
  showTitle?: boolean;
};

export const M2MoneySupplyChart: FC<Props> = ({ showTitle = true }) => {
  const typo = getTypography();
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const chart = useRechartsTheme();

  const containerStyle: CSSProperties = {
    width: "100%",
    marginTop: "1.5rem",
    marginBottom: "1rem",
  };

  const chartWrapperStyle: CSSProperties = {
    padding: isMobile ? "0.75rem 0.25rem" : "1rem 0.5rem",
  };

  const sourceStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    color: chart.axisTickColor,
    textAlign: "center",
    marginTop: "0.5rem",
    opacity: 0.7,
  };

  const accentColor = chart.primary;

  return (
    <div style={containerStyle}>
      <div style={chartWrapperStyle}>
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
            <CartesianGrid strokeDasharray={chart.gridStrokeDasharray} stroke={chart.gridColor} />
            <XAxis
              dataKey="year"
              type="number"
              domain={[1960, 2024]}
              tick={chart.tickProp}
              tickLine={false}
              axisLine={{ stroke: chart.axisLineColor }}
              tickFormatter={(v: number) => `${v}`}
            />
            <YAxis
              tick={chart.tickProp}
              tickLine={false}
              axisLine={{ stroke: chart.axisLineColor }}
              tickFormatter={(v: number) => `${v}T`}
            />
            <Tooltip
              contentStyle={chart.tooltipContentStyle}
              labelStyle={chart.tooltipLabelStyle}
              itemStyle={chart.tooltipItemStyle}
              formatter={(value: number) => [`${value.toFixed(2)}T $`, "M2"]}
              labelFormatter={(label: number) => `${label}`}
            />
            <ReferenceLine
              x={2008}
              stroke={chart.accent}
              strokeDasharray="2 4"
              label={{
                value: "2008",
                position: "top",
                fontSize: 12,
                fill: chart.axisTickColor,
                fontFamily: chart.tickProp.fontFamily,
              }}
            />
            <ReferenceLine
              x={2020}
              stroke={chart.accent}
              strokeDasharray="2 4"
              label={{
                value: "Covid",
                position: "top",
                fontSize: 12,
                fill: chart.axisTickColor,
                fontFamily: chart.tickProp.fontFamily,
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
          Source : Federal Reserve (FRED) - fred.stlouisfed.org/series/M2SL
        </div>
      </div>
    </div>
  );
};
