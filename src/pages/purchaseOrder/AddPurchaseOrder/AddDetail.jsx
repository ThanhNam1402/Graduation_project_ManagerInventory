import {
  Typography,
  Stack,
  TextField,
  Button,
  Box,
  Autocomplete,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { supplierService } from "../../../services/supplier.service";
import { purchaseOrderService } from "../../../services/purchaseOrder.service";
import { useNavigate, useParams } from "react-router-dom";
// import { useAppContext } from "../../../context/AppContent";

import PropTypes from "prop-types";

function AddDetail({ total, data }) {
  let { id } = useParams();
  // const appContext = useAppContext();

  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const [options, setOption] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    console.log(total, discount);

    if (total !== 0) {
      let finalTotal = total - discount;
      setFinalTotal(finalTotal);
    }
  }, [discount, total]);

  useEffect(() => {
    if (id) {
      fetchOneData();
    }
  }, []);

  const fetchOneData = async () => {
    console.log("call api");
    if (id) {
      let res = await purchaseOrderService.handleGetOnePurchaseorders(id);

      if (res && res.success && res.data) {
        setSupplier(res?.data?.Supplier);
        setCode(res?.data?.code);
      }
      console.log(res);
    }
  };

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
    setSupplier(value);
  };

  const handelAddPurchaseOrder = async (status) => {
    if (!supplier) {
      toast.error("Vui lòng chọn nhà cung cấp !!");
      return;
    }

    let newData = {
      supplier_id: supplier?.id,
      code: code,
      status: status,
      total_goods: finalTotal,
      discount: discount,
      supplier_payments: 200000,
      description: note,
      detail_import_goods: data,
    };

    let res = await purchaseOrderService.handleAddPurChaseOrder(newData);

    if (res && res.success === true) {
      toast.success(res?.message);
      navigate("/system/purchaseOrder/");
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

      <FormControl fullWidth>
        <TextField
          hiddenLabel
          fullWidth
          id="code"
          margin="normal"
          variant="standard"
          placeholder="Mã Nhập Hàng"
          size="small"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </FormControl>
      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Nhà Cung Cấp</Typography>
        <Typography>{supplier?.name}</Typography>
      </Stack>
      <hr />

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Tổng Tiền Hàng</Typography>
        <Typography>{total}</Typography>
      </Stack>
      <hr />

      <Stack
        my={2}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography>Tiền Giảm</Typography>
        <TextField
          id="standard-basic"
          hiddenLabel
          variant="standard"
          value={discount}
          type="number"
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </Stack>

      <hr />

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Tiền Cần Thanh Toán</Typography>
        <Typography>{finalTotal}</Typography>
      </Stack>

      <hr />

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
  data: PropTypes.array,
};

export default AddDetail;
