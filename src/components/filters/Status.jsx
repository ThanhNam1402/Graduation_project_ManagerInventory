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

function Status() {
  return (
    <>

      <Paper elevation={8} sx={{ width: "228px", mb: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary defaultExpanded
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            ".MuiAccordionSummary-content": { margin: 0 },
          }}
        >
          Trạng thái
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel control={<Checkbox />} label="Phiếu Tạm" />
              <FormControlLabel control={<Checkbox />} label="Đã cân bằng kho" />
              <FormControlLabel control={<Checkbox />} label="Đã hủy" />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}

export default Status;
