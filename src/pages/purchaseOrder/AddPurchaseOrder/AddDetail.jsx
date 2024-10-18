import {
  Typography,
  Stack,
  TextField,
  Button,
  Box,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { supplierService } from "../../../services/supplier.service";
import { purchaseOrderService } from "../../../services/purchaseOrder.service";
import { useNavigate, useParams } from "react-router-dom";
// import { useAppContext } from "../../../context/AppContent";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";

function AddDetail({
  total,
  data,
  discountDefault,
  supplierPayDefault,
  codeDefault,
  supllierDefault,
}) {
  let { id } = useParams();
  // const appContext = useAppContext();
  let tNoti = useTranslation("notification").t;

  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [supplierPayments, setSupplierPayments] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const [options, setOption] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    if (total !== 0) {
      let finalTotal = total - discount;
      setFinalTotal(finalTotal);
    }
  }, [discount, total]);
  useEffect(() => {
    if (id) {
      console.log("supllierDefault", supllierDefault);
      setDiscount(discountDefault);
      setSupplier(supllierDefault);
      setSupplierPayments(supplierPayDefault);
    }
  }, [discountDefault, id, supllierDefault, supplierPayDefault]);

  const handleOnChange = async (value) => {
    setInputValue(value);
    if (value !== "") {
      let res = await supplierService.handleGetComplete(value);
      setOption(res.data.data);
    } else {
      setOption([]);
    }
  };

  let handleChangeValue = (e, value) => {
    console.log(value);

    setSupplier(value);
  };

  const handelAddPurchaseOrder = async (status) => {
    if (!supplier) {
      toast.error("Vui lòng chọn nhà cung cấp !!");
      return;
    }

    if (!id) {
      let newData = {
        supplier_id: supplier?.id,
        status: status,
        total_goods: finalTotal,
        discount: discount,
        supplier_payments: supplierPayments,
        description: note,
        detail_import_goods: data,
      };
      try {
        await purchaseOrderService.handleAddPurChaseOrder(newData);
        toast.success(tNoti("action_success"));
        navigate("/system/purchaseOrder/");
      } catch (error) {
        toast.error(tNoti("action_fail"));
      }
    } else {
      let newData = {
        supplier_id: supplier?.id,
        status: status,
        total_goods: finalTotal,
        discount: discount,
        supplier_payments: supplierPayments,
        description: note,
        detail_import_goods: data,
        code: codeDefault,
      };
      try {
        let a = await purchaseOrderService.handleUpdatePurChaseOrder(
          id,
          newData
        );
        console.log(a);

        toast.success(tNoti("action_success"));
        navigate("/system/purchaseOrder/");
      } catch (error) {
        toast.error(tNoti("action_fail"));
      }
    }
  };

  return (
    <div>
      <Autocomplete
        fullWidth
        freeSolo
        size="small"
        value={supplier}
        onChange={(event, newValue) => {
          handleChangeValue(event, newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          handleOnChange(newInputValue);
        }}
        options={options}
        id="country-select-demo"
        autoHighlight
        sx={{ mb: 3 }}
        getOptionLabel={(option) => (option?.name ? option?.name : null)}
        renderOption={(props, option) => {
          // eslint-disable-next-line react/prop-types
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              {option?.name}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Tìm kiếm nhà cung cấp"
            hiddenLabel
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Nhà cung cấp</Typography>
        <Typography>{supplier?.name}</Typography>
      </Stack>

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Tổng tiền sản phẩm</Typography>
        <Typography>{total}</Typography>
      </Stack>

      <Stack
        my={2}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography>Tiền giảm</Typography>
        <TextField
          id="standard-basic"
          hiddenLabel
          variant="standard"
          value={discount}
          type="number"
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </Stack>

      <Stack
        my={2}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography>Tiền trả NCC</Typography>
        <TextField
          id="standard-basic"
          hiddenLabel
          variant="standard"
          value={supplierPayments}
          type="number"
          onChange={(e) => setSupplierPayments(Number(e.target.value))}
        />
      </Stack>

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Tiền cần thanh toán</Typography>
        <Typography>{finalTotal}</Typography>
      </Stack>

      <TextField
        id="outlined-multiline-static"
        label="Ghi Chú"
        multiline
        margin="normal"
        fullWidth
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Stack
        mt={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button variant="outlined" onClick={() => handelAddPurchaseOrder(1)}>
          Lưu Tạm
        </Button>
        <Button variant="contained" onClick={() => handelAddPurchaseOrder(2)}>
          Hoàn Thành
        </Button>
      </Stack>
    </div>
  );
}

AddDetail.propTypes = {
  total: PropTypes.number,
  discountDefault: PropTypes.number,
  supplierPayDefault: PropTypes.number,
  supllierDefault: PropTypes.object,
  codeDefault: PropTypes.string,
  data: PropTypes.array,
};

export default AddDetail;
