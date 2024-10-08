import React from "react";

import { Box, Grid } from "@mui/material";
import Revenue_chart from "./Revenue_chart";
import Notification from "./Notification";
import Top10 from "./Top10";
import Today_sale from "./Today_sale";
function DashBoard() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Today_sale />
            <Revenue_chart />
            <Top10 />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Notification />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DashBoard;
