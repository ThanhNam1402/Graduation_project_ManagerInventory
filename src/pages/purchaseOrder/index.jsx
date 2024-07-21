import React from "react";

import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListPurchaseOrders from "./ListPurchaseOrders";
import ActionProduct from "./ActionProduct";

import FilterCheckBox from "../../components/filters/FilterCheckBox";

import { ListStatusPurchaseOrder } from "../../utils/constain";

function PurchaseOrrder(props) {
  const [categoryID, setCateGoryID] = useState(0);
  const [supplierIDs, setSupplierIDs] = useState([]);
  const [productType, setProductType] = useState(0);
  const [displayOption, setDisplayOption] = useState(0);
  const [onHand, setOnHand] = useState(0);

  const handleSetFilter = (value, id) => {
    console.log(id, value);
  };

  return (
    <div>
      <Stack direction="row">
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
          <Box>
            <Typography sx={{ mb: 2 }} variant="h5" component={"h5"}>
              Phiếu nhập hàng
            </Typography>

            {/* Status */}
            <FilterCheckBox data={ListStatusPurchaseOrder} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ActionProduct />
          <ListPurchaseOrders
            categoryID={categoryID}
            supplierID={supplierIDs}
          />
        </Box>
      </Stack>
    </div>
  );
}

export default PurchaseOrrder;
