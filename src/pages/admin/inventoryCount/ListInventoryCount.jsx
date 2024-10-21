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
  Chip,
  Collapse,
  Grid,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress";

import { invertoryService } from "@/services/invertory.service";
import { toast } from "react-toastify";
import { handleformat } from "@/utils/format";
import { usePrint } from "@/utils/print/print";
import { useTranslation } from "react-i18next";

import Information from "./Information";
import Action from "./Action";
import Product_details from "./ProductDetails";
import Payment_summary from "./PaymentSummary";
import Print_Header from "@/utils/print/Header";
import Print_Footer from "@/utils/print/Footer";

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
  const [limit, setLimit] = useState(5);

  const { componentRef, handlePrint } = usePrint();
  console.log("CHECK PROPS", props.filters);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchData(page, limit);
  }, [page, rowsPerPage, limit, props.filters]);

  const fetchData = async (page, limit) => {
    setLoading(true); // Bắt đầu loading
    try {
      const res = await invertoryService.handleGetAll(
        page,
        limit,
        props.filters
      );
      const data = res.data;

      console.log("Check data trả về", data);

      const formattedData = data.map((item) => {
        console.log("Check detail_stock", item.detail_stock);

        // Định dạng chi tiết sản phẩm SKU
        const productSkuFormatted = item.detail_stock.map((sku) => {
          const productName = sku.product_sku.product.name; // Lấy tên sản phẩm từ product_sku.product
          console.log("Check product", productName);

          const formattedOptions = sku.product_sku.option_value.map(
            (option) => ({
              optionValue: option.name,
            })
          );

          console.log("Check formattedOptions", formattedOptions);

          console.log("Check formattedOptions", formattedOptions);

          return {
            ...sku,
            formattedOptions,
            productName, // Thêm productName để sử dụng trong result
          };
        });

        // Định dạng lại dữ liệu kết quả
        const result = productSkuFormatted.flatMap((sku) => {
          if (sku.formattedOptions.length > 0) {
            return sku.formattedOptions.map((option) => ({
              product: sku.productName, // Lấy tên sản phẩm
              optionValue: option.optionValue,
            }));
          }
          return [
            {
              product: sku.productName, // Nếu không có options, trả về No options
              optionValue: "No options",
            },
          ];
        });

        return {
          ...item,
          product_sku: productSkuFormatted,
          result,
        };
      });

      console.log("Check data call API (formattedData)", formattedData);
      setData(formattedData);
      setPage(res.current_page);
      setLastPage(res.last_page);
      setTotalPages(res.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleDelInvertory = async (id) => {
    setLoading(true); // Bắt đầu loading
    try {
      let res = await invertoryService.handleDelInvertory(id);
      if (res) {
        console.log("Check data delete", res);
        toast.success(res.message);
        fetchData(page, limit);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Kết thúc loading
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
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit); // Cập nhật rowsPerPage
    setLimit(newLimit); // Cập nhật limit và gọi API mới
    setPage(1); // Reset page về 1 khi thay đổi số bản ghi mỗi trang
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Typography
            sx={{
              flex: "1 1 100%",
              paddingLeft: "16px",
              paddingRight: "8px",
              display: "flex",
              alignItems: "center", // Căn giữa theo chiều dọc
              margin: "20px 0px",
              fontSize: "1.25rem",
              fontWeight: 500,
            }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Danh sách kiểm kho
          </Typography>
          <Divider />
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
                <TableCell>SL lệch tăng</TableCell>
                <TableCell>SL lệch giảm</TableCell>
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
                      <TableCell>
                        {handleformat.formatPrice(row.ac_total)}
                      </TableCell>
                      <TableCell>{row.total_difference}</TableCell>
                      <TableCell>{row.qty_increased}</TableCell>
                      <TableCell>{row.qty_decreased}</TableCell>
                      <TableCell>
                        {row.status === 2 ? (
                          <Chip
                            color="primary"
                            size="small"
                            label="Đã cân bằng"
                            sx={{
                              minWidth: "117px",
                            }}
                          />
                        ) : row.status === 1 ? (
                          <Chip
                            color="warning"
                            size="small"
                            label="Chưa cân bằng"
                            sx={{
                              minWidth: "117px",
                            }}
                          />
                        ) : (
                          <Chip
                            color="error"
                            size="small"
                            label="Đã Hủy"
                            sx={{
                              minWidth: "117px",
                            }}
                          />
                        )}
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

                              <TableContainer component={Paper} sx={{ my: 3 }}>
                                <Product_details
                                  row={row.detail_stock}
                                  result={row.result}
                                />
                              </TableContainer>
                              <Box>
                                <Payment_summary row={row} />
                              </Box>

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
                              <Print_Footer row={row} user={user} />
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
            page={page - 1}
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
