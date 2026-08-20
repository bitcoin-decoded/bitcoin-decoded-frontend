import { useMemo, useState } from "react";

import type { AboutValue } from "./useAbout";

// Owns the open/closed state of the About modal, shared by the header and footer
// entry points and the modal itself through AboutContext.
export const useAboutStore = (): AboutValue => {
  const [isOpen, setIsOpen] = useState(false);

  return useMemo(
    () => ({ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [isOpen],
  );
};
