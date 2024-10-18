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
  import { useEffect } from "react";
  import { handleformat } from "../../../utils/format";
  
  function Product_information({
    data,
    onQtyChange,
    onDelete,
    onTotalQuantityChange,
  }) {
    const detailStock = data.detail_stock || [];
  
    useEffect(() => {
      const totalQty = detailStock.reduce((acc, item) => acc + (item.ac_number || 0), 0);
      onTotalQuantityChange(totalQty);
    }, [detailStock, onTotalQuantityChange]);
  
    return (
      <TableContainer
        component={Paper}
        sx={{
          width: 800,
          mt: 2,
          boxShadow: 3,
          maxHeight: detailStock.length > 5 ? 400 : "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>Kiểm gần đây</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>Giá bán</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>Tồn kho</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>Thực tế</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>SL lệch</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>Giá trị lệch</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#2196f3" }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {detailStock.length > 0 ? (
              detailStock.map((item, index) => {
                const product = item.product_sku;
                const totalDifference = item.ac_number - item.stock;
  
                return (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>{product.code}</TableCell>
                    <TableCell>{handleformat.formatPrice(product.sale_price)}</TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>{item.stock}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.ac_number || ""}
                        onChange={(e) => {
                          const newQty = Number(e.target.value);
                          onQtyChange(product.id, newQty);
                        }}
                        inputProps={{ min: 0 }}
                        sx={{
                          width: "90px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>{totalDifference}</TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>{handleformat.formatPrice(product.sale_price * totalDifference) || "0 đ"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => onDelete(product.id)}
                        sx={{ textTransform: "none" }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ fontStyle: "italic", color: "#757575" }}>
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default Product_information;
  