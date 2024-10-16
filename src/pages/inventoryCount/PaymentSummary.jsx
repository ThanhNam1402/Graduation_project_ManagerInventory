import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { handleformat } from "../../utils/format";

function Payment_summary({row}) {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "100%" }} >
        <Table aria-label="simple table" size="small">
          <TableBody>
            <TableRow sx={{ p: "30px"}}>
              <TableCell component="th" scope="row">
                Tổng thực tế
              </TableCell>
              <TableCell align="right">{handleformat.formatPrice(row.ac_total) || "No data"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Tổng lệch tăng
              </TableCell>
              <TableCell align="right">{handleformat.formatPrice(row.qty_increased) || 'No data'}</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell component="th" scope="row">
                Tổng lệch giảm
              </TableCell>
              <TableCell align="right">{handleformat.formatPrice(row.qty_decreased) || "No data"}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell component="th" scope="row">
                Tổng chênh lệch
              </TableCell>
              <TableCell align="right">{handleformat.formatPrice(row.total_difference) || 'No data'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Payment_summary;
