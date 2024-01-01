import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/libs/redux/hooks";
import {
  FAVORITE_LIST_CONTAINER_HEIGHT,
  FAVORITE_LIST_CONTAINER_WIDTH_LARGE,
  FAVORITE_LIST_CONTAINER_WIDTH_SMALL,
} from "../../fixtures/constants";
import FavouriteList from "./FavouriteList";

const Favourite: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const { t } = useTranslation();
  const favouriteListData = useSelector(
    (state) => state.musicPlayer.favouriteList,
  );

  return (
    <Paper
      elevation={4}
      sx={{
        height: FAVORITE_LIST_CONTAINER_HEIGHT,
        width: {
          xs: FAVORITE_LIST_CONTAINER_WIDTH_LARGE,
          sm: FAVORITE_LIST_CONTAINER_WIDTH_SMALL,
          md: FAVORITE_LIST_CONTAINER_WIDTH_LARGE,
        },
        p: 2,
        ...sx,
      }}
    >
      <Typography
        variant="caption"
        color="GrayText"
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
        }}
      >
        <FavoriteIcon color="primary" sx={{ mr: 1 }} />
        {t("apps.musicPlayer.text.favourite")}
        <Typography
          variant="caption"
          color="primary"
          fontWeight={700}
          sx={{ mx: 0.5 }}
        >
          {favouriteListData.length}
        </Typography>
        {t("apps.musicPlayer.text.songs")}
      </Typography>

      <FavouriteList list={favouriteListData} />
    </Paper>
  );
};

const FavouriteMemo = memo(Favourite);
export default FavouriteMemo;
