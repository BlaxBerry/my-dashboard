import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SongData } from "../../types/api";
import { MOCK_SONG_DETAIL, MOCK_SONG_URL } from "../mocks";

export type ContextMusicValue = {
  songDetail: SongData;
  songUrl: string;
  isChanging: boolean; // 播放音乐的数据是否正在切换
  currentTime: number; // 音乐的播放进度
};

export const DEFAULT_CONTEXT_VALUE = {
  songDetail: MOCK_SONG_DETAIL,
  songUrl: MOCK_SONG_URL,
  isChanging: false, // 播放音乐的数据是否正在切换
  currentTime: 0, // 音乐的播放进度
};

export const ContextMusicPlayer = createContext<{
  value: ContextMusicValue;
  setValue?: Dispatch<SetStateAction<ContextMusicValue>>;
}>({
  value: DEFAULT_CONTEXT_VALUE,
  setValue: undefined,
});
