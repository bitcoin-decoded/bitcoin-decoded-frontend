import type { Language } from "../../../I18n";
import { getAristoteMoneyCharacs } from "../data";

export const displayAristoteMoneyCharacs = (language: Language) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
        gap: "0.5rem",
      }}
    >
      {getAristoteMoneyCharacs(language).map((item, index) => (
        <div
          key={index}
          style={{
            padding: "1.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <>{item.icon}</>
          <div
            style={{
              textTransform: "uppercase",
              fontSize: "1rem",
              letterSpacing: "0.05em",
              fontWeight: 700,
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.4",
              fontStyle: "italic",
            }}
          >
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};
