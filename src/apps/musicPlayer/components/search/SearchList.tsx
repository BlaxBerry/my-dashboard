import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import {
  Fragment,
  memo,
  useCallback,
  useContext,
  useMemo,
  type FC,
} from "react";
import { useTranslation } from "react-i18next";

import { apis } from "../../apis";
import {
  SEARCH_LIST_CONTAINER_HEIGHT_LARGE,
  SEARCH_LIST_CONTAINER_HEIGHT_SMALL,
} from "../../fixtures/constants";
import {
  ContextMusicPlayer,
  ContextMusicPlayerDuration,
} from "../../fixtures/contexts";
import {
  formatCurrentDuration,
  formatDurationToString,
} from "../../fixtures/functions";
import type { SongData } from "../../types/api";

const SearchList: FC<{ searchKeyword: string }> = ({ searchKeyword }) => {
  const { t } = useTranslation();
  const { value, setValue } = useContext(ContextMusicPlayer);
  const { setCurrentTime } = useContext(ContextMusicPlayerDuration);

  const { data, isLoading, isError } = useQuery({
    queryKey: [searchKeyword],
    queryFn: async () => {
      const result = await apis.getSearchList({
        keywords: searchKeyword,
        type: 1,
        limit: 20,
        offset: 0,
      });
      return result;
    },
  });

  const songListData = useMemo<Array<SongData>>(
    () => data?.result?.songs || [],
    [data?.result?.songs],
  );

  const handleClick = useCallback(
    async (id: number) => {
      if (id === value?.songDetail?.id) return;

      setCurrentTime?.(0);
      setValue?.((s) => ({
        ...s,
        songDetail: undefined,
        songUrl: undefined,
        isChanging: true,
        errorMessage: "",
      }));

      Promise.all([apis.getSongURL(id), apis.getSongDetail(id)])
        .then(([urlResult, detailResult]) => {
          const url = urlResult?.result?.[0]?.url;
          const detail = detailResult?.result;
          if (urlResult?.code !== 200 && detailResult?.code !== 200) {
            setValue?.((s) => ({
              ...s,
              errorMessage: `${urlResult.error} ${detailResult.error}`,
            }));
          } else {
            setValue?.((s) => ({
              ...s,
              songUrl: url as string,
              songDetail: detail as SongData,
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

  if (isLoading) {
    return (
      <Typography
        display="flex"
        justifyContent="center"
        alignItems="center"
        variant="caption"
        fontWeight={700}
        sx={(theme) => ({
          height: "100%",
          width: "100%",
          color: theme.palette.primary.main,
        })}
      >
        {t("apps.musicPlayer.status.loading")}
      </Typography>
    );
  }

  if (!isLoading && !isError && !songListData?.length) {
    return (
      <Typography
        display="flex"
        justifyContent="center"
        alignItems="center"
        variant="caption"
        fontWeight={700}
        sx={(theme) => ({
          height: "100%",
          width: "100%",
          color: theme.palette.primary.main,
        })}
      >
        {t("apps.musicPlayer.status.notFound")}
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography
        display="flex"
        justifyContent="center"
        alignItems="center"
        variant="caption"
        fontWeight={700}
        sx={(theme) => ({
          height: "100%",
          width: "100%",
          color: theme.palette.primary.main,
        })}
      >
        {t("apps.musicPlayer.status.apiConnectError")}
      </Typography>
    );
  }

  return (
    <List
      sx={{
        width: "100%",
        height: {
          xs: SEARCH_LIST_CONTAINER_HEIGHT_SMALL - 81,
          sm: SEARCH_LIST_CONTAINER_HEIGHT_LARGE - 81,
        },
        overflowY: "scroll",
        py: 0,
        px: 0.5,
        mt: 1,
      }}
    >
      {songListData?.map((item) => {
        const isActive = item.id === value?.songDetail?.id;
        return (
          <Fragment key={item.id}>
            <ListItem dense onClick={() => handleClick(item.id)} sx={{ px: 0 }}>
              <ListItemButton
                selected={isActive}
                sx={(theme) => ({
                  py: 0,
                  borderRadius: 1,
                  color: isActive ? theme.palette.primary.main : "inherit",
                  transition: "all 0.5s",
                })}
              >
                <ListItemText
                  // song name
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
                      {item.name}
                    </Typography>
                  }
                  // artist name
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
                      {item.ar.map((a) => a.name).join("、")}
                    </Typography>
                  }
                />
                {/* song duration */}
                <Typography variant="caption" color="GrayText">
                  {formatDurationToString(
                    formatCurrentDuration(item.dt / 1000),
                  )}
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
          </Fragment>
        );
      })}
    </List>
  );
};

const SearchListMemo = memo(SearchList);
export default SearchListMemo;
