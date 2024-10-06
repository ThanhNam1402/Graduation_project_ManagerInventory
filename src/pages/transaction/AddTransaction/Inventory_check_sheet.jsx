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
  FormControl,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Radio
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../../../context/AppContent";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import { handleformat } from "../../../utils/format";

function Inventory_check_sheet({
  handleChageNote,
  handleStatusChange,
  handleNameChange,
  userName,
  purchasedProducts,
  status,
  totalPrice,
  handleDecrease,
  handleIncrease,
  handleDelete,
  Addorder,
}) {
  const appContext = useAppContext();

  return (
    <>
      <Box sx={{ p: 2, border: 1 }}>
        <Typography variant="h6">{appContext?.userInfo?.data?.name}</Typography>
        <Typography>Mã kiểm dặt hàng: Mã phiếu tự động</Typography>
        <Typography>
          Tổng SL thực tế:
          {purchasedProducts.reduce((acc, item) => acc + item.qty, 0)}
        </Typography>
        <Typography variant="p">
          Tổng giá: {handleformat.formatPrice(totalPrice)}
        </Typography>
        <TextField
          label="Tên người mua"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={handleNameChange}
          sx={{ my: 2 }}
        />
        <FormControl>
          <Typography variant="p">Trạng thái phiếu</Typography>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            value={status}
            onChange={handleStatusChange}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Hoàn thành"
            />
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Chưa thanh toán"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Ghi chú"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={handleChageNote}
          sx={{ my: 2 }}
        />
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchasedProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {product.name} ({product.code})
                  </TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleDecrease(product.id)}>
                      <RemoveIcon />
                    </IconButton>
                    {product.qty}

                    <IconButton onClick={() => handleIncrease(product.id)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{product.sale_price}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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
            onClick={() => Addorder()}
          >
            Hoàn tất
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Inventory_check_sheet;
