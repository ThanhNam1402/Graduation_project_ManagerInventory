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
              <TableCell>{item.product_sku.code ? item.product_sku.code : "No data"}</TableCell>
              <TableCell>{item.product_sku.product.name ? item.product_sku.product.name : "No data"}</TableCell>
              <TableCell>{item.ac_number}</TableCell>
              <TableCell>
                {handleformat.formatPrice(item.value)}
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
