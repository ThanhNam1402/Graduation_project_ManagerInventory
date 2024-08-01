import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import CsUsePagination from "../../hook/CsUsePagination";
import FilterRadio from "../../components/filters/FilterRadio";
import ListCustomers from "./ListCustomers";
import ActionCustomer from "./ActionCusomter";
import { ListStatus, ListCustomersType } from "../../utils/constain";

function Customers(props) {
  const [filters, setFilters] = useState({
    status: 0,
    customer_type: 0,
  });
  const [keyWord, setKeyWord] = useState("");

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const handleSearch = (value) => {
    console.log("value", value);
    setPage(0);

    setKeyWord(value);
  };

  const handleSetFilter = (value, id) => {
    setPage(0);
    switch (id) {
      case "status":
        setFilters((state) => ({
          ...state,
          status: value,
        }));
        break;
      case "customerType":
        setFilters((state) => ({
          ...state,
          customer_type: value,
        }));
        break;
    }
  };

  console.log(filters);
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
          <ActionCustomer handleSearch={handleSearch} />
          <ListCustomers
            keyWord={keyWord}
            filters={filters}
            pagination={pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Stack>
    </div>
  );
}

export default Customers;
