import {
  deepPurple,
  indigo,
  lightBlue,
  pink,
  purple,
  teal,
} from "@mui/material/colors";
import type { Breakpoint as MuiBreakpoint } from "@mui/material/styles";

import type { AppThemeColorPalette, AppThemeMode } from "@/types";
import { isSystemDarkMode } from "../tools";

export type AppThemeColorPaletteName =
  (typeof APP_THEME_COLOR_PALETTES_PRESET_NAMES)[number];

// 布局尺寸
// ------------------------------------------------------------------------------
export const APP_CONTAINER_MAX_WIDTH: MuiBreakpoint = "xl";
export const APP_CONTAINER_MIN_WIDTH = 375; // iPhoneSE
export const APP_TOP_BAR_HEIGHT = 60; // px
export const APP_TOP_BAR_LOGO_SIZE = 40; // px
export const APP_NAV_DRAWER_WIDTH = 250; //px

// 主题模式
// ------------------------------------------------------------------------------
/** 可选的主题模式 */
export const APP_THEME_MODES: Array<AppThemeMode> = ["light", "dark"];
/** 默认的主题模式 */
export const APP_THEME_MODE_DEFAULT: AppThemeMode = isSystemDarkMode()
  ? "dark"
  : "light";

// 自定义主题色调
// ------------------------------------------------------------------------------
/** 可选的自定义主题色调名称 */
export const APP_THEME_COLOR_PALETTES_PRESET_NAMES = [
  "TEAL", // 鸭羽青色
  "INDIGO", // 靛青色
  "VIOLET", // 紫罗兰色
  "CRIMSON", // 绯红色
] as const;
/** 可选的自定义主题色调 */
export const APP_THEME_COLORS_PRESET: Record<
  AppThemeColorPaletteName,
  AppThemeColorPalette
> = {
  // 鸭羽青色
  TEAL: {
    primary: {
      main: teal[400],
      light: teal[600],
      dark: teal[600],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: teal["A400"],
      light: teal["A700"],
      dark: teal["A700"],
      contrastText: "#FFFFFF",
    },
  },
  // 靛青色
  INDIGO: {
    primary: {
      main: indigo[500],
      light: indigo[700],
      dark: indigo[700],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: lightBlue[400],
      light: lightBlue[600],
      dark: lightBlue[600],
      contrastText: "#FFFFFF",
    },
  },
  // 紫罗兰色
  VIOLET: {
    primary: {
      main: deepPurple[400],
      light: deepPurple[600],
      dark: deepPurple[600],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: purple["A700"],
      light: purple[600],
      dark: purple[600],
      contrastText: "#FFFFFF",
    },
  },
  // 绯红色
  CRIMSON: {
    primary: {
      main: "#E32636", // Alizarin Crimson
      light: "#E51A4C", // Spanish Crimson
      dark: "#BE0032", // Crimson Glory
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: pink[400],
      light: pink[500],
      dark: pink[500],
      contrastText: "#FFFFFF",
    },
  },
};
/** 默认自定义主题色调 ( 利用空对象使用 MUI 的默认主题色调 ) */
export const APP_THEME_COLOR_PALETTE_DEFAULT: AppThemeColorPalette =
  APP_THEME_COLORS_PRESET.TEAL;
