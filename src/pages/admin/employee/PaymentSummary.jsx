import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { handleformat } from "@/utils/format";

function Payment_summary({ row }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
        <Table aria-label="simple table" size="small">
          <TableBody>
            <TableRow sx={{ p: "30px" }}>
              <TableCell component="th" scope="row">
                Tổng số lượng:
              </TableCell>
              <TableCell align="right">{row.qty || 1000}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Tổng tiền:
              </TableCell>
              <TableCell align="right">{row.total || 1000}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Tổng cộng:
              </TableCell>
              <TableCell align="right">{row.total || 1000}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Khách trả:
              </TableCell>
              <TableCell align="right">{row.client_paid || 1000}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Payment_summary;
