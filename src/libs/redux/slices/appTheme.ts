import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  AppTheme,
  AppThemeColorPalette,
  AppThemeLanguage,
  AppThemeMode,
} from "@/types";
import {
  APP_SUPPORTED_LANGUAGE_DEFAULT,
  APP_THEME_COLOR_PALETTE_DEFAULT,
  APP_THEME_MODE_DEFAULT,
} from "@/utils/constants";

const initialState: AppTheme = {
  themeMode: APP_THEME_MODE_DEFAULT,
  themeColorPalette: APP_THEME_COLOR_PALETTE_DEFAULT,
  themeLanguage: APP_SUPPORTED_LANGUAGE_DEFAULT,
};

const appThemeSlice = createSlice({
  name: "appTheme",
  initialState,

  reducers: {
    /** 更新主题模式 */
    updateThemeMode: (state, action: PayloadAction<AppThemeMode>) => {
      state.themeMode = action.payload;
    },

    /** 更新主题色调 */
    updateThemeColorPalette: (
      state,
      action: PayloadAction<AppThemeColorPalette>,
    ) => {
      state.themeColorPalette = action.payload;
    },

    /** 更新主题语言 */
    updateThemeLanguage: (state, action: PayloadAction<AppThemeLanguage>) => {
      state.themeLanguage = action.payload;
    },

    // updateState: (_, action: PayloadAction<State>) => {
    //   return action.payload;
    // },
  },
});

export default appThemeSlice.reducer;
export const actions = appThemeSlice.actions;
