import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
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
      <TextField
        sx={{ width: { xs: "100%", sm: "480px" } }}
        id="input-with-icon-textfield"
        size="small"
        onChange={(event) => handleOnChange(event)}
        placeholder= {t("search")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default CsSearch;
