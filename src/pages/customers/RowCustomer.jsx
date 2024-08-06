import React from "react";
import {
  Checkbox,
  Collapse,
  Box,
  IconButton,
  TableRow,
  TableCell,
  Tab,
  Tabs,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import TabPanelRowProduct from "./TabPanelRowProduct";
import TabInfomation from "./TabInfomatoin";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function RowCustomer(props) {
  const { row, isItemSelected, handleClick, labelId } = props;
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell padding="checkbox" onClick={() => setOpen(!open)}>
          <IconButton size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            onClick={(event) => handleClick(event, row.id)}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row?.email}</TableCell>
        <TableCell align="right">{row?.carbs}</TableCell>
        <TableCell align="right">{row?.total}</TableCell>
        <TableCell align="right">
          {row?.status === 1 ? "Đang hoạt động" : "Ngừng hoạt động"}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs"
                  >
                    <Tab label="Thông tin" {...a11yProps(0)} />
                    {/* <Tab label="Thẻ Kho" {...a11yProps(1)} /> */}
                  </Tabs>
                </Box>
                <TabPanelRowProduct value={value} index={0}>
                  <TabInfomation item={row} />
                </TabPanelRowProduct>
                {/* <TabPanelRowProduct value={value} index={1}>
                  Item Two
                </TabPanelRowProduct> */}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowCustomer;
