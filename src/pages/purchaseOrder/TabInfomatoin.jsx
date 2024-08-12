import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography, Button } from "@mui/material";

import TableProductOrders from "./TableProductOrders";
import { handleformat } from "../../utils/format";

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
              Mã nhập hàng
            </Typography>
            <p>{item.code}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Thời gian
            </Typography>
            <p>{handleformat.formatDate(item.createdAt)}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Nhà cung cấp
            </Typography>
            <p>{item?.Supplier?.name}</p>
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
          <p>{item?.status === 1 ? "Phiếu Tạm" : "Đã Nhập Hàng"}</p>
        </Stack>
        <Stack mt={2} direction="row">
          <Typography
            sx={{ width: "110px" }}
            variant="subtitle2"
            component={"p"}
          >
            Chi nhánh
          </Typography>
          <p>Chi nhánh trung tâm</p>
        </Stack>
        <Stack mt={2} direction="row">
          <Typography
            sx={{ width: "110px" }}
            variant="subtitle2"
            component={"p"}
          >
            Người nhập
          </Typography>
          <p>ThanhNam</p>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableProductOrders idPurchaseOrder={item.id} />
      </Grid>
      <Grid item xs={12}>
        <Stack justifyContent="flex-end" direction="row" spacing={2} mt={2}>
          {/* <Button variant="contained">Cập Nhật</Button> */}
          {/* <Button variant="contained" color="error">
            Xóa
          </Button> */}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default TabInfomation;
