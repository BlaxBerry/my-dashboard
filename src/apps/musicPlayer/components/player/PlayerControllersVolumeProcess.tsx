import Volume2Icon from "@mui/icons-material/VolumeDown";
import Volume1Icon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Volume3Icon from "@mui/icons-material/VolumeUp";
import Slider, { type SliderProps } from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo, useState, type FC, type RefObject } from "react";

/** 音量控制进度滑块 */
const PlayerControllersVolumeProcess: FC<{
  audioRef: RefObject<HTMLAudioElement>;
}> = ({ audioRef }) => {
  const [volume, setVolume] = useState(1); // 0 ~ 1

  // 滑动音量进度条
  const handleVolumeProgressChange: SliderProps["onChange"] = (_, value) => {
    const newVolume = parseFloat(`${value as number}`);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
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
  );
};

const PlayerControllersVolumeProcessMemo = memo(PlayerControllersVolumeProcess);
export default PlayerControllersVolumeProcessMemo;
