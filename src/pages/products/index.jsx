import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import ListProducts from "./ListProducts";
import Categories from "../../components/filters/Categories";
import ActionProduct from "./ActionProduct";
import FilterSuppliers from "../../components/filters/FilterSuppliers";
import { useTranslation } from "react-i18next";

import {
  ListProductTypes,
  ListDisplayOption,
  ListOnHands,
} from "../../utils/constain";

import FilterRadio from "../../components/filters/FilterRadio";

function Products(props) {
  const { t } = useTranslation("product");

  const [filters, setFilters] = useState({
    categoryID: 0,
    supplierIDs: [],
    productTypeID: 0,
    displayOption: 0,
    onHand: 0,
  });

  const handleSetFilter = (value, id) => {
    console.log(id, value, typeof value);

    switch (id) {
      case "category":
        setFilters((state) => ({
          ...state,
          categoryID: value,
        }));

        break;
      case "supplierIDs":
        console.log(value);

        value.map((item) => {
          console.log(item);
        });
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

            <Categories handleGetValue={handleSetFilter} />

            <FilterSuppliers
              supplierIDs={filters.supplierIDs}
              handleGetValue={handleSetFilter}
            />

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
          <ActionProduct />
          <ListProducts filters={filters} />
        </Box>
      </Stack>
    </div>
  );
}

export default Products;
