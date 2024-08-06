import {
  Box,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { productService } from "./../../../services/product.service";
import { invertoryService } from "./../../../services/invertory.service";

const AddInventoryCount = () => {
  const [data, setData] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  let filters = "";
  let keyWord = "";
  let pagination = 0;

  useEffect(() => {
    GetAllProducts();
  }, [filters, pagination?.page, pagination?.rowsPerPage, keyWord]);


  const GetAllProducts = async () => {
    try {
      let filterParams = new URLSearchParams({
        categoryID: filters.categoryID || 0,
        displayOption: filters.displayOption || 0,
        keyWord: keyWord || "",
        onHand: filters.onHand || 0,
        order: pagination?.order || "asc",
        orderBy: pagination?.orderBy || "name",
        page: pagination?.page || 0,
        rowsPerPage: pagination?.rowsPerPage || 5,
      }).toString();

      console.log(filterParams);

      const response = await productService.handleGetAllProduct(filterParams);
      console.log(response);

      if (response && response.success === true) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePurchase = (product) => {
    setPurchasedProducts((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleIncrease = (productId) => {
    setPurchasedProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setPurchasedProducts((prev) =>
      prev.map((item) =>
        item.id === productId && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const handleDelete = (productId) => {
    setPurchasedProducts((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  const handleGetCode = async () => {
    try {
      const response = await invertoryService.handleGetCode();
      if (response) {
        return response.data;
      } else {
        throw new Error("Failed to retrieve code");
      }
    } catch (error) {
      console.error("Error fetching code:", error);
      throw error;
    }
  };

  const AddInventory = async () => {
    try {
      //Lấy code hiện tại
      const currentCode = await handleGetCode();
      console.log(currentCode);
      if (!currentCode) {
        throw new Error("Current code is not available");
      }
      let code = currentCode.code;

      //Tăng giá trị lên 1
      const newCode = (parseInt(code.replace("KH", "")) + 1)
        .toString()
        .padStart(4, "0");
      const FNcode = `KH${newCode}`;

      let dataCreat = {
        status: 0,
        code: FNcode,
      };
      const response = await invertoryService.hendleCreat(dataCreat);
      console.log(response);
    toast.success(response.messges);

    } catch (error) {
      console.log(error);
    }

    handleCreatInventoryDetail();
  };

  const handleCreatInventoryDetail = async () => {
    try {
      const currentCode = await handleGetCode();
      const inventory_count_id = currentCode.id;

      const promises = purchasedProducts.map(async (item) => {
        console.log(item);
        let data = {
          inventory_count_id: inventory_count_id,
          product_id: item.id,
          qty: item.qty,
          price: item.price,
          sale_price: item.sale_price,
          type: 0,
          EndingStocks: 10,
        };

        try {
          const response = await invertoryService.handleCreatInventoryDetail(
            data
          );
          console.log("Response for item", item.id, ":", response);
        } catch (error) {
          console.error(
            "Error creating inventory detail for item",
            item.id,
            ":",
            error
          );
        }
      });
      await Promise.all(promises);
      console.log("All inventory details have been created successfully.");
    } catch (error) {
      console.error("Error in handleCreatInventoryDetail:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ p: 2, m: 2 }}>
          <Typography variant="h5">Kiểm kho</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box sx={{ p: 2, border: 1 }}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Mã hàng</TableCell>
                    <TableCell>Tên hàng</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Giá giảm</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.sale_price}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handlePurchase(item)}
                        >
                          Mua
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Box sx={{ p: 2, border: 1 }}>
            <Typography variant="h6">ThanhNam</Typography>
            <Typography>Mã kiểm kho: Mã phiếu tự động</Typography>
            <Typography>Trạng thái: Phiếu tạm</Typography>
            <Typography>
              Tổng SL thực tế:{" "}
              {purchasedProducts.reduce((acc, item) => acc + item.qty, 0)}
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Kiểm gần đây</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Giá bán</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchasedProducts.map((product, index) => (
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
                      <TableCell>
                        {product.sale_price}
                      </TableCell>
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
            </Box>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<PrintIcon />}
              >
                Lưu tạm
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                onClick={() => AddInventory()}
              >
                Hoàn tất
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddInventoryCount;
