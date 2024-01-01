import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, useCallback, useContext, type FC } from "react";

import { useDispatch } from "@/libs/redux/hooks";
import { musicPlayerActions } from "@/libs/redux/slices";
import { apis } from "../../apis";
import { FAVORITE_LIST_CONTAINER_HEIGHT } from "../../fixtures/constants";
import {
  ContextMusicPlayer,
  ContextMusicPlayerDuration,
} from "../../fixtures/contexts";
import type { SongData } from "../../types/api";

const FavoriteList: FC<{ sx?: MuiSxProps<MuiTheme>; list: SongData[] }> = ({
  sx,
  list,
}) => {
  const dispatch = useDispatch();
  const { value, setValue } = useContext(ContextMusicPlayer);
  const { setCurrentTime } = useContext(ContextMusicPlayerDuration);

  const clickToPlay = useCallback(
    async (item: SongData) => {
      if (item.id === value?.songDetail?.id) return;

      setCurrentTime?.(0);
      setValue?.((s) => ({
        ...s,
        songDetail: undefined,
        songUrl: undefined,
        isChanging: true,
        errorMessage: "",
      }));

      apis
        .getSongURL(item.id)
        .then((res) => {
          const url = res.result?.[0]?.url;
          if (res.code !== 200) {
            setValue?.((s) => ({
              ...s,
              errorMessage: res?.error || "Something Wrong",
            }));
          } else {
            setValue?.((s) => ({
              ...s,
              songUrl: url as string,
              songDetail: item as SongData,
              isChanging: false,
              errorMessage: "",
            }));
          }
        })
        .catch((err) => {
          setValue?.((s) => ({
            ...s,
            songDetail: undefined,
            songUrl: undefined,
            isChanging: false,
            errorMessage: err?.error || "Something Wrong",
          }));
        });
    },
    [value?.songDetail?.id, setValue, setCurrentTime],
  );

  const removeFromFavouriteList = useCallback(
    (id: number) => {
      dispatch(musicPlayerActions.removeFromFavouriteList(id));
    },
    [dispatch],
  );

  return (
    <List
      sx={{
        width: "100%",
        height: FAVORITE_LIST_CONTAINER_HEIGHT - 65,
        overflowY: "scroll",
        py: 0,
        px: 0.5,
        ...sx,
      }}
    >
      {list?.map((item) => {
        const isActive = item.id === value?.songDetail?.id;
        return (
          <ListItem key={item.id} dense sx={{ px: 0 }}>
            <ListItemButton
              selected={isActive}
              onClick={() => clickToPlay(item)}
              sx={(theme) => ({
                py: 0.25,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 2,
                color: isActive ? theme.palette.primary.main : "inherit",
                transition: "all 0.5s",
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

              <IconButton
                size="small"
                sx={{ boxShadow: 2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavouriteList(item.id);
                }}
              >
                <DeleteIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

const FavoriteListMemo = memo(FavoriteList);
export default FavoriteListMemo;
