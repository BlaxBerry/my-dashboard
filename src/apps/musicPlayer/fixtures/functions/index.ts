import type { PlaylistData, SongData } from "../../types/api";

export function handleSongDate(songData: SongData) {
  return {
    id: songData?.id,
    name: songData?.name,
    al: {
      id: songData?.al?.id,
      name: songData?.al?.name,
      picUrl: songData?.al?.picUrl,
    },
    ar: songData?.ar?.map((a) => ({ id: a.id, name: a.name })),
    dt: songData?.dt,
  };
}

export function handlePlaylistData(playlistData: PlaylistData) {
  return {
    id: playlistData?.id,
    name: playlistData?.name,
    coverImgUrl: playlistData?.coverImgUrl,
    trackCount: playlistData?.trackCount,
    playCount: playlistData?.playCount,
  };
}

export function formatCurrentDuration(value: number): { m: number; s: number } {
  const minute = Math.floor(value / 60);
  const second = Math.floor(value - minute * 60);
  return { m: minute, s: second };
}

export function formatDurationToString({ m, s }: { m: number; s: number }) {
  const min = m.toString().padStart(2, "0");
  const sec = s.toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// "[01:03.00]xxxx" → { lyricStartTime: 63, lyricText: "xxxx" }
export function formatLyricDuration(lyricWithDuration: string): {
  lyricStartTime: number;
  lyricText: string;
} {
  const formatItem = lyricWithDuration?.slice(1);
  const [lyricTimeStr, lyricText] = formatItem
    ? formatItem.split("]")
    : ["00:00", ""];

  const [m, s] = lyricTimeStr.split(":");
  const min = parseInt(m);
  const sec = Math.floor(parseInt(s));

  return {
    lyricStartTime: min * 60 + sec,
    lyricText,
  };
}
