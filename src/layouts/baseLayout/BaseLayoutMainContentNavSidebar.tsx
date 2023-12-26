import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, type FC } from "react";

import { AppNavLinks } from "@/components/common";
import { APP_NAV_DRAWER_WIDTH, APP_TOP_BAR_HEIGHT } from "@/utils/constants";

/** BaseLayout 内容部分中的大尺寸屏幕下的路由菜单目录 */
const BaseLayoutMainContentNavSidebar: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({
  sx,
}) => {
  return (
    <Box
      component="aside"
      sx={{
        width: APP_NAV_DRAWER_WIDTH,
        ...sx,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          height: `calc(100svh - ${APP_TOP_BAR_HEIGHT + 16}px)`,
          p: 1,
        }}
      >
        <AppNavLinks />
      </Paper>
    </Box>
  );
};

const BaseLayoutMainContentNavSidebarMemo = memo(
  BaseLayoutMainContentNavSidebar,
);
export default BaseLayoutMainContentNavSidebarMemo;
