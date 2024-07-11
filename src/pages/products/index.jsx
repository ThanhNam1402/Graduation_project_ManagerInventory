import React from "react";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ListProducts from "./ListProducts";
import Categories from "./Categories";

function Products(props) {
  const [category, setCateGory] = useState(null);
  // const [kho, setKho] = useState(null)
  // state filter,

  // const handleGetValue = (e, id) => {
  //   console.log(e.target.value);
  //   console.log(id);

  // };

  console.log(category);

  return (
    <div>
      <Box sx={{ display: "flex", p: 1 }}>
        <Box
          sx={{
            minHeight: "100vh",
            mr: 1,
          }}
        >
          <Categories handleGetValue={setCateGory} />
        </Box>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <ListProducts categoryId={category} />
        </Box>
      </Box>
    </div>
  );
}

export default Products;
