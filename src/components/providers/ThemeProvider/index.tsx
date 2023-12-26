import {
  ThemeProvider as MuiThemeProvider,
  type Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, useMemo, type FC, type PropsWithChildren } from "react";

import { useSelector } from "@/libs/redux/hooks";
import { getCustomTheme } from "@/utils/helpers";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { themeMode, themeColorPalette } = useSelector(
    (state) => state.appTheme,
  );

  const customTheme = useMemo<MuiTheme>(() => {
    return getCustomTheme({ themeMode, themeColorPalette });
  }, [themeMode, themeColorPalette]);

  return <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>;
};

const ThemeProviderMemo = memo(ThemeProvider);
export default ThemeProviderMemo;
