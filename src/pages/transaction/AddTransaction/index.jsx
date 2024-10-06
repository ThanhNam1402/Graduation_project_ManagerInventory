import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { productService } from "./../../../services/product.service";
import { orderService } from "./../../../services/order.service";
import { delay } from "../../../utils/func";

import Find from "./Fine";
import Product_information from "./Productinformation";
import Inventory_check_sheet from "./Inventory_check_sheet";
const AddTransaction = () => {

  const [data, setData] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        rowsPerPage: pagination?.rowsPerPage || 15,
      }).toString();

      const response = await productService.handleGetAllProduct(filterParams);
      console.log("Check data get Pb", response.data);

      if (response && response.success === true) {
        setData(response.data);
        setOptions(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      setSelectedProducts((prev) => {
        const existingProductIndex = prev.findIndex(
          (item) => item.id === newValue.id
        );
        let updatedProducts;
        if (existingProductIndex !== -1) {
          // Check xem có bị trùng sản phẩm không, nếu trùng thì tăng SL lên 1 và cập nhật lại tổng giá
          updatedProducts = [...prev];
          updatedProducts[existingProductIndex].qty += 1;
          updatedProducts[existingProductIndex].totalPrice =
            updatedProducts[existingProductIndex].qty *
            updatedProducts[existingProductIndex].sale_price;
        } else {
          // Nếu không thì thêm vào arr 1 sp mới
          const updatedProduct = {
            ...newValue,
            qty: 1,
            totalPrice: newValue.sale_price,
          };
          updatedProducts = [...prev, updatedProduct];
        }
        updateTotalPrice(updatedProducts);
        return updatedProducts;
      });
      setValue(null);
    }
  };

  const updateTotalPrice = (products) => {
    const total = products.reduce(
      (acc, item) => acc + item.qty * item.sale_price,
      0
    );
    setTotalPrice(total);
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

  const handleIncrease = (productId) => {
    const updatedProducts = selectedProducts.map((item) =>
      item.id === productId ? { ...item, qty: item.qty + 1 } : item
    );
    setSelectedProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const handleDecrease = (productId) => {
    const updatedProducts = selectedProducts.map((item) =>
      item.id === productId && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setSelectedProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const handleDelete = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (item) => item.id !== productId
    );
    setSelectedProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
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

      setIsLoading(true);
      await delay(1500);
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
      const FNnote = note || "Không có";
      const FNstatus = status || 0;

      let dataCreat = {
        client_name: client_name,
        client_paid: totalPrice,
        code: FNcode,
        status: FNstatus,
        note: FNnote,
      };

      if (purchasedProducts.length > 0) {
        const response = await orderService.hendleCreat(dataCreat);
        console.log(response);
        toast.success(response.messges);
      }
    } catch (error) {
      console.log(error);
    }
    await handleCreatOrderDetail();

    setPurchasedProducts([]);
    setTotalPrice(0);
    setIsLoading(false);
  };

  const handleCreatOrderDetail = async () => {
    try {
      console.log(purchasedProducts.length);
      if (purchasedProducts.length === 0) {
        return toast.error("No products were added to the order!");
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
          console.error(
            `Error creating inventory detail for item ${item.id}:`,
            error
          );
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ p: 2, m: 2 }}>
          <Typography variant="h5">ĐẶT HÀNG</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box sx={{ p: 2, border: 1 }}>
            <Find
              value={value}
              handleAutocompleteChange={handleAutocompleteChange}
              options={options}
            />

            <Product_information
              selectedProducts={selectedProducts}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleDelete={handleDelete}
            />
          </Box>
        </Grid>

        <Grid item xs={5}>
        <Inventory_check_sheet
        handleChageNote={handleChageNote}
        handleStatusChange={handleStatusChange}
        handleNameChang={handleNameChange}
        userName={userName}
        purchasedProducts={purchasedProducts}
        status={status}
        totalPrice={totalPrice}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
        handleDelete={handleDelete}
        Addorder={Addorder}
        />
        </Grid>
      </Grid>
    </>
  );
};

export default AddTransaction;
