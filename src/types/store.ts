import type { AppSupportedLanguage } from "@/utils/constants";
import type {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
} from "@mui/material/styles";

export type AppTheme = {
  themeMode: MuiPaletteOptions["mode"];
  themeColorPalette: Record<
    keyof Pick<MuiPalette, "primary" | "secondary">,
    MuiSimplePaletteColorOptions
  >;
  themeLanguage: AppSupportedLanguage;
};

export type AppThemeMode = AppTheme["themeMode"];
export type AppThemeColorPalette = AppTheme["themeColorPalette"];
export type AppThemeLanguage = AppTheme["themeLanguage"];
