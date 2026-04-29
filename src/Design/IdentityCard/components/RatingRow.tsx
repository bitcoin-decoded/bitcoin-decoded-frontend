import type { FC, ReactNode } from "react";
import { StarRating } from "./";

type Props = {
  icon: ReactNode;
  label: string;
  score: number;
};
export const RatingRow: FC<Props> = ({ icon, label, score }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ display: "flex", alignItems: "center" }}>{icon}</div>
      <span
        style={{
          fontSize: "0.9rem",
          letterSpacing: "0.1rem",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
    <StarRating score={score} />
  </div>
);
