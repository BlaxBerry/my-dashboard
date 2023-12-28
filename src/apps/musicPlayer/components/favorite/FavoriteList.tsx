import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, useCallback, useContext, type FC } from "react";

import { apis } from "../../apis";
import {
  FAVORITE_LIST_CONTAINER_HEIGHT,
  FAVORITE_LIST_CONTAINER_WIDTH_LARGE,
  FAVORITE_LIST_CONTAINER_WIDTH_SMALL,
} from "../../fixtures/constants";
import { ContextMusicPlayer } from "../../fixtures/contexts";
import { MOCK_FAVORITE_LIST } from "../../fixtures/mocks";
import type { SongData } from "../../types/api";

const FavoriteList: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { value, setValue } = useContext(ContextMusicPlayer);

  const handleClick = useCallback(
    async (item: SongData) => {
      if (item.id === value?.songDetail?.id) return;

      setValue?.((s) => ({
        ...s,
        isChanging: true,
      }));

      apis
        .getSongURL(item.id)
        .then((res) => {
          const url = res.result?.[0]?.url;
          if (res.code !== 200) {
            // TODO: redux state global message
            // eslint-disable-next-line no-console
            console.log(res.error);
          } else {
            setValue?.((s) => ({
              ...s,
              songUrl: url as string,
              songDetail: item as SongData,
            }));
          }
        })
        .catch((err) => {
          // TODO: redux state global message
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          setValue?.((s) => ({
            ...s,
            isChanging: false,
          }));
        });
    },
    [value?.songDetail?.id, setValue],
  );

  return (
    <Paper
      elevation={4}
      sx={{
        height: FAVORITE_LIST_CONTAINER_HEIGHT,
        width: {
          xs: FAVORITE_LIST_CONTAINER_WIDTH_LARGE,
          sm: FAVORITE_LIST_CONTAINER_WIDTH_SMALL,
          md: FAVORITE_LIST_CONTAINER_WIDTH_LARGE,
        },
        p: 2,
        ...sx,
      }}
    >
      <Typography
        variant="caption"
        color="GrayText"
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          height: 40,
          mb: 1,
        }}
      >
        <FavoriteIcon color="primary" sx={{ mr: 1 }} />
        Favorite
        <Typography
          variant="caption"
          color="primary"
          fontWeight={700}
          sx={{ mx: 0.5 }}
        >
          {MOCK_FAVORITE_LIST.length}
        </Typography>
        Songs
      </Typography>

      <List
        sx={{
          width: "100%",
          height: FAVORITE_LIST_CONTAINER_HEIGHT - 70,
          overflowY: "scroll",
          py: 0,
          px: 0.5,
        }}
      >
        {MOCK_FAVORITE_LIST?.map((item) => {
          const isActive = item.id === value?.songDetail?.id;
          return (
            <ListItem key={item.id} dense sx={{ px: 0 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => handleClick(item)}
                sx={(theme) => ({
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[2],
                })}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt={item?.al?.name}
                    src={item?.al?.picUrl}
                    sx={{ borderRadius: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item?.name}
                    </Typography>
                  }
                  secondary={
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
                      {item?.ar?.map((a) => a.name).join("、")}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

const FavoriteListMemo = memo(FavoriteList);
export default FavoriteListMemo;
