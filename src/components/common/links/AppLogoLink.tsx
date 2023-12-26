import Box from "@mui/material/Box";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, type FC } from "react";
import { NavLink } from "react-router-dom";

import {
  APP_LOGO_URL,
  APP_NAME,
  APP_TOP_BAR_LOGO_SIZE,
} from "@/utils/constants";

const AppLogoLink: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <NavLink to="/">
        <Box
          component="h1"
          display="flex"
          alignItems="center"
          sx={{ fontWeight: 700 }}
        >
          <img
            src={APP_LOGO_URL}
            alt="logo"
            loading="lazy"
            style={{
              height: APP_TOP_BAR_LOGO_SIZE,
              width: APP_TOP_BAR_LOGO_SIZE,
              marginRight: 8,
            }}
          />
          {APP_NAME}

          <Box component="small" sx={{ ml: 2, fontWeight: 400 }}>
            v1.0.0
          </Box>
        </Box>
      </NavLink>
    </Box>
  );
};

const AppLogoLinkMemo = memo(AppLogoLink);
export default AppLogoLinkMemo;
