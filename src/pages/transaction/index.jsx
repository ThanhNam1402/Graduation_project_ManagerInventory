import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ListTransaction from "./ListTransaction";
import Time from "../../components/filters/Time";
import ActionTransaction from "./ActionTransaction";
import DeliveryTime from "../../components/filters/DeliveryTime";
import Pay from "../../components/filters/Pay";
import CsUsePagination from "../../hook/CsUsePagination";

function Transaction() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [keyWord, setKeyWord] = useState("");
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
              Phiếu đặt hàng
            </Typography>
            <Time />
            <Pay />
            <DeliveryTime />
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
            onSelectionChange={setSelectedCount} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Transaction;
