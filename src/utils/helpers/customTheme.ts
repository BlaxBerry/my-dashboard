import { createTheme, type Theme as MuiTheme } from "@mui/material/styles";

import type { AppTheme, AppThemeColorPalette } from "@/types";
import {
  APP_THEME_COLORS_PRESET,
  type AppThemeColorPaletteName,
} from "@/utils/constants";

/**
 * 获取自定义 MUI 主题，用于覆盖`ThemeProvider.theme`
 * @param themeMode 明亮/黑暗主题模式
 * @param themeColor 自定义主题色
 * @returns MUI Theme 对象
 */
export const getCustomTheme = ({
  themeMode,
  themeColorPalette,
}: Pick<AppTheme, "themeMode" | "themeColorPalette">): MuiTheme => {
  return createTheme({
    palette: {
      // 明亮/黑暗主题模式
      mode: themeMode,
      // 自定义主题色调
      ...themeColorPalette,
      // 其他设计的设置
      // ...
    },
  });
};

/**
 * 获取自定义 MUI 主题的主题色调，用于覆盖`ThemeProvider.theme.palette`
 * @param themeColor 自定义主题色调
 */
export const getCustomThemeColorPalette = (
  colorPaletteName: AppThemeColorPaletteName,
): AppThemeColorPalette => {
  return APP_THEME_COLORS_PRESET[colorPaletteName];
};
