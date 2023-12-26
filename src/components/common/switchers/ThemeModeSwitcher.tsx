import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { memo, useCallback, useEffect, type FC } from "react";
import { Translation } from "react-i18next";

import { useDispatch, useSelector } from "@/libs/redux/hooks";
import { appThemeActions } from "@/libs/redux/slices";

const ThemeModeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.appTheme.themeMode);
  const switchAppThemeMode = useCallback(() => {
    const mode = themeMode === "light" ? "dark" : "light";
    dispatch(appThemeActions.updateThemeMode(mode));
  }, [themeMode, dispatch]);

  const muiTheme = useTheme();
  useEffect(() => {
    window.document.body.style.backgroundColor =
      muiTheme.palette.background.default;
  }, [muiTheme.palette.background.default]);

  return (
    <Typography
      component="button"
      display="flex"
      alignItems="center"
      onClick={switchAppThemeMode}
    >
      <Translation>
        {(t) => (
          <>
            {themeMode === "light" ? (
              <>
                <DarkModeIcon sx={{ mr: 1 }} />
                {t("components.modes.dark")}
              </>
            ) : (
              <>
                <LightModeIcon sx={{ mr: 1 }} />
                {t("components.modes.light")}
              </>
            )}
          </>
        )}
      </Translation>
    </Typography>
  );
};

const ThemeModeSwitcherMemo = memo(ThemeModeSwitcher);
export default ThemeModeSwitcherMemo;
