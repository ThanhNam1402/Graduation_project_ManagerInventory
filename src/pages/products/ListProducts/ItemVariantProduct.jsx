import { useState, useEffect } from "react";
import {
  Collapse,
  Box,
  IconButton,
  TableRow,
  TableCell,
  Tab,
  Tabs,
  Stack,
} from "@mui/material";
import { handleformat } from "../../../utils/format";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { a11yProps } from "../../../utils/func";
import TabPanelRow from "../../../components/TabPanelRow";
import TabInfomation from "./TabInfomatoin";

import ButtonDelete from "../../../components/Button/ButtonDelete";
import ButtonUpdate from "../../../components/Button/ButtonUpdate";

function ItemVariantProduct({
  item,
  nameProduct,
  onDeleteProduct,
  onOpenModalUpdate,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const [nameProductVariant, setNameProductVariant] = useState("");

  useEffect(() => {
    let name = nameProduct.concat(
      " - ",
      item.option_value.map((item) => item.name).join(" - ")
    );

    setNameProductVariant(name);
  }, [item.option_value, nameProduct]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={item.id}
        sx={{ cursor: "pointer" }}
      >
        <TableCell
          padding="checkbox"
          onClick={() => setOpen(!open)}
          colSpan={5}
        >
          <IconButton size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          {nameProductVariant}
        </TableCell>
        <TableCell align="right">{item?.inventory}</TableCell>
        <TableCell
          align="right"
          sx={{
            width: "174px",
          }}
        >
          {handleformat.formatPrice(item?.price)}
        </TableCell>
        <TableCell
          align="right"
          sx={{
            width: "200px",
          }}
        >
          {handleformat.formatPrice(item?.sale_price)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, mb: 2 }}
          colSpan={10}
        >
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
                    {/* <Tab label="Thẻ Kho" {...a11yProps(1)} />
                    <Tab label="Tồn Kho" {...a11yProps(2)} /> */}
                  </Tabs>
                </Box>
                <TabPanelRow value={value} index={0}>
                  <TabInfomation
                    nameProductVariant={nameProductVariant}
                    item={item}
                  />

                  <Stack
                    justifyContent="flex-end"
                    direction="row"
                    spacing={2}
                    mt={3}
                  >
                    <ButtonUpdate
                      onClick={() =>
                        onOpenModalUpdate(item?.product_id, item?.id)
                      }
                    />
                    <ButtonDelete onClick={() => onDeleteProduct(item.id)} />
                  </Stack>
                </TabPanelRow>

                {/* <TabPanelRow value={value} index={1}>
                  Item Two
                </TabPanelRow>
                <TabPanelRow value={value} index={2}>
                  Item Three
                </TabPanelRow> */}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

ItemVariantProduct.propTypes = {
  item: PropTypes.object,
  nameProduct: PropTypes.string,
  onDeleteProduct: PropTypes.func,
  onOpenModalUpdate: PropTypes.func,
};

export default ItemVariantProduct;
