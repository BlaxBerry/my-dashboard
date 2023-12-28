import NextIcon from "@mui/icons-material/FastForwardRounded";
import PreviousIcon from "@mui/icons-material/FastRewindRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import Volume2Icon from "@mui/icons-material/VolumeDown";
import Volume1Icon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Volume3Icon from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Slider, { type SliderProps } from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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

import { ContextMusicPlayer } from "../../fixtures/contexts";
import {
  formatCurrentDuration,
  formatDurationToString,
} from "../../fixtures/functions";

const PlayerControllers: FC = () => {
  // ref
  const audioRef = useRef<HTMLAudioElement>(null);

  // state
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { value, setValue } = useContext(ContextMusicPlayer);

  const audioURL = useMemo<string>(() => {
    return value?.songUrl;
  }, [value?.songUrl]);
  const totalDuration = useMemo<number>(() => {
    return value?.songDetail?.dt;
  }, [value?.songDetail]);

  useEffect(() => {
    if (value?.isChanging) {
      setCurrentTime(0);
      setIsPlaying(false);
      pauseAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.isChanging]);

  // 点击播放按钮
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
    setIsPlaying(!isPlaying);
  };

  // 播放
  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  // 暂停
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // 播放进度更新
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime; // 秒
      setCurrentTime(time);
      if (Math.floor(time) >= Math.floor(totalDuration / 1000)) {
        setIsPlaying(false);
      }

      setValue?.((s) => ({
        ...s,
        currentTime: time,
      }));
    }
  }, [totalDuration, setCurrentTime, setIsPlaying, setValue]);

  // 滑动播放进度条
  const handleTimeProgressChange: SliderProps["onChange"] = (_, value) => {
    const newTime = parseFloat(`${value as number}`);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // 滑动音量进度条
  const handleVolumeProgressChange: SliderProps["onChange"] = (_, value) => {
    const newVolume = parseFloat(`${value as number}`);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* 滑块进度条 */}
      <Box sx={{ px: 1 }}>
        <Slider
          color="primary"
          min={0}
          max={audioRef.current?.duration || totalDuration / 1000}
          value={currentTime}
          onChange={handleTimeProgressChange}
        />
        <Box display="flex" justifyContent="space-between" sx={{ mt: -1 }}>
          <Typography variant="caption" color="GrayText">
            {formatDurationToString(formatCurrentDuration(currentTime))}
          </Typography>
          <Typography variant="caption" color="GrayText">
            {formatDurationToString(
              formatCurrentDuration(totalDuration / 1000),
            )}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* buttons */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <IconButton disabled>
            <PreviousIcon fontSize="large" />
          </IconButton>
          <Fab color="primary" size="small" onClick={togglePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Fab>
          <IconButton disabled>
            <NextIcon fontSize="large" />
          </IconButton>
        </Stack>

        {/* 音量控制 */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            px: 1,
            width: {
              xs: 120,
            },
          }}
        >
          <Typography color="GrayText" display="flex" alignItems="center">
            {volume === 0 ? (
              <VolumeOffIcon />
            ) : volume <= 0.3 ? (
              <Volume1Icon />
            ) : volume <= 0.6 ? (
              <Volume2Icon />
            ) : (
              <Volume3Icon />
            )}
          </Typography>

          <Slider
            color="primary"
            size="small"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeProgressChange}
          />
          <Typography variant="caption" color="GrayText">
            {`${volume * 100}%`}
          </Typography>
        </Stack>
      </Box>

      {/* audio */}
      <audio
        ref={audioRef}
        src={audioURL}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
    </>
  );
};

const PlayerControllersMemo = memo(PlayerControllers);
export default PlayerControllersMemo;
