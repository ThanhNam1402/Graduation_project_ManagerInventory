import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
} from "@mui/material";

import { purchaseOrderService } from "../../services/purchaseOrder.service";

import { useEffect, useState, useRef } from "react";
import { handleformat } from "../../utils/format";

const TAX_RATE = 0.07;

function priceRow(qty, price, sale_price) {
  return qty * price - sale_price;
}

export default function TableProductOrders(props) {
  const [data, setData] = useState([]);
  const isMounted = useRef(false);

  let { idPurchaseOrder } = props;

  console.log(props);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    let res = await purchaseOrderService.handleGetOrderProducts(
      idPurchaseOrder
    );

    console.log("res", res);

    if (res && res.success === true) {
      setData(res?.data?.Products);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Mã hàng</TableCell>
            <TableCell align="right">Tên hàng</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Giá Giảm</TableCell>
            <TableCell align="right">Thành Tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row?.code}</TableCell>
                <TableCell align="right">{row?.name}</TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(row?.PurchaseOrder_Detail?.qty)}
                </TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(row?.PurchaseOrder_Detail?.price)}
                </TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(
                    row?.PurchaseOrder_Detail?.sale_price
                  )}
                </TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(
                    priceRow(
                      row?.PurchaseOrder_Detail?.price,
                      row?.PurchaseOrder_Detail?.qty,
                      row?.PurchaseOrder_Detail?.sale_price
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
