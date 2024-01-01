import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { memo, type FC } from "react";

import { AppLogoLink } from "@/components/common";
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_MIN_WIDTH,
  APP_TOP_BAR_HEIGHT,
} from "@/utils/constants";

/**
 * BaseLayout 顶部部分
 * - 路由菜单抽屉按钮 ( breakpoint < md )
 * - 其他功能按钮 ( breakpoint >= md )
 */
const BaseLayoutHeader: FC<{ toggleNavDrawer: () => void }> = ({
  toggleNavDrawer,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        zIndex: 99999,
      })}
    >
      <Container
        maxWidth={APP_CONTAINER_MAX_WIDTH}
        sx={{
          height: APP_TOP_BAR_HEIGHT,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          minWidth: APP_CONTAINER_MIN_WIDTH,
        }}
      >
        <AppLogoLink sx={{ px: 1 }} />

        <div style={{ flexGrow: 1 }} />

        {/* breakpoint < xl */}
        <IconButton
          aria-label="app-nav-menu"
          color="inherit"
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
          }}
          onClick={toggleNavDrawer}
        >
          <MenuIcon color="inherit" />
        </IconButton>
      </Container>
    </AppBar>
  );
};

const BaseLayoutHeaderMemo = memo(BaseLayoutHeader);
export default BaseLayoutHeaderMemo;
