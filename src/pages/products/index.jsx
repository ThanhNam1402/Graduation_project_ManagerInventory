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

  const [categoryID, setCateGoryID] = useState(0);
  const [supplierIDs, setSupplierIDs] = useState([]);
  const [productType, setProductType] = useState(0);
  const [displayOption, setDisplayOption] = useState(0);
  const [onHand, setOnHand] = useState(0);

  const handleSetFilter = (value, id) => {
    console.log(id, value);
    switch (id) {
      case "category":
        setCateGoryID(value);
        break;
      case "supplierIDs":
        setSupplierIDs(value);
        break;
      case "productType":
        setProductType(value);
        break;
      case "displayOption":
        setDisplayOption(value);
        break;
      case "onHand":
        setOnHand(value);
        break;
    }
  };

  console.log(
    "categoryID",
    categoryID,
    supplierIDs,
    productType,
    "displayOption",
    displayOption,
    "onHand",
    onHand
  );
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

            {/* product type */}
            <FilterRadio
              data={ListProductTypes}
              handleGetValue={handleSetFilter}
              keyFilter={"productType"}
            />

            <Categories handleGetValue={handleSetFilter} />

            <FilterSuppliers
              supplierIDs={supplierIDs}
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
          <ListProducts categoryID={categoryID} supplierID={supplierIDs} />
        </Box>
      </Stack>
    </div>
  );
}

export default Products;
