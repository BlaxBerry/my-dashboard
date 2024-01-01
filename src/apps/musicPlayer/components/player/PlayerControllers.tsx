import NextIcon from "@mui/icons-material/FastForwardRounded";
import PreviousIcon from "@mui/icons-material/FastRewindRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";

import { useSelector } from "@/libs/redux/hooks";
import {
  ContextMusicPlayer,
  ContextMusicPlayerDuration,
} from "../../fixtures/contexts";

import { apis } from "../../apis";
import type { SongData } from "../../types/api";
import type { PlayerControllersDurationProcessRef } from "./PlayerControllersDurationProcess";
import PlayerControllersDurationProcess from "./PlayerControllersDurationProcess";
import PlayerControllersVolumeProcess from "./PlayerControllersVolumeProcess";

const PlayerControllers: FC = () => {
  // ref
  // ------------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement>(null);
  const durationProcessRef = useRef<PlayerControllersDurationProcessRef>(null);

  // state
  // ------------------------------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { value, setValue } = useContext(ContextMusicPlayer);
  const { currentTime: contextCurrentTime, setCurrentTime } = useContext(
    ContextMusicPlayerDuration,
  );
  const favouriteList = useSelector((state) => state.musicPlayer.favouriteList);

  const audioURL = useMemo<string>(() => {
    return value?.songUrl as string;
  }, [value?.songUrl]);

  const totalDuration = useMemo<number>(() => {
    return value?.songDetail?.dt as number;
  }, [value?.songDetail]);

  const currentSongIndex = useMemo(
    () => favouriteList.findIndex((item) => item.id === value?.songDetail?.id),
    [favouriteList, value?.songDetail?.id],
  );

  const disableSwitchButton = useMemo<{
    next: boolean;
    previous: boolean;
  }>(() => {
    return {
      next: currentSongIndex >= favouriteList?.length - 1,
      previous: currentSongIndex <= 0,
    };
  }, [currentSongIndex, favouriteList?.length]);

  // Effects、Events
  // ------------------------------------------------------------------------------
  useEffect(() => {
    if (value?.isChanging || contextCurrentTime === 0) {
      durationProcessRef?.current?.setCurrentTime?.(0);
      setIsPlaying(false);
      pauseAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.isChanging, contextCurrentTime]);

  // audio 播放
  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  // audio 暂停
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // audio 播放进度更新
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime; // 秒
      durationProcessRef?.current?.setCurrentTime?.(time);
      setCurrentTime?.(time);

      if (Math.floor(time) >= Math.floor(totalDuration / 1000)) {
        setIsPlaying(false);
        pauseAudio();
      }
    }
  }, [totalDuration, setIsPlaying, setCurrentTime, pauseAudio]);

  // 点击播放按钮
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
    setIsPlaying(!isPlaying);
  }, [pauseAudio, playAudio, setIsPlaying, isPlaying]);

  // 点击切换前后喜欢列表中歌曲
  const switchFavouriteSong = useCallback(
    (button: "previous" | "next") => {
      // 目前存在一个默认 mock 音乐数据，该音乐不存在 redux 中也无法通过 api 获取相关信息
      // 所以注释此处代码
      // if (currentSongIndex === -1) {
      //   return true;
      // }
      let target: SongData | undefined = undefined;

      if (button === "next") {
        target = favouriteList[currentSongIndex + 1];
      }
      if (button === "previous") {
        target = favouriteList[currentSongIndex - 1];
      }

      if (target) {
        durationProcessRef?.current?.setCurrentTime?.(0);
        setIsPlaying(false);
        pauseAudio();
        setCurrentTime?.(0);
        setValue?.((s) => ({
          ...s,
          songDetail: undefined,
          songUrl: undefined,
          isChanging: true,
          errorMessage: "",
        }));
        apis
          .getSongURL(target.id)
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
                songDetail: target as SongData,
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
      }
    },
    [favouriteList, setValue, currentSongIndex, setCurrentTime, pauseAudio],
  );

  return (
    <>
      {/* 播放进度滑块 */}
      <PlayerControllersDurationProcess
        ref={durationProcessRef}
        audioRef={audioRef}
        totalDuration={totalDuration}
      />

      <Box display="flex" justifyContent="space-between">
        {/* buttons */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <IconButton
            disabled={disableSwitchButton.previous}
            onClick={() => switchFavouriteSong("previous")}
          >
            <PreviousIcon fontSize="large" />
          </IconButton>
          <Fab color="primary" size="small" onClick={togglePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Fab>
          <IconButton
            disabled={disableSwitchButton.next}
            onClick={() => switchFavouriteSong("next")}
          >
            <NextIcon fontSize="large" />
          </IconButton>
        </Stack>

        {/* 音量控制进度滑块 */}
        <PlayerControllersVolumeProcess audioRef={audioRef} />
      </Box>

      {/* audio */}
      <audio
        ref={audioRef}
        src={audioURL}
        onTimeUpdate={handleTimeUpdate}
        onError={() => {
          setValue?.((s) => ({
            ...s,
            errorMessage: "Player has some problem cannot play successfully",
          }));
        }}
      ></audio>
    </>
  );
};

const PlayerControllersMemo = memo(PlayerControllers);
export default PlayerControllersMemo;
