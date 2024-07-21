import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import FilterRadio from "../../components/filters/FilterRadio";
import ListSuppliers from "./ListSuppliers";
import ActionCustomer from "./ActionSupplier";
import {
  ListStatus,
} from "../../utils/constain";

function Suppliers(props) {
  const [gender, setGender] = useState(0);
  const [customerType, setCustomerType] = useState(0);
  const [status, setStatus] = useState(0);

  const handleSetFilter = (value, id) => {
    console.log(id, value);
    // swtich case
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
              Khách Hàng
            </Typography>

            {/* Status */}
            <FilterRadio
              data={ListStatus}
              handleGetValue={handleSetFilter}
              keyFilter={"status"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ActionCustomer />
          <ListSuppliers />
        </Box>
      </Stack>
    </div>
  );
}

export default Suppliers;
