import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(early_day, end_day, repeat, time_frame, note) {
  return { early_day, end_day, repeat, time_frame, note };
}

const rows = [];

function Payment_history() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e6f1fe" }}>
              <TableCell>Mã phiếu</TableCell>
              <TableCell align="right">Tên nhân viên</TableCell>
              <TableCell align="right">Thời gian</TableCell>
              <TableCell align="right">Người tạo</TableCell>
              <TableCell align="right">Phương thức</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Tiền chi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.early_day}>
                  <TableCell component="th" scope="row">
                    {row.early_day}
                  </TableCell>
                  <TableCell align="right">{row.end_day}</TableCell>
                  <TableCell align="right">{row.repeat}</TableCell>
                  <TableCell align="right">{row.time_frame}</TableCell>
                  <TableCell align="right">{row.note}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Không tìm thấy kết quả nào phù hợp
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Payment_history;
