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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function ListInventoryCount({ onSelectionChange }) {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const rows = [
    {
      id: 1,
      MaKiemKho: "SP000001",
      tenHang: "MD.M60002 Bút sáp vặn NGÂN 18 màu 12/144/t",
      SoLuongThucTe: "21,212,121",
      TongThucTe: "21,212,121",
      giaChung: "21,212,121",
      TongChenhLech: "21,212,121",
      SLLechTang: "21,212,121",
      SLLechGiam: 0,
      ThoiGian: "19/07/2024 20:52",
      NgayCanBang: "19/07/2024 20:52",
      Trangthai: 0,
      Ghichu: "Phiếu kiểm kho được tạo tự động khi thêm mới Hàng hóa: ",
    },
    {
      id: 2,
      MaKiemKho: "SP000002",
      tenHang: "MD.M60002 Bút sáp vặn NGÂN 18 màu 12/144/t",
      SoLuongThucTe: "21,212,121",
      TongThucTe: "21,212,121",
      giaChung: "21,212,121",
      TongChenhLech: "21,212,121",
      SLLechTang: "21,212,121",
      SLLechGiam: 0,
      ThoiGian: "19/07/2024 20:52",
      NgayCanBang: "19/07/2024 20:52",
      Trangthai: 0,
      Ghichu: "Phiếu kiểm kho được tạo tự động khi thêm mới Hàng hóa: ",
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
                <TableCell>Mã kiểm kho</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Ngày cân bằng</TableCell>
                <TableCell>SL thực tế</TableCell>
                <TableCell>Tổng thực tế</TableCell>
                <TableCell>Tổng chênh lệch</TableCell>
                <TableCell>SL lệch tăng</TableCell>
                <TableCell>SL lệch giảm</TableCell>
                <TableCell>Ghi chú</TableCell>
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
                    <TableCell>{row.MaKiemKho}</TableCell>
                    <TableCell>{row.ThoiGian}</TableCell>
                    <TableCell>{row.NgayCanBang}</TableCell>
                    <TableCell>{row.SoLuongThucTe}</TableCell>
                    <TableCell>{row.TongThucTe}</TableCell>
                    <TableCell>{row.TongChenhLech}</TableCell>
                    <TableCell>{row.SLLechTang}</TableCell>
                    <TableCell>{row.SLLechGiam}</TableCell>
                    <TableCell>
                      {row.Ghichu} {row.MaKiemKho}
                    </TableCell>
                    <TableCell>
                      {row.Trangthai === 0 ? "Đã câng bằng" : "Chưa cân bằng"}
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
                                      Mã kiểm kho: {row.MaKiemKho}
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ p: 1 }}>
                                      Thời gian: {row.ThoiGian}
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ p: 1 }}>
                                      Ngày cân bằng: {row.NgayCanBang}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography sx={{ p: 1 }}>
                                      Trạng thái:{" "}
                                      {row.Trangthai == 0
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
                                  Hàng hóa: {row.MaKiemKho}
                                </Typography>
                              </Grid>
                            </Grid>

                            <TableContainer component={Paper} sx={{ mt: 3 }}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Mã hàng</TableCell>
                                    <TableCell>Tên hàng</TableCell>
                                    <TableCell>Tồn kho</TableCell>
                                    <TableCell>Thực tế</TableCell>
                                    <TableCell>SL lệch</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {/* Dữ liệu hàng hóa */}
                                  <TableRow>
                                    <TableCell>{row.MaKiemKho}</TableCell>
                                    <TableCell>{row.tenHang}</TableCell>
                                    <TableCell>{row.SLLechGiam}</TableCell>
                                    <TableCell>{row.TongThucTe}</TableCell>
                                    <TableCell>{row.SLLechTang}</TableCell>
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
                              {/* <Grid item>
                                <Typography>
                                  Số lượng thực: {row.SoLuongThucTe}
                                </Typography>
                                <Typography>
                                  Số lượng lệch tăng: {row.SLLechTang}
                                </Typography>
                                <Typography>
                                  Số lượng lệch giảm: {row.SLLechGiam}
                                </Typography>
                                <Typography>
                                  Số lượng chênh lệch: {row.TongChenhLech}
                                </Typography>
                              </Grid> */}
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
                                        Số lượng thực:
                                      </Typography>
                                      <Typography sx={{ mb: 1 }}>
                                        Số lượng lệch tăng:
                                      </Typography>
                                      <Typography sx={{ mb: 1 }}>
                                        Số lượng lệch giảm:
                                      </Typography>
                                      <Typography sx={{ mb: 1 }}>
                                        Số lượng chênh lệch:
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
                            </Grid>
                            <Box sx={{ mt: 2 , display: "flex", justifyContent: "flex-end"}}>
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ mr: 1 }}
                                startIcon={<SaveOutlinedIcon/>}
                              >
                                Lưu
                              </Button>
                              <Button
                                variant="contained"
                                // color="secondary"
                                sx={{ mr: 1, backgroundColor: "gray" }}
                                startIcon={<LocalPrintshopOutlinedIcon/>}
                              >
                                In
                              </Button>
                              <Button
                                variant="contained"
                                color="warning"
                                sx={{ mr: 1, backgroundColor: 'gray' }}
                                startIcon={<FileDownloadOutlinedIcon/>}
                              >
                                Xuất file
                              </Button>
                              <Button
                                variant="contained"
                                color="success"
                                sx={{ mr: 1 }}
                                startIcon={<ContentCopyOutlinedIcon/>}
                              >
                                Sao chép
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ mr: 1 }}
                                startIcon={<DeleteForeverOutlinedIcon/>}
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
