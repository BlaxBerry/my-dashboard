import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { memo, type FC, type PropsWithChildren } from "react";

import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_MIN_WIDTH,
  APP_TOP_BAR_HEIGHT,
} from "@/utils/constants";
import BaseLayoutMainContentNavSidebar from "./BaseLayoutMainContentNavSidebar";

/**
 * BaseLayout 内容部分
 * - 左侧 ( breakpoint >= md ): BaseLayoutMainContentNavSidebar
 * - 中间: 各个页面
 */
const BaseLayoutMainContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper elevation={0} square>
      <Container
        maxWidth={APP_CONTAINER_MAX_WIDTH}
        sx={{
          minWidth: APP_CONTAINER_MIN_WIDTH,
          minHeight: `calc(100svh - ${APP_TOP_BAR_HEIGHT}px)`,
          marginTop: `${APP_TOP_BAR_HEIGHT}px`,
          display: "flex",
          py: 1,
        }}
      >
        {/* left ( breakpoint >= md ) */}
        <BaseLayoutMainContentNavSidebar
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        />

        {/* center page content */}
        <Box flex={1} component="main" sx={{ px: 1 }}>
          {children}
        </Box>
      </Container>
    </Paper>
  );
};

const BaseLayoutMainContentMemo = memo(BaseLayoutMainContent);
export default BaseLayoutMainContentMemo;
