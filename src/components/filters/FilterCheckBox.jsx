import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTranslation } from "react-i18next";

function FilterCheckBox(props) {
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
          <FormGroup>
            {data &&
              data.data.length > 0 &&
              data?.data.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={item.name}
                  />
                );
              })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default FilterCheckBox;
