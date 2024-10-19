import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TableContainer,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";
import { handleformat } from "../../../utils/format";

function Inventory_check_sheet({
  totalPrice,
  selectedProducts,
  AddInventory,
  setStatus,
}) {
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    const updatedPrices = selectedProducts.map((product) => {
      const totalSalePriceForProduct = product.sale_price || 0;
      return {
        ...product,
        totalProductPrice: product.qty * totalSalePriceForProduct,
      };
    });
    setProductPrices(updatedPrices);
  }, [selectedProducts]);

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Người tạo: ThanhNam
      </Typography>
      <Typography sx={{ mb: 1 }}>Mã kiểm kho: Mã phiếu tự động</Typography>
      <Typography sx={{ mb: 1 }}>
        Tổng số lượng thực tế:{" "}
        <span style={{ fontWeight: "bold", color: "#3f51b5" }}>
          {selectedProducts.reduce((acc, item) => acc + item.qty, 0)}
        </span>
      </Typography>
      <TableContainer
        sx={{ maxHeight: selectedProducts.length > 5 ? 300 : "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "red" }}>
              {[
                "Kiểm gần đây",
                "Số lượng thực tế",
                "Số lượng lệch",
                "Giá trị lệch",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    bgcolor: "#2196f3",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productPrices.length > 0 ? (
              productPrices.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#fff",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                    {product.fullDisplayName}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {product.qty}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      color: product.sale_price ? "#000" : "#757575",
                    }}
                  >
                    {product.sale_price ? (
                      product.qty - product.inventory
                    ) : (
                      <Box sx={{ fontStyle: "italic" }}>Không có dữ liệu</Box>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {product.sale_price && product.qty && product.inventory
                      ? handleformat.formatPrice(
                          product.sale_price * (product.qty - product.inventory)
                        )
                      : "0 đ"}
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
      </TableContainer>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={() => {
            setStatus(1);
            AddInventory(1);
          }}
          sx={{ fontSize: "0.9rem", fontWeight: "bold", py: 1.5, px: 3 }}
        >
          Lưu tạm (Chưa cân bằng)
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={() => {
            setStatus(2);
            AddInventory(2);
          }}
          sx={{ fontSize: "0.9rem", fontWeight: "bold", py: 1.5, px: 3 }}
        >
          Hoàn tất (Cân bằng kho)
        </Button>
      </Box>
    </Box>
  );
}

export default Inventory_check_sheet;
