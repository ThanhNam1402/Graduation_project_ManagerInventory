import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListProducts from "./ListProducts";
import Categories from "../../components/filters/Categories";
import Inventory from "../../components/filters/Inventory";
import Select from "../../components/filters/Select";
import ActionProduct from "./ActionProduct";
import Suppliers from "../../components/filters/Suppliers";
import ProductType from "../../components/filters/ProductType";

function Products(props) {
  const [categoryID, setCateGoryID] = useState(null);
  const [supplierID, setSupplierID] = useState([]);

  console.log(categoryID, supplierID);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            mb: 2,
            mr: 2,
            p: 1,
            height: "83vh",
            width: "300px",
            overflowY: "scroll",
          }}
        >
          <Box sx={{}}>
            <Typography sx={{ mb: 3 }} variant="h5" component={"h5"}>
              Hàng Hóa
            </Typography>

            <Categories handleGetValue={setCateGoryID} />
            <ProductType handleGetValue={setCateGoryID} />
            <Inventory handleGetValue={setCateGoryID} />
            <Suppliers supplierID={supplierID} handleGetValue={setSupplierID} />
            <Select handleGetValue={setCateGoryID} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ActionProduct />
          <ListProducts categoryID={categoryID} supplierID={supplierID} />
        </Box>
      </Box>
    </div>
  );
}

export default Products;
