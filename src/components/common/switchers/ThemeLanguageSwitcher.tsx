import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, useCallback, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "@/libs/redux/hooks";
import { appThemeActions } from "@/libs/redux/slices";
import type { AppThemeLanguage } from "@/types";
import {
  APP_SUPPORTED_LANGUAGE_DEFAULT,
  APP_SUPPORTED_LANGUAGE_NAMES,
} from "@/utils/constants";
import { transformLanguageToCountry } from "@/utils/helpers/languageCountries";
import { getViteAssetsURL } from "@/utils/tools";

const ThemeLanguageSwitcher: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const themeLanguage = useSelector((state) => state.appTheme.themeLanguage);

  const switchAppThemeLanguage = useCallback(
    (lang: AppThemeLanguage) => {
      dispatch(appThemeActions.updateThemeLanguage(lang));
      i18n.changeLanguage(lang);
    },
    [dispatch, i18n],
  );

  useEffect(() => {
    if (themeLanguage !== APP_SUPPORTED_LANGUAGE_DEFAULT) {
      i18n.changeLanguage(themeLanguage);
    }
  }, [themeLanguage, i18n]);

  return (
    <Stack spacing={1.5} sx={sx}>
      {APP_SUPPORTED_LANGUAGE_NAMES.map((lang) => {
        const flagCountryName = transformLanguageToCountry(lang);
        const src = getViteAssetsURL(`images/flags/${flagCountryName}.svg`);
        return (
          <Typography
            key={lang}
            component="button"
            display="flex"
            alignItems="center"
            onClick={() => switchAppThemeLanguage(lang)}
            sx={(theme) => {
              const isActive = themeLanguage === lang;
              return {
                color: isActive ? theme.palette.primary.main : "inherit",
                fontWeight: isActive ? 700 : 400,
              };
            }}
          >
            <Avatar
              src={src}
              alt={lang}
              sx={() => {
                const isActive = themeLanguage === lang;
                return {
                  width: 30,
                  height: 30,
                  border: 2,
                  borderRadius: "50%",
                  borderColor: isActive ? "#EEEEEE" : "background.default",
                  boxShadow: isActive ? 4 : 1,
                  transition: "all 0.5s",
                  mr: 1,
                  "&:hover": { boxShadow: 4 },
                };
              }}
            />

            {t(`components.languages.${lang}`)}
          </Typography>
        );
      })}
    </Stack>
  );
};

const ThemeLanguageSwitcherMemo = memo(ThemeLanguageSwitcher);
export default ThemeLanguageSwitcherMemo;
