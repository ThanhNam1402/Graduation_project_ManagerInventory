import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { handleformat } from "@/utils/format";

function Product_details({ row, result }) {
  console.log("Check row in to PD detail", row);
  console.log("Check result in to PD detail", result);

  return (
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
          <TableCell>Tồn kho</TableCell>
          <TableCell>Thực tế</TableCell>
          <TableCell>SL lệch</TableCell>
          <TableCell>Giá trị lệch</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {row.map((item, itemIndex) => (
          <TableRow
            key={item.id} // Dùng id để làm khóa
            sx={{
              backgroundColor: itemIndex % 2 === 0 ? "white" : "lightgray",
            }}
          >
            <TableCell>{item.product_sku.code || 0}</TableCell>
            <TableCell>
              {result[itemIndex]?.product || "No product"}
              {result[itemIndex]?.optionValue !== "No options" &&
                ` - ${result[itemIndex]?.optionValue}`}
            </TableCell>
            <TableCell>{item.product_sku.inventory}</TableCell>
            <TableCell>{item.total_difference}</TableCell>
            <TableCell>{item.stock}</TableCell>

            <TableCell>{handleformat.formatPrice(item.value) || "No data"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Product_details;
