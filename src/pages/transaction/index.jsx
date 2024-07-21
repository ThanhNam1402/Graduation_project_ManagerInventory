import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ListTransaction from "./ListTransaction";
import Time from "../../components/filters/Time";
import ActionTransaction from "./ActionTransaction";
import DeliveryTime from "../../components/filters/DeliveryTime";
import Pay from "../../components/filters/Pay";
function Transaction() {
    const [selectedCount, setSelectedCount] = useState(0);
    return(
        <>
        <Box>
        Kiểm kho
        <Box sx={{ display: "flex", p: 1 }}>
          <Box
            sx={{
              minHeight: "100vh",
              mr: 3,
            }}
          >
            <Time />
            <Pay/>
            <DeliveryTime/>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <ActionTransaction selectedCount={selectedCount}/>
            <ListTransaction onSelectionChange={setSelectedCount} />
          </Box>
        </Box>
      </Box>
        </>
    )
}

export default Transaction;