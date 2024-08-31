import {
  Paper,
  TextField,
  InputAdornment,
  InputBase,
  IconButton,
} from "@mui/material";
import _ from "lodash";

import { useCallback } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

function CsSearch(props) {
  const { t } = useTranslation("filter");

  let { handleSearch } = props;

  const handleOnChange = useCallback(
    _.debounce((e) => handleSearch(e.target.value), 1000),
    []
  );
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: 2,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          onChange={(event) => handleOnChange(event)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm Kiếm..."
          inputProps={{ "aria-label": "Tìm Kiếm..." }}
        />

        {/* <TextField
          sx={{ width: { xs: "100%", sm: "480px" } }}
          id="input-with-icon-textfield"
          size="small"
          placeholder={t("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
      </Paper>
    </div>
  );
}

export default CsSearch;
