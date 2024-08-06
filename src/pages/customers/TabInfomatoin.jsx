import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography, Button } from "@mui/material";

function TabInfomation(props) {
  let { item } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <img
          src="https://i.pinimg.com/564x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg"
          width="100%"
        />
      </Grid>
      <Grid item xs={9}>
        <div>
          <Typography variant="h6" component={"h6"}>
            {item.name}
          </Typography>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Mã Khách Hàng
            </Typography>
            <p>{item?.code}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Email
            </Typography>
            <p>{item?.email}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Facebook
            </Typography>
            <p></p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Phone number
            </Typography>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ minWidth: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Address
            </Typography>
          </Stack>
        </div>
        <Stack justifyContent="flex-end" direction="row" spacing={2} mt={2}>
          <Button variant="contained">Cập Nhật</Button>
          <Button variant="contained" color="warning">
            Ngừng Hoạt Động
          </Button>
          <Button variant="contained" color="error">
            Xóa
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default TabInfomation;
