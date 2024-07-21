import {
  TextField,
  Paper,
  Grid,
  Stack,
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

function AddProduct(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Thêm Mới Sản Phẩm</Typography>

            <Stack spacing={2} direction={"row"} alignItems={"center"}>
              <Button component={Link} to="/system/products" variant="outlined">
                Trở Về
              </Button>
              <Button type="submit" variant="contained">
                Lưu
              </Button>
            </Stack>
          </Stack>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Stack mb={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                  Tên Sản Phẩm
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Trường Dữ Liệu Không Được Trống !!",
                      },
                    })}
                    hiddenLabel
                    fullWidth
                    id="code"
                    margin="dense"
                    variant="standard"
                    placeholder="Nhập Mã Sản Phẩm"
                    size="small"
                  />

                  {errors.name && (
                    <Typography color="error" variant="body2">
                      {errors?.name?.message}
                    </Typography>
                  )}
                </FormControl>
              </Stack>

              <Stack mb={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                  Mã Sản Phẩm
                </InputLabel>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="code"
                  margin="dense"
                  variant="standard"
                  placeholder="Nhập Mã Sản Phẩm"
                  size="small"
                />
              </Stack>
              <Stack mb={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                  Mã vạch Sản Phẩm
                </InputLabel>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="code"
                  margin="dense"
                  variant="standard"
                  placeholder="Nhập Mã vạch Sản Phẩm"
                  size="small"
                />
              </Stack>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography
                variant="button"
                component={"p"}
                sx={{ borderBottom: 1 }}
              >
                Giá
              </Typography>
              <Stack my={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                  Giá Vốn Sản Phẩm
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Trường Dữ Liệu Không Được Trống !!",
                      },
                    })}
                    type="number"
                    hiddenLabel
                    fullWidth
                    id="code"
                    margin="dense"
                    variant="standard"
                    placeholder="Nhập Giá Vốn Sản Phẩm"
                    size="small"
                  />
                  {errors.price && (
                    <Typography color="error" variant="body2">
                      {errors?.price?.message}
                    </Typography>
                  )}
                </FormControl>
              </Stack>
              <Stack mb={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                  Giá Bán Sản Phẩm
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    {...register("sale_price", {
                      required: {
                        value: true,
                        message: "Trường Dữ Liệu Không Được Trống !!",
                      },
                    })}
                    type="number"
                    hiddenLabel
                    fullWidth
                    id="code"
                    margin="dense"
                    variant="standard"
                    placeholder="Nhập Bán Vốn Sản Phẩm"
                    size="small"
                  />

                  {errors.sale_price && (
                    <Typography color="error" variant="body2">
                      {errors?.sale_price?.message}
                    </Typography>
                  )}
                </FormControl>
              </Stack>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography
                variant="button"
                component={"p"}
                sx={{ borderBottom: 1 }}
              >
                Hình Ảnh
              </Typography>

              <Stack my={2} spacing={2} direction="row" alignItems="center">
                <img
                  width="160px"
                  src="https://media.istockphoto.com/id/1409329028/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=DoUsTCubI4BWxm_piyvsAB7I10pJlPTEmtb5Pc5O-TE="
                  alt=""
                />
                <img
                  width="160px"
                  src="https://media.istockphoto.com/id/1409329028/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=DoUsTCubI4BWxm_piyvsAB7I10pJlPTEmtb5Pc5O-TE="
                  alt=""
                />
                <img
                  width="160px"
                  src="https://media.istockphoto.com/id/1409329028/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=DoUsTCubI4BWxm_piyvsAB7I10pJlPTEmtb5Pc5O-TE="
                  alt=""
                />
                <img
                  width="160px"
                  src="https://media.istockphoto.com/id/1409329028/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=DoUsTCubI4BWxm_piyvsAB7I10pJlPTEmtb5Pc5O-TE="
                  alt=""
                />
                <img
                  width="160px"
                  src="https://media.istockphoto.com/id/1409329028/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=DoUsTCubI4BWxm_piyvsAB7I10pJlPTEmtb5Pc5O-TE="
                  alt=""
                />
              </Stack>
            </Paper>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography
                variant="button"
                component={"p"}
                sx={{ borderBottom: 1 }}
              >
                Mô Tả
              </Typography>
              <Stack my={2} direction="row" alignItems="center">
                <TextField
                  id="standard-multiline-flexible"
                  multiline
                  fullWidth
                  minRows={4}
                  maxRows={20}
                />
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography
                variant="button"
                component={"p"}
                sx={{ borderBottom: 1 }}
              >
                Phân Loại
              </Typography>

              <Stack my={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }}>
                  Danh Mục Sản Phẩm
                </InputLabel>
                <FormControl size="small" sx={{ m: 1 }} fullWidth>
                  <Select
                    value=""
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Thời Trang Nam</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack mb={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }}>
                  Phân Loại Sản Phẩm
                </InputLabel>
                <FormControl size="small" sx={{ m: 1 }} fullWidth>
                  <Select
                    value=""
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Hàng Hóa</MenuItem>
                    <MenuItem value={10}>Dịch Vụ</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default AddProduct;
