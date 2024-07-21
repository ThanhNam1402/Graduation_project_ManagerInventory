import React, { useState } from "react";
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

function ListTransaction({ onSelectionChange }) {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const rows = [
    {
      id: 1,
      MaDH: "SP000001",
      ThoiGian: "19/07/2024 20:52",
      KH: "Khách lẽ",
      KhachCanTra: 123233445,
      KhachDaTra: 123233445,
      TrangThai: 1,
      TenHang: "hàng 1",
      SL: 1,
      DonGia: 100000,
      GiamGia: 0,
      GiaBan: 100000,
      MaHD: "HD000001",
      MaPhieuThu: "TTHD000001",
      NguoiTao: "Thanh Nam",
      Phuongthuc: 0,
    },
    {
      id: 2,
      MaDH: "SP000002",
      ThoiGian: "19/07/2024 20:52",
      KH: "Khách lẽ",
      KhachCanTra: 123233445,
      KhachDaTra: 123233445,
      TrangThai: 0,
      TenHang: "hàng 2",
      SL: 1,
      DonGia: 100000,
      GiamGia: 0,
      GiaBan: 100000,
      MaHD: "HD000001",
      MaPhieuThu: "TTHD000001",
      NguoiTao: "Thanh Nam",
      Phuongthuc: 1,
    },
  ];

  const handleRowClick = (rowId) => {
    if (selectedRowId === rowId) {
      setSelectedRowId(null);
    } else {
      setSelectedRowId(rowId);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];

      onSelectionChange(newSelected.length);

      return newSelected;
    });
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ "aria-label": "select all products" }}
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < rows.length
                    }
                    checked={
                      rows.length > 0 && selectedProducts.length === rows.length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedProducts(rows.map((row) => row.id));
                        onSelectionChange(rows.length);
                      } else {
                        setSelectedProducts([]);
                        onSelectionChange(0);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Mã đặt hàng</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Khách cần trả</TableCell>
                <TableCell>Khách đã trả</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow onClick={() => handleRowClick(row.id)}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedProducts.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.MaDH}</TableCell>
                    <TableCell>{row.ThoiGian}</TableCell>
                    <TableCell>{row.KH}</TableCell>
                    <TableCell>{row.KhachCanTra}</TableCell>
                    <TableCell>{row.KhachDaTra}</TableCell>
                    <TableCell>
                      {row.TrangThai === 0 ? "Phiếu tạm" : "Hoàn thành"}
                    </TableCell>
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
                            {row.TrangThai === 0 ? (
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
                                            Mã đặt hàng: {row.MaDH}
                                          </Typography>
                                          <Divider />
                                          <Typography sx={{ p: 1 }}>
                                            Thời gian: {row.ThoiGian}
                                          </Typography>
                                          <Divider />
                                          <Typography sx={{ p: 1 }}>
                                            Khách hàng: {row.KH}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography sx={{ p: 1 }}>
                                            Trạng thái:{" "}
                                            {row.TrangThai == 0
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
                                        mới Hàng hóa: {row.MaDH}
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
                                            <TableCell>Gía bán</TableCell>
                                            <TableCell>Thành tiền</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell>{row.MaDH}</TableCell>
                                            <TableCell>{row.TenHang}</TableCell>
                                            <TableCell>{row.SL}</TableCell>
                                            <TableCell>{row.DonGia}</TableCell>
                                            <TableCell>{row.GiamGia}</TableCell>
                                            <TableCell>{row.GiaBan}</TableCell>
                                            <TableCell>
                                              {row.GiaBan * row.SL}
                                            </TableCell>
                                          </TableRow>
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
                                                Tổng số lượng: {row.SL}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Tổng tiền hàng:{" "}
                                                {row.SL * row.GiaBan}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Giảm giá phiếu đặt:{" "}
                                                {row.GiamGia}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Tổng cộng:{" "}
                                                {row.SL * row.GiaBan -
                                                  row.GiamGia}
                                              </Typography>
                                              <Typography sx={{ mb: 1 }}>
                                                Khách trả: 0
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
                                    </Grid>
                                  </Grid>
                                </Box>
                              </>
                            ) : (
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
                                                Mã đặt hàng: {row.MaDH}
                                              </Typography>
                                              <Divider />
                                              <Typography sx={{ p: 1 }}>
                                                Thời gian: {row.ThoiGian}
                                              </Typography>
                                              <Divider />
                                              <Typography sx={{ p: 1 }}>
                                                Khách hàng: {row.KH}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                              <Typography sx={{ p: 1 }}>
                                                Trạng thái:{" "}
                                                {row.TrangThai == 0
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
                                            {/* Phiếu kiểm kho được tạo tự động khi
                                            thêm mới Hàng hóa: {row.MaDH} */}
                                            {/* đang code ở đây */}
                                            <Textarea
                                              aria-label="minimum height"
                                              minRows={3}
                                              placeholder="Ghi chú"
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
                                              <TableRow>
                                                <TableCell>
                                                  {row.MaDH}
                                                </TableCell>
                                                <TableCell>
                                                  {row.TenHang}
                                                </TableCell>
                                                <TableCell>{row.SL}</TableCell>
                                                <TableCell>
                                                  {row.DonGia}
                                                </TableCell>
                                                <TableCell>
                                                  {row.GiamGia}
                                                </TableCell>
                                                <TableCell>
                                                  {row.GiaBan}
                                                </TableCell>
                                                <TableCell>
                                                  {row.GiaBan * row.SL}
                                                </TableCell>
                                              </TableRow>
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
                                                    Tổng số lượng: {row.SL}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Tổng tiền hàng:{" "}
                                                    {row.GiaBan * row.SL}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Giảm gía phiếu đặt:{" "}
                                                    {row.GiamGia}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Tổng cộng:{" "}
                                                    {row.GiaBan * row.SL}
                                                  </Typography>
                                                  <Typography sx={{ mb: 1 }}>
                                                    Khách trả:{" "}
                                                    {row.GiaBan * row.SL}
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
                                  {/* LỊCH SỬ THANH TOÁN */}
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
                                              <TableCell>Người tạo</TableCell>
                                              <TableCell>Giá trị</TableCell>
                                              <TableCell>Trạng thái</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell>{row.MaHD}</TableCell>
                                              <TableCell>
                                                {row.ThoiGian}
                                              </TableCell>
                                              <TableCell>
                                                {row.NguoiTao}
                                              </TableCell>
                                              <TableCell>
                                                {row.SL * row.GiaBan}
                                              </TableCell>
                                              <TableCell>
                                                {row.TrangThai == 0
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
                                              <TableCell>Người tạo</TableCell>
                                              <TableCell>Phương thức</TableCell>
                                              <TableCell>Trạng thái</TableCell>
                                              <TableCell>
                                                Tiền thu/chi
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell>
                                                {row.MaPhieuThu}
                                              </TableCell>
                                              <TableCell>
                                                {row.ThoiGian}
                                              </TableCell>
                                              <TableCell>
                                                {row.NguoiTao}
                                              </TableCell>
                                              <TableCell>
                                                {row.Phuongthuc == 0
                                                  ? "Tiền mặt"
                                                  : "Chuyển khoản"}
                                              </TableCell>
                                              <TableCell>
                                                {row.TrangThai == 0
                                                  ? "Phiếu tạm"
                                                  : "Đã thanh toán"}
                                              </TableCell>
                                              <TableCell>
                                                {row.SL * row.GiaBan}
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
