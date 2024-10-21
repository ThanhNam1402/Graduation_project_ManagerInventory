import React, { useState } from "react"; // Import useState
import {
  Paper,
  AccordionDetails,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

function Status({ onChange }) {
  const { t } = useTranslation("filter");

  // Khai báo state cho lựa chọn trạng thái
  const [selectedValue, setSelectedValue] = useState(""); // Mặc định là "Tất cả"

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); // Cập nhật giá trị đã chọn
    onChange(value, "status"); // Gọi hàm onChange khi chọn trạng thái
  };

  return (
    <Paper elevation={2} sx={{ width: "228px", mb: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ ".MuiAccordionSummary-content": { margin: 0 } }}
        >
          {t("filter.status")}
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selectedValue} // Đặt giá trị của RadioGroup
              onChange={handleStatusChange} // Gọi hàm khi thay đổi
            >
              <FormControlLabel
                value=""
                control={<Radio color="secondary" />}
                label={t("filter.all")} // Lựa chọn "Tất cả"
              />
              <FormControlLabel
                value="2"
                control={<Radio color="secondary" />}
                label={t("filter.balanced")}
              />
              <FormControlLabel
                value="1"
                control={<Radio color="secondary" />}
                label={t("filter.notbalanced")}
              />
              <FormControlLabel
                value="3"
                control={<Radio color="secondary" />}
                label={t("filter.canceled")}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default Status;
