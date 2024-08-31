import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import CsUsePagination from "../../hook/CsUsePagination";
import FilterRadio from "../../components/filters/FilterRadio";
import ListCustomers from "./ListCustomers";
import ActionCustomer from "./ActionCusomter";
import { ListStatus, ListCustomersType } from "../../utils/constain";
import AddCustomer from "./AddCustomer";

function Customers(props) {
  const [filters, setFilters] = useState({
    status: 0,
    customer_type: 0,
  });

  const [openModal, setOpenModal] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const handleSearch = (value) => {
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

  // open modal
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  console.log(filters);
  return (
    <>
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
            <Typography sx={{ mb: 3 }} variant="h5" component={"h5"}>
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
          <ActionCustomer
            handleSearch={handleSearch}
            handleOpenModal={handleOpenModal}
          />
          <ListCustomers
            keyWord={keyWord}
            filters={filters}
            pagination={pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Stack>
      <AddCustomer openModal={openModal} handleOpenModal={handleOpenModal} />
    </>
  );
}

export default Customers;
