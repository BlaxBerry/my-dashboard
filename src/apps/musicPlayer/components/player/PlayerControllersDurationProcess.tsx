import Box from "@mui/material/Box";
import Slider, { type SliderProps } from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
  type Dispatch,
  type ForwardRefRenderFunction,
  type RefObject,
  type SetStateAction,
} from "react";
import {
  formatCurrentDuration,
  formatDurationToString,
} from "../../fixtures/functions";

export type PlayerControllersDurationProcessRef = {
  setCurrentTime: Dispatch<SetStateAction<number>>;
};
type PlayerControllersDurationProcessProps = {
  audioRef: RefObject<HTMLAudioElement>;
  totalDuration: number;
};

/** 播放进度滑块 */
const PlayerControllersDurationProcess: ForwardRefRenderFunction<
  PlayerControllersDurationProcessRef,
  PlayerControllersDurationProcessProps
> = (props, ref) => {
  const { audioRef, totalDuration } = props;
  const [time, setTime] = useState(0); // 秒

  useImperativeHandle(
    ref,
    () => ({
      setCurrentTime: setTime,
    }),
    [setTime],
  );

  // 滑动播放进度条
  const handleTimeProgressChange: SliderProps["onChange"] = (_, value) => {
    // Mui Slider 在超快速滑动时即使 step 为 1 还是偶尔会出现获取小数值？
    // 总之此处暂且使用 Math.floor 强制能获取整数
    const newTime = Math.floor(value as number);
    setTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <Box sx={{ px: 1 }}>
      <Slider
        color="primary"
        min={0}
        max={audioRef.current?.duration || totalDuration / 1000} // debug: Received NaN for the `max` attribute. If this is expected, cast the value to a string.
        step={1}
        value={time || 0} // debug: Received NaN for the `value` attribute. If this is expected, cast the value to a string.
        onChange={handleTimeProgressChange}
      />
      <Box display="flex" justifyContent="space-between" sx={{ mt: -1 }}>
        <Typography variant="caption" color="GrayText">
          {formatDurationToString(formatCurrentDuration(time))}
        </Typography>
        <Typography variant="caption" color="GrayText">
          {formatDurationToString(formatCurrentDuration(totalDuration / 1000))}
        </Typography>
      </Box>
    </Box>
  );
};

const PlayerControllersDurationProcessMemo = memo(
  forwardRef(PlayerControllersDurationProcess),
);
export default PlayerControllersDurationProcessMemo;
