import { useEffect, useState } from "react";
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

import { purchaseOrderService } from "../../../services/purchaseOrder.service";
import PropTypes from "prop-types";
import TableRowNoData from "../../../components/TableRowNoData/TableRowNoData";

function TableAddProducts({ value, getTableProducts }) {
  let { id } = useParams();
  const [data, setData] = useState([]);

  const handleSave = (index, newPrice, field) => {
    const newData = [...data];
    newData[index][field] = Number(newPrice);
    newData[index].total_price =
      newData[index].price * newData[index].qty - newData[index].discount;
    setData(newData);
  };

  useEffect(() => {
    const newData = [...data];
    if (value) {
      let checkID = data.find((item) => item.product_id === value.product_id);
      if (checkID) {
        const index = newData.findIndex(
          (item) => item.product_id === checkID.product_id
        );
        newData[index].qty = newData[index].qty + 1;
      } else {
        value.qty = 1;
        newData.push(value);
      }
      setData(newData);
    }
  }, [value]);

  useEffect(() => {
    getTableProducts(data);
  }, [data]);

  useEffect(() => {
    if (id) {
      fetchOneData();
    }
  }, []);

  const fetchOneData = async () => {
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
  };

  const handelDelItems = (id) => {
    const newData = [...data];
    let a = newData.filter((item) => item.product_id !== id);
    setData(a);
  };

  console.log(data);

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
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <IconButton onClick={() => handelDelItems(row.product_id)}>
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
                        handleSave(index, e.target.value, "qty");
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
                        handleSave(index, e.target.value, "price");
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
                        handleSave(index, e.target.value, "discount");
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
  value: PropTypes.object,
  getTableProducts: PropTypes.func,
};

export default TableAddProducts;
