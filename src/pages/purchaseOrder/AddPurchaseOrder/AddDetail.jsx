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
import { supplierService } from "../../../services/supplier.service";
import { purchaseOrderService } from "../../../services/purchaseOrder.service";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContent";

function AddDetail(props) {
  let { id } = useParams();
  const appContext = useAppContext();

  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");

  const [options, setOption] = useState([]);
  const [inputValue, setInputValue] = useState("");

  let { allPrice, data } = props;
  const [supplier, setSupplier] = useState(null);

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
      if (res && res.success === true) {
        setOption(res.data);
      }
    } else {
      setOption([]);
    }
  };

  let handleChangeValue = (e, value) => {
    setSupplier(value);
  };

  const handelAddPurchaseOrder = async (status) => {
    console.log(code, supplier);

    if (!supplier) {
      toast.error("Vui lòng chọn nhà cung cấp !!");
      return;
    }

    let purchase = {
      supplier_id: supplier?.id,
      total: allPrice.total,
      totalSalePrice: allPrice.totalSalePrice,
      note: note,
      code: code,
      status: status,
      user_id: appContext?.userInfo?.data?.id,
    };
    let detail = {
      data: data,
    };

    let res = await purchaseOrderService.handleAddPurChaseOrder(
      purchase,
      detail
    );

    if (res && res.success === true) {
      toast.success(res?.message);

      navigate("/system/purchaseOrder/");
    }
  };

  console.log(supplier);

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
        <Typography>{allPrice?.subTotal}</Typography>
      </Stack>
      <hr />

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Tiền Giảm</Typography>
        <Typography>{allPrice?.totalSalePrice}</Typography>
      </Stack>

      <hr />

      <Stack
        my={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Tiền Cần Thanh Toán</Typography>
        <Typography>{allPrice?.total}</Typography>
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

export default AddDetail;
