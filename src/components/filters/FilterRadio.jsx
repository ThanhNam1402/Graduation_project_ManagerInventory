// func filterRadio : default value = 0,
// need : data, keyFilter, funcGetvalue,
// data need : {"titleFilter", data[]}
// const { handleGetValue, keyFilter, data } = props;
// return ==> value choose option

import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTranslation } from "react-i18next";
import Proptypes from "prop-types";

FilterRadio.propTypes = {
  handleGetValue: Proptypes.func,
  keyFilter: Proptypes.string,
  data: Proptypes.object,
};

function FilterRadio(props) {
  const { t } = useTranslation("filter");
  const { handleGetValue, keyFilter, data } = props;

  return (
    <Paper elevation={2} sx={{ width: "100%", mb: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          {t(data?.title)}
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={(e) => handleGetValue(e.target.value, keyFilter)}
            >
              {data &&
                data.data.length > 0 &&
                data?.data.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
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

export default FilterRadio;
