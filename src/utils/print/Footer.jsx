import { Box, Grid, Typography } from "@mui/material";
import { handleformat } from "../format";

function Print_Footer({ row, user }) {
  return (
    <>
      <Box sx={{ mt: 3 }} className="print-text">
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Grid container spacing={3}>
              <Grid item xs={6}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ p: 1 }}>
              Cần Thơ ngày {handleformat.formatDate(row.createdAt)}
            </Typography>
            <Typography sx={{ p: 1 }}>Người tạo phiếu: {user.email}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Print_Footer;
