import React from "react";

import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import ListPurchaseOrders from "./ListPurchaseOrders";
import ActionProduct from "./ActionProduct";
import FilterRadio from "../../components/filters/FilterRadio";
import { ListStatusPurchaseOrder } from "../../utils/constain";
import CsUsePagination from "../../hook/CsUsePagination";



function PurchaseOrder(props) {
  const { t } = useTranslation("product");

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const [filters, setFilters] = useState({
    status: 0,
  });
  const [sort, setSort] = useState({
    order: "asc",
    orderBy: "name",
  });

  const [keyWord, setKeyWord] = useState("");

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

  const handleRequestSort = (event, property) => {
    const isAsc = sort.orderBy === property && sort.order === "asc";
    setSort((state) => ({
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    }));
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

            <FilterRadio
              data={ListStatusPurchaseOrder}
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
          <ActionProduct handleSearch={handleSearch} />
          <ListPurchaseOrders
            sort={sort}
            keyWord={keyWord}
            filters={filters}
            pagination={pagination}
            handleRequestSort={handleRequestSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Stack>
    </div>
  );
}

export default PurchaseOrder;
