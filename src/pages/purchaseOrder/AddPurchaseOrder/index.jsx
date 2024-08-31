import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import {
  Paper,
  Grid,
  Autocomplete,
  Box,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

import AddDetail from "./AddDetail";
import TableAddProducts from "./TableAddProducts";
import { purchaseOrderService } from "../../../services/purchaseOrder.service";
import { REACT_APP_BACKEND_URL } from "../../../config/config";
import { TotalSalePrice, TotalPrice, SubTotal } from "../../../utils/func";

function AddPurChaseOrder(props) {
  const [options, setOption] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dataTable, setDataTable] = useState(0);

  const [allPrice, setAllPrice] = useState({
    total: 0,
    subTotal: 0,
    totalSalePrice: 0,
  });

  const handleOnChange = async (value) => {
    setInputValue(value);

    console.log(value);
    if (value !== "") {
      let res = await purchaseOrderService.handleGetComplete(value);
      if (res && res.success === true && res.data) {
        setOption(res.data);
      }
    } else {
      setOption([]);
    }
  };

  let handleChangeValue = (e, value) => {
    setValue(value);
  };

  const getTableProducts = (data) => {
    setDataTable(data);
  };

  useEffect(() => {
    let a = SubTotal(dataTable);
    let b = TotalPrice(dataTable);
    let c = TotalSalePrice(dataTable);

    setAllPrice((state) => ({
      ...state,
      total: b,
      subTotal: a,
      totalSalePrice: c,
    }));
  }, [dataTable]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link
            to="/system/purchaseOrder"
            style={{
              lineHeight: "100%",
            }}
          >
            <ArrowBackIcon />
          </Link>
          <Typography variant="h6">Nhập Hàng</Typography>
          <Autocomplete
            freeSolo
            size="small"
            value={value}
            onChange={(event, newValue) => {
              handleChangeValue(event, newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              handleOnChange(newInputValue);
            }}
            options={options}
            id="country-select-demo"
            sx={{ width: 300 }}
            autoHighlight
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
                  <img
                    loading="lazy"
                    width="40"
                    src={`${REACT_APP_BACKEND_URL}/${option?.img}`}
                    alt=""
                  />
                  <Box sx={{ width: "100%" }}>
                    {option?.name}
                    <Typography variant="caption" component={"p"}>
                      Tồn Kho : {option?.onHand}
                    </Typography>
                    <hr />
                  </Box>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                hiddenLabel
                placeholder="Tìm kiếm sản phẩm"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Stack>

        <Paper elevation={2} sx={{ mt: 2 }}>
          <TableAddProducts value={value} getTableProducts={getTableProducts} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <AddDetail allPrice={allPrice} data={dataTable} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddPurChaseOrder;
