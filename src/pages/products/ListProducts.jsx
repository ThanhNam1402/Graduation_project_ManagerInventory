import { useState, useMemo, useEffect } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
} from "@mui/material";

import CsPagination from "../../components/CsPagination";
import csUseQueryString from "../../hook/csUseQueryString";
import { productService } from "../../services/product.service";
import RowProduct from "./RowProduct";
import { EnhancedTableToolbar, EnhancedTableHead } from "./HeadListProduct";
import { toast } from "react-toastify";

export default function ListProducts(props) {
  let {
    filters,
    sort,
    keyWord,
    pagination,
    handleChangeRowsPerPage,
    handleChangePage,
    handleRequestSort,
  } = props;


  
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0); // total page
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchData();
  }, [filters, sort, pagination?.page, pagination?.rowsPerPage, keyWord]);

  const fetchData = async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        ...sort,
        keyWord,
      });

      const response = await productService.handleGetAllProduct(filterParmas);
      if (response && response.success === true) {
        setData(response.data);
        setTotalPage(response?.pagination?.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelProduct = async (id) => {
    try {
      let res = await productService.handleDelProducts(id);

      console.log(res);

      if (res && res.success === true) {
        toast.success(res.message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table
            stickyHeader
            sx={{ width: "100%" }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={sort.order}
              orderBy={sort.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody sx={{ width: "100%" }}>
              {data && data.length > 0 ? (
                data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <RowProduct
                      labelId={labelId}
                      key={index}
                      row={row}
                      handleClick={handleSelectRow}
                      handleDelProduct={handleDelProduct}
                      isItemSelected={isItemSelected}
                    />
                  );
                })
              ) : (
                <>
                  <TableRow>
                    <TableCell style={{ p: 1 }} colSpan={6} align="center">
                      <Typography>nodata</Typography>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CsPagination
          totalPage={totalPage}
          limitPage={pagination?.rowsPerPage}
          page={pagination?.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
