import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import FilterRadio from "../../components/filters/FilterRadio";
import ListCustomers from "./ListCustomers";
import ActionCustomer from "./ActionCusomter";
import {
  ListGender,
  ListStatus,
  ListCustomersType,
} from "../../utils/constain";

function Customers(props) {
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

            {/* Gender */}
            <FilterRadio
              data={ListGender}
              handleGetValue={handleSetFilter}
              keyFilter={"gender"}
            />

            {/* Customer type */}
            <FilterRadio
              data={ListCustomersType}
              handleGetValue={handleSetFilter}
              keyFilter={"customerType"}
            />

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
          <ListCustomers />
        </Box>
      </Stack>
    </div>
  );
}

export default Customers;
