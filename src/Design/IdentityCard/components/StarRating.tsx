import type { FC } from "react";

type Props = {
  score: number;
};

export const StarRating: FC<Props> = ({ score }: { score: number }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25rem",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{ color: i < score ? "#FFD700" : "#E0E0E0", fontSize: "1rem" }}
        >
          {i < score ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};
