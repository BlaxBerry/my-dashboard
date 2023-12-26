import CategoryIcon from "@mui/icons-material/Category";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/SettingsSuggest";

type AppNavLink = { link: string; label: string };
type AppNavLinkWithIcon = AppNavLink & { icon: JSX.Element };

/** 路由连接 */
export const APP_NAV_LINK_LIST: Readonly<Array<AppNavLinkWithIcon>> = [
  { link: "/home", label: "home", icon: <HomeIcon /> },
  { link: "/collections", label: "collections", icon: <CategoryIcon /> },
  { link: "/settings", label: "settings", icon: <SettingsIcon /> },
  { link: "/about", label: "about", icon: <ContactSupportIcon /> },
];

/** 外部链接 */
