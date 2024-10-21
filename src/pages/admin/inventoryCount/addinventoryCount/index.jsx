import { Typography, Grid } from "@mui/material";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { productService } from "@/services/product/product.service";
import { invertoryService } from "@/services/invertory.service";

import Inventory_check_sheet from "./InventoryCheckSheet";
import Product_information from "./ProductInformation";
import Find from "./Find";
import LoadingBackdrop from "@/components/admin/BackDrop";

const AddInventoryCount = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState(null);
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

      console.log("Check data response.data", response.data);

      if (response && Array.isArray(response.data)) {
        const formattedData = response.data.flatMap((product) => {
          // Nếu không có product_sku, ta tạo một mục duy nhất cho sản phẩm
          if (!product.product_sku || product.product_sku.length === 0) {
            return [
              {
                id: product.id,
                name: product.name,
                sale_price: 0, // Hoặc giá mặc định nếu sản phẩm không có giá
                qty: 0,
                option_values: [], // Không có biến thể
                fullDisplayName: product.name, // Chỉ hiển thị tên sản phẩm
                inventory: product.inventory,
              },
            ];
          }

          // Nếu có product_sku, xử lý từng sku
          return product.product_sku.map((sku) => {
            const optionValues = sku.option_value.map(
              (option) => `${option.name}`
            ); // Chỉ lấy tên biến thể
            const fullDisplayName =
              optionValues.length > 0
                ? `${product.name} - ${optionValues.join(" - ")}` // Kết hợp bằng dấu gạch ngang
                : product.name; // Chỉ hiển thị tên sản phẩm nếu không có biến thể

            return {
              sku_id: sku.id,
              name: product.name, // Tên sản phẩm
              sale_price: sku.sale_price, // Giá bán
              option_values: optionValues, // Định dạng tên biến thể
              fullDisplayName: fullDisplayName, // Tên hiển thị đầy đủ
              inventory: sku.inventory,
            };
          });
        });

        setData(response.data);
        setOptions(formattedData);
        console.log("Check formattedData", formattedData);
      } else {
        console.error("Dữ liệu không phải là mảng");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Dùng đẻ push data vào 1 arr khi người dùng chọn sản phẩm:
  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    console.log("Check newv value", newValue);

    if (newValue) {
      setSelectedProducts((prev) => {
        const existingProductIndex = prev.findIndex(
          (item) => item.sku_id === newValue.sku_id
        );

        let updatedProducts = [...prev]; // Tạo bản sao của danh sách sản phẩm đã chọn

        if (existingProductIndex !== -1) {
          // Nếu sản phẩm đã tồn tại
          updatedProducts[existingProductIndex].qty += 1; // Tăng số lượng
          updatedProducts[existingProductIndex].totalPrice =
            updatedProducts[existingProductIndex].qty *
            updatedProducts[existingProductIndex].sale_price; // Cập nhật tổng giá
        } else {
          // Nếu không thì thêm vào danh sách 1 sản phẩm mới
          const updatedProduct = {
            ...newValue, // Giả sử newValue có chứa tất cả thông tin cần thiết
            qty: 1,
            totalPrice: newValue.sale_price || 0, // Sử dụng giá bán từ newValue
          };
          updatedProducts.push(updatedProduct); // Thêm sản phẩm mới vào danh sách
        }

        updateTotalPrice(updatedProducts); // Cập nhật tổng giá của tất cả sản phẩm
        return updatedProducts; // Trả về danh sách sản phẩm đã cập nhật
      });

      setValue(null); // Đặt lại giá trị autocomplete
    }
  };

  const handleQtyChange = (sku_id, qty) => {
    if (qty === "") {
      const updatedProducts = selectedProducts.map((item) =>
        item.sku_id === sku_id ? { ...item, qty: "" } : item
      );
      setSelectedProducts(updatedProducts);
      return; // Dừng lại để không xử lý tiếp.
    }

    const newQty = parseInt(qty, 10);

    if (newQty >= 0) {
      const updatedProducts = selectedProducts.map((item) =>
        item.sku_id === sku_id ? { ...item, qty: newQty } : item
      );
      setSelectedProducts(updatedProducts);
      updateTotalPrice(updatedProducts);
    }
  };

  const handleDelete = (productId) => {
    console.log("Product ID to delete:", productId);
    console.log("Selected products before delete:", selectedProducts);

    const updatedProducts = selectedProducts.filter(
      (item) => item.sku_id !== productId
    );
    setSelectedProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const updateTotalPrice = (products) => {
    if (!Array.isArray(products)) {
      console.warn("Products is not an array");
      setTotalPrice(0);
      return;
    }

    const total = products.reduce((acc, item) => {
      // Tính tổng giá cho từng sản phẩm
      const totalPriceForProduct = item.qty * (item.sale_price || 0);

      console.log("Total price for product", totalPriceForProduct);

      return acc + totalPriceForProduct;
    }, 0);

    console.log("Total price", total);
    setTotalPrice(total);
  };

  const AddInventory = async (status) => {
    setLoading(true);

    const dataCreat = {
      status: status,
      cart: selectedProducts.map((product) => ({
        quantity: product.qty,
        sku_id: product.sku_id,
      })),
    };

    console.log("Check dataCreat", dataCreat);

    if (dataCreat.cart.length === 0) {
      toast.error("Vui lòng chọn sản phẩm để thực hiện kiểm kho");
      setLoading(false);
      return;
    } else {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const response = await invertoryService.hendleCreat(dataCreat);
        console.log(response.data);
        toast.success(response.data.message);
      } catch (error) {
        toast.error("Có lỗi xảy ra: " + error.message);
        console.log(error);
      }

      // Reset các trường sau khi hoàn thành
      setSelectedProducts([]);
      setTotalPrice(0);
      setStatus(null);
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
          <Inventory_check_sheet
            totalPrice={totalPrice}
            selectedProducts={selectedProducts}
            AddInventory={AddInventory}
            setStatus={setStatus}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddInventoryCount;
