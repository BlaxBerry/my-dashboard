import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import type {
  SxProps as MuiSxProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type FC,
  type KeyboardEventHandler,
} from "react";

import {
  SEARCH_LIST_CONTAINER_HEIGHT_LARGE,
  SEARCH_LIST_CONTAINER_HEIGHT_SMALL,
  SEARCH_LIST_CONTAINER_WIDTH_LARGE,
  SEARCH_LIST_CONTAINER_WIDTH_SMALL,
} from "../../fixtures/constants";
import SearchList from "./SearchList";

const Search: FC<{ sx?: MuiSxProps<MuiTheme> }> = ({ sx }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchKeyword, setSearchKeyword] = useState<string>("avamax");
  const handleSearch: KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      const value = (inputRef.current?.value as string).trim();

      if (!value) {
        return;
      }
      if (e.code === "Enter") {
        setSearchKeyword(value.replace(/\s/g, "+"));
      }
    },
    [setSearchKeyword],
  );

  return (
    <Paper
      elevation={4}
      sx={{
        height: {
          xs: SEARCH_LIST_CONTAINER_HEIGHT_SMALL,
          sm: SEARCH_LIST_CONTAINER_HEIGHT_LARGE,
        },
        width: {
          xs: SEARCH_LIST_CONTAINER_WIDTH_SMALL,
          lg: SEARCH_LIST_CONTAINER_WIDTH_LARGE,
        },
        p: 2,
        ...sx,
      }}
    >
      <OutlinedInput
        size="small"
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search"
        inputRef={inputRef}
        onKeyUp={handleSearch}
        sx={(theme) => ({
          "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: theme.palette.primary.main,
            },
        })}
      />

      <SearchList searchKeyword={searchKeyword} />
    </Paper>
  );
};

const SearchMemo = memo(Search);
export default SearchMemo;
