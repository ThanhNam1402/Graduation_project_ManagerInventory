import {
  Checkbox,
  IconButton,
  TableRow,
  TableCell,
  Box,
  Tab,
  Tabs,
  Collapse,
  Chip,
} from "@mui/material";

import { useState, useRef } from "react";
import TabInfomation from "./TabInfomatoin";
import Proptypes from "prop-types";
import TabPanelRow from "../../../components/TabPanelRow";
import { toast } from "react-toastify";
import { supplierService } from "../../../services/supplier.service";
import ModalContent from "../../../components/modalContent/modalContent";
import UpdateSpllier from "../UpdateSupplier/UpdateSupplier";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { a11yProps } from "../../../utils/func";
import LoadingBackdrop from "../../../components/BackDrop";
import { useTranslation } from "react-i18next";

function RowSupplier({
  row,
  onResetListSupplier,
  isItemSelected,
  handleClick,
  labelId,
}) {
  let { t } = useTranslation("supplier");
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const idRefUpdate = useRef("");
  const [valueEdit, setValueEdit] = useState();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle delete supplier
  const handelDeleteSupplier = async (id) => {
    try {
      let res = await supplierService.handleDeleteSupplier(id);
      console.log(res);
      toast.success("Delete supplier Successful");
      onResetListSupplier();
    } catch (error) {
      toast.error("Delete supplier Failded");
    }
  };

  // handel update supplier
  const handleUpdateSupplier = async (data) => {
    try {
      setIsLoading(true);
      let res = await supplierService.handleUpdateSupplier(
        idRefUpdate.current,
        data
      );
      toast.success(res?.message || "Add supplier success");
      setOpenModalUpdate(false);
      onResetListSupplier();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Update supplier Failded");
    }
  };

  // handle close modal Update
  const handleClodeModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  // open modal Update
  const handleOpenModalUpdate = (id) => {
    idRefUpdate.current = id;
    handleGetOneSupplier();
  };

  // handle get one supplier
  const handleGetOneSupplier = async () => {
    try {
      let res = await supplierService.handleGetOneSupplier(idRefUpdate.current);
      setValueEdit(res?.data);
      setOpenModalUpdate(true);
    } catch (error) {
      toast.error("Find supplier failed");
    }
  };

  return (
    <>
      {isLoading && <LoadingBackdrop loading={isLoading} />}
      {/* modal update supplier */}
      <ModalContent
        size="md"
        isOpen={openModalUpdate}
        onCloseModal={handleClodeModalUpdate}
        title="Cập Nhật Nhà Cung Cấp"
      >
        <UpdateSpllier
          id={idRefUpdate.current}
          value={valueEdit}
          onCloseModal={handleClodeModalUpdate}
          onUpdateSupplier={handleUpdateSupplier}
        />
      </ModalContent>
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
          {row?.name}
        </TableCell>
        <TableCell align="right"> {row?.tax_code}</TableCell>
        <TableCell align="right">{row?.email}</TableCell>
        <TableCell align="right">{row?.phone}</TableCell>
        <TableCell align="right">
          {row?.status == 1 && (
            <Chip
              color="primary"
              size="small"
              label={t("status.active")}
              sx={{
                minWidth: "117px",
              }}
            />
          )}
          {row?.status == 2 && (
            <Chip
              color="error"
              size="small"
              label={t("status.inactive")}
              sx={{
                minWidth: "117px",
              }}
            />
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
                    onOpenModalUpdate={handleOpenModalUpdate}
                    onDeleteCustomer={handelDeleteSupplier}
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
RowSupplier.propTypes = {
  handleClick: Proptypes.func,
  isItemSelected: Proptypes.bool,
  row: Proptypes.object,
  labelId: Proptypes.string,
  handleOpenModalUpdate: Proptypes.func,
  onResetListSupplier: Proptypes.func,
  onOpenModalUpdate: Proptypes.func,
};

export default RowSupplier;
