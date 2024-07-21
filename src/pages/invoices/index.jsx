import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListInvoices from "./ListInvoices";
import Actioninvoice from "./ActionInvoice";

import FilterCheckBox from "../../components/filters/FilterCheckBox";

import FilterRadio from "../../components/filters/FilterRadio";

import { ListStatusInvoice } from "../../utils/constain";

function Invoices(props) {
  const [categoryID, setCateGoryID] = useState(0);

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
              Hóa Đơn
            </Typography>

            {/* Status invoice checkbox */}

            <FilterCheckBox data={ListStatusInvoice} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Actioninvoice />
          <ListInvoices />
        </Box>
      </Stack>
    </div>
  );
}

export default Invoices;
