import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { handleformat } from "../../utils/format";

function Payment_summary({ row }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "30%", marginLeft: "auto" }}>
    <Table  size="small">
      <TableBody>
        <TableRow sx={{ borderBottom: "none" }}>
          <TableCell component="th" scope="row" sx={{ border: "none" }}>
            Tổng thực tế
          </TableCell>
          <TableCell align="right" sx={{ border: "none" }}>
            {handleformat.formatPrice(row.ac_total) || "No data"}
          </TableCell>
        </TableRow>
        <TableRow sx={{ borderBottom: "none" }}>
          <TableCell component="th" scope="row" sx={{ border: "none" }}>
            Tổng lệch tăng
          </TableCell>
          <TableCell align="right" sx={{ border: "none" }}>
            {row.qty_increased || 0}
          </TableCell>
        </TableRow>
        <TableRow sx={{ borderBottom: "none" }}>
          <TableCell component="th" scope="row" sx={{ border: "none" }}>
            Tổng lệch giảm
          </TableCell>
          <TableCell align="right" sx={{ border: "none" }}>
            {row.qty_decreased || 0}
          </TableCell>
        </TableRow>
        <TableRow sx={{ borderBottom: "none" }}>
          <TableCell component="th" scope="row" sx={{ border: "none" }}>
            Tổng chênh lệch
          </TableCell>
          <TableCell align="right" sx={{ border: "none" }}>
            {row.total_difference || 0}
          </TableCell>
        </TableRow>
        <TableRow sx={{ borderBottom: "none" }}>
          <TableCell component="th" scope="row" sx={{ border: "none" }}>
            Tổng số lượng
          </TableCell>
          <TableCell align="right" sx={{ border: "none" }}>
            {row.ac_number || "No data"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  
  );
}

export default Payment_summary;
