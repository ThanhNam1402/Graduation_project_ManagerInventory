import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";

function EmployeeInfo() {
  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      <Grid item xs={9}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Mã:</b> NV000001
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Trang thái</b>{" "}
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Tên:</b> abc
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Chi nhánh:</b> Chi nhánh trung tâm
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Kỳ hạn trả:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Phạm vi áp dụng:</b> Tất cả chi nhánh
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Kỳ làm việc</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Tổng số nhân viên</b>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Ngày tạo</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Tổng lương</b> 0965754466
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Người tạo</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Đã trả nhân viên</b>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Người lập bản</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Còn cần trả</b>
            </Typography>
            <Divider />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <TextField
          label="Ghi chú..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
      </Grid>

      {/* Buttons */}
      <Grid item xs={12} sx={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Xuất file
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
        >
          Xem bản lương
        </Button>
        <Button variant="contained" color="error">
          Hủy bỏ
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmployeeInfo;
