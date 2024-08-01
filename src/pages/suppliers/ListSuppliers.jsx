import { useState, useMemo, useEffect } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";

import csUseQueryString from "../../hook/csUseQueryString";
import CsPagination from "../../components/CsPagination";
import RowSupplier from "./RowSupplier";
import { EnhancedTableToolbar, EnhancedTableHead } from "./HeadListSupplier";

import { supplierService } from "../../services/supplier.service";

export default function ListSuppliers(props) {
  
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [total, setTotalPage] = useState([]);

  let {
    filters,
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
    keyWord,
  } = props;

  console.log(props);

  useEffect(() => {
    fetchData();
  }, [
    filters,
    order,
    orderBy,
    pagination?.page,
    pagination?.rowsPerPage,
    keyWord,
  ]);

  const fetchData = async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        keyWord,
      });
      const response = await supplierService.handleGetAllSuppliers(
        filterParmas
      );
      if (response && response.success === true) {
        setData(response.data);
        setTotalPage(response?.pagination?.total);
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
      console.log(rows);
      const newSelected = rows.map((n) => n.id);
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
            rowCount={100}
          />

          <TableBody sx={{ width: "100%" }}>
            {data &&
              data.length > 0 &&
              data.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <RowSupplier
                    labelId={labelId}
                    key={index}
                    row={row}
                    handleClick={handleSelectRow}
                    isItemSelected={isItemSelected}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <CsPagination
        totalPage={total}
        limitPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
