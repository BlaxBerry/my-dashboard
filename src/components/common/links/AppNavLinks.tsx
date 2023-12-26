import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, type FC } from "react";
import { Translation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import { APP_NAV_LINK_LIST } from "@/utils/constants";

const AppNavLinks: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { pathname } = useLocation();

  return (
    <Box component="nav" sx={sx}>
      {APP_NAV_LINK_LIST.map(({ link, label, icon }) => {
        const isActive = pathname.startsWith(link);

        return (
          <NavLink
            to={link}
            key={link}
            // style={(renderProps) => ({
            //   color: renderProps.isActive ? activeColor :
            // })}
          >
            <ListItemButton selected={isActive}>
              <ListItemIcon
                sx={(theme) => ({
                  minWidth: 40,
                  color: isActive ? theme.palette.secondary.main : undefined,
                })}
              >
                {icon}
              </ListItemIcon>

              <Translation>
                {(t) => (
                  <Typography
                    sx={(theme) => ({
                      my: 1,
                      fontWeight: isActive ? 700 : undefined,
                      color: isActive
                        ? theme.palette.secondary.main
                        : "inherit",
                    })}
                  >
                    {t(`components.navLinks.${label}`)}
                  </Typography>
                )}
              </Translation>
            </ListItemButton>
          </NavLink>
        );
      })}
    </Box>
  );
};

const AppNavLinksMemo = memo(AppNavLinks);
export default AppNavLinksMemo;
