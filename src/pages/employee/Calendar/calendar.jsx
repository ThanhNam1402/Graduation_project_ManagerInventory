import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Button } from "@mui/material";

function createData(early_day, end_day, repeat, time_frame, note) {
  return { early_day, end_day, repeat, time_frame, note };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

function Calendar() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={{backgroundColor: "#e6f1fe"}}>
              <TableCell>Từ ngày</TableCell>
              <TableCell align="right">Đến ngày</TableCell>
              <TableCell align="right">Lặp lại</TableCell>
              <TableCell align="right">Khung giờ làm</TableCell>
              <TableCell align="right">Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.early_day}>
                <TableCell component="th" scope="row">
                  {row.early_day}
                </TableCell>
                <TableCell align="right">{row.end_day}</TableCell>
                <TableCell align="right">{row.repeat}</TableCell>
                <TableCell align="right">{row.time_frame}</TableCell>
                <TableCell align="right">{row.note}</TableCell>
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
          Lịch làm việc
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
        >
          Chấm công
        </Button>
      </Grid>
    </>
  );
}

export default Calendar;
