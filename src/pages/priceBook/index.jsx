import React from "react";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ListPriceBook from "./listPriceBook";
import Categories from "../fillters/category/Categories";
import Inventory from "../fillters/inventory/Inventory";
import Price from "./../fillters/price/Price";
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
          <Categories handleGetValue={setCateGory} />
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
