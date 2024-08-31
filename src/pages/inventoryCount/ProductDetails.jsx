import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { handleformat } from "../../utils/format";
function Product_details({ row }) {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#2196f3",
              borderRadius: "10px",
            }}
          >
            <TableCell>Mã hàng</TableCell>
            <TableCell>Tên hàng</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Tổng</TableCell>
            <TableCell>Ghi chú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((item, itemIndex) => (
            <TableRow
              key={itemIndex}
              sx={{
                backgroundColor: itemIndex % 2 === 0 ? "white" : "lightgray",
              }}
            >
              <TableCell>{item.code ? item.code : "No data"}</TableCell>
              <TableCell>{item.name ? item.name : "No data"}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>
                {handleformat.formatPrice(item.qty * item.sale_price)}
              </TableCell>
              <TableCell>{item.note ? item.note : "No data"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Product_details;
