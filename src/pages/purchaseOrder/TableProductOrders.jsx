import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
} from "@mui/material";

import { handleformat } from "../../utils/format";
import PropTypes from "prop-types";

function TableProductOrders({ tableProducts }) {
  console.log(tableProducts);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Tên hàng</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Giá Giảm</TableCell>
            <TableCell align="right">Thành Tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableProducts &&
            tableProducts.length > 0 &&
            tableProducts.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.product.option_value.length > 0
                    ? row?.product?.product?.name.concat(
                        " - ",
                        row.product.option_value
                          .map((item) => item.name)
                          .join(" - ")
                      )
                    : row?.product?.product?.name}
                </TableCell>

                <TableCell align="right">{row?.qty}</TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(row?.price)}
                </TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(row?.discount)}
                </TableCell>
                <TableCell align="right">
                  {handleformat.formatPrice(row?.total_price)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableProductOrders.propTypes = {
  tableProducts: PropTypes.array,
};

export default TableProductOrders;
