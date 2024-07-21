import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
function Pay() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      <Paper elevation={12} sx={{ width: "228px", mb: 3 }}>
        <Accordion defaultExpanded>
        <AccordionSummary
            defaultExpanded
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            sx={{
              ".MuiAccordionSummary-content": { margin: 0 },
            }}
          >
            Phương thức thanh toán
          </AccordionSummary>
          <FormControl sx={{ m: 1, width: 215 }}>
            <InputLabel id="demo-multiple-chip-label">
              Phương thức thanh toán
            </InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={paymentMethod}
              label="Phương thức thanh toán"
              onChange={handleChange}
              sx={{ width: "100%" }}
            >
              <MenuItem value="cash">Tiền mặt</MenuItem>
              <MenuItem value="bank">Chuyển khoản</MenuItem>
            </Select>
          </FormControl>
        </Accordion>
      </Paper>
    </>
  );
}

export default Pay;
