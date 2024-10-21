import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardMedia,
} from "@mui/material";
import Divider from "@mui/material/Divider";

function EmployeeInfo() {
  return (
    <Grid container spacing={3} sx={{ padding: "20px" }}>
      <Grid item xs={2}>
        <Card>
          <CardMedia
            component="img"
            alt="Employee Image"
            height="150"
            width="150"
            image="https://via.placeholder.com/150"
            title="Employee Image"
          />
        </Card>
      </Grid>

      <Grid item xs={8} sx={{ p: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={5} sx={{ p: 3 }}>
            <Typography variant="body1">
              <b>Mã nhân viên:</b> NV000001
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={5}>
            <Typography variant="body1">
              <b>Ngày bắt đầu làm việc:</b>{" "}
            </Typography>
            <Divider />
          </Grid>

          {/* <Grid item xs={6}>
            <Typography variant="body1">
              <b>Tên nhân viên:</b> abc
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Chi nhánh trả lương:</b> Chi nhánh trung tâm
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Mã chấm công:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Chi nhánh làm việc:</b> Tất cả chi nhánh
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Ngày sinh:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Tài khoản KiotViet:</b>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Giới tính:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Số điện thoại:</b> 0965754466
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Số CMND/CCCD:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Email:</b>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Phòng ban:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Facebook:</b>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Chức danh:</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Địa chỉ:</b>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">
              <b>Thiết bị di động:</b>
            </Typography>
            <Divider />
          </Grid> */}
        </Grid>
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid item xs={1.5}>
        <TextField
          label="Ghi chú..."
          multiline
          rows={8}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
            },
          }}
        />
      </Grid>

      {/* Buttons */}
      <Grid item xs={12} sx={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Lấy mã xác nhận
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
        >
          Cập nhật
        </Button>
        <Button variant="contained" color="error">
          Xóa nhân viên
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmployeeInfo;
