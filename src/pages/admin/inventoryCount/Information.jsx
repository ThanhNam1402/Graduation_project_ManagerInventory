import { Grid, Typography, Divider } from "@mui/material";
import { handleformat } from "@/utils/format";

function Information({ row }) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography sx={{ p: 1 }}>Mã kiểm kho: {row.code}</Typography>
              <Divider />
              <Typography sx={{ p: 1 }}>
                Thời gian: {handleformat.formatDate(row.created_at)}
              </Typography>
              <Divider />
              <Typography sx={{ p: 1 }}>
                Ngày cân bằng: {handleformat.formatDate(row.updated_at)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ p: 1 }}>
                Trạng thái: {""}
                {row.status === 2
                  ? "Đã cân bằng"
                  : row.status === 1
                  ? "Chưa cân bằng"
                  : "Đã Hủy"}
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
      </Grid>
    </>
  );
}

export default Information;
