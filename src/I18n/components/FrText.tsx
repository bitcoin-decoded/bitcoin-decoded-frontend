import { type FC, type ReactNode } from "react";

import { transformFrText } from "../helpers";
import { useLanguageContext } from "../hooks";

type Props = { children: ReactNode };

export const FrText: FC<Props> = ({ children }) => {
  const { language } = useLanguageContext();
  if (language !== "fr") return <>{children}</>;
  return <>{transformFrText(children)}</>;
};
