import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { MOCK_FAVORITE_LIST as DEFAULT_MUSIC_PLAYER_FAVORITE_LIST } from "@/apps/musicPlayer/fixtures/mocks";
import type { MusicPlayer, MusicPlayerFavouriteList } from "@/types";

const initialState: MusicPlayer = {
  favouriteList: DEFAULT_MUSIC_PLAYER_FAVORITE_LIST,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,

  reducers: {
    /** 向喜爱列表追加 */
    addToFavouriteList: (
      state,
      action: PayloadAction<MusicPlayerFavouriteList[number]>,
    ) => {
      const isAlreadyExist = state.favouriteList?.find(
        (item) => item.id === action.payload.id,
      );
      if (!isAlreadyExist) {
        state.favouriteList.push(action.payload);
      }
    },

    /** 从喜爱列表删除 */
    removeFromFavouriteList: (
      state,
      action: PayloadAction<MusicPlayerFavouriteList[number]["id"]>,
    ) => {
      const newList = state.favouriteList?.filter(
        (item) => item.id !== action.payload,
      );
      state.favouriteList = newList;
    },

    // updateState: (_, action: PayloadAction<State>) => {
    //   return action.payload;
    // },
  },
});

export default musicPlayerSlice.reducer;
export const actions = musicPlayerSlice.actions;
