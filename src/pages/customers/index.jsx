import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import CsUsePagination from "../../hook/CsUsePagination";
import FilterRadio from "../../components/filters/FilterRadio";
import ListCustomers from "./ListCustomers/ListCustomers";
import ActionCustomer from "./ActionCusomter";
import { ListStatus, ListCustomersType } from "../../utils/constain";

function Customers() {
  const [filters, setFilters] = useState({
    status: 0,
    customer_type: 0,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [keyWord, setKeyWord] = useState("");

  const [openModalAdd, setOpenModalAdd] = useState(false);

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const handleOpenModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };

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
            handleOpenModal={handleOpenModalAdd}
          />
          <ListCustomers
            filters={filters}
            order={order}
            orderBy={orderBy}
            keyWord={keyWord}
            pagination={pagination}
            openModalAdd={openModalAdd}
            onCloseModalAdd={handleOpenModalAdd}
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
