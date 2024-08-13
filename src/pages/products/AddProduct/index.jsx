import {
  TextField,
  Paper,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Button,
  CircularProgress,
  Backdrop,
  Container,
  Checkbox,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

// import Previews from "../../../components/PreviewImg";
import { productService } from "../../../services/product.service";

import { REACT_APP_BACKEND_URL } from "../../../config/config";
import { delay } from "../../../utils/func";

function AddProduct(props) {
  let { id } = useParams();

  const navigate = useNavigate();

  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setStatus(1);
    } else {
      setStatus(2);
    }
  };
  console.log(status);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Number(id)) {
      handelGetOne();
    }
  }, []);

  const handelGetOne = async () => {
    let res = await productService.handleGetOneProduct(id);

    if (res && res.success) {
      reset(res.data);
      setImg(res?.data?.img);
      setStatus(res?.data?.status);

      if (res?.data?.status === 2) {
        setChecked(true);
      }
    }
  };

  const _onSubmit = async (data) => {
    console.log(data);
    let file = data.file[0];

    if (id) {
      try {
        setIsLoading(true);
        await delay(1000);
        let res = await productService.handleUpdateProducts(
          { ...data, file, status },
          id
        );

        if (res && res.success) {
          toast.success(res?.message);
          setIsLoading(false);

          navigate("/system/products");
        } else {
          toast.warning(res?.message);
        }
      } catch (error) {
        toast.error("Error from server");
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await delay(500);
        let res = await productService.handleNewProducts({ ...data, file });

        if (res && res.success) {
          toast.success(res?.message);
          setIsLoading(false);
        } else {
          toast.warning(res?.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error from server");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container>
        <form
          onSubmit={handleSubmit(_onSubmit)}
          encType="multipart/form-data"
          method="POST"
        >
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography variant="h5">
                {id ? "Chỉnh Sửa Sản Phẩm" : "Thêm Mới Sản Phẩm"}
              </Typography>

              <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <Button
                  component={Link}
                  to="/system/products"
                  variant="outlined"
                >
                  Trở Về
                </Button>
                <Button type="submit" variant="contained">
                  Lưu
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper>
            <Grid container spacing={3} sx={{ mt: 5 }}>
              <Grid item xs={8} sx={{ p: 0 }}>
                <Box elevation={2} sx={{ p: 2, mb: 2 }}>
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
                      {...register("code")}
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
                      {...register("barcode")}
                      hiddenLabel
                      fullWidth
                      id="code"
                      margin="dense"
                      variant="standard"
                      placeholder="Nhập Mã vạch Sản Phẩm"
                      size="small"
                    />
                  </Stack>
                </Box>

                <Box elevation={2} sx={{ p: 2, mb: 2 }}>
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
                        InputProps={{ inputProps: { min: 0 } }}
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
                        InputProps={{ inputProps: { min: 0 } }}
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

                  {!id && (
                    <Stack mb={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                        Tồn Kho
                      </InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          {...register("onHand", {
                            required: {
                              value: true,
                              message: "Trường Dữ Liệu Không Được Trống !!",
                            },
                          })}
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          hiddenLabel
                          fullWidth
                          id="onHand"
                          margin="dense"
                          variant="standard"
                          placeholder="Nhập Bán Vốn Sản Phẩm"
                          size="small"
                        />

                        {errors.onHand && (
                          <Typography color="error" variant="body2">
                            {errors?.onHand?.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>
                  )}
                </Box>

                <Box elevation={2} sx={{ p: 2, mb: 2 }}>
                  <Typography
                    variant="button"
                    component={"p"}
                    sx={{ borderBottom: 1, mb: 2 }}
                  >
                    Hình Ảnh
                  </Typography>

                  <input
                    type="file"
                    id="file"
                    name="file"
                    {...register("file")}
                  />

                  <hr />
                  {img ? (
                    <img
                      width={120}
                      src={`${REACT_APP_BACKEND_URL}/${img}`}
                      alt="img"
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Box elevation={2} sx={{ p: 2 }}>
                  <Typography
                    variant="button"
                    component={"p"}
                    sx={{ borderBottom: 1 }}
                  >
                    Mô Tả
                  </Typography>
                  <Stack my={2} direction="row" alignItems="center">
                    <TextField
                      {...register("description")}
                      id="standard-multiline-flexible"
                      multiline
                      fullWidth
                      minRows={4}
                      maxRows={20}
                    />
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={2} sx={{ px: 2, py: 3 }}>
                  <Typography
                    variant="button"
                    component={"p"}
                    sx={{ borderBottom: 1 }}
                  >
                    Phân Loại
                  </Typography>

                  <Stack my={2} direction="row" alignItems="center">
                    <InputLabel sx={{ minWidth: 100 }}>Nhóm hàng</InputLabel>
                    <FormControl size="small" sx={{ m: 1 }} fullWidth>
                      <Select
                        displayEmpty
                        defaultValue={10}
                        inputProps={{ "aria-label": "Without label" }}
                        {...register("category_id", {
                          required: {
                            value: true,
                            message: "Trường Dữ Liệu Không Được Trống !!",
                          },
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Thời Trang Nam</MenuItem>
                        <MenuItem value={2}>Thời Trang Nữ</MenuItem>
                      </Select>
                      {errors.category_id && (
                        <Typography color="error" variant="body2">
                          {errors?.category_id?.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Stack>

                  {id && (
                    <Stack my={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 100 }}>
                        Ngừng kinh doanh
                      </InputLabel>
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
    </>
  );
}

export default AddProduct;
