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
import PropTypes from "prop-types";
import TableRowNoData from "@/components/admin/TableRowNoData/TableRowNoData";

function TableVariant({ dataTable }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataTable);
  }, [dataTable]);

  const handleChangeValue = (value, name, field) => {
    const newData = [...data];
    const findIndexItem = newData.findIndex((item) => item.name === name);
    if (findIndexItem !== -1) {
      newData[findIndexItem][field] = value;
    }
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
                      id="price"
                      margin="dense"
                      variant="standard"
                      size="small"
                      value={row?.price}
                      onChange={(e) =>
                        handleChangeValue(e.target.value, row?.name, "price")
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="sale_price"
                      margin="dense"
                      variant="standard"
                      size="small"
                      value={row?.sale_price}
                      onChange={(e) =>
                        handleChangeValue(
                          e.target.value,
                          row?.name,
                          "sale_price"
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="number"
                      hiddenLabel
                      id="stock"
                      margin="dense"
                      variant="standard"
                      size="small"
                      value={row?.stock}
                      onChange={(e) =>
                        handleChangeValue(e.target.value, row?.name, "stock")
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRowNoData colSpan={6} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

TableVariant.propTypes = {
  dataTable: PropTypes.array,
};

export default TableVariant;
