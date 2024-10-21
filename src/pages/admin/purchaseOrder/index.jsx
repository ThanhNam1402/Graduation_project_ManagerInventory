import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
// import { useTranslation } from "react-i18next";

import ListPurchaseOrders from "./ListPurchaseOrders";
import ActionProduct from "./ActionProduct";
import FilterRadio from "@/components/admin/filters/FilterRadio";
import { ListStatusPurchaseOrder } from "@/utils/constain";
import CsUsePagination from "@/hook/CsUsePagination";

function PurchaseOrder() {
  // const { t } = useTranslation("purchaseOrder");

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(1, 10);

  const [filters, setFilters] = useState({
    status: 1,
  });
  const [sort, setSort] = useState({
    order: "desc",
    orderBy: "id",
  });

  const [keyWord, setKeyWord] = useState("");

  const handleSearch = (value) => {
    setPage(1);
    setKeyWord(value);
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
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = sort.orderBy === property && sort.order === "asc";
    setSort(() => ({
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
            <Typography sx={{ mb: 3 }} variant="h5" component={"h5"}>
              Phiếu nhập hàng
            </Typography>

            {/* Status */}

            <FilterRadio
              defaultValue={1}
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
