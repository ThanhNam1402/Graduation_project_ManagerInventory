import { Grid, Typography, Divider } from "@mui/material";
import { handleformat } from "../../../utils/format";

function Temporary_ballot_information({ row }) {
  return (
    <>
      <Grid item xs={8}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography sx={{ p: 1 }}>Mã đặt hàng: {row.code}</Typography>
            <Divider />
            <Typography sx={{ p: 1 }}>
              Thời gian:
              {handleformat.formatDate(row.createdAt)}
            </Typography>
            <Divider />
            <Typography sx={{ p: 1 }}>Khách hàng: {row.client_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ p: 1 }}>
              Trạng thái:
              {row.status == 0 ? "Phiếu tạm" : "Hoàn"}
            </Typography>
            <Divider />
            <Typography sx={{ p: 1 }}>Người tạo: ThanhNam</Typography>
            <Divider />
            <Typography sx={{ p: 1 }}>Người cân bằng: ThanhNam</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={0.5}>
        <Divider orientation="vertical" sx={{ height: "100%" }} />
      </Grid>

      <Grid item xs={3.5}>
        <Typography sx={{ p: 1 }}>
          Phiếu kiểm kho được tạo tự động khi thêm mới Hàng hóa: {row.code}
        </Typography>
      </Grid>
    </>
  );
}

export default Temporary_ballot_information;
