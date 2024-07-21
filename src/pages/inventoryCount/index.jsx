import React from "react";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ListInventoryCount from "./ListInventoryCount";
import Time from "../../components/filters/Time";
import Status from "../../components/filters/Status";
import Action from "./ActionInventoryCount";
function InventoryCount() {
  const [selectedCount, setSelectedCount] = useState(0);

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
              Kiểm kho
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
            <ListInventoryCount onSelectionChange={setSelectedCount} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default InventoryCount;
