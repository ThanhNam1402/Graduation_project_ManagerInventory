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

import { TotalRowCount } from "../../../utils/func";
import { purchaseOrderService } from "../../../services/purchaseOrder.service";

function TableAddProducts(props) {
  let { id } = useParams();

  let { value, getTableProducts } = props;
  const [data, setData] = useState([]);

  const handleSave = (index, newPrice, field) => {
    const newData = [...data];

    newData[index][field] = Number(newPrice);
    setData(newData);
  };

  useEffect(() => {
    const newData = [...data];
    if (value) {
      let checkID = data.find((item) => item.id === value.id);
      if (checkID) {
        const index = newData.findIndex((item) => item.id === checkID.id);
        newData[index].qty = newData[index].qty + 1;
      } else {
        value.qty = 1;

        console.log(value);

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
    let a = newData.filter((item) => item.id !== id);
    setData(a);
  };

  useEffect(() => {
    console.log("map");
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Stt</TableCell>
              <TableCell>Mã hàng</TableCell>
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
                    <IconButton onClick={() => handelDelItems(row.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.code}</TableCell>
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
                        handleSave(index, e.target.value, "sale_price");
                      }}
                      value={row?.sale_price}
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
                      value={TotalRowCount(
                        row?.price,
                        row?.qty,
                        row?.sale_price
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="left">no data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableAddProducts;
