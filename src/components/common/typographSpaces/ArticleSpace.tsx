import Box from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, type FC, type PropsWithChildren, type ReactNode } from "react";

const ArticleSpace: FC<
  PropsWithChildren<{
    title: ReactNode;
    titleIcon: JSX.Element | null;
    titleVariant?: keyof TypographyProps["variant"];
    sx?: MuiSxProps<MuiTheme>;
  }>
> = ({ title, titleIcon, titleVariant, children, sx }) => {
  return (
    <Box component="article" sx={{ mb: 6, ...sx }}>
      <Typography
        component="div"
        variant={titleVariant || "h5"}
        fontWeight={700}
        display="flex"
        alignItems="center"
        sx={{ py: 2 }}
      >
        <Typography
          display="flex"
          alignItems="center"
          sx={(theme) => ({ color: theme.palette.primary.main, mr: 0.5 })}
        >
          {titleIcon}
        </Typography>
        {title}
      </Typography>

      {children}
    </Box>
  );
};

const ArticleSpaceMemo = memo(ArticleSpace);
export default ArticleSpaceMemo;
