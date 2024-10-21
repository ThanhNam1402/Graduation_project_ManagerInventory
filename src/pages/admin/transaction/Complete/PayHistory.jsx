import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { handleformat } from "@/utils/format";
function Pay_history({ row }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã phiếu thu</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Phương thức</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Tiền thu/chi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{row.code}</TableCell>
              <TableCell>{handleformat.formatDate(row.createdAt)}</TableCell>
              <TableCell>
                {row.status == 0 ? "Tiền mặt" : "Chuyển khoản"}
              </TableCell>
              <TableCell>
                {row.TrangThai == 0 ? "Phiếu tạm" : "Đã thanh toán"}
              </TableCell>
              <TableCell>{handleformat.formatPrice(row.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Pay_history;
