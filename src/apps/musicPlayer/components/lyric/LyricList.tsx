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
import { useTranslation } from "react-i18next";

import { apis } from "../../apis";
import {
  LYRIC_CONTAINER_HEIGHT,
  LYRIC_CONTAINER_WIDTH,
} from "../../fixtures/constants";
import {
  ContextMusicPlayer,
  ContextMusicPlayerDuration,
} from "../../fixtures/contexts";
import { formatLyricDuration } from "../../fixtures/functions";

const LyricList: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { t } = useTranslation();
  const { value } = useContext(ContextMusicPlayer);
  const { currentTime } = useContext(ContextMusicPlayerDuration);

  const currentSongId = useMemo(
    () => value?.songDetail?.id,
    [value?.songDetail?.id],
  );

  const { data, isLoading } = useQuery({
    queryKey: [currentSongId],
    queryFn: async () => {
      if (!currentSongId) {
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
      {!isLoading && !lyricListData?.length && (
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
          {t("apps.musicPlayer.status.noLyricMatched")}
        </Typography>
      )}

      {(isLoading || value?.isChanging) && (
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
          {t("apps.musicPlayer.status.loading")}
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
            // 播放器当前进度所处时间
            const playerCurrentTime = Math.floor(currentTime || 0);
            // 音乐总时间秒数
            const playerTotalTime = Math.floor(
              (value?.songDetail?.dt as number) / 1000,
            );
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
