import { createContext, useContext } from "react";

export type AboutValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const AboutContext = createContext<AboutValue | null>(null);

export const useAbout = (): AboutValue => {
  const value = useContext(AboutContext);
  if (!value) throw new Error("useAbout must be used within an AboutProvider");
  return value;
};
