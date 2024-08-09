import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListProducts from "./ListProducts";
import Categories from "../../components/filters/Categories";
import ActionProduct from "./ActionProduct";
import FilterSuppliers from "../../components/filters/FilterSuppliers";
import { useTranslation } from "react-i18next";
import CsUsePagination from "../../hook/CsUsePagination";

import { ListDisplayOption, ListOnHands } from "../../utils/constain";
import FilterRadio from "../../components/filters/FilterRadio";
import { categoryService } from "../../services/category.service";

function Products(props) {
  const { t } = useTranslation("product");
  const [listCate, setlistCate] = useState([]);
  const [sort, setSort] = useState({
    order: "asc",
    orderBy: "name",
  });

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const [filters, setFilters] = useState({
    categoryID: 0,
    supplierIDs: [],
    displayOption: 0,
    onHand: 0,
  });

  const [keyWord, setKeyWord] = useState("");

  const handleSearch = (value) => {
    setPage(0);
    setKeyWord(value);
  };

  const handleSetFilter = (value, id) => {
    setPage(0);
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
      case "displayOption":
        setFilters((state) => ({
          ...state,
          displayOption: value,
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

  const handleRequestSort = (event, property) => {
    const isAsc = sort.orderBy === property && sort.order === "asc";
    setSort((state) => ({
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    }));
  };

  useEffect(() => {
    handeGetAllCate();
  }, []);

  const handeGetAllCate = async () => {
    let res = await categoryService.handleGetAllCate();
    if (res && res.success) {
      setlistCate(res.data);
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
              {t("title")}
            </Typography>

            <Categories listCate={listCate} handleGetValue={handleSetFilter} />

            {/* <FilterSuppliers
              supplierIDs={filters.supplierIDs}
              handleGetValue={handleSetFilter}
            /> */}

            {/* onHands */}

            <FilterRadio
              data={ListOnHands}
              handleGetValue={handleSetFilter}
              keyFilter={"onHand"}
            />
            {/* optionDisplay */}

            <FilterRadio
              data={ListDisplayOption}
              handleGetValue={handleSetFilter}
              keyFilter={"displayOption"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ActionProduct handleSearch={handleSearch} />
          <ListProducts
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

export default Products;
