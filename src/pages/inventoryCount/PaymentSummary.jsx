import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

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
              <TableCell align="right">{row.SoLuongThucTe || 1000}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Tổng lệch tăng
              </TableCell>
              <TableCell align="right">{row.SLLechTang || 1000}</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell component="th" scope="row">
                Tổng lệch giảm
              </TableCell>
              <TableCell align="right">{row.SLLechGiam || 0}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell component="th" scope="row">
                Tổng chênh lệch
              </TableCell>
              <TableCell align="right">{row.TongChenhLech || 1000}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Payment_summary;
