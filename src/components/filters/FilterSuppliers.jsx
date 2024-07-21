import React from "react";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import { ExpandMore } from "@mui/icons-material";

import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = [
  { name: "Van Henry", id: 1 },
  { name: "Van Henry1", id: 2 },
  { name: "Van Henry2", id: 3 },
  { name: "Van Henry3", id: 4 },
];

function getStyles(name, supplierID, theme) {
  return {
    fontWeight:
      supplierID.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function FilterSuppliers(props) {
  const theme = useTheme();

  let { t } = useTranslation("filter");

  const { supplierIDs, handleGetValue } = props;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    handleGetValue(
      typeof value === "string" ? value.split(",") : value,
      "supplierIDs"
    );
  };

  return (
    <Paper elevation={2} sx={{ width: "100%", my: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          {t("filter.suppliers")}
        </AccordionSummary>
        <AccordionDetails>
          <FormControl
            fullWidth
            size="small"
            sx={{ overflow: "auto", maxHeight: 120 }}
          >
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={supplierIDs}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  {selected.map((value) => (
                    <Chip key={value.name} label={value.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  style={getStyles(item.name, supplierIDs, theme)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default FilterSuppliers;
