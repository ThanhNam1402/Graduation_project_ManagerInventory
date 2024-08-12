import React from "react";

import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import {
  Backdrop,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Popover,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";

import "./listPriceBook.scss";
import { productService } from "../../services/product.service";
import { pricebookService } from "./../../services/pricebook.service";
import { handleformat } from "../../utils/format";
import { useTranslation } from "react-i18next";



function ListPriceBooks(props) {
  const { t } = useTranslation("pricebook");

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [popoverRowId, setPopoverRowId] = useState(null);
  const [data, setData] = useState([]);

  const handleOpenPopover = (event, rowId, value) => {
    setPopoverRowId(rowId);
    setInputValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setInputValue("");
  };

  const handleChange = () => {
    setLoading(true);
    handleClosePopover();
    setTimeout(() => {
      setLoading(false);
      setOpenSnackbar(true);
      handleInputChange(popoverRowId, { target: { value: inputValue } });
    }, 1000);
  };

  const handleInputChange = async (id, event) => {
    console.log("Check id", id);
    
    let { value } = event.target;
    let Number_Value = parseFloat(value.replace(/[^0-9,-]+/g,"").replace(",","."));

    if (isNaN(Number_Value)) {
      Number_Value = 0;
    }else{
      try {
        const res = await pricebookService.handleUpdateSale_Price(id, Number_Value);
        let data = res.data;
        console.log("Check res update ", data);
        GetAllProducts()
      } catch (error) {
        console.log(error);
      }
    }
  };



  let filters = "";
  let keyWord = "";
  let pagination = 0;
  useEffect(() => {
    GetAllProducts();
  }, [filters, pagination?.page, pagination?.rowsPerPage, keyWord]);

  

  const GetAllProducts = async () => {
    try {
      let filterParams = new URLSearchParams({
        categoryID: filters.categoryID || 0,
        displayOption: filters.displayOption || 0,
        keyWord: keyWord || "",
        onHand: filters.onHand || 0,
        order: pagination?.order || "asc",
        orderBy: pagination?.orderBy || "name",
        page: pagination?.page || 0,
        rowsPerPage: pagination?.rowsPerPage || 5,
      }).toString();

      console.log(filterParams);

      const response = await productService.handleGetAllProduct(filterParams);
      console.log("Check data get Pb" ,response.data);

      if (response && response.success === true) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
           
                <TableCell>{t("pricebook.table.tableHead.code")}</TableCell>
                <TableCell>{t("pricebook.table.tableHead.name")}</TableCell>
                <TableCell>{t("pricebook.table.tableHead.price")}</TableCell>
                <TableCell>{t("pricebook.table.tableHead.sale_price")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField size="small" placeholder={t("pricebook.filter.filterCode")} />
                </TableCell>
                <TableCell>
                  <TextField size="small" placeholder={t("pricebook.filter.filterName")} />
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{handleformat.formatPrice(row.price)}</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={handleformat.formatPrice(row.sale_price)}
                      onClick={(event) =>
                        handleOpenPopover(event, row.id, handleformat.formatPrice(row.sale_price))
                      }
                      onChange={(event) => handleInputChange(row.id, event)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            size="small"
            fullWidth
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleChange}
            style={{ marginTop: "16px" }}
            startIcon={<CheckBoxOutlinedIcon />}
          >
            Đồng ý
          </Button>
          <Button
            variant="contained"
            onClick={handleClosePopover}
            sx={{
              marginTop: "16px",
              marginLeft: "8px",
              backgroundColor: "gray",
            }}
            startIcon={<NotInterestedOutlinedIcon />}
          >
            Bỏ qua
          </Button>
        </Box>
      </Popover>

      {/* Backdrop */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1200 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/*  Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: 400, fontSize: 16 }}
        >
          Cập nhật thành công
        </Alert>
      </Snackbar>
    </>
  );
}

export default ListPriceBooks;
