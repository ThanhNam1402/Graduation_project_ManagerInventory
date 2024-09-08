import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { handleformat } from "../../../utils/format";
function Product_information({
  selectedProducts,
  handleDecrease,
  handleIncrease,
  handleDelete,
}) {
  return (
    <>
      <Table sx={{ width: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Kiểm gần đây</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Giá bán</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts.map((product, index) => (
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
              <TableCell>{handleformat.formatPrice(product.sale_price)}</TableCell>
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
    </>
  );
}

export default Product_information;
