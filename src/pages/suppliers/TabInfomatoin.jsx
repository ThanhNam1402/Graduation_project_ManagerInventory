import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography, Button } from "@mui/material";

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
              Mã nhà cung cấp
            </Typography>
            <p>{item.name}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Tên nhà cung cấp:
            </Typography>
            <p>{item.name}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Địa chỉ
            </Typography>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Điện thoại
            </Typography>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Email
            </Typography>
            <p>nam@gmail.com</p>
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
            Công ty
          </Typography>
        </Stack>
        <Stack mt={2} direction="row">
          <Typography
            sx={{ width: "110px" }}
            variant="subtitle2"
            component={"p"}
          >
            Mã số thuế
          </Typography>
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
      </Grid>

      <Stack
        sx={{ width: "100%" }}
        justifyContent="flex-end"
        direction="row"
        spacing={2}
        mt={2}
      >
        <Button variant="contained">Cập Nhật</Button>
        <Button variant="contained" color="error">
          Hủy Bỏ
        </Button>
      </Stack>
    </Grid>
  );
}

export default TabInfomation;
