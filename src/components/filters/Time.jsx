import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import {
  Paper,
  AccordionDetails,
  Typography,
  Box,
  Popover,
  Grid,
} from "@mui/material";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";

function Time() {
  const [value, setValue] = useState("female");
  const [anchorEl, setAnchorEl] = useState(null);

  const columns = [
    { title: "Theo ngày", rows: ["Hôm nay", "Hôm qua"] },
    { title: "Theo tuần", rows: ["Row 1", "Row 2"] },
    { title: "Theo tháng", rows: ["Row 1", "Row 2"] },
    { title: "Theo quý", rows: ["Row 1", "Row 2"] },
    { title: "Theo năm", rows: ["Row 1", "Row 2"] },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
           Thời gian
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={
                  <Typography component="p" variant="p">
                    Tháng này
                    <UnfoldMoreOutlinedIcon
                      style={{ verticalAlign: "middle", marginLeft: 65 }}
                      onClick={handleClick}
                    />
                  </Typography>
                }
              />

              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Lựa chọn khác"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {columns.map((column, colIndex) => (
                    <Grid item xs={2.4} key={colIndex}>
                      <Typography variant="p" component="a" gutterBottom>
                        {column.title}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {columns.map((column, colIndex) => (
                <Grid item xs={2.4} key={colIndex}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    {column.rows.map((row, rowIndex) => (
                      <Typography
                        key={rowIndex}
                        variant="body1"
                        gutterBottom
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {row}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export default Time;
