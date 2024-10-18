import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ListInventoryCount from "./ListInventoryCount";
import Status from "../../components/filters/Status";
import Action from "./ActionInventoryCount";
import { useTranslation } from "react-i18next";

function InventoryCount() {
  const { t } = useTranslation("inventorycount");

  const [selectedCount, setSelectedCount] = useState(0);
  const [filters, setFilters] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null); // State để lưu row đã chọn

  const handleSetFilter = (value, id) => {
    switch (id) {
      case "status":
        setFilters(value);
        break;
      default:
        break;
    }
  };

  const [keyWord, setKeyWord] = useState("");

  return (
    <Box>
      <Box sx={{ display: "flex", p: 1 }}>
        <Box sx={{ minHeight: "100vh", mr: 3 }}>
          <Typography sx={{ mb: 4 }} variant="h5" component={"h5"}>
            {t("inventorycount.title")}
          </Typography>
          <Status onChange={handleSetFilter} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Action 
            selectedCount={selectedCount} 
            row={selectedRow} // Truyền row đã chọn vào đây
            handleUpdateStatus={() => {
              if (selectedRow) {
                console.log(selectedRow); // Log dữ liệu của item đã chọn
              }
            }}
          />
          <ListInventoryCount
            keyWord={keyWord}
            filters={filters}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            onSelectionChange={setSelectedCount}
            onRowSelect={setSelectedRow} // Gọi hàm này khi một row được chọn
          />
        </Box>
      </Box>
    </Box>
  );
}

export default InventoryCount;
