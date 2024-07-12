import React from "react";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import ListProducts from "./ListProducts";
import ActionProduct from "./ActionProduct";
import Suppliers from "../../components/filters/Suppliers";
import ProductType from "../../components/filters/ProductType";

function Products(props) {
  const [categoryID, setCateGoryID] = useState(null);
  const [supplierID, setSupplierID] = useState([]);

  console.log(categoryID, supplierID);

  return (
    <div>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box
          sx={{
            width: "248px",
            mr: 3,
          }}
        >
          <ProductType handleGetValue={setCateGoryID} />
          <Suppliers supplierID={supplierID} handleGetValue={setSupplierID} />
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
