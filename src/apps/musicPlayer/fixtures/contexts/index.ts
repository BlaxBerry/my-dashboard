import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SongData } from "../../types/api";
import { MOCK_SONG_DETAIL, MOCK_SONG_URL } from "../mocks";

export type ContextMusicValue = {
  songDetail?: SongData;
  songUrl?: string;
  isChanging: boolean; // 播放音乐的数据是否正在切换
  errorMessage: string; // 音乐无法播放、网络请求失败等错误信息
};

export const DEFAULT_CONTEXT_VALUE: ContextMusicValue = {
  songDetail: MOCK_SONG_DETAIL,
  songUrl: MOCK_SONG_URL,
  isChanging: false, // 播放音乐的数据是否正在切换
  errorMessage: "", // 音乐无法播放、网络请求失败等错误信息
};

/** 存储播放音乐的基本信息 */
export const ContextMusicPlayer = createContext<{
  value: ContextMusicValue;
  setValue?: Dispatch<SetStateAction<ContextMusicValue>>;
}>({
  value: DEFAULT_CONTEXT_VALUE,
  setValue: undefined,
});

/** 存储播放音乐的播放进度，为避免不必要的重复渲染，应该仅包裹 Player、LyricList */
export const ContextMusicPlayerDuration = createContext<{
  currentTime: number;
  setCurrentTime?: Dispatch<SetStateAction<number>>;
}>({
  currentTime: 0,
  setCurrentTime: undefined,
});
