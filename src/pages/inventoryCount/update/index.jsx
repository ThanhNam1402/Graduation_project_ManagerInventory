import { Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { productService } from "./../../../services/product.service";
import { invertoryService } from "./../../../services/invertory.service";
import Check_sheet from "./CheckSheet";
import Product_information from "./ProductInformation";
import Find_Update from "./Find";
import LoadingBackdrop from "../../../components/BackDrop";
import { useParams } from "react-router-dom";

const Update_InventoryCount = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalActualQuantity, setTotalActualQuantity] = useState(0);
  const [options, setOptions] = useState([]);
  const [dataEdit, setDataEdit] = useState({ detail_stock: [] });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    GetAllProducts();
  }, []);

  useEffect(() => {
    GetOneinventorycount();
  }, [id]);

  const GetAllProducts = async () => {
    try {
      const response = await productService.handleGetAllProduct();
      if (response && Array.isArray(response.data)) {
        const formattedData = response.data.flatMap((product) => {
          if (!product.product_sku || product.product_sku.length === 0) {
            return [{ id: product.id, name: product.name }];
          }
          return product.product_sku.map((sku) => ({
            sku_id: sku.id,
            name: product.name,
            fullDisplayName: `${product.name} - ${sku.option_value
              .map((option) => option.name)
              .join(" - ")}`,
            inventory: sku.inventory,
          }));
        });
        setOptions(formattedData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const GetOneinventorycount = async () => {
    try {
      const response = await invertoryService.handleGetOne(id);
      console.log(response.detail_stock);
      
      if (response) {
        setDataEdit(response);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTotalQuantity = (id, newQty) => {
    const updatedDetailStock = dataEdit.detail_stock.map((item) => {
      if (item.product_sku.id === id) {
        return { ...item, ac_number: newQty };
      }
      return item;
    });

    setDataEdit((prevData) => ({
      ...prevData,
      detail_stock: updatedDetailStock,
    }));

    const totalQty = updatedDetailStock.reduce(
      (acc, item) => acc + (item.ac_number || 0),
      0
    );
    setTotalActualQuantity(totalQty);
  };

  const handleDelete = (productId) => {
    setDataEdit((prevData) => ({
      ...prevData,
      detail_stock: prevData.detail_stock.filter(
        (item) => item.product_sku.id !== productId
      ),
    }));
  };

  const UpdateInventory = async (status) => {
    setLoading(true);
    const dataCreat = {
      status: status,
      cart: dataEdit.detail_stock.map((item) => ({
        quantity: item.ac_number,
        sku_id: item.product_sku.id,
      })),
    };
    console.log(dataCreat);
    

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      const response = await invertoryService.handleUpdate(id, dataCreat);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ p: 2, m: 2 }}>
          <Typography variant="h5">Cập nhật phiếu kiểm</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Find_Update options={options} />
          <Product_information
            data={dataEdit}
            onQtyChange={updateTotalQuantity}
            onDelete={handleDelete}
            onTotalQuantityChange={setTotalActualQuantity}
          />
        </Grid>
        <Grid item xs={5}>
          <LoadingBackdrop loading={loading} />
          <Check_sheet
            totalPrice={totalPrice}
            totalActualQuantity={totalActualQuantity}
            UpdateInventory={UpdateInventory}
            setStatus={setStatus}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Update_InventoryCount;
