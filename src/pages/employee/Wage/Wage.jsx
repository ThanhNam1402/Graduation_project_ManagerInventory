import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";

function Wage() {
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Mẫu áp dụng:</b> NV000001
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Loại lương:</b>{" "}
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Thưởng:</b> abc
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Hoa hồng:</b> Chi nhánh trung tâm
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Lương làm thêm giờ:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Phụ cấp:</b> Tất cả chi nhánh
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Giảm trừ:</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Wage;
