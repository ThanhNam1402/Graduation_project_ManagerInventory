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
  FormControlLabel, 
  Radio,
  RadioGroup,
  FormControl
} from "@mui/material";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { productService } from "./../../../services/product.service";
import { orderService } from "./../../../services/order.service";
import { handleformat } from "./../../../utils/format";

const AddTransaction = () => {
  const [data, setData] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(null); 
  const [totalPrice, setTotalPrice] = useState(0);

  let filters = "";
  let keyWord = "";
  let pagination = 0;

  useEffect(() => {
    console.log(userName);
    console.log("Note", note);
    console.log("status", status);
    
  }, [userName, note, status]);

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
      console.log("Check data get Pb" ,response.data);

      if (response && response.success === true) {
        const filteredData = response.data.filter(item => item.onHand !== null && item.onHand !== 0
        );
        setData(filteredData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleChageNote = (event) => {
    setNote(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(parseInt(event.target.value, 10));
  };


  const handlePurchase = (product) => {
    setPurchasedProducts((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      let updatedProducts;

      if (existingProduct) {
        updatedProducts = prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedProducts = [...prev, { ...product, qty: 1 }];
      }

      // Cập nhật tổng giá
      const total = updatedProducts.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        0
      );
      setTotalPrice(total);

      return updatedProducts;
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
    setPurchasedProducts((prev) => {
      const updatedProducts = prev.map((item) =>
        item.id === productId && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );

      // Cập nhật tổng giá
      const total = updatedProducts.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        0
      );
      setTotalPrice(total);

      return updatedProducts;
    });
  };

  const handleDelete = (productId) => {
    setPurchasedProducts((prev) => {
      const updatedProducts = prev.filter((item) => item.id !== productId);

      // Cập nhật tổng giá
      const total = updatedProducts.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        0
      );
      setTotalPrice(total);

      return updatedProducts;
    });
  };

  const handleGetCode = async () => {
    try {
      const response = await orderService.handleGetCode();
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

  const Addorder = async () => {
    try {
      // Lấy code hiện tại
      const currentCode = await handleGetCode();
      console.log(currentCode);
      if (!currentCode) {
        throw new Error("Current code is not available");
      }

      let code = currentCode.code;

      // Tách phần chữ và phần số trong mã
      const match = code.match(/^([A-Za-z]*)(\d+)$/);
      if (!match) {
        throw new Error("Invalid code format");
      }

      const prefix = match[1];
      const numberPart = match[2];

      // Tăng số lên 1
      const newNumber = (parseInt(numberPart, 10) + 1)
        .toString()
        .padStart(numberPart.length, "0");

      // Kết hợp phần chữ với số mới
      const FNcode = `${prefix}${newNumber}`;
      const client_name = userName || "Khách lẽ";
      const FNnote = note || "Không có"
      const FNstatus = status || 0;

      let dataCreat = {
        client_name: client_name,
        client_paid: totalPrice,
        code: FNcode,
        status: FNstatus,
        note: FNnote
      };

      await handleCreatOrderDetail();


      const response = await orderService.hendleCreat(dataCreat);
      console.log(response);
      toast.success(response.messges);
    } catch (error) {
      console.log(error);
    }

  };

  const handleCreatOrderDetail = async () => {
    try {
      if (purchasedProducts.length === 0) {
      toast.error("No products were added to the order!");
        throw new Error("No products were added to the order!");
      }
  
      const currentCode = await handleGetCode();
      const order_id = currentCode.id;
  
      const promises = purchasedProducts.map(async (item) => {
        console.log(item);
  
        let data = {
          order_id: order_id,
          product_id: item.id,
          qty: item.qty,
          total: item.qty * item.sale_price,
          price: item.price,
          sale_price: item.sale_price,
          type: 0,
        };
  
        try {
          const response = await orderService.handleCreatOrderDetail(data);
          console.log("Response for item", item.id, ":", response);
        } catch (error) {
          console.error(`Error creating inventory detail for item ${item.id}:`, error);
          throw error; // Ném lỗi ra ngoài để Addorder có thể xử lý
        }
      });
  
      await Promise.all(promises);
      console.log("All inventory details have been created successfully.");
      
    } catch (error) {
      console.error("Error in handleCreatOrderDetail:", error);
      throw error; // Ném lỗi ra ngoài để Addorder có thể xử lý
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ p: 2, m: 2 }}>
          <Typography variant="h5">ĐẶT HÀNG</Typography>
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
            <Typography>Mã kiểm dặt hàng: Mã phiếu tự động</Typography>
            <Typography>
              Tổng SL thực tế:
              {purchasedProducts.reduce((acc, item) => acc + item.qty, 0)}
            </Typography>
            <Typography variant="p">
              Tổng giá: {handleformat.formatPrice(totalPrice)}
            </Typography>
            <TextField
              label="Tên người mua"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={handleNameChange}
              sx={{ my: 2 }}
            />
             <FormControl>
             <Typography variant="p">
              Trạng thái phiếu
            </Typography>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            value={status}
            onChange={handleStatusChange}
          >
            <FormControlLabel value={1} control={<Radio />} label="Hoàn thành" />
            <FormControlLabel value={0} control={<Radio />} label="Chưa thanh toán" />
          </RadioGroup>
        </FormControl>
            <TextField
              label="Ghi chú"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              onChange={handleChageNote}
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
                      <TableCell>{product.sale_price}</TableCell>
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
                onClick={() => Addorder()}
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

export default AddTransaction;
