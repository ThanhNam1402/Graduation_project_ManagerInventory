import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Button } from "@mui/material";

function createData(code, time, type, value) {
  return { code, time, type, value };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

function Monny_Owed() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e6f1fe" }}>
              <TableCell>Mã phiếu</TableCell>
              <TableCell align="right">Thời gian</TableCell>
              <TableCell align="right">Loại phiếu</TableCell>
              <TableCell align="right">Giá trị</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sx={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
        >
          Xuất file nợ lương
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
        >
          Thanh toán lương
        </Button>
      </Grid>
    </>
  );
}

export default Monny_Owed;
