import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "@/libs/redux/hooks";
import { musicPlayerActions } from "@/libs/redux/slices";
import {
  PLAYER_CONTAINER_WIDTH,
  PLAYER_PICTURE_SIZE,
} from "../../fixtures/constants";
import { ContextMusicPlayer } from "../../fixtures/contexts";
import { MOCK_SONG_DETAIL } from "../../fixtures/mocks";
import type { SongData } from "../../types/api";
import PlayerControllers from "./PlayerControllers";

const Player: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favouriteList = useSelector((state) => state.musicPlayer.favouriteList);

  const checkBelongToFavouriteList = useCallback(
    (id?: number): boolean => {
      return id ? !!favouriteList?.find((item) => item.id === id) : false;
    },
    [favouriteList],
  );

  const handleClickLikeButton = useCallback(
    (songDetail?: SongData) => {
      if (!songDetail) return;
      const id = songDetail?.id;
      const isAlreadyExist = checkBelongToFavouriteList(id);

      if (!isAlreadyExist) {
        // add to favourite
        dispatch(musicPlayerActions.addToFavouriteList(songDetail));
      } else {
        // remove from favourite
        dispatch(musicPlayerActions.removeFromFavouriteList(id));
      }
    },
    [dispatch, checkBelongToFavouriteList],
  );

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
          {(value?.isChanging || value?.errorMessage) && (
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              variant="caption"
              fontWeight={700}
              sx={(theme) => ({
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                zIndex: 9999,
                borderRadius: 1,
                color: theme.palette.primary.main,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(60, 60, 60)"
                    : "rgba(240, 240, 240)",
                cursor: "wait",
              })}
            >
              {value?.isChanging
                ? t("apps.musicPlayer.status.loading")
                : value?.errorMessage}
            </Typography>
          )}

          <Box display="flex" alignItems="flex-start">
            {/* picture */}
            <Paper
              elevation={2}
              component="img"
              src={value?.songDetail?.al?.picUrl ?? ""}
              alt={value?.songDetail?.al?.name}
              draggable={false}
              loading="lazy"
              sx={{
                borderRadius: 2,
                minWidth: PLAYER_PICTURE_SIZE,
                minHeight: PLAYER_PICTURE_SIZE,
                width: PLAYER_PICTURE_SIZE,
                height: PLAYER_PICTURE_SIZE,
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
              <Box
                sx={{
                  visibility:
                    value?.songDetail?.id === MOCK_SONG_DETAIL?.id
                      ? "hidden"
                      : "visible",
                }}
              >
                <IconButton
                  size="small"
                  sx={{ boxShadow: 2 }}
                  onClick={() => handleClickLikeButton(value?.songDetail)}
                  color={
                    checkBelongToFavouriteList(value?.songDetail?.id)
                      ? "secondary"
                      : "default"
                  }
                >
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
