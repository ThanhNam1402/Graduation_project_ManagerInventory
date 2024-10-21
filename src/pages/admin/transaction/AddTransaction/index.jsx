import { Typography, Grid } from "@mui/material";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { productService } from "@/services/product/product.service";
import { invertoryService } from "@/services/invertory.service";

import Order_check_sheet from "./Order_check_sheet";
import Product_information from "./Productinformation";
import Find from "./Fine";
import LoadingBackdrop from "@/components/admin/BackDrop";

const AddOrder = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState("1");
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
        keyWord: keyWord || "",
        page: pagination?.page || 1,
        rowsPerPage: pagination?.rowsPerPage || 100,
      }).toString();

      console.log("check filterParams", filterParams);

      const response = await productService.handleGetAllProduct(filterParams);
      if (response) {
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

  const handleQtyChange = (productId, qty) => {
    if (qty === "") {
      const updatedProducts = selectedProducts.map((item) =>
        item.id === productId ? { ...item, qty: "" } : item
      );
      setSelectedProducts(updatedProducts);
      return; // Dừng lại để không xử lý tiếp.
    }
    // Chuyển đổi giá trị input thành số nguyên
    const newQty = parseInt(qty, 10);

    // Kiểm tra giá trị hợp lệ (không nhỏ hơn 1)
    if (newQty >= 0) {
      const updatedProducts = selectedProducts.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      );
      setSelectedProducts(updatedProducts);
      updateTotalPrice(updatedProducts);
    }
  };

  const handleDelete = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (item) => item.id !== productId
    );
    setSelectedProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const updateTotalPrice = (products) => {
    const total = products.reduce((acc, item) => {
      console.log("Check item", item);

      // Tính tổng sale_price cho mỗi product_sku
      const totalSalePriceForSku = item.product_sku.reduce((skuAcc, sku) => {
        const salePrice = sku.sale_price || 0; // Nếu sale_price không tồn tại, sử dụng 0
        return skuAcc + salePrice;
      }, 0);

      console.log("Total sale price for SKU", totalSalePriceForSku);

      // Cộng tổng giá của các product_sku cho từng item
      return acc + item.qty * totalSalePriceForSku;
    }, 0);

    console.log("Total price", total);
    setTotalPrice(total);
  };

  const AddOrder = async () => {
    setLoading(true);
    const dataCreat = {
      // status: status, // Trường status hiện có từ state
      // cart: selectedProducts.flatMap((product) =>
      //   product.product_sku.map((sku) => ({
      //     quantity: product.qty, // Số lượng sản phẩm
      //     sku_id: sku.id, // ID của SKU
      //   }))
      // ),
    };

    console.log("Check dataCreat", dataCreat);

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   setLoading(false);
    //   const response = await invertoryService.hendleCreat(dataCreat);
    //   console.log(response.data);
    //   toast.success(response.data.message);
    // } catch (error) {
    //   toast.success(error);
    //   console.log(error);
    // }
    setSelectedProducts([]);
    setTotalPrice(0);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ p: 2, m: 2 }}>
          <Typography variant="h5">Đặt hàng</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Find
            value={value}
            handleAutocompleteChange={handleAutocompleteChange}
            options={options}
          />
          <Product_information
            selectedProducts={selectedProducts}
            handleQtyChange={handleQtyChange}
            handleDelete={handleDelete}
          />
        </Grid>

        <Grid item xs={5}>
          <LoadingBackdrop loading={loading} />
          <Order_check_sheet
            status={status}
            totalPrice={totalPrice}
            selectedProducts={selectedProducts}
            AddOrder={AddOrder}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddOrder;
