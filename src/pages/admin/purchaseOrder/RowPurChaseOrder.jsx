import { useState } from "react";
import {
  Checkbox,
  Collapse,
  Box,
  IconButton,
  TableRow,
  TableCell,
  Tab,
  Tabs,
  Chip,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { useTranslation } from "react-i18next";

import TabPanelRow from "@/components/admin/TabPanelRow";
import TabInfomation from "./TabInfomatoin";
import { handleformat } from "@/utils/format";

import { a11yProps } from "@/utils/func";
import Proptypes from "prop-types";

function RowProduct({ row, isItemSelected, handleClick, labelId }) {
  // let tNoti = useTranslation("purchaseOrder").t;
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(0);

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
          {row.code}
        </TableCell>
        <TableCell align="right">
          {handleformat.formatDate(row?.created_at)}
        </TableCell>
        <TableCell align="right">{row?.supplier?.name}</TableCell>
        <TableCell align="right">
          {handleformat.formatPrice(row?.supplier_payments)}
        </TableCell>
        <TableCell align="right">
          {handleformat.formatPrice(row?.total_goods)}
        </TableCell>
        <TableCell align="right">
          {handleformat.formatPrice(row?.total_goods - row?.supplier_payments)}
        </TableCell>

        <TableCell align="right">
          {row?.status == 1 && (
            <Chip
              color="primary"
              label="Đã Nhập Hàng"
              size="small"
              sx={{
                minWidth: "117px",
              }}
            />
          )}
          {row?.status == 2 && (
            <Chip
              color="error"
              size="small"
              label="Chưa"
              sx={{
                minWidth: "117px",
              }}
            />
          )}
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
                  </Tabs>
                </Box>
                <TabPanelRow value={value} index={0}>
                  <TabInfomation item={row} />
                </TabPanelRow>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

RowProduct.propTypes = {
  isItemSelected: Proptypes.bool,
  labelId: Proptypes.string,
  handleClick: Proptypes.func,
  row: Proptypes.object,
};

export default RowProduct;
