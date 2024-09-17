import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";

function TableVariant(props) {
  let { dataTable } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    setData(dataTable);
  }, [dataTable]);
  console.log(dataTable);

  const handleChangeValue = (value, name, field) => {
    const newData = [...data];
    console.log(newData, name);

    const findIndexItem = newData.findIndex((item) => item.name === name);
    console.log(findIndexItem);

    if (findIndexItem !== -1) {
      newData[findIndexItem][field] = value;
    }

    console.log(newData);

    setData(newData);
  };
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
                      value={row?.barcode}
                      onChange={(e) =>
                        handleChangeValue(e.target.value, row?.name, "barcode")
                      }
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
                      value={row?.price}
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
                      value={row?.sale_price}
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
                      value={row?.sale_price}
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
