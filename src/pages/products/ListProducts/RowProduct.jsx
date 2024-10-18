import { useState, useRef, Fragment } from "react";
import {
  Checkbox,
  Collapse,
  Box,
  Tab,
  Tabs,
  IconButton,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  Stack,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { handleformat } from "../../../utils/format";

import PropTypes from "prop-types";
import ItemVariantProduct from "./ItemVariantProduct";
import { averagePrice } from "../../../utils/func";
import { productService } from "../../../services/product.service";
import TabInfomation from "./TabInfomatoin";
import UpdateProduct from "../UpdateProduct";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ButtonUpdate from "../../../components/Button/ButtonUpdate";
import ButtonDelete from "../../../components/Button/ButtonDelete";
import { a11yProps } from "../../../utils/func";
import TabPanelRow from "../../../components/TabPanelRow";

import { REACT_APP_BACKEND_URL } from "../../../config/config";

function RowProduct({
  row,
  isItemSelected,
  handleClick,
  labelId,
  onResetListProducts,
}) {
  const { t } = useTranslation("notification");
  const [open, setOpen] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [valueEdit, setValueEdit] = useState();
  const idRefProduct = useRef("");
  const idRefSku = useRef("");

  const [value, setValue] = useState(0);

  const handleDeleteProduct = async (id) => {
    console.log(id);
    try {
      let res = await productService.handleDelProducts(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalUpdate = (id, id_sku) => {
    idRefProduct.current = id;
    idRefSku.current = id_sku;
    handleGetOneProduct();
  };

  const handleGetOneProduct = async () => {
    try {
      let res = await productService.handleGetOneProduct(
        idRefProduct.current,
        idRefSku.current
      );
      setValueEdit(res.data);
      setOpenModalUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      await productService.handleUpdateProduct(
        idRefProduct.current,
        idRefSku.current,
        data
      );

      toast.success(t("action_success"));

      onResetListProducts();
      setOpenModalUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFiles = async (idSku, files) => {
    console.log(files);

    try {
      let res = await productService.handleUploadFile(idSku, files);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetModalUpdate = () => {
    setOpenModalUpdate(!openModalUpdate);
  };

  const handleChangeTab = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <UpdateProduct
        openModal={openModalUpdate}
        valueEdit={valueEdit}
        onCloseModal={handleSetModalUpdate}
        onUpdateProduct={handleUpdateProduct}
        onUploadFiles={handleUploadFiles}
        idSku={idRefSku.current}
      />

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
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography>{row?.name}</Typography>

            <img
              width={"40px"}
              height={"40px"}
              src={`${REACT_APP_BACKEND_URL}/storage/${row?.product_sku[0]?.photo[0]?.url}`}
              alt=""
            />
          </Stack>
        </TableCell>
        <TableCell align="right">{row?.category?.name}</TableCell>
        <TableCell align="right">
          {averagePrice(row.product_sku, "inventory")}
        </TableCell>
        <TableCell align="right">
          {handleformat.formatPrice(averagePrice(row.product_sku))}
        </TableCell>
        <TableCell align="right">
          {handleformat.formatPrice(
            averagePrice(row.product_sku, "sale_price")
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingBottom: 2 }}>
              {/* table variant  */}
              {row.product_sku && row.product_sku.length > 1 && (
                <>
                  <TableContainer>
                    <Table
                      stickyHeader
                      sx={{ width: "100%" }}
                      aria-labelledby="tableTitle"
                      size={"medium"}
                    >
                      <TableBody>
                        {row.product_sku &&
                          row.product_sku.length > 1 &&
                          row.product_sku.map((item) => {
                            return (
                              <ItemVariantProduct
                                key={item.id}
                                item={item}
                                nameProduct={row.name}
                                onOpenModalUpdate={handleOpenModalUpdate}
                                onDeleteProduct={handleDeleteProduct}
                              />
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              {/* no variant */}
              {row.product_sku &&
                row.product_sku.length <= 1 &&
                row.product_sku.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Box>
                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                              value={value}
                              onChange={handleChangeTab}
                              aria-label="basic tabs"
                            >
                              <Tab label="Thông tin" {...a11yProps(0)} />
                              <Tab label="Thông tin" {...a11yProps(1)} />
                            </Tabs>
                          </Box>
                          <TabPanelRow value={value} index={0}>
                            <TabInfomation
                              nameProductVariant={row?.name}
                              item={item}
                              onDeleteProduct={handleDeleteProduct}
                            />

                            <Stack
                              justifyContent="flex-end"
                              direction="row"
                              spacing={2}
                              my={3}
                            >
                              <ButtonUpdate
                                onClick={() =>
                                  handleOpenModalUpdate(
                                    item?.product_id,
                                    item?.id
                                  )
                                }
                              />
                              <ButtonDelete
                                onClick={() => handleDeleteProduct(item.id)}
                              />
                            </Stack>
                          </TabPanelRow>
                        </Box>
                      </Box>
                    </Fragment>
                  );
                })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

RowProduct.propTypes = {
  row: PropTypes.object,
  isItemSelected: PropTypes.bool,
  handleClick: PropTypes.func,
  labelId: PropTypes.string,
  onResetListProducts: PropTypes.func,
};

export default RowProduct;
