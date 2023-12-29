import Box from "@mui/material/Box";
import { memo, useState } from "react";

import { Favourite, LyricList, Player, Search } from "./components";
import {
  ContextMusicPlayer,
  ContextMusicPlayerDuration,
  DEFAULT_CONTEXT_VALUE,
} from "./fixtures/contexts";

export default function MusicPlayerContainer() {
  const [value, setValue] = useState(DEFAULT_CONTEXT_VALUE);

  return (
    <ContextMusicPlayer.Provider value={{ value, setValue }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: {
            xs: "center",
            sm: "flex-start",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {/* player & lyric list */}
        <Box display="flex" flexDirection="column" flexWrap="wrap">
          <MusicPlayerAndLyricListContainer />
        </Box>

        {/* search list */}
        <Search
          sx={{
            mr: {
              xs: 0,
              md: 1,
            },
            ml: {
              sm: 1,
            },
          }}
        />

        {/* favorite list */}
        <Favourite
          sx={{
            display: {
              xs: "none",
              xl: "block",
            },
          }}
        />
      </Box>
    </ContextMusicPlayer.Provider>
  );
}

const MusicPlayerAndLyricListContainer = memo(function PlayerAndLyricList() {
  const [currentTime, setCurrentTime] = useState<number>(0);

  return (
    <ContextMusicPlayerDuration.Provider
      value={{ currentTime, setCurrentTime }}
    >
      {/* player */}
      <Player sx={{ mb: 1 }} />

      {/* lyric list */}
      <LyricList
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      />
    </ContextMusicPlayerDuration.Provider>
  );
});
