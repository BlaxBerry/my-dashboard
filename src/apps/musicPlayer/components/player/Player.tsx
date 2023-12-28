import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, type FC } from "react";

import {
  PLAYER_CONTAINER_WIDTH,
  PLAYER_PICTURE_SIZE,
} from "../../fixtures/constants";
import { ContextMusicPlayer } from "../../fixtures/contexts";
import PlayerControllers from "./PlayerControllers";

const Player: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  return (
    <ContextMusicPlayer.Consumer>
      {({ value }) => (
        <Paper
          elevation={4}
          sx={{
            width: PLAYER_CONTAINER_WIDTH,
            position: "relative",
            p: 2,
            ...sx,
          }}
        >
          {(value?.isChanging || !value?.songUrl) && (
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                zIndex: 9999,
                borderRadius: 1,
                bgcolor: "background.paper",
                cursor: "wait",
              }}
              variant="caption"
              color="GrayText"
            >
              {value?.isChanging ? "Loading..." : "无法获取播放地址换首歌吧"}
            </Typography>
          )}

          <Box display="flex" alignItems="flex-start">
            {/* picture */}
            <Paper
              elevation={2}
              component="img"
              src={value?.songDetail?.al?.picUrl}
              alt={value?.songDetail?.al?.name}
              draggable={false}
              sx={{
                width: PLAYER_PICTURE_SIZE,
                height: PLAYER_PICTURE_SIZE,
                borderRadius: 2,
              }}
            />

            {/* info */}
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                width: PLAYER_CONTAINER_WIDTH - PLAYER_PICTURE_SIZE - 16, // necessary, or Typography's ellipsis wont work
                height: PLAYER_PICTURE_SIZE,
                px: 2,
              }}
            >
              {/* song's artists */}
              <Typography
                variant="caption"
                color="GrayText"
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}
              >
                {value?.songDetail?.ar?.map((a) => a.name).join("、")}
              </Typography>
              {/* song's name */}
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {value?.songDetail?.name}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              {/* add to favorite list */}
              <Box>
                <IconButton size="small" color="secondary">
                  <FavoriteIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* controllers */}
          <PlayerControllers />
        </Paper>
      )}
    </ContextMusicPlayer.Consumer>
  );
};

const PlayerMemo = memo(Player);
export default PlayerMemo;
