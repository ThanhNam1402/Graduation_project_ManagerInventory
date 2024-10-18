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

import Previews from "../PreviewImages";
// import { delay } from "../../../utils/func";

import EditVariant from "../AddProduct/VariantProduct/ListOption/EditVariant";
import FormGroup from "../../../components/FormGroup/FormGroup";
import { supplierService } from "../../../services/supplier.service";
import { categoryService } from "../../../services/category.service";
import { optionService } from "../../../services/option.service";

function UpdateProduct({
  openModal,
  idSku,
  onCloseModal,
  valueEdit,
  onUpdateProduct,
  onUploadFiles,
}) {
  const { t } = useTranslation("notification");
  let userSchema = object({
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
    category_id: number().required(t("form.required")),
    supplier_id: number().nullable(),
    description: string().max(220, "Tối Đa 220 kí tự").nullable(),
  });

  const [variants, setVariants] = useState([]);
  const [supliers, setSuplier] = useState([]);
  const [cate, setCate] = useState([]);
  const [files, setFiles] = useState([]);

  const [listOption, setListOption] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    handleGetAllSuppliers();
    handleGetAllCate();
  }, []);

  useEffect(() => {
    if (valueEdit) {
      console.log(valueEdit);

      let a = valueEdit.product_sku[0].option_value?.map((item) => {
        console.log(item);

        return {
          id: item.option.id,
          value: [item.name],
        };
      });

      console.log(a);

      setVariants(a);

      reset({
        price: valueEdit.product_sku[0].price,
        sale_price: valueEdit.product_sku[0].sale_price,
        code: valueEdit.product_sku[0].code,
        barcode: valueEdit.product_sku[0].barcode,
        stock: valueEdit.product_sku[0].inventory,
        description: valueEdit.description,
        name: valueEdit.name,
        supplier_id: valueEdit.supplier_id.toString(),
        category_id: valueEdit.category_id.toString(),
      });
    }
  }, [reset, valueEdit]);

  const _onSubmit = async (data) => {
    try {
      console.log(data);
      onUpdateProduct(data);
      if (files && files.length > 0) {
        onUploadFiles(idSku, files);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error from server");
    }
  };

  const handleGetAllSuppliers = async () => {
    try {
      const response = await supplierService.handleGetAllSuppliers(
        // "keyword=&limit=100&page=1&status=1"
        ""
      );

      setSuplier(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetAllCate = async () => {
    try {
      let res = await categoryService.handleGetAllCate();
      if (res && res?.status) {
        setCate(res?.data?.data);
      }
    } catch (error) {
      toast.error("Error getting all categories");
      console.log("error category");
    }
  };

  const handleEditVariant = (option) => {
    // let checkOption = rawListVariant.find((item) => item.id === option.id);

    console.log(option);
  };

  const handleGetFiles = (files) => {
    console.log(files, idSku);
    setFiles(files);
  };

  const handleGetAllOptions = async () => {
    try {
      let res = await optionService.handleGetAllOption();
      setListOption(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllOptions();
  }, []);

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
                <Typography variant="h6">Chỉnh sửa sản phẩm</Typography>
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
              <Stack my={2} direction="row" alignItems="center">
                <InputLabel sx={{ minWidth: 150 }}>Nhóm hàng</InputLabel>
                <FormControl disabled size="small" fullWidth>
                  <Select
                    defaultValue={
                      valueEdit?.category_id ? valueEdit?.category_id : ""
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    {...register("category_id")}
                  >
                    <MenuItem value="">
                      <em>None</em>
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
                <FormControl disabled size="small" fullWidth>
                  <Select
                    displayEmpty
                    defaultValue={
                      valueEdit?.supplier_id ? valueEdit?.supplier_id : ""
                    }
                    inputProps={{ "aria-label": "Without label" }}
                    {...register("supplier_id")}
                  >
                    <MenuItem value="">
                      <em>None</em>
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

              <Previews onGetFile={handleGetFiles} />

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
                  {variants &&
                    variants.length > 0 &&
                    variants.map((item, index) => {
                      return (
                        <Stack alignItems="center" direction="row" key={index}>
                          <EditVariant
                            listSelectOptions={listOption}
                            defaultIdSelect={item.id}
                            defaultTags={item?.value}
                            onEditOption={handleEditVariant}
                          />
                        </Stack>
                      );
                    })}
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
              <Button onClick={onCloseModal} variant="outlined" color="success">
                Hủy
              </Button>
            </Stack>
          </Paper>
        </form>
      </Dialog>
    </>
  );
}

UpdateProduct.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  valueEdit: PropTypes.object,
  onUpdateProduct: PropTypes.func,
  onUploadFiles: PropTypes.func,
  idSku: PropTypes.string,
};

export default UpdateProduct;
