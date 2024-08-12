import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ListInventoryCount from "./ListInventoryCount";
import Time from "../../components/filters/Time";
import Status from "../../components/filters/Status";
import Action from "./ActionInventoryCount";
import CsUsePagination from "../../hook/CsUsePagination";
import { useTranslation } from "react-i18next";

function InventoryCount() {
  const { t } = useTranslation("inventorycount");

  const [selectedCount, setSelectedCount] = useState(0);

  const [filters, setFilters] = useState({
    status: '',
  });
  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
  CsUsePagination(0, 5);

  const handleSetFilter = (value, id) => {
    console.log(id, value, typeof value);

    switch (id) {
      case "status":
        setFilters((state) => ({
          ...state,
          status: value,
        }));

        break;
    }
  };

  const [keyWord, setKeyWord] = useState("");

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", p: 1 }}>
          <Box
            sx={{
              minHeight: "100vh",
              mr: 3,
            }}
          >
            <Typography sx={{ mb: 2 }} variant="h5" component={"h5"}>
            {t("inventorycount.title")}
            </Typography>
            <Time />
            <Status />
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Action selectedCount={selectedCount} />
            <ListInventoryCount
              keyWord={keyWord}
              filters={filters}
              pagination={pagination}
              onSelectionChange={setSelectedCount}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default InventoryCount;
