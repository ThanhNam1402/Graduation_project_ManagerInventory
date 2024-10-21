import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CsUsePagination from "@/hook/CsUsePagination";

import Time from "@/components/admin/filters/Time";

import ActionTransaction from "./Action";
import ListTransaction from "./ListTransaction";
function Employee() {
  const [value, setValue] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [filters, setFilters] = useState({
    status: "",
  });
  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
              {/* {t("orders.title")} */}
            </Typography>
            <Time />
            {/* <Pay /> */}
            {/* <DeliveryTime /> */}
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <ActionTransaction selectedCount={selectedCount} />
            <ListTransaction
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

export default Employee;
