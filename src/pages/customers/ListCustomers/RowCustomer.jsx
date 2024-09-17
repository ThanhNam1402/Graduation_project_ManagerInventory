import { useState } from "react";
import {
  Checkbox,
  Collapse,
  Box,
  IconButton,
  TableRow,
  TableCell,
  Chip,
  Tab,
  Tabs,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { toast } from "react-toastify";

import TabPanelRow from "../../../components/TabPanelRow";
import TabInfomation from "./TabInfomatoin";
import { customerService } from "../../../services/customer.service";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function RowCustomer({
  row,
  isItemSelected,
  handleClick,
  labelId,
  onOpenModalUpdate,
  onResetListCustomers,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle delete customer
  const handelDeleteCustomer = async (id) => {
    try {
      let res = await customerService.handleDeleteCustomer(id);
      console.log(res);
      toast.success("Delete supplier Successful");
      onResetListCustomers();
    } catch (error) {
      toast.error("Delete supplier Failded");
    }
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
        <TableCell align="right">{row?.phone}</TableCell>
        <TableCell align="right">
          {row?.status === "0" ? (
            <Chip label="Đang hoạt động" color="primary" />
          ) : (
            <Chip label="Ngừng hoạt động" color="error" />
          )}
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
                  </Tabs>
                </Box>
                <TabPanelRow value={value} index={0}>
                  <TabInfomation
                    item={row}
                    onOpenModalUpdate={onOpenModalUpdate}
                    onDeleteCustomer={handelDeleteCustomer}
                  />
                </TabPanelRow>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowCustomer;
