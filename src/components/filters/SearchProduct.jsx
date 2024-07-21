import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";

function CsSearch(props) {
  return (
    <div>
      <TextField
        sx={{ width: { xs: "100%", sm: "480px" } }}
        id="input-with-icon-textfield"
        size="small"
        placeholder="Tìm kiếm theo tên, mã hàng"
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
