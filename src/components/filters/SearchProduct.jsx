import { Paper, InputBase, IconButton } from "@mui/material";
import _ from "lodash";

import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import PropType from "prop-types";

function CsSearch({ handleSearch }) {
  const { t } = useTranslation("filter");

  const handleOnChange = _.debounce((e) => handleSearch(e.target.value), 1000);
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
          placeholder={t("search")}
          inputProps={{ "aria-label": "Tìm Kiếm..." }}
        />
      </Paper>
    </div>
  );
}

CsSearch.propTypes = {
  handleSearch: PropType.func,
};

export default CsSearch;
