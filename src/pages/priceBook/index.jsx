import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";



import ListPriceBook from "./listPriceBook";
import Price from "../../components/filters/Price";
import FilterRadio from "../../components/filters/FilterRadio";
import { ListProductTypes, ListOnHands } from "../../utils/constain";

function PriceBook(props) {
  const [category, setCateGory] = useState(null);

  const handleSetFilter = (value, id) => {
    console.log(id, value);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", p: 1 }}>
        <Box
          sx={{
            minHeight: "100vh",
            mr: 3,
          }}
        >
          <Typography sx={{ mb: 2 }} variant="h5" component={"h5"}>
            Thiết Lập Giá
          </Typography>

          {/* product type */}
          <FilterRadio
            data={ListProductTypes}
            handleGetValue={handleSetFilter}
            keyFilter={"productType"}
          />

          <Price handleGetValue={setCateGory} />

          {/* onHands */}

          <FilterRadio
            data={ListOnHands}
            handleGetValue={handleSetFilter}
            keyFilter={"onHand"}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <ListPriceBook categoryId={category} />
        </Box>
      </Box>
    </Box>
  );
}

export default PriceBook;
