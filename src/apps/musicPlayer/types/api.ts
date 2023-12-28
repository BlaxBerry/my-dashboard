export type SongData = {
  id: number;
  name: string;
  // album
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  // artist
  ar: Array<{
    id: number;
    name: string;
  }>;
  // duration
  dt: number;
};

export type PlaylistData = {
  id: number;
  name: string;
  coverImgUrl: string;
  trackCount: number;
  playCount: number;
};

// GetSearchList
// ------------------------------------------------------------------------------
export type GetSearchListParams = {
  keywords: string;
  limit: number;
  offset: number;
  type:
    | 1 // songs
    | 1000; // playlists
};
export type GetSearchListResponse = {
  code: number;
  result: Partial<
    {
      // type === 1
      songCount: number;
      songs: Array<SongData>;
    } & {
      // type === 1000
      playlistCount: number;
      playlists: Array<PlaylistData>;
    }
  >;
};

// GetSongDetails
// ------------------------------------------------------------------------------
export type GetSongDetailsResponse = {
  code: number;
  songs: [SongData];
};

// GetSongURL
// ------------------------------------------------------------------------------
export type GetSongURLResponse = {
  code: number;
  data: [{ id: number; url: string }];
};

// GetSongLyric
// ------------------------------------------------------------------------------
export type GetSongLyricResponse = {
  code: number;
  lrc: { lyric: string };
};
