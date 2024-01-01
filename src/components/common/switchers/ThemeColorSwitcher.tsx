import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, useCallback, type FC } from "react";
import { Translation } from "react-i18next";

import { useDispatch } from "@/libs/redux/hooks";
import { appThemeActions } from "@/libs/redux/slices";
import {
  APP_THEME_COLOR_PALETTES_PRESET_NAMES,
  type AppThemeColorPaletteName,
} from "@/utils/constants";
import { getCustomThemeColorPalette } from "@/utils/helpers";

const ThemeColorSwitcher: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const dispatch = useDispatch();
  const switchAppThemeColor = useCallback(
    (colorPaletteName: AppThemeColorPaletteName) => {
      const themeColorPalette = getCustomThemeColorPalette(colorPaletteName);
      dispatch(appThemeActions.updateThemeColorPalette(themeColorPalette));
    },
    [dispatch],
  );

  return (
    <Stack direction="row" spacing={1} sx={sx}>
      {APP_THEME_COLOR_PALETTES_PRESET_NAMES.map((color) => (
        <Tooltip
          key={color}
          arrow
          title={
            <Translation>
              {(t) => (
                <Typography variant="caption">
                  {t(`components.palettes.${color}`)}
                </Typography>
              )}
            </Translation>
          }
        >
          <Box
            sx={(theme) => {
              const itemColorPalette = getCustomThemeColorPalette(color);
              const itemColor = itemColorPalette?.primary?.main;
              const isActive = theme.palette.primary.main === itemColor;
              return {
                width: 30,
                height: 30,
                border: 2,
                borderRadius: "50%",
                borderColor: isActive ? "#EEEEEE" : "background.default",
                boxShadow: isActive ? 4 : 1,
                backgroundColor: itemColor,
                cursor: "pointer",
                transition: "all 0.5s",
                transform: isActive ? "scale(1.2)" : "scale(1)",
                "&:hover": {
                  transform: "scale(1.2)",
                  boxShadow: 4,
                },
              };
            }}
            onClick={() => switchAppThemeColor(color)}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};

const ThemeColorSwitcherMemo = memo(ThemeColorSwitcher);
export default ThemeColorSwitcherMemo;
