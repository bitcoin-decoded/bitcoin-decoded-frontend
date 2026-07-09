import { useBreakpoint } from "../../Responsive";
import { getTypography } from "../data";

export const useTypography = () => getTypography(useBreakpoint());
