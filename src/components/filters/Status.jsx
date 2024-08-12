import {
  Paper,
  AccordionDetails,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

function Status() {
  const { t } = useTranslation("filter");

  return (
    <>

      <Paper elevation={2} sx={{ width: "228px", mb: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary defaultExpanded
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
         {t("filter.status")}
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel control={<Checkbox />} label={t("filter.provisional")}/>
              <FormControlLabel control={<Checkbox />} label={t("filter.balanced")} />
              <FormControlLabel control={<Checkbox />} label={t("filter.canceled")} />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}

export default Status;
