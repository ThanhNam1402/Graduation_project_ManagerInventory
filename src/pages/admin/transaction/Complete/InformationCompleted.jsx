import { Grid, Typography, Divider } from "@mui/material";
import { TextareaAutosize as Textarea } from "@mui/material";
import { handleformat } from "@/utils/format";

function Information_completed({ row }) {
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
            <Typography sx={{ p: 1 }}>
              Khách hàng:
              {row.client_name ? row.client_name : "Khách lẽ"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ p: 1 }}>
              Trạng thái:
              {row.status == 0 ? "Phiếu tạm" : "Hoàn thành"}
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
          <Typography variant="span">Ghi chú</Typography>
          <br />
          <Textarea
            aria-label="minimum height"
            minRows={3}
            placeholder="Ghi chú"
            value={row.note}
          />
        </Typography>
        <Typography sx={{ p: 1 }}>Kênh bán: bán trực tiếp</Typography>
      </Grid>
    </>
  );
}

export default Information_completed;
