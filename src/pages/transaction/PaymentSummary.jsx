import { Box, Grid, Typography} from "@mui/material";
import { handleformat } from "../../utils/format";

function Payment_summary({row}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: "30%" }}>
          <Grid item xs={6}>
            <Typography sx={{ mb: 1 }}>Tổng số lượng: {row.qty}</Typography>
            <Typography sx={{ mb: 1 }}>
              Tổng tiền:
              {handleformat.formatPrice(row.total)}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Tổng cộng:
              {handleformat.formatPrice(row.total)}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Khách trả:
              {handleformat.formatPrice(row.client_paid)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Payment_summary;
