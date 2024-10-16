import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

import csUseQueryString from "../../hook/csUseQueryString";
import { invertoryService } from "./../../services/invertory.service";
import { toast } from "react-toastify";
import { handleformat } from "../../utils/format";
import { usePrint } from "../../utils/print/print";
import { useTranslation } from "react-i18next";

import Information from "./Information";
import Action from "./Action";
import Product_details from "./ProductDetails";
import Payment_summary from "./PaymentSummary";
import Print_Header from "../../utils/print/Header";
import Print_Footer from "../../utils/print/Footer";

import Pagination from "./pagination";

function ListInventoryCount(props) {
  const { t } = useTranslation("inventorycount");

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { componentRef, handlePrint } = usePrint();
  let { filters, keyword, pagination } = props;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, rowsPerPage]);

  const fetchData = async (page) => {
    setLoading(true); // Bắt đầu loading
    try {
      const res = await invertoryService.handleGetAll(page);
      let data = res.data;
      console.log("Check data call API", res);
      setData(data);
      setPage(res.current_page);
      setLastPage(res.last_page);
      setTotalPages(res.total); // Tổng số bản ghi
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleDelInvertory = async (id) => {
    try {
      let res = await invertoryService.handleDelInvertory(id);
      if (res) {
        toast.success(res.messges);
        fetchData(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = (rowId) => {
    setSelectedRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];

      return newSelected;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Điều chỉnh vì MUI bắt đầu từ 0
    fetchData(newPage + 1); // Gọi API để lấy dữ liệu trang mới
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Quay về trang 1 khi thay đổi số bản ghi trên mỗi trang
    fetchData(1); // Gọi API để cập nhật dữ liệu
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ "aria-label": "select all products" }}
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < data.length
                    }
                    checked={
                      data.length > 0 && selectedProducts.length === data.length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedProducts(data.map((row) => row.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  {t("inventorycount.table.tableHead.code")}
                </TableCell>
                <TableCell>
                  {t("inventorycount.table.tableHead.time")}
                </TableCell>
                <TableCell>
                  {t("inventorycount.table.tableHead.quantity")}
                </TableCell>
                <TableCell>
                  {t("inventorycount.table.tableHead.total")}
                </TableCell>
                <TableCell>
                  {/* {t("inventorycount.table.tableHead.status")} */}
                  Tổng chênh lệch
                </TableCell>
                <TableCell>
                  {t("inventorycount.table.tableHead.status")}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleRowClick(row.id)}
                        >
                          {selectedRowId === row.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProducts.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      </TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>
                        {handleformat.formatDate(row.created_at)}
                      </TableCell>
                      <TableCell>{row.ac_number}</TableCell>
                      <TableCell>{row.ac_total}</TableCell>
                      <TableCell>{row.total_difference}</TableCell>
                      <TableCell>
                        {row.status === 0 ? "Đã cân bằng" : "Chưa cân bằng"}
                      </TableCell>
                    </TableRow>
                    {selectedRowId === row.id && (
                      <TableRow>
                        <TableCell colSpan={12}>
                          <Collapse
                            in={selectedRowId === row.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1} ref={componentRef}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                <span className="screen-text">Thông tin</span>
                              </Typography>
                              {/* HEADER PHIẾU IN */}
                              <Print_Header />
                              <Box
                                sx={{ mb: 3, textAlign: "center" }}
                                className="print-text"
                              >
                                <Typography
                                  variant="h4"
                                  component="h2"
                                  align="center"
                                  sx={{
                                    fontFamily: "Times New Roman",
                                    fontWeight: "bold",
                                    color: "#2196f3",
                                  }}
                                >
                                  Phiếu Kiểm Kho
                                </Typography>
                              </Box>
                              {/* Body PHIẾU IN */}
                              <Box sx={{ mt: 3 }} className="print-text">
                                <Typography
                                  variant="h5"
                                  component="p"
                                  gutterBottom
                                >
                                  Thông tin phiếu kiểm
                                </Typography>
                              </Box>
                              <hr className="print-text" />
                              <Information row={row} />
                              <hr className="print-text" />
                              <Box sx={{ mt: 3 }} className="print-text">
                                <Typography
                                  variant="h5"
                                  component="div"
                                  gutterBottom
                                >
                                  Thông tin sản phẩm
                                </Typography>
                              </Box>
                              <TableContainer component={Paper} sx={{ mt: 3 }}>
                                <Product_details row={row.detail_stock} />
                              </TableContainer>

                              <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                                sx={{ mt: 2 }}
                              >
                                <Grid item xs={12}>
                                  <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    sx={{ mb: 2 }}
                                  >
                                    <Action
                                     handlePrint={handlePrint}
                                      row={row}
                                      handleDelInvertory={handleDelInvertory}
                                      fetchData={fetchData}
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                              <Print_Footer row={row} user={user}/>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
          <Pagination
            page={page - 1} // Page từ API thường bắt đầu từ 1, nhưng MUI Pagination bắt đầu từ 0
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={totalPages} // Tổng số bản ghi
          />
        </TableContainer>
      </Box>
    </>
  );
}

export default ListInventoryCount;
