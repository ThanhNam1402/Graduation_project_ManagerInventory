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
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextareaAutosize as Textarea } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import csUseQueryString from "../../hook/csUseQueryString";
import { orderService } from "./../../services/order.service";
import { handleformat } from "../../utils/format";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


function ListTransaction(props) {
  const { t } = useTranslation("order");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState(1);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConfirmChangeStatus = async (id, status) => {
    try {
      const res = await orderService.handleUpdateStastus(id, status);
      let data = res.data;
      console.log("Check res update ", data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
    toast.success("Cập nhật thành công");

    handleCloseDialog();
  };

  const handleCancelChangeStatus = () => {
    toast.error("Hành động đã bị hủy!");
    handleCloseDialog();
  };

  let { filters, keyword, pagination } = props;

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

      const res = await orderService.handleGetAll(filterParams);
      let data = res.data;
      const groupedData = data.reduce((acc, item) => {
        const id = item.id;

        if (!acc[id]) {
          acc[id] = {
            id,
            code: item.code,
            createdAt: item.createdAt,
            qty: 0,
            total: 0,
            price: 0,
            client_name: item.client_name,
            client_paid: item.client_paid,
            status: item.status,
            note: item.note,
            items: [],
          };
        }

        acc[id].qty += item.Products.Order_Detail.qty;
        acc[id].total += item.Products.Order_Detail.total;
        acc[id].price += item.Products.price;

        acc[id].items.push({
          code: item.Products.code,
          name: item.Products.name,
          qty: item.Products.Order_Detail.qty,
          description: item.Products.description,
          sale_price: item.Products.sale_price,
          price: item.Products.price,
          note: item.note,
        });

        return acc;
      }, {});

      const filteredData = Object.values(groupedData);
      setData(filteredData);
      console.log("Data format ", filteredData);
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
                <TableCell>{t("orders.table.tableHead.code")}</TableCell>

                <TableCell>{t("orders.table.tableHead.time")}</TableCell>
                <TableCell>{t("orders.table.tableHead.client")}</TableCell>
                <TableCell>{t("orders.table.tableHead.pay")}</TableCell>
                <TableCell>{t("orders.table.tableHead.paid")}</TableCell>
                <TableCell>{t("orders.table.tableHead.status")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <React.Fragment key={row.id}>
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
                    <TableCell>{row.client_name}</TableCell>
                    <TableCell>
                      {handleformat.formatPrice(row.client_paid)}
                    </TableCell>
                    <TableCell>
                      {handleformat.formatPrice(row.client_paid)}
                    </TableCell>
                    <TableCell>
                      {row.status === 0 ? "Phiếu tạm" : "Hoàn thành"}
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
                          <Box margin={1}>
                            {row.status === 0 ? (
                              <>
                                {/* Này là khi ở Phiếu tạm */}
                                <Box>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                  >
                                    Thông tin
                                  </Typography>
                                  <Grid container spacing={3}>
                                    <Grid item xs={8}>
                                      <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                          <Typography sx={{ p: 1 }}>
                                            Mã đặt hàng: {row.code}
                                          </Typography>
                                          <Divider />
                                          <Typography sx={{ p: 1 }}>
                                            Thời gian:{" "}
                                            {handleformat.formatDate(
                                              row.createdAt
                                            )}
                                          </Typography>
                                          <Divider />
                                          <Typography sx={{ p: 1 }}>
                                            Khách hàng: {row.client_name}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography sx={{ p: 1 }}>
                                            Trạng thái:
                                            {row.status == 0
                                              ? "Phiếu tạm"
                                              : "Hoàn"}
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
                                        Phiếu kiểm kho được tạo tự động khi thêm
                                        mới Hàng hóa: {row.code}
                                      </Typography>
                                    </Grid>

                                    <TableContainer
                                      component={Paper}
                                      sx={{ mt: 3 }}
                                    >
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Mã hàng</TableCell>
                                            <TableCell>Tên hàng</TableCell>
                                            <TableCell>Số lượng</TableCell>
                                            <TableCell>Đơn giá</TableCell>
                                            <TableCell>Giá Giảm</TableCell>
                                            <TableCell>Tổng</TableCell>
                                            <TableCell>Ghi chú</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {row.items.map((item, itemIndex) => (
                                            <TableRow key={itemIndex}>
                                              <TableCell>
                                                {item.code
                                                  ? item.code
                                                  : "No data"}
                                              </TableCell>
                                              <TableCell>
                                                {item.name
                                                  ? item.name
                                                  : "No data"}
                                              </TableCell>
                                              <TableCell>{item.qty}</TableCell>
                                              <TableCell>
                                                {handleformat.formatPrice(
                                                  item.price
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                {item.sale_price
                                                  ? handleformat.formatPrice(
                                                      item.sale_price
                                                    )
                                                  : "No data"}
                                              </TableCell>
                                              <TableCell>
                                                {item.sale_price && item.qty
                                                  ? handleformat.formatPrice(
                                                      item.sale_price * item.qty
                                                    )
                                                  : "No data"}
                                              </TableCell>
                                              <TableCell>
                                                {item.note
                                                  ? item.note
                                                  : "No data"}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>

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
                                          >
                                            <Grid item xs={6}>
                                              <Typography sx={{ mb: 1 }}>
                                                Tổng số lượng: {row.qty}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Tổng tiền hàng:
                                                {handleformat.formatPrice(
                                                  row.total
                                                )}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Tổng cộng:
                                                {handleformat.formatPrice(
                                                  row.total
                                                )}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Khách trả: {row.client_paid}
                                              </Typography>
                                            </Grid>
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

                                      <Box
                                        sx={{
                                          mt: 2,
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <Button
                                          variant="contained"
                                          color="success"
                                          sx={{ mt: 2, mr: 2 }}
                                          startIcon={
                                            <CheckCircleOutlineOutlinedIcon />
                                          }
                                        >
                                          Kết thúc
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="primary"
                                          sx={{ mt: 2, mr: 2 }}
                                          startIcon={<SaveOutlinedIcon />}
                                        >
                                          Lưu
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="success"
                                          sx={{ mt: 2, mr: 2 }}
                                          startIcon={<RecyclingOutlinedIcon />}
                                          onClick={() => handleOpenDialog()}
                                        >
                                          Xử lý đơn hàng
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="primary"
                                          sx={{
                                            mt: 2,
                                            mr: 2,
                                            backgroundColor: "gray",
                                          }}
                                          startIcon={
                                            <LocalPrintshopOutlinedIcon />
                                          }
                                        >
                                          In
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="primary"
                                          sx={{
                                            mt: 2,
                                            mr: 2,
                                            backgroundColor: "gray",
                                          }}
                                          startIcon={
                                            <FileDownloadOutlinedIcon />
                                          }
                                        >
                                          Xuất file
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="success"
                                          sx={{ mt: 2, mr: 2 }}
                                          startIcon={
                                            <ContentCopyOutlinedIcon />
                                          }
                                        >
                                          Sao chép
                                        </Button>

                                        <Button
                                          variant="contained"
                                          color="error"
                                          sx={{ mt: 2, mr: 2 }}
                                          startIcon={
                                            <DeleteForeverOutlinedIcon />
                                          }
                                        >
                                          Hủy bỏ
                                        </Button>
                                      </Box>

                                      {/* Modal */}
                                      <Dialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                      >
                                        <DialogTitle>Xác nhận</DialogTitle>
                                        <DialogContent>
                                          <Typography>
                                            Bạn có chắc chắn muốn đổi trạng thái
                                            đơn này không?
                                          </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                          <Button
                                            onClick={() =>
                                              handleConfirmChangeStatus(
                                                row.id,
                                                status
                                              )
                                            }
                                            color="primary"
                                          >
                                            Có
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              handleCancelChangeStatus()
                                            }
                                            color="secondary"
                                          >
                                            Không
                                          </Button>
                                        </DialogActions>
                                      </Dialog>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </>
                            ) : (
                              // NÀY LÀ CÁI PHIẾU ĐÃ THANH TOÁN
                              <Box>
                                <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab label="Thông tin" />
                                  <Tab label="Lịch sử hóa đơn" />
                                  <Tab label="Thanh toán" />
                                </Tabs>
                                <Box
                                  sx={{
                                    padding: 2,
                                  }}
                                >
                                  {value === 0 && (
                                    <Box>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                      >
                                        Thông tin
                                      </Typography>
                                      <Grid container spacing={3}>
                                        <Grid item xs={8}>
                                          <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                              <Typography sx={{ p: 1 }}>
                                                Mã đặt hàng: {row.code}
                                              </Typography>
                                              <Divider />
                                              <Typography sx={{ p: 1 }}>
                                                Thời gian:
                                                {handleformat.formatDate(
                                                  row.createdAt
                                                )}
                                              </Typography>
                                              <Divider />
                                              <Typography sx={{ p: 1 }}>
                                                Khách hàng:
                                                {row.client_name
                                                  ? row.client_name
                                                  : "Khách lẽ"}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                              <Typography sx={{ p: 1 }}>
                                                Trạng thái:
                                                {row.status == 0
                                                  ? "Phiếu tạm"
                                                  : "Hoàn thành"}
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
                                            <Textarea
                                              aria-label="minimum height"
                                              minRows={3}
                                              placeholder="Ghi chú"
                                              value={row.note}
                                            />
                                          </Typography>
                                          <Typography sx={{ p: 1 }}>
                                            Kênh bán: bán trực tiếp
                                          </Typography>
                                        </Grid>

                                        <TableContainer
                                          component={Paper}
                                          sx={{ mt: 3 }}
                                        >
                                          <Table>
                                            <TableHead>
                                              <TableRow>
                                                <TableCell>Mã hàng</TableCell>
                                                <TableCell>Tên hàng</TableCell>
                                                <TableCell>Số lượng</TableCell>
                                                <TableCell>Đơn giá</TableCell>
                                                <TableCell>Giảm giá</TableCell>
                                                <TableCell>Giá bán</TableCell>
                                                <TableCell>
                                                  Thành tiền
                                                </TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {row.items.map(
                                                (item, itemIndex) => (
                                                  <TableRow key={itemIndex}>
                                                    <TableCell>
                                                      {item.code
                                                        ? item.code
                                                        : "No data"}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.name
                                                        ? item.name
                                                        : "No data"}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.qty}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.sale_price
                                                        ? handleformat.formatPrice(
                                                            item?.sale_price
                                                          )
                                                        : "No data"}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.sale_price
                                                        ? handleformat.formatPrice(
                                                            item?.sale_price
                                                          )
                                                        : "No data"}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.sale_price &&
                                                      item.qty
                                                        ? handleformat.formatPrice(
                                                            item.sale_price *
                                                              item.qty
                                                          )
                                                        : "No data"}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.sale_price &&
                                                      item.qty
                                                        ? handleformat.formatPrice(
                                                            item.sale_price *
                                                              item.qty
                                                          )
                                                        : "No data"}
                                                    </TableCell>
                                                  </TableRow>
                                                )
                                              )}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>

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
                                              >
                                                <Grid item xs={6}>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Tổng số lượng: {row.qty}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Tổng tiền:
                                                    {handleformat.formatPrice(
                                                      row.total
                                                    )}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Tổng cộng:
                                                    {handleformat.formatPrice(
                                                      row.total
                                                    )}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Khách trả:
                                                    {handleformat.formatPrice(
                                                      row.client_paid
                                                    )}
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          </Grid>

                                          <Box
                                            sx={{
                                              mt: 2,
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
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
                                              sx={{
                                                mr: 1,
                                                backgroundColor: "gray",
                                              }}
                                              startIcon={
                                                <LocalPrintshopOutlinedIcon />
                                              }
                                            >
                                              In
                                            </Button>
                                            <Button
                                              variant="contained"
                                              color="warning"
                                              sx={{
                                                mr: 1,
                                                backgroundColor: "gray",
                                              }}
                                              startIcon={
                                                <FileDownloadOutlinedIcon />
                                              }
                                            >
                                              Xuất file
                                            </Button>
                                            <Button
                                              variant="contained"
                                              color="success"
                                              sx={{ mr: 1 }}
                                              startIcon={
                                                <ContentCopyOutlinedIcon />
                                              }
                                            >
                                              Sao chép
                                            </Button>
                                            <Button
                                              variant="contained"
                                              color="error"
                                              sx={{ mr: 1 }}
                                              startIcon={
                                                <DeleteForeverOutlinedIcon />
                                              }
                                            >
                                              Hủy bỏ
                                            </Button>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  )}
                                  {/* LỊCH SỬ HÓA ĐƠN */}
                                  {value === 1 && (
                                    <Typography>
                                      <TableContainer
                                        component={Paper}
                                        sx={{ mt: 3 }}
                                      >
                                        <Table>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Mã hóa đơn</TableCell>
                                              <TableCell>Thời gian</TableCell>
                                              <TableCell>Giá trị</TableCell>
                                              <TableCell>Trạng thái</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell>{row.code}</TableCell>
                                              <TableCell>
                                                {handleformat.formatDate(
                                                  row.createdAt
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                {handleformat.formatPrice(
                                                  row.total
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                {row.status == 0
                                                  ? "Phiếu tạm"
                                                  : "Hoàn thành"}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Typography>
                                  )}
                                  {/* Lịch sử thanh toán */}
                                  {value === 2 && (
                                    <Typography>
                                      <TableContainer
                                        component={Paper}
                                        sx={{ mt: 3 }}
                                      >
                                        <Table>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>
                                                Mã phiếu thu
                                              </TableCell>
                                              <TableCell>Thời gian</TableCell>
                                              <TableCell>Phương thức</TableCell>
                                              <TableCell>Trạng thái</TableCell>
                                              <TableCell>
                                                Tiền thu/chi
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell>{row.code}</TableCell>
                                              <TableCell>
                                                {handleformat.formatDate(
                                                  row.createdAt
                                                )}
                                              </TableCell>
                                              <TableCell>
                                                {row.status == 0
                                                  ? "Tiền mặt"
                                                  : "Chuyển khoản"}
                                              </TableCell>
                                              <TableCell>
                                                {row.TrangThai == 0
                                                  ? "Phiếu tạm"
                                                  : "Đã thanh toán"}
                                              </TableCell>
                                              <TableCell>
                                                {handleformat.formatPrice(
                                                  row.total
                                                )}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            )}
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

export default ListTransaction;
