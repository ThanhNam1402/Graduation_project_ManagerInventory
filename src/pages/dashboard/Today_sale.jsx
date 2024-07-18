import { Box, Grid, Typography, Paper, Divider } from "@mui/material";
import { ArrowDownward, AttachMoney, RotateLeft } from "@mui/icons-material";
function Today_sale() {
  return (
    <>
      <Box sx={{ p: 3, bgcolor: "background.paper", m: 3 }}>
        <div className="dashboardTitle" sx={{ m: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            KẾT QUẢ BÁN HÀNG HÔM NAY
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4} container alignItems="center">
              <Grid item>
                <AttachMoney sx={{ fontSize: 20, color: "#1976d2" }} />
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography variant="h6">0 Hóa đơn</Typography>
                <Typography variant="h4">0</Typography>
                <Typography>Doanh thu</Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} container alignItems="center">
              <Grid item>
                <RotateLeft sx={{ fontSize: 20, color: "#f57c00" }} />
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography variant="h6">0 Phiếu</Typography>
                <Typography variant="h4">0</Typography>
                <Typography>Trả hàng</Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={3} container alignItems="center">
              <Grid item>
                <ArrowDownward sx={{ fontSize: 20, color: "#d32f2f" }} />
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography variant="h4" sx={{ color: "#d32f2f" }}>
                  -54.96%
                </Typography>
                <Typography>So với cùng kỳ tháng trước</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}

export default Today_sale;
