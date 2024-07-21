import React from "react";

import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
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

import "./listPriceBook.css";

function ListPriceBooks(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [popoverRowId, setPopoverRowId] = useState(null);

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

  const [rows, setRows] = useState([
    {
      id: 1,
      maHang: "SP000002",
      tenHang: "MD.M60002 Bút sáp vặn NGÂN 18 màu 12/144/t",
      giaVon: "21,212,121",
      giaNhapCuoi: "21,212,121",
      giaChung: "21,212,121",
    },
    {
      id: 2,
      maHang: "SP000001",
      tenHang: "Hộp dấu nhựa Shiny SP-1",
      giaVon: "100,000",
      giaNhapCuoi: "100,000",
      giaChung: "110,000",
    },
  ]);

  const handleInputChange = (id, event) => {
    let { value } = event.target;
    if (value === "") {
      value = "0";
    }
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, giaChung: value } : row))
    );
  };

  console.log(props);
  return (
    <>
      <Box sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã hàng</TableCell>
                <TableCell>Tên hàng</TableCell>
                <TableCell>Giá vốn</TableCell>
                <TableCell>Giá nhập cuối</TableCell>
                <TableCell>Giá chung</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField size="small" placeholder="Tìm mã hàng" />
                </TableCell>
                <TableCell>
                  <TextField size="small" placeholder="Tìm tên hàng" />
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.maHang}</TableCell>
                  <TableCell>{row.tenHang}</TableCell>
                  <TableCell>{row.giaVon}</TableCell>
                  <TableCell>{row.giaNhapCuoi}</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={row.giaChung}
                      onClick={(event) =>
                        handleOpenPopover(event, row.id, row.giaChung)
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
