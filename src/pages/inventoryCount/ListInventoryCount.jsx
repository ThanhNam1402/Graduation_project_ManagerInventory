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
  Button,
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import csUseQueryString from "../../hook/csUseQueryString";
import { invertoryService } from "./../../services/invertory.service";
import { toast } from "react-toastify";
import { handleformat } from "../../utils/format";
import { usePrint } from "../../utils/print";
import { useTranslation } from "react-i18next";


function ListInventoryCount(props) {
  const { t } = useTranslation("inventorycount");

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  const { componentRef, handlePrint } = usePrint();
  let { filters, keyword, pagination } = props;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters, pagination?.page, keyword]);

  const fetchData = async () => {
    try {
      let filterParams = csUseQueryString({
        ...filters,
        ...pagination,
        keyword,
      });

      const res = await invertoryService.handleGetAll(filterParams);
      let data = res.data;

      const groupedData = data.reduce((acc, item) => {
        const id = item.id;

        if (!acc[id]) {
          acc[id] = {
            id,
            code: item.code,
            createdAt: item.createdAt,
            qty: 0,
            sale_price: 0,
            items: [],
          };
        }

        acc[id].qty += item.Products.Inventory_Detail.qty;
        acc[id].sale_price += item.Products.Inventory_Detail.sale_price;

        acc[id].items.push({
          code: item.Products.code,
          name: item.Products.name,
          qty: item.Products.Inventory_Detail.qty,
          description: item.Products.description,
          sale_price: item.Products.sale_price,
          endingStocks: item.Products.Inventory_Detail.EndingStocks,
        });

        return acc;
      }, {});

      const filteredData = Object.values(groupedData);
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelInvertory = async (id) => {
    try {
      let res = await invertoryService.handleDelInvertory(id);
      if (res) {
        toast.success(res.messges);
        fetchData();
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
                <TableCell>{t("inventorycount.table.tableHead.code")}</TableCell>
                <TableCell>{t("inventorycount.table.tableHead.time")}</TableCell>
                <TableCell>{t("inventorycount.table.tableHead.quantity")}</TableCell>
                <TableCell>{t("inventorycount.table.tableHead.total")}</TableCell>
                <TableCell>{t("inventorycount.table.tableHead.status")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow onClick={() => handleRowClick(row.id)}>
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
                      {handleformat.formatDate(row.createdAt)}
                    </TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>
                      {handleformat.formatPrice(row.qty * row.sale_price)}
                    </TableCell>
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
                            <Box sx={{ mb: 3 }} className="print-text">
                              <Typography variant="h6" component="div">
                                Công ty TNHH 2 thành viên
                              </Typography>
                              <Typography variant="body1">
                                Địa chỉ: Đường Lê Bình, Phường Hưng Lợi, Quận
                                Ninh Kiều, TP Cần Thơ
                              </Typography>
                              <Typography variant="body1">
                                Số điện thoại: 0365850920
                              </Typography>
                            </Box>
                            <Box
                              sx={{ mb: 3, textAlign: "center" }}
                              className="print-text"
                            >
                              <Typography
                                variant="h4"
                                component="h5"
                                gutterBottom
                              >
                                Phiếu in
                              </Typography>
                            </Box>

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
                            <Grid container spacing={3}>
                              <Grid item xs={8}>
                                <Grid container spacing={3}>
                                  <Grid item xs={6}>
                                    <Typography sx={{ p: 1 }}>
                                      Mã kiểm kho: {row.code}
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ p: 1 }}>
                                      Thời gian:{" "}
                                      {handleformat.formatDate(row.createdAt)}
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ p: 1 }}>
                                      Ngày cân bằng:{" "}
                                      {handleformat.formatDate(row.createdAt)}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography sx={{ p: 1 }}>
                                      Trạng thái:{" "}
                                      {row.status === 0
                                        ? "Đã cân bằng"
                                        : "Chưa cân bằng"}
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ p: 1 }}>
                                      Người tạo: ThanhNam
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ p: 1 }}>
                                      Người cân bằng: ThanhNam
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={0.5}>
                                <Divider
                                  orientation="vertical"
                                  sx={{ height: "100%" }}
                                />
                              </Grid>

                              <Grid item xs={3.5}>
                                <Typography sx={{ p: 1 }}>
                                  Phiếu kiểm kho được tạo tự động khi thêm mới
                                  Hàng hóa: {row.code}
                                </Typography>
                              </Grid>
                            </Grid>
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
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Mã hàng</TableCell>
                                    <TableCell>Tên hàng</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Tổng</TableCell>
                                    <TableCell>Ghi chú</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row.items.map((item, itemIndex) => (
                                    <TableRow key={itemIndex}>
                                      <TableCell>
                                        {item.code ? item.code : "No data"}
                                      </TableCell>
                                      <TableCell>
                                        {item.name ? item.name : "No data"}
                                      </TableCell>
                                      <TableCell>{item.qty}</TableCell>
                                      <TableCell>
                                        {handleformat.formatPrice(
                                          item.qty * item.sale_price
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {item.note ? item.note : "No data"}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>

                            {/* FOOTER PHIẾU IN */}
                            <Box sx={{ mt: 3 }} className="print-text">
                              <Grid container spacing={3}>
                                <Grid item xs={7}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={6}></Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <Typography sx={{ p: 1 }}>
                                    Cần Thơ ngày{" "}
                                    {handleformat.formatDate(row.createdAt)}
                                  </Typography>
                                  <Typography sx={{ p: 1 }}>
                                    Người tạo phiếu: {user.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            <Grid
                              container
                              spacing={2}
                              justifyContent="flex-end"
                              sx={{ mt: 2 }}
                            >
                              <Grid item xs={12}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    width: "100%",
                                  }}
                                >
                                  <Grid
                                    container
                                    spacing={3}
                                    sx={{ maxWidth: "30%" }}
                                    className="print-hidden"
                                  >
                                    <Grid item xs={6}>
                                      <Typography sx={{ mb: 1 }}>
                                        {row.SoLuongThucTe}
                                      </Typography>
                                      <Typography sx={{ mb: 1 }}>
                                        {row.SLLechTang}
                                      </Typography>
                                      <Typography sx={{ mb: 1 }}>
                                        {row.SLLechGiam}
                                      </Typography>
                                      <Typography sx={{ mb: 1 }}>
                                        {row.TongChenhLech}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Grid>
                            </Grid>
                            <Box
                              sx={{
                                mt: 2,
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              className="print-hidden"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ mr: 1 }}
                                startIcon={<SaveOutlinedIcon />}
                              >
                                Lưu
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ mr: 1, backgroundColor: "gray" }}
                                startIcon={<LocalPrintshopOutlinedIcon />}
                                onClick={handlePrint}
                              >
                                In
                              </Button>
                              <Button
                                variant="contained"
                                color="warning"
                                sx={{ mr: 1, backgroundColor: "gray" }}
                                startIcon={<FileDownloadOutlinedIcon />}
                              >
                                Xuất file
                              </Button>
                              <Button
                                variant="contained"
                                color="success"
                                sx={{ mr: 1 }}
                                startIcon={<ContentCopyOutlinedIcon />}
                              >
                                Sao chép
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ mr: 1 }}
                                startIcon={<DeleteForeverOutlinedIcon />}
                                onClick={() => handleDelInvertory(row.id)}
                              >
                                Hủy bỏ
                              </Button>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListInventoryCount;
