import DarkLightModeIcon from "@mui/icons-material/Brightness4";
import PaletteColorIcon from "@mui/icons-material/ColorLens";
import LanguageIcon from "@mui/icons-material/GTranslate";
import Button, { type ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import {
  ArticleSpace,
  ColorCaseBlock,
  ThemeColorSwitcher,
  ThemeLanguageSwitcher,
  ThemeModeSwitcher,
  type ColorCaseBlockProps,
} from "@/components/common";
import { Translation } from "react-i18next";

const SAMPLE_PALETTES: Array<ColorCaseBlockProps["paletteName"]> = [
  "primary",
  "secondary",
];
const SAMPLE_PALETTE_COLORS: Array<ColorCaseBlockProps["paletteColorName"]> = [
  "main",
  "light",
  "dark",
];
const SAMPLE_BUTTONS_TYPES: Array<ButtonProps["variant"]> = [
  "contained",
  "outlined",
];

export default function SettingsPage() {
  return (
    <>
      {/* 主题模式 */}
      <ArticleSpace
        titleIcon={<DarkLightModeIcon />}
        title={
          <Translation>
            {(t) => <> {t("pages.settings.themeMode")}</>}
          </Translation>
        }
      >
        <ThemeModeSwitcher />
      </ArticleSpace>

      {/* 主题语言 */}
      <ArticleSpace
        titleIcon={<LanguageIcon />}
        title={
          <Translation>
            {(t) => <> {t("pages.settings.themeLanguage")}</>}
          </Translation>
        }
      >
        <ThemeLanguageSwitcher />
      </ArticleSpace>

      {/* 主题色调 */}
      <ArticleSpace
        titleIcon={<PaletteColorIcon />}
        title={
          <Translation>
            {(t) => <> {t("pages.settings.themePaletteColor")}</>}
          </Translation>
        }
      >
        {/* color switcher */}
        <ThemeColorSwitcher sx={{ pb: 2 }} />
        {/* sample case */}
        <Stack direction="row" spacing={2}>
          {SAMPLE_PALETTES.map((paletteName) => (
            <Stack key={paletteName} spacing={0.5}>
              {SAMPLE_BUTTONS_TYPES.map((buttonVariant) => (
                <Button
                  key={buttonVariant}
                  color={paletteName}
                  variant={buttonVariant}
                >
                  {paletteName}
                </Button>
              ))}
              <Stack direction="row" spacing={0.5} sx={{ py: 1.5 }}>
                {SAMPLE_PALETTE_COLORS.map((paletteColorName) => (
                  <ColorCaseBlock
                    key={paletteColorName}
                    {...{ paletteName, paletteColorName }}
                  />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </ArticleSpace>
    </>
  );
}
