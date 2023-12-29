import type { SongData } from "@/apps/musicPlayer/types/api";
import type { AppSupportedLanguage } from "@/utils/constants";
import type {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
} from "@mui/material/styles";

export interface AppTheme {
  themeMode: MuiPaletteOptions["mode"];
  themeColorPalette: Record<
    keyof Pick<MuiPalette, "primary" | "secondary">,
    MuiSimplePaletteColorOptions
  >;
  themeLanguage: AppSupportedLanguage;
}

export type AppThemeMode = AppTheme["themeMode"];
export type AppThemeColorPalette = AppTheme["themeColorPalette"];
export type AppThemeLanguage = AppTheme["themeLanguage"];

export interface MusicPlayer {
  favouriteList: Array<SongData>;
}

export type MusicPlayerFavouriteList = MusicPlayer["favouriteList"];
