import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function DashBoard(props) {
  return (
    <div>
      {/* <img
        width={"100%"}
        src="https://i.pinimg.com/736x/91/ea/e2/91eae2a984827d0ab9fa79555f46978e.jpg"
        alt="asas"
      /> */}

      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>1</Grid>
        <Grid item xs={6} md={4}>2</Grid>
      </Grid>
    </div>
  );
}

export default DashBoard;
