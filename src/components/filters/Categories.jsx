import React, { useState } from "react";

import { Box, Paper } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { useTranslation } from "react-i18next";

const listCate = [
  { id: 0, name: "all" },
  { id: 1, name: "Thời Trang Nam" },
];

function ProductType(props) {
  const { t } = useTranslation("filter");

  const { handleGetValue } = props;

  const [search, setSearch] = useState("");

  const handleFindCate = (value) => {
    console.log(value);

    setSearch(value);
  };

  return (
    <Paper elevation={2} sx={{ width: "100%", mb: 3 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          {t("filter.category")}
        </AccordionSummary>
        <TextField
          sx={{ p: 2 }}
          variant="standard"
          fullWidth
          id="input-with-icon-textfield"
          size="small"
          value={search}
          onChange={(e) => handleFindCate(e.target.value)}
          placeholder="Tìm kiếm"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
              onChange={(e) => handleGetValue(e.target.value, "category")}
            >
              {listCate &&
                listCate.length > 0 &&
                listCate.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.id}
                      control={<Radio color="secondary" />}
                      label={item.name}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default ProductType;
