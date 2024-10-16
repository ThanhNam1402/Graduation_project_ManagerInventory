import { useEffect, useState } from "react";
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
import { TotalPrice } from "../../../utils/func";

function AddPurChaseOrder() {
  const [options, setOption] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dataTable, setDataTable] = useState([]);

  const [total, setTotal] = useState(0);

  // func find all product, set option input
  const handleOnChange = async (value) => {
    setInputValue(value);

    if (value !== "") {
      let res = await purchaseOrderService.handleGetAllProduct(value);

      let newData = res.data.map((item) => {
        let nameProduct = item.name;
        return item.product_sku.map((sku) => {
          return {
            price: sku?.price,
            discount: 0,
            total_price: sku?.price * 1,
            qty: 1,
            product_id: sku?.id,
            inventory: sku?.inventory,
            name:
              sku.option_value.length > 0
                ? nameProduct.concat(
                    " - ",
                    sku.option_value.map((item) => item.name).join(" - ")
                  )
                : nameProduct,
          };
        });
      });

      const newArray = newData.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      }, []);
      setOption(newArray);
    } else {
      setOption([]);
    }
  };

  // handle add item in array table
  let handleChangeValue = (e, value) => {
    setValue(value);
    const newData = [...dataTable];

    let checkID = newData.find((item) => item.product_id === value.product_id);
    if (checkID) {
      const index = newData.findIndex(
        (item) => item.product_id === checkID.product_id
      );
      newData[index].qty = newData[index].qty + 1;
    } else {
      value.qty = 1;
      newData.push(value);
    }
    setDataTable(newData);
    console.log(value);
  };

  // handle set value feild input
  const handleEditFeild = (index, newPrice, field) => {
    const newData = [...dataTable];
    newData[index][field] = Number(newPrice);
    newData[index].total_price =
      newData[index].price * newData[index].qty - newData[index].discount;
    setDataTable(newData);
  };

  // handle delete item in data table
  const handelDelItems = (id) => {
    const newData = [...dataTable];
    let a = newData.filter((item) => item.product_id !== id);
    setDataTable(a);
  };

  useEffect(() => {
    let a = TotalPrice(dataTable);
    setTotal(a);
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
              // eslint-disable-next-line react/prop-types
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
                      Tồn Kho : {option?.inventory}
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
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </Stack>

        <Paper elevation={2} sx={{ mt: 2 }}>
          <TableAddProducts
            dataTable={dataTable}
            onDelItems={handelDelItems}
            onEditFeild={handleEditFeild}
          />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <AddDetail total={total} data={dataTable} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddPurChaseOrder;
