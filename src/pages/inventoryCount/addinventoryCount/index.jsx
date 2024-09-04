import { Typography, Grid } from "@mui/material";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { productService } from "./../../../services/product.service";
import { invertoryService } from "./../../../services/invertory.service";

import Inventory_check_sheet from "./InventoryCheckSheet";
import Product_information from "./ProductInformation";
import Find from "./Find";
import LoadingBackdrop from "../../../components/BackDrop";

const AddInventoryCount = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState("0");
  const [loading, setLoading] = useState(false);

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
        setOptions(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Dùng đẻ push data vào 1 arr khi người dùng chọn sản phẩm:
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

  const updateTotalPrice = (products) => {
    const total = products.reduce(
      (acc, item) => acc + item.qty * item.sale_price,
      0
    );
    setTotalPrice(total);
  };

  const handleGetCode = async () => {
    try {
      const response = await invertoryService.handleGetCode();
      console.log("Check code", response);

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
    setLoading(true);
    try {
      //Lấy code hiện tại
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
      let dataCreat = {
        status: 0,
        code: FNcode,
      };
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      const response = await invertoryService.hendleCreat(dataCreat);
      console.log(response);
      toast.success(response.messges);
    } catch (error) {
      toast.success(error);
      console.log(error);
    }

    handleCreatInventoryDetail();
    setSelectedProducts([]);
    setTotalPrice(0);
  };

  const handleCreatInventoryDetail = async () => {
    try {
      const currentCode = await handleGetCode();
      const inventory_count_id = currentCode.id;

      const promises = selectedProducts.map(async (item) => {
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

  const handleChange = (event) => {
    setStatus(event.target.value);
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
          {/* CODE Ở ĐÂY */}
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
        </Grid>

        <Grid item xs={5}>
          <LoadingBackdrop loading={loading} />
          <Inventory_check_sheet
            status={status}
            handleChange={handleChange}
            totalPrice={totalPrice}
            selectedProducts={selectedProducts}
            AddInventory={AddInventory}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddInventoryCount;
