import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
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
        sx={{
          width: 800,
          mt: 2,
          boxShadow: 3,
          maxHeight: selectedProducts.length > 5 ? 400 : "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
                Kiểm gần đây
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
                Giá bán
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
                Tồn kho
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
                Thực tế
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
                SL lệch
              </TableCell>

              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
                Giá trị lệch
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}
              >
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
                    {product.fullDisplayName}
                  </TableCell>

                  <TableCell>
                    {product.sale_price ? (
                      handleformat.formatPrice(product.sale_price)
                    ) : (
                      <Box sx={{ color: "#757575", fontStyle: "italic" }}>
                        Không có giá hoặc giá bằng 0
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                    {product.inventory}
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={product.qty}
                      onChange={
                        (e) => handleQtyChange(product.sku_id, e.target.value) // Sử dụng sku_id thay vì id
                      }
                      inputProps={{ min: 1 }}
                      sx={{
                        width: "90px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                    {product.qty - product.inventory}
                  </TableCell>

                  <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                    {product.sale_price && product.qty && product.inventory
                      ? handleformat.formatPrice(
                          product.sale_price * (product.qty - product.inventory)
                        )
                      : "0 đ"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.sku_id)} // Sử dụng sku_id thay vì id
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
