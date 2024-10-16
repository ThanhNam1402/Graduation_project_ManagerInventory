import {
  Box,
  Typography,
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
import { useState, useEffect } from "react";
import { handleformat } from "../../../utils/format";

function Inventory_check_sheet({
  status,
  totalPrice,
  selectedProducts,
  AddInventory,
}) {
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    // Tính tổng giá của từng sản phẩm dựa vào qty và sale_price
    const updatedPrices = selectedProducts.map((product) => {
      const totalSalePriceForProduct = product.product_sku.reduce(
        (skuAcc, sku) => skuAcc + (sku.sale_price || 0),
        0
      );
      return {
        ...product,
        totalProductPrice: product.qty * totalSalePriceForProduct,
      };
    });
    setProductPrices(updatedPrices);
  }, [selectedProducts]);

  console.log("Check selectedProducts", selectedProducts);

  return (
    <>
      <Box sx={{ p: 2, border: 1 }}>
        <Typography variant="h6">Người tạo: ThanhNam</Typography>
        <Typography>Mã kiểm kho: Mã phiếu tự động</Typography>
        <Typography>
          Tổng số lượng nhập:
          {selectedProducts.reduce((acc, item) => acc + item.qty, 0)}
        </Typography>
        <Typography variant="p">
          Tổng giá nhập hàng: {handleformat.formatPrice(totalPrice) || 0}
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
          <Table
            sx={{
              border: "1px solid #2196f3",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2196f3" }}>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", fontSize: "0.8rem" }}
                >
                  Kiểm gần đây
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", fontSize: "0.8rem" }}
                >
                  Số lượng
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", fontSize: "0.8rem" }}
                >
                  Giá bán
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", fontSize: "0.8rem" }}
                >
                  Tổng giá sản phẩm
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productPrices.length > 0 ? (
                productPrices.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Màu nền hàng chẵn và lẻ
                      "&:hover": {
                        backgroundColor: "#e3f2fd", // Màu khi hover
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                      {product.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                      {product.qty}
                    </TableCell>
                    <TableCell>
                      {product.product_sku.length > 0 ? (
                        product.product_sku.map((product_sku, skuIndex) => (
                          <Box key={skuIndex} sx={{ marginBottom: "4px" }}>
                            {handleformat.formatPrice(product_sku.sale_price)}
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ color: "#757575", fontStyle: "italic" }}>
                          Không có dữ liệu
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                      {handleformat.formatPrice(product.totalProductPrice)}
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
                    Không có sản phẩm
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" startIcon={<PrintIcon />}>
            Lưu tạm (Chưa cân bằng)
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={() => AddInventory()}
          >
            Hoàn tất (Cân bằng kho)
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Inventory_check_sheet;
