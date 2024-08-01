import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography, Button } from "@mui/material";

function TabInfomation(props) {
  console.log(props);
  let { item, handleDelProduct } = props;

  const handelDelItem = (id) => {
    handleDelProduct(id);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <img
          src="https://i.pinimg.com/564x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg"
          width="100%"
        />
      </Grid>
      <Grid item xs={9}>
        <div>
          <Typography variant="h6" component={"h6"}>
            {item?.name}
          </Typography>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Mã hàng
            </Typography>
            <p>{item?.code}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Mã vạch
            </Typography>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Danh Mục
            </Typography>
            <p>{item?.category_id}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Giá bán
            </Typography>
            <p>{item?.sale_price}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Giá vốn
            </Typography>
            <p>{item?.price}</p>
          </Stack>
          <Stack mt={2} direction="row">
            <Typography
              sx={{ width: "110px" }}
              variant="subtitle2"
              component={"p"}
            >
              Trọng lượng
            </Typography>
          </Stack>
        </div>
      </Grid>

      <Stack
        justifyContent="flex-end"
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
        }}
        mt={3}
      >
        <Button variant="contained" color="success">
          Cập Nhật
        </Button>
        <Button variant="text" color="warning">
          Ngừng Kinh Doanh
        </Button>
        <Button
          onClick={() => handelDelItem(item.id)}
          variant="contained"
          color="error"
        >
          Xóa
        </Button>
      </Stack>
    </Grid>
  );
}

export default TabInfomation;
