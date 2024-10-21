import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import { handleformat } from "@/utils/format";
function Invoice_history({ row }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã hóa đơn</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Giá trị</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{row.code}</TableCell>
              <TableCell>{handleformat.formatDate(row.createdAt)}</TableCell>
              <TableCell>{handleformat.formatPrice(row.total)}</TableCell>
              <TableCell>
                {row.status == 0 ? "Phiếu tạm" : "Hoàn thành"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Invoice_history;
