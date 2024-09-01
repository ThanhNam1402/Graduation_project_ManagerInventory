import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import { handleformat } from "../../../utils/format";

function Inventory_check_sheet({
  status,
  handleChange,
  totalPrice,
  selectedProducts,
  AddInventory,
}) {
  return (
    <>
      <Box sx={{ p: 2, border: 1 }}>
        <Typography variant="h6">Người tạo: ThanhNam</Typography>
        <Typography>Mã kiểm kho: Mã phiếu tự động</Typography>
        <Typography>
          Trạng thái:{" "}
          <Select
            value={status}
            onChange={handleChange}
            size="small"
            sx={{ height: 25, width: 130 }}
          >
            <MenuItem value="0">Phiếu tạm</MenuItem>
            <MenuItem value="1">Đã xử lý</MenuItem>
          </Select>
        </Typography>
        <Typography>
          Tổng SL thực tế:
          {selectedProducts.reduce((acc, item) => acc + item.qty, 0)}
        </Typography>
        <Typography variant="p">
          Tổng giá: {handleformat.formatPrice(totalPrice) || 0}
        </Typography>
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
              <TableRow sx={{ backgroundColor: "#2196f3" }}>
                <TableCell>Kiểm gần đây</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá bán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {product.name} ({product.code})
                  </TableCell>
                  <TableCell>{product.qty}</TableCell>
                  <TableCell>{handleformat.formatPrice(product.sale_price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" startIcon={<PrintIcon />}>
            Lưu tạm
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={() => AddInventory()}
          >
            Hoàn tất
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Inventory_check_sheet;
