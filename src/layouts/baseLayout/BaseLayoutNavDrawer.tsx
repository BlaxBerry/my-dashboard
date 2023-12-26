import WidgetsIcon from "@mui/icons-material/Widgets";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { memo, type FC } from "react";

import { AppNavLinks } from "@/components/common";
import { APP_NAV_DRAWER_WIDTH, APP_TOP_BAR_HEIGHT } from "@/utils/constants";

/** BaseLayout 小尺寸屏幕下的路由菜单抽屉 */
const BaseLayoutNavDrawer: FC<{
  isNavDrawerOpen: boolean;
  closeNavDrawer: () => void;
}> = ({ isNavDrawerOpen, closeNavDrawer }) => {
  return (
    <Drawer
      anchor="right"
      open={isNavDrawerOpen}
      onClose={closeNavDrawer}
      sx={{
        display: {
          xs: "flex",
          md: "none",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: APP_NAV_DRAWER_WIDTH,
            sm: APP_NAV_DRAWER_WIDTH * 1.5,
          },
        }}
      >
        <Box
          component="header"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          sx={(theme) => ({
            height: APP_TOP_BAR_HEIGHT,
            bgcolor: theme.palette.primary.main,
            color: "white",
            boxShadow: theme.shadows[4],
            px: 2,
          })}
        >
          <WidgetsIcon sx={{ ml: 1 }} />
        </Box>

        <AppNavLinks sx={{ p: 1 }} />
      </Box>
    </Drawer>
  );
};

const BaseLayoutNavDrawerMemo = memo(BaseLayoutNavDrawer);
export default BaseLayoutNavDrawerMemo;
