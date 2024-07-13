// import React from "react";

import { Paper } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// import FormLabel from "@mui/material/FormLabel";

function Inventory(props) {
  const { handleGetValue } = props;

  return (
    <Paper elevation={12} sx={{ width: "228px", mb: 3 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          Tồn Kho
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(e) => handleGetValue(e.target.value)}
            >
              <FormControlLabel
                value="0"
                control={<Radio color="secondary" />}
                label="Tất cả"
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Dưới định mức tồn"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Vượt định mức tồn"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Còn hàng trong kho"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Hết hàng trong kho"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="Lựa chọn khác"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default Inventory;
