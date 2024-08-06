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
  Stack,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import TabInfomation from "./TabInfomatoin";
import TabPanelRow from "../../components/TabPanelRow";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function RowProduct(props) {
  const { row, isItemSelected, handleClick, labelId, handleDelProduct } = props;
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
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row?.code}
        </TableCell>
        <TableCell align="left">
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            spacing={2}
          >
            <img
              width="40px"
              src={`http://localhost:6969/${row?.img}`}
              alt=""
            />
            {row?.name}
          </Stack>
        </TableCell>
        <TableCell align="right">{row?.Category.name}</TableCell>
        <TableCell align="right">{row?.onHand}</TableCell>
        <TableCell align="right">{row?.price}</TableCell>
        <TableCell align="right">{row?.price}</TableCell>
        <TableCell align="right">
          {row?.status === 1 ? "Đang Kinh Doanh" : "Ngừng Kinh Doanh"}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
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
                    <Tab label="Thẻ Kho" {...a11yProps(1)} />
                    <Tab label="Tồn Kho" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanelRow value={value} index={0}>
                  <TabInfomation
                    item={row}
                    handleDelProduct={handleDelProduct}
                  />
                </TabPanelRow>
                <TabPanelRow value={value} index={1}>
                  Item Two
                </TabPanelRow>
                <TabPanelRow value={value} index={2}>
                  Item Three
                </TabPanelRow>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowProduct;
