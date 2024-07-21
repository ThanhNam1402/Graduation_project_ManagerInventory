import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography, Button } from "@mui/material";

import TableProductOrders from "./TableProductInvoices";

function TabInfomation(props) {
  let { item } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Mã hóa đơn
            </Typography>
            <p>{item.name}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Mã đặt hàng
            </Typography>
            <p>{item.name}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Thời gian
            </Typography>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Khách hàng
            </Typography>
            <p>Khách lẻ</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Ngày giao dự kiến
            </Typography>
          </Stack>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Stack mt={2} direction="row">
          <Typography
            sx={{ width: "110px" }}
            variant="subtitle2"
            component={"p"}
          >
            Trạng thái
          </Typography>
          <p>Hoàn thành</p>
        </Stack>
        <Stack mt={2} direction="row">
          <Typography
            sx={{ width: "110px" }}
            variant="subtitle2"
            component={"p"}
          >
            Người bán
          </Typography>
          <p>ThanhNam</p>
        </Stack>
        <Stack mt={2} direction="row">
          <Typography
            sx={{ width: "110px" }}
            variant="subtitle2"
            component={"p"}
          >
            Người tạo
          </Typography>
          <p>ThanhNam</p>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableProductOrders />
      </Grid>
      <Grid item xs={12}>
        <Stack justifyContent="flex-end" direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="error">
            Hủy Bỏ
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default TabInfomation;
