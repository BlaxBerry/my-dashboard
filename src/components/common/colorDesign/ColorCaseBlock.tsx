import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {
  Palette as MuiPalette,
  PaletteColor as MuiPaletteColor,
} from "@mui/material/styles";
import { memo, type FC } from "react";

export type ColorCaseBlockProps = {
  paletteName: keyof Pick<MuiPalette, "primary" | "secondary">;
  paletteColorName: keyof MuiPaletteColor;
  width?: number;
  height?: number;
};

const ColorCaseBlock: FC<ColorCaseBlockProps> = ({
  paletteName,
  paletteColorName,
  width = 40,
  height = 15,
}) => {
  return (
    <Typography
      variant="caption"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        sx={(them) => ({
          bgcolor: them.palette[paletteName][paletteColorName],
          width,
          height,
        })}
      />
      {paletteColorName}
    </Typography>
  );
};

const ColorCaseBlockMemo = memo(ColorCaseBlock);
export default ColorCaseBlockMemo;
