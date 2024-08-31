import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { handleformat } from "../../../utils/format";

function Temporary_ticket({row}) {
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã hàng</TableCell>
              <TableCell>Tên hàng</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Giá Giảm</TableCell>
              <TableCell>Thành Tiền</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((item, itemIndex) => (
              <TableRow key={itemIndex}>
                <TableCell>{item.code ? item.code : "No data"}</TableCell>
                <TableCell>{item.name ? item.name : "No data"}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{handleformat.formatPrice(item.price)}</TableCell>
                <TableCell>
                  {item.sale_price
                    ? handleformat.formatPrice(item.sale_price)
                    : "No data"}
                </TableCell>
                <TableCell>
                  {item.sale_price && item.qty
                    ? handleformat.formatPrice(item.sale_price * item.qty)
                    : "No data"}
                </TableCell>
                <TableCell>{item.note ? item.note : "No data"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Temporary_ticket;
