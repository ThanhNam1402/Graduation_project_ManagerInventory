import React from "react";

import { Box, Paper } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Categories(props) {
  console.log(props);
  // const handleGetValue  = (e) => {
  //   console.log(e.target.value);
  // }

  return (
    <Paper elevation={12} sx={{ width: "228px"}}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          Loại Hàng
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(e) => props.handleGetValue(e.target.value)}
            >
              <FormControlLabel
                value="0"
                control={<Radio color="secondary" />}
                label="Hàng Hóa"
              />
              <FormControlLabel value="1" control={<Radio />} label="Dịch Vụ" />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Compo - Gói"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default Categories;
