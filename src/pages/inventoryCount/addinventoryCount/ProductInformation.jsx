import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TextField,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleformat } from "../../../utils/format";

function Product_information({
  selectedProducts,
  handleDelete,
  handleQtyChange,
}) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: 800, mt: 2, boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2196f3" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Kiểm gần đây
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Số lượng
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Giá bán
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={product.qty}
                      onChange={(e) =>
                        handleQtyChange(product.id, e.target.value)
                      }
                      inputProps={{ min: 1 }}
                      sx={{
                        width: "90px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {product.product_sku.length > 0 ? (
                      product.product_sku.map((product_sku, index) => (
                        <div key={index}>
                          {product_sku.sale_price
                            ? handleformat.formatPrice(product_sku.sale_price)
                            : "No data"}
                        </div>
                      ))
                    ) : (
                      <div>No data</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ fontStyle: "italic", color: "#757575" }}
                >
                  Không có sản phẩm nào được chọn
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Product_information;
