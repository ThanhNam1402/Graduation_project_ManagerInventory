import {
  TextField,
  Paper,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { productService } from "../../../services/product.service";
import { delay } from "../../../utils/func";

function AddSupplier(props) {
  const navigate = useNavigate();
  let { openModal, handleOpenModal } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = async (data) => {
    console.log(data);
    let file = data.file[0];
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
  };

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={openModal}>
        <form
          onSubmit={handleSubmit(_onSubmit)}
          encType="multipart/form-data"
          method="POST"
        >
          <Paper elevation={2} sx={{ p: 2 }}>
            <div>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Typography variant="h6">Thêm Mới Nhà Cung Cấp</Typography>
              </Stack>
            </div>

            <div>
              <Grid container spacing={2}>
                <Grid item xs={8} sx={{ p: 0 }}>
                  <Box elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Stack mb={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                        Tên Nhà Cung Cấp
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
                        Điện Thoại
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
                        Địa chỉ
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

                    <Stack my={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                        Email
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
                        Công ty
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
                    <Stack mb={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                        Mã số thuế
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

                    <Stack my={2} direction="row" alignItems="center">
                      <TextField
                        {...register("description")}
                        id="standard-multiline-flexible"
                        multiline
                        placeholder="Mô Tả"
                        fullWidth
                        minRows={4}
                        maxRows={20}
                      />
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  {/* <InputAdd labelName={"hiha"} name={"dm"} /> */}
                </Grid>
              </Grid>
            </div>
            <Stack
              spacing={2}
              direction="row"
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Button type="submit" variant="contained">
                Lưu
              </Button>
              <Button onClick={handleOpenModal} variant="outlined">
                Hủy
              </Button>
            </Stack>
          </Paper>
        </form>
      </Dialog>
    </>
  );
}

export default AddSupplier;
