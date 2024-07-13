import React from "react";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ListPriceBook from "./listPriceBook";
import Inventory from "../../components/filters/Inventory";
import Price from "../../components/filters/Price";
import ProductType from "../../components/filters/ProductType";
function PriceBook(props) {
  const [category, setCateGory] = useState(null);

  return (
    <div>
      thiết lập giá
      <Box sx={{ display: "flex", p: 1 }}>
        <Box
          sx={{
            minHeight: "100vh",
            mr: 3,
          }}
        >
          <Price handleGetValue={setCateGory} />
          <ProductType handleGetValue={setCateGory} />
          <Inventory handleGetValue={setCateGory} />
        </Box>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <ListPriceBook categoryId={category} />
        </Box>
      </Box>
    </div>
  );
}

export default PriceBook;
