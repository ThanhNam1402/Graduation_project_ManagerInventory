import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

import FilterRadio from "../../components/filters/FilterRadio";
import ListSuppliers from "./ListSuppliers/ListSuppliers";
import { ListStatus } from "../../utils/constain";
import CsUsePagination from "../../hook/CsUsePagination";
import { useTranslation } from "react-i18next";

function Suppliers() {
  const { t } = useTranslation("supplier");

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("name");
  const [filters, setFilters] = useState({
    status: "",
  });

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(1, 10);

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

  // handle sort by order
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
              {t("title")}
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
          <ListSuppliers
            onSetPage={setPage}
            filters={filters}
            order={order}
            orderBy={orderBy}
            pagination={pagination}
            handleRequestSort={handleRequestSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Stack>
    </>
  );
}

export default Suppliers;
