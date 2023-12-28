import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Fragment, memo, useCallback, useContext, type FC } from "react";

import { apis } from "../../apis";
import {
  SEARCH_LIST_CONTAINER_HEIGHT_LARGE,
  SEARCH_LIST_CONTAINER_HEIGHT_SMALL,
} from "../../fixtures/constants";
import { ContextMusicPlayer } from "../../fixtures/contexts";
import {
  formatCurrentDuration,
  formatDurationToString,
} from "../../fixtures/functions";
import type { SongData } from "../../types/api";

const SearchList: FC<{ searchKeyword: string }> = ({ searchKeyword }) => {
  const { value, setValue } = useContext(ContextMusicPlayer);

  const { data, isLoading } = useQuery({
    queryKey: [searchKeyword],
    queryFn: async () => {
      const result = await apis.getSearchList({
        keywords: searchKeyword,
        type: 1,
        limit: 10,
        offset: 0,
      });
      return result;
    },
  });

  const handleClick = useCallback(
    async (id: number) => {
      if (id === value?.songDetail?.id) return;

      setValue?.((s) => ({
        ...s,
        isChanging: true,
      }));

      Promise.all([apis.getSongURL(id), apis.getSongDetail(id)])
        .then(([urlResult, detailResult]) => {
          const url = urlResult?.result?.[0]?.url;
          const detail = detailResult?.result;
          if (urlResult?.code !== 200 && detailResult?.code !== 200) {
            // TODO: redux state global message
            // eslint-disable-next-line no-console
            console.log(urlResult.error, detailResult.error);
          } else {
            setValue?.((s) => ({
              ...s,
              songUrl: url as string,
              songDetail: detail as SongData,
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

  if (isLoading) {
    return (
      <Typography variant="caption" color="GrayText">
        Loading...
      </Typography>
    );
  }

  if (!isLoading && !data?.result?.songs?.length) {
    return (
      <Typography variant="caption" color="GrayText">
        Not Found
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
        mt: 1,
      }}
    >
      {data?.result?.songs?.map((item) => {
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
