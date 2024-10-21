import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Grid,
  Button,
} from "@mui/material";

function createData(early_day, end_day, repeat, time_frame, note) {
  return { early_day, end_day, repeat, time_frame, note };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

function Salary_slip() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const isAllSelected = selectedRows.length === rows.length;

  const handleSelectAllClick = () => {
    if (isAllSelected) {
      setSelectedRows([]); // Bỏ chọn tất cả
    } else {
      setSelectedRows(rows.map((row) => row.early_day)); // Chọn tất cả
    }
  };

  const handleRowClick = (early_day) => {
    const selectedIndex = selectedRows.indexOf(early_day);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, early_day);
    } else {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const isSelected = (early_day) => selectedRows.indexOf(early_day) !== -1;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e6f1fe" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isAllSelected}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <TableCell>Mã phiếu</TableCell>
              <TableCell align="right">Tên nhân viên</TableCell>
              <TableCell align="right">Tổng lương</TableCell>
              <TableCell align="right">Đã trả NV</TableCell>
              <TableCell align="right">Còn cần trả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isItemSelected = isSelected(row.early_day);
              return (
                <TableRow
                  key={row.early_day}
                  selected={isItemSelected}
                  onClick={() => handleRowClick(row.early_day)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": row.early_day }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.early_day}
                  </TableCell>
                  <TableCell align="right">{row.end_day}</TableCell>
                  <TableCell align="right">{row.repeat}</TableCell>
                  <TableCell align="right">{row.time_frame}</TableCell>
                  <TableCell align="right">{row.note}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sx={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: "10px" }}
        >
          Thanh toán
        </Button>
      </Grid>
    </>
  );
}

export default Salary_slip;
