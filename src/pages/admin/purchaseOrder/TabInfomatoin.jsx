import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";

import TableProductOrders from "./TableProductOrders";
import { handleformat } from "@/utils/format";
import PropTypes from "prop-types";
import ButtonUpdate from "@/components/admin/Button/ButtonUpdate";
import { Link } from "react-router-dom";

function TabInfomation({ item }) {
  return (
    <>
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
              <p>{handleformat.formatDate(item.created_at)}</p>
            </Stack>
            <Stack mt={2} direction="row">
              <Typography
                sx={{ width: "110px" }}
                variant="subtitle2"
                component={"p"}
              >
                Nhà cung cấp
              </Typography>
              <p>{item?.supplier?.name}</p>
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
            <p>{item?.status === 1 ? "Đã Nhập Hàng" : "Phiếu Tạm"}</p>
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
          <TableProductOrders tableProducts={item.detail_import_goods} />
        </Grid>
      </Grid>
      <Stack justifyContent="flex-end" direction="row" spacing={2} mt={2}>
        <ButtonUpdate
          component={Link}
          to={`/system/purchaseOrder/update/${item.id}`}
        />
      </Stack>
    </>
  );
}

TabInfomation.propTypes = {
  item: PropTypes.object,
};

export default TabInfomation;
