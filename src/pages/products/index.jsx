import { useState, useEffect, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListProducts from "./ListProducts/ListProducts";
import Categories from "../Caterory";
import { useTranslation } from "react-i18next";
import CsUsePagination from "../../hook/CsUsePagination";
import { ListDisplayOption, ListOnHands } from "../../utils/constain";
import FilterRadio from "../../components/filters/FilterRadio";
import AddProduct from "./AddProduct";

import ActionProduct from "./ListProducts/ActionProduct";

function Products() {
  const { t } = useTranslation("product");

  const [openModal, setOpenModal] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [sort, setSort] = useState({
    order: "asc",
    orderBy: "name",
  });

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const [filters, setFilters] = useState({
    categoryID: 0,
    supplierIDs: [],
    status: 0,
    onHand: 0,
  });

  // handle search
  const handleSearch = (value) => {
    setPage(0);
    setKeyWord(value);
  };

  // open modal
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // handle set filters
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
    setSort((state) => ({
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
              data={ListOnHands}
              handleGetValue={handleSetFilter}
              keyFilter={"onHand"}
            />

            <FilterRadio
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
          <ActionProduct
            handleOpenModal={handleOpenModal}
            handleSearch={handleSearch}
          />
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

      <AddProduct openModal={openModal} handleOpenModal={handleOpenModal} />
    </>
  );
}

export default Products;
