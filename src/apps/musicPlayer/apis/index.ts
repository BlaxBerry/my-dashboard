/**
 * 基于网易云音乐
 * * 本项目仅供个人学习研究使用，禁止用于商业或非法用途！！！！
 * @see https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
 */
import { handlePlaylistData, handleSongDate } from "../fixtures/functions";
import type {
  GetSearchListParams,
  GetSearchListResponse,
  GetSongDetailsResponse,
  GetSongLyricResponse,
  GetSongURLResponse,
} from "../types/api";

const BASE_DOMAIN = "http://duoduozuikeail.top:3000";

/**
 * 获取歌曲列表
 * @example
 * (async () => {
 *   // songs
 *   const { result: songs } = await getSearchSongs({
 *     keywords: "Hunt+or+Be+Hunted",
 *     type: 1,
 *     limit: 10,
 *     offset: 0
 *   })
 *   // playlists
 *   const { result: playlists } = await getSearchSongs({
 *     keywords: "witcher3",
 *     type: 1000,
 *     limit: 10,
 *     offset: 0
 *   })
 * })();
 */
const getSearchList = async ({
  keywords,
  limit,
  offset,
  type,
}: GetSearchListParams): Promise<{
  code?: number;
  error?: string;
  result?: GetSearchListResponse["result"];
}> => {
  const url = `${BASE_DOMAIN}/cloudsearch?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`;
  try {
    const res = await fetch(url);
    const dataResponse = (await res.json()) as GetSearchListResponse;
    const data = dataResponse?.result;

    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        result: undefined,
        error: "request failed",
      });
    }

    const result =
      type === 1
        ? {
            // songs
            songCount: data?.songCount,
            songs: data?.songs?.map((item) => handleSongDate(item)),
          }
        : type === 1000
          ? {
              // playlists
              playlistCount: data?.playlistCount,
              playlists: data?.playlists?.map((item) =>
                handlePlaylistData(item),
              ),
            }
          : undefined;

    return Promise.resolve({
      code: 200,
      error: undefined,
      result,
    });
  } catch (error) {
    return Promise.reject({
      code: undefined,
      result: undefined,
      error: (error as Error).message,
    });
  }
};

/**
 * 获取歌曲的详情信息
 * @example
 * (async () => {
 *   const { result } = await apis.getSongDetail(32063399);
 * })()
 */
export const getSongDetail = async (
  id: number,
): Promise<{
  code?: number;
  error?: string;
  result?: GetSongDetailsResponse["songs"][0];
}> => {
  const url = `${BASE_DOMAIN}/song/detail?ids=${id}`;
  try {
    const res = await fetch(url);
    const data = (await res.json()) as GetSongDetailsResponse;

    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        result: undefined,
        error: "request failed",
      });
    }
    return Promise.resolve({
      code: 200,
      error: undefined,
      result: handleSongDate(data?.songs[0]),
    });
  } catch (error) {
    return Promise.reject({
      code: undefined,
      result: undefined,
      error: (error as Error).message,
    });
  }
};

/**
 * 获取歌曲的地址
 * @example
 * (async () => {
 *   const { result } = await apis.getSongURL(32063399);
 *   console.log(result?.[0]?.url);
 * })()
 */
const getSongURL = async (
  id: number,
): Promise<{
  code?: number;
  error?: string;
  result?: GetSongURLResponse["data"];
}> => {
  const url = `${BASE_DOMAIN}/song/url?id=${id}`;
  try {
    const res = await fetch(url);
    const data = (await res.json()) as GetSongURLResponse;

    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        result: undefined,
        error: "request failed",
      });
    }

    if (!data?.data?.[0]?.url) {
      return Promise.reject({
        code: res.status,
        result: undefined,
        error: "music url source not found",
      });
    }

    return Promise.resolve({
      code: 200,
      error: undefined,
      result: [
        {
          id: data?.data?.[0]?.id,
          url: data?.data?.[0]?.url,
        },
      ],
    });
  } catch (error) {
    return Promise.reject({
      code: undefined,
      result: undefined,
      error: (error as Error).message,
    });
  }
};

/**
 * 获取歌曲的歌词
 * @param id
 * @returns
 */
const getSongLyric = async (
  id: number,
): Promise<{
  code?: number;
  error?: string;
  result?: GetSongLyricResponse["lrc"];
}> => {
  const url = `${BASE_DOMAIN}/lyric/url?id=${id}`;
  try {
    const res = await fetch(url);
    const data = (await res.json()) as GetSongLyricResponse;

    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        result: undefined,
        error: "request failed",
      });
    }
    return Promise.resolve({
      code: 200,
      error: undefined,
      result: {
        lyric: data?.lrc?.lyric,
      },
    });
  } catch (error) {
    return Promise.reject({
      code: undefined,
      result: undefined,
      error: (error as Error).message,
    });
  }
};

export const apis = {
  getSearchList,
  getSongDetail,
  getSongURL,
  getSongLyric,
};
