import { useTheme, useMediaQuery } from "@mui/material";

const useIsMobile = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // mobile
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // tablet
  const isMobile = isXs || isSm; // optional combined flag

  return { isXs, isSm, isMobile }; // return all separately
};

export default useIsMobile;