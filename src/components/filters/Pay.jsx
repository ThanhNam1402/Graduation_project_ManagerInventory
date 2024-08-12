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
import { useTranslation } from "react-i18next";

function Pay() {
  const { t } = useTranslation("filter");

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      <Paper elevation={2} sx={{ width: "228px", mb: 3 }}>
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
               {t("filter.pay")}
          </AccordionSummary>
          <FormControl sx={{ m: 1, width: 215 }}>
            <InputLabel id="demo-multiple-chip-label">
            {t("filter.pay")}
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
