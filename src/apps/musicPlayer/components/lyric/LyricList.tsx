import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { memo, useContext, useMemo, type FC } from "react";

import { apis } from "../../apis";
import {
  LYRIC_CONTAINER_HEIGHT,
  LYRIC_CONTAINER_WIDTH,
} from "../../fixtures/constants";
import {
  ContextMusicPlayer,
  DEFAULT_CONTEXT_VALUE,
} from "../../fixtures/contexts";
import { formatLyricDuration } from "../../fixtures/functions";

const LyricList: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { value } = useContext(ContextMusicPlayer);
  const currentSongId = value?.songDetail?.id;

  const { data, isLoading } = useQuery({
    queryKey: [currentSongId],
    queryFn: async () => {
      if (currentSongId === DEFAULT_CONTEXT_VALUE.songDetail.id) {
        return { result: { lyric: "" } };
      }
      const result = await apis.getSongLyric(currentSongId);
      return result;
    },
  });

  const lyricListData = useMemo<Array<string>>(
    () => data?.result?.lyric?.split("\n")?.filter((item) => item) || [],
    [data?.result?.lyric],
  );

  return (
    <Paper
      elevation={4}
      sx={{
        width: LYRIC_CONTAINER_WIDTH,
        height: LYRIC_CONTAINER_HEIGHT,
        overflowY: "scroll",
        cursor: value.isChanging ? "wait" : "default",
        position: "relative",
        p: 2,
        ...sx,
      }}
    >
      {isLoading && (
        <Typography variant="caption" color="GrayText" sx={{ px: 2 }}>
          Loading...
        </Typography>
      )}

      {!isLoading && !lyricListData?.length && (
        <Typography variant="caption" color="GrayText" sx={{ px: 2 }}>
          No Lyrics
        </Typography>
      )}

      {value?.isChanging && (
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
          Loading...
        </Typography>
      )}

      {!isLoading && !!lyricListData?.length && (
        <List
          sx={{
            width: "100%",
            height: LYRIC_CONTAINER_HEIGHT - 35,
            overflowY: "scroll",
            p: 0,
          }}
        >
          {lyricListData.map((item, index) => {
            const playerCurrentTime = Math.floor(value?.currentTime || 0); // 播放器当前进度所处时间
            const playerTotalTime = Math.floor(value?.songDetail?.dt / 1000); // 音乐总时间秒数
            // 当前歌词文本与开始时间
            const { lyricStartTime: currentLyricStart, lyricText } =
              formatLyricDuration(item);
            // 下一个歌词文本开始时间
            const { lyricStartTime: nextLyricStart } = formatLyricDuration(
              lyricListData[index + 1],
            );
            const isActive =
              playerCurrentTime >= currentLyricStart &&
              playerCurrentTime <
                (index < lyricListData?.length - 1
                  ? nextLyricStart
                  : playerTotalTime);
            return (
              <ListItem key={index} dense sx={{ px: 1 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="caption"
                      color={isActive ? "primary" : "GrayText"}
                      fontWeight={500}
                      sx={{
                        opacity: isActive ? 1 : 0.7,
                        transition: "all 0.5s",
                      }}
                    >
                      {lyricText}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Paper>
  );
};

const LyricListMemo = memo(LyricList);
export default LyricListMemo;