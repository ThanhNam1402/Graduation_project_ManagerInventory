import {
  Box,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";

const AddTransaction = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ p: 2, m: 2 }}>
          <Typography variant="h5">Thêm phiếu đặt hàng</Typography>
        </Grid>
        <Grid item xs={4} sx={{ p: 2, m: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Tìm kiếm..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box sx={{ p: 2, border: 1 }}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>STT</TableCell>
                    <TableCell>Mã hàng</TableCell>
                    <TableCell>Tên hàng</TableCell>
                    <TableCell>DVT</TableCell>
                    <TableCell>Tồn kho</TableCell>
                    <TableCell>Thực tế</TableCell>
                    <TableCell>SL lệch</TableCell>
                    <TableCell>Giá trị lệch</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>SP000003</TableCell>
                    <TableCell>Phích tròn siêu tải PC6000</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>-1</TableCell>
                    <TableCell>-1,110,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Box sx={{ p: 2, border: 1 }}>
            <Typography variant="h6">ThanhNam</Typography>
            <Typography>Mã kiểm kho: Mã phiếu tự động</Typography>
            <Typography>Trạng thái: Phiếu tạm</Typography>
            <Typography>Tổng SL thực tế: 1</Typography>
            <TextField
              label="Ghi chú"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              sx={{ my: 2 }}
            />
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Kiểm gần đây</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Phích tròn siêu tải PC6000 (1)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<PrintIcon />}
              >
                Lưu tạm
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
              >
                Hoàn tất
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddTransaction;
