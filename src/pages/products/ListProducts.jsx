import { useState, useMemo, useEffect } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";

import CsUsePagination from "../../hook/CsUsePagination";
import CsPagination from "../../components/CsPagination";
import csUseQueryString from "../../hook/csUseQueryString";
import { productService } from "../../services/product.service";
import RowProduct from "./RowProduct";
import { EnhancedTableToolbar, EnhancedTableHead } from "./HeadListProduct";
import { stableSort, getComparator } from "../../utils/func";

export default function ListProducts(props) {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [totalPage, setTotalPage] = useState(500); // total page

  const [selected, setSelected] = useState([]);

  const { pagination, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 10);

  let { filters } = props;

  console.log(filters);

  console.log(pagination.page, pagination.rowsPerPage);
  let filterParmas = csUseQueryString({ ...filters });

  console.log(filterParmas);

  useEffect(() => {
    fetchData();
  }, [filters, order, orderBy, pagination.page, pagination.rowsPerPage]);

  const fetchData = async () => {
    try {
      const response = await productService.handleGetAllProduct(filterParmas);

      if (response && response.success === true) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const emptyRows =
    pagination.page > 0
      ? Math.max(
          0,
          (1 + pagination.page) * pagination.rowsPerPage - data.length
        )
      : 0;

  // phan trang
  // console.log();
  // const visibleRows = useMemo(
  //   () =>
  //     stableSort(data?.data, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),
  //   [order, orderBy, page, rowsPerPage]
  // );

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
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody sx={{ width: "100%" }}>
              {data &&
                data.length > 0 &&
                data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <RowProduct
                      labelId={labelId}
                      key={index}
                      row={row}
                      handleClick={handleSelectRow}
                      isItemSelected={isItemSelected}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CsPagination
          totalPage={totalPage}
          limitPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
