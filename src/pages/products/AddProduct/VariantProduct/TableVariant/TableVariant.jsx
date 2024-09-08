import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField,
} from "@mui/material";

function TableVariant(props) {
  let { dataTable } = props;

  console.log(dataTable);

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Stt</TableCell>
              <TableCell align="left">Tên hàng</TableCell>
              <TableCell align="left">Mã Vạch</TableCell>
              <TableCell align="left">Giá Vốn</TableCell>
              <TableCell align="left">Giá Bán</TableCell>
              <TableCell align="left">Tồn Kho</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable && dataTable?.length > 0 ? (
              dataTable?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "220px",
                    }}
                  >
                    {row?.name}
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      size="small"
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="code"
                      margin="dense"
                      variant="standard"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="left">
                  no data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableVariant;
