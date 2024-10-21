import { Box, Grid, Typography, Divider } from "@mui/material";
import { ArrowDownward, AttachMoney, RotateLeft } from "@mui/icons-material";
function Today_sale() {
  return (
    <>
      <Box sx={{ p: 3, bgcolor: "background.paper",  boxShadow: 2 }}>
        <div className="dashboardTitle">
          <Typography variant="h6" component="h2" gutterBottom>
            KẾT QUẢ BÁN HÀNG HÔM NAY
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} container alignItems="center">
              <Grid item>
                <AttachMoney sx={{ fontSize: 20, color: "#1976d2" }} />
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography variant="h6">0 Hóa đơn</Typography>
                <Typography variant="h5">0</Typography>
                <Typography>Doanh thu</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} container alignItems="center">
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: "none", sm: "block" } }}
              />
              <Grid item>
                <RotateLeft sx={{ fontSize: 20, color: "#f57c00" }} />
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography variant="h6">0 Phiếu</Typography>
                <Typography variant="h5">0</Typography>
                <Typography>Trả hàng</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} container alignItems="center">
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: "none", sm: "block" } }}
              />
              <Grid item>
                <ArrowDownward sx={{ fontSize: 20, color: "#d32f2f" }} />
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography variant="h5" sx={{ color: "#d32f2f" }}>
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
