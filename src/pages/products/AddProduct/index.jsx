import {
  TextField,
  Paper,
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
import { useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { productService } from "../../../services/product.service";
import { delay } from "../../../utils/func";

import VariantProduct from "./VariantProduct";
import FormGroup from "../../../components/FormGroup/FormGroup";
import { supplierService } from "../../../services/supplier.service";
import { categoryService } from "../../../services/category.service";

function AddProduct({ openModal, handleOpenModal, onResetListProducts }) {
  const { t } = useTranslation("notification");
  let userSchema = object({
    name: string().required(t("form.required")),
    price: number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t("form.required")),
    sale_price: number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t("form.required")),
    stock: number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t("form.required")),
    category_id: number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t("form.required")),
    supplier_id: number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t("form.required")),
    description: string().max(220, "Tối Đa 220 kí tự"),
  });

  const [variants, setVariants] = useState([]);
  const [supliers, setSuplier] = useState([]);
  const [cate, setCate] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const _onSubmit = async (data) => {
    try {
      await delay(500);
      let locations = [1, 2];
      let newData = { ...data, locations, variants };

      let res = await productService.handleNewProducts({ ...newData });
      toast.success(res?.message);
      onResetListProducts();
      handleOpenModal();
    } catch (error) {
      console.log(error);
      toast.error("Error from server");
    }
  };

  const handleGetVariants = (data) => {
    setVariants(data);
  };

  useEffect(() => {
    handleGetAllSuppliers();
    handleGetAllCate();
  }, []);

  const handleGetAllSuppliers = async () => {
    try {
      const response = await supplierService.handleGetAllSuppliers("");

      setSuplier(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetAllCate = async () => {
    try {
      let res = await categoryService.handleGetAllCate();
      setCate(res?.data?.data);
    } catch (error) {
      toast.error("Error getting all categories");
      console.log("error category");
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={openModal}>
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
                <Typography variant="h6">Thêm Mới Sản Phẩm</Typography>
              </Stack>
            </div>

            <Box sx={{ p: 2, mb: 2 }}>
              <FormGroup
                name="name"
                label="Tên sản phẩm"
                register={register}
                errors={errors}
              />
              <FormGroup
                name="price"
                label="Giá vốn"
                register={register}
                type="number"
                errors={errors}
              />
              <FormGroup
                name="sale_price"
                label="Giá bán"
                type="number"
                register={register}
                errors={errors}
              />
              <FormGroup
                name="stock"
                label="Tồn kho"
                register={register}
                errors={errors}
                type="number"
              />

              {/* <Stack my={2} direction="row" alignItems="center">
                  <InputLabel sx={{ minWidth: 150 }}>Vị trí</InputLabel>
                  <FormControl size="small" sx={{ m: 1 }} fullWidth>
                    <Select
                      displayEmpty
                      defaultValue={1}
                      inputProps={{ "aria-label": "Without label" }}
                      {...register("locations")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Kệ 1</MenuItem>
                      <MenuItem value={2}>Kệ 2</MenuItem>
                    </Select>
                    {errors.category_id && (
                      <Typography color="error" variant="body2">
                        {errors?.category_id?.message}
                      </Typography>
                    )}
                  </FormControl>
                </Stack> */}

              <Stack my={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }}>Nhóm hàng</InputLabel>
                <FormControl size="small" fullWidth>
                  <Select
                    displayEmpty
                    defaultValue={""}
                    inputProps={{ "aria-label": "Without label" }}
                    {...register("category_id")}
                  >
                    <MenuItem value="" disabled>
                      <em>Chọn nhóm hàng</em>
                    </MenuItem>

                    {cate &&
                      cate.length > 0 &&
                      cate.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {errors.category_id && (
                    <Typography color="error" variant="body2">
                      {errors?.category_id?.message}
                    </Typography>
                  )}
                </FormControl>
              </Stack>

              <Stack my={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }}>Nhà Cung Cấp</InputLabel>
                <FormControl size="small" fullWidth>
                  <Select
                    displayEmpty
                    defaultValue={""}
                    inputProps={{ "aria-label": "Without label" }}
                    {...register("supplier_id")}
                  >
                    <MenuItem value="" disabled>
                      <em>Chọn Nhà cung cấp</em>
                    </MenuItem>

                    {supliers &&
                      supliers.length > 0 &&
                      supliers.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>

                  {errors.supplier_id && (
                    <Typography color="error" variant="body2">
                      {errors?.supplier_id?.message}
                    </Typography>
                  )}
                </FormControl>
              </Stack>

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
                  <VariantProduct onGetVariants={handleGetVariants} />
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

AddProduct.propTypes = {
  openModal: PropTypes.bool,
  handleOpenModal: PropTypes.func,
  onResetListProducts: PropTypes.func,
};

export default AddProduct;
