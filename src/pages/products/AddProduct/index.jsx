import {
  TextField,
  Paper,
  Grid,
  Stack,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Button,
  Dialog,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Previews from "../PreviewImages";
import { productService } from "../../../services/product.service";
import { delay } from "../../../utils/func";

import VariantProduct from "./VariantProduct";

function AddProduct(props) {
  let { openModal, handleOpenModal } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = async (data) => {
    try {
      await delay(500);
      let res = await productService.handleNewProducts({ ...data });

      if (res && res.success) {
        toast.success(res?.message);
      } else {
        toast.warning(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error from server");
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
          <Paper elevation={2} sx={{ p: 5 }}>
            <div>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Typography variant="h6">Thêm Mới Sản Phẩm</Typography>
              </Stack>
            </div>

            <div>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Box sx={{ p: 2, mb: 2 }}>
                    <Stack mb={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 150 }} htmlFor="code">
                        Tên Sản Phẩm
                      </InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          {...register("name")}
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
                        Mã vạch
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
                        Giá Vốn
                      </InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          {...register("price")}
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
                        Giá Bán
                      </InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          {...register("sale_price")}
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
                        Tồn Kho
                      </InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          {...register("sale_price")}
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

                    <Previews />

                    <Stack mt={2} direction="row" alignItems="center">
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
                  <Paper elevation={2} sx={{ px: 2, py: 3, my: 2 }}>
                    <Box>
                      <Typography
                        variant="button"
                        component={"p"}
                        sx={{ borderBottom: 1 }}
                      >
                        Phân Loại
                      </Typography>

                      <Stack my={2} direction="row" alignItems="center">
                        <InputLabel sx={{ minWidth: 100 }}>
                          Nhóm hàng
                        </InputLabel>
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
                    </Box>

                    <Stack my={2} direction="row" alignItems="center">
                      <InputLabel sx={{ minWidth: 100 }}>
                        Nhà Cung Cấp
                      </InputLabel>
                      <FormControl size="small" sx={{ m: 1 }} fullWidth>
                        <Select
                          displayEmpty
                          defaultValue={10}
                          inputProps={{ "aria-label": "Without label" }}
                          {...register("category_id")}
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
                  </Paper>
                </Grid>
              </Grid>
            </div>

            <Box
              sx={{
                p: 2,
                mb: 3,
                minHeight: 120,
                width: "100%",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Thuộc Tính
                </AccordionSummary>
                <AccordionDetails>
                  <VariantProduct />
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* ===================== ACTION BUTTON ========================================================== */}
            <Stack
              spacing={2}
              direction="row"
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Button type="submit" variant="contained" color="success">
                Lưu
              </Button>
              <Button
                onClick={handleOpenModal}
                variant="outlined"
                color="success"
              >
                Hủy
              </Button>
            </Stack>
          </Paper>
        </form>
      </Dialog>
    </>
  );
}

export default AddProduct;
