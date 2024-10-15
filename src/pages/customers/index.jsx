import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import CsUsePagination from "../../hook/CsUsePagination";
import FilterRadio from "../../components/filters/FilterRadio";
import ListCustomers from "./ListCustomers/ListCustomers";
import { ListStatusCustomer, ListCustomersType } from "../../utils/constain";

function Customers() {
  const [filters, setFilters] = useState({
    status: "1",
    customer_type: 0,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(1, 10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSetFilter = (value, id) => {
    setPage(1);
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
              defaultValue={"1"}
              data={ListStatusCustomer}
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
          <ListCustomers
            order={order}
            orderBy={orderBy}
            filters={filters}
            pagination={pagination}
            onSetPage={setPage}
            handleRequestSort={handleRequestSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Stack>
    </>
  );
}

export default Customers;
