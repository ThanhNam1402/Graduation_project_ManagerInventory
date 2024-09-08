import { useState } from "react";

import { FormControl, Select, MenuItem } from "@mui/material";
function SelectOption(props) {
  const [value, setValue] = useState(0);
  let { handleGetOption } = props;

  const handleChangeValue = (e) => {
    setValue(e.target.value);
    handleGetOption(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
      <Select
        value={value}
        onChange={handleChangeValue}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={0}>
          <em>Chọn Thuộc Tính</em>
        </MenuItem>
        <MenuItem value={1}>Màu Sắc</MenuItem>
        <MenuItem value={2}>Size</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectOption;
