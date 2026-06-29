import { useBreakpoint } from "../../Responsive";
import { getTypography } from "../data";

/** Breakpoint-resolved typography roles. See getTypography for the role list. */
export const useTypography = () => getTypography(useBreakpoint());
