import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import PropTypes from "prop-types";
import { purchaseOrderService } from "../../../services/purchaseOrder.service";
import TableRowNoData from "../../../components/TableRowNoData/TableRowNoData";

function TableAddProducts({ dataTable, onDelItems, onEditFeild }) {
  let { id } = useParams();

  const fetchOneData = useCallback(async () => {
    let res = await purchaseOrderService.handleGetOrderProducts(id);

    let data = res?.data;
    let products = data.Products;

    const flattenedData = {
      Products: products.map((product) => ({
        ...product,
        ...product.PurchaseOrder_Detail,
      })),
    };

    flattenedData?.Products.map((product, index) => {
      delete flattenedData?.Products[index].PurchaseOrder_Detail;
    });

    setData(flattenedData?.Products);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchOneData();
    }
  }, [fetchOneData, id]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Stt</TableCell>
              <TableCell align="left">Tên hàng</TableCell>
              <TableCell align="left">Số lượng</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Giá Giảm</TableCell>
              <TableCell align="right">Thành Tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable && dataTable.length > 0 ? (
              dataTable.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <IconButton onClick={() => onDelItems(row.product_id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left">{row?.name}</TableCell>

                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      placeholder="Nhập Giá Vốn Sản Phẩm"
                      size="small"
                      InputProps={{ inputProps: { min: 1 } }}
                      value={row?.qty ? row?.qty : 1}
                      onChange={(e) => {
                        onEditFeild(index, e.target.value, "qty");
                      }}
                      sx={{
                        width: "80px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      sx={{
                        width: "80px",
                      }}
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      placeholder="Nhập Giá Vốn Sản Phẩm"
                      size="small"
                      onChange={(e) => {
                        onEditFeild(index, e.target.value, "price");
                      }}
                      value={row?.price}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      sx={{
                        width: "80px",
                      }}
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      placeholder="Nhập Giá Vốn Sản Phẩm"
                      size="small"
                      onChange={(e) => {
                        onEditFeild(index, e.target.value, "discount");
                      }}
                      value={row?.discount}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      sx={{
                        width: "80px",
                      }}
                      hiddenLabel
                      margin="dense"
                      variant="standard"
                      placeholder="Nhập Giá Vốn Sản Phẩm"
                      size="small"
                      disabled
                      value={row.total_price}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRowNoData colSpan={7} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

TableAddProducts.propTypes = {
  onDelItems: PropTypes.func,
  onEditFeild: PropTypes.func,
  dataTable: PropTypes.array,
};

export default TableAddProducts;
