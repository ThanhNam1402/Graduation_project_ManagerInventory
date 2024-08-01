import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import FilterRadio from "../../components/filters/FilterRadio";
import ListSuppliers from "./ListSuppliers";
import ActionCustomer from "./ActionSupplier";
import { ListStatus } from "../../utils/constain";

import CsUsePagination from "../../hook/CsUsePagination";

function Suppliers(props) {
  const [filters, setFilters] = useState({
    status: 0,
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
    }
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
              Nhà Cung Cấp
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
          <ActionCustomer handleSearch={handleSearch} />
          <ListSuppliers
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

export default Suppliers;
