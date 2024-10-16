import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListProducts from "./ListProducts/ListProducts";
import Categories from "../caterory";
import { useTranslation } from "react-i18next";
import CsUsePagination from "../../hook/CsUsePagination";
import { ListDisplayOption, ListOnHands } from "../../utils/constain";
import FilterRadio from "../../components/filters/FilterRadio";

function Products() {
  const { t } = useTranslation("product");

  const [sort, setSort] = useState({
    order: "asc",
    orderBy: "name",
  });

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(1, 10);

  const [filters, setFilters] = useState({
    categoryID: "",
    supplierIDs: [],
    status: 1,
    onHand: 0,
  });

  // handle set filters
  const handleSetFilter = (value, id) => {
    setPage(1);
    switch (id) {
      case "category":
        setFilters((state) => ({
          ...state,
          categoryID: value,
        }));

        break;
      case "supplierIDs":
        setFilters((state) => ({
          ...state,
          supplierIDs: value,
        }));
        break;
      case "status":
        setFilters((state) => ({
          ...state,
          status: value,
        }));

        break;
      case "onHand":
        setFilters((state) => ({
          ...state,
          onHand: value,
        }));
        break;
    }
  };

  // handle request sort
  const handleRequestSort = (event, property) => {
    const isAsc = sort.orderBy === property && sort.order === "asc";
    setSort(() => ({
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    }));
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

            <Categories handleGetValue={handleSetFilter} />
            {/* onHands */}

            <FilterRadio
              defaultValue={"1"}
              data={ListOnHands}
              handleGetValue={handleSetFilter}
              keyFilter={"onHand"}
            />

            <FilterRadio
              defaultValue={"1"}
              data={ListDisplayOption}
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
          <ListProducts
            sort={sort}
            onSetPage={setPage}
            filters={filters}
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

export default Products;
