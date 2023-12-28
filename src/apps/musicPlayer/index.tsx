import Box from "@mui/material/Box";
import { useState } from "react";

import { FavoriteList, LyricList, Player, Search } from "./components";
import { ContextMusicPlayer, DEFAULT_CONTEXT_VALUE } from "./fixtures/contexts";

export default function AppMusicPlayer() {
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
        <Box display="flex" flexDirection="column" flexWrap="wrap">
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
        <FavoriteList
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
