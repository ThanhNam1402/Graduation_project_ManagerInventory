import { useState, useMemo } from "react";

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
import RowProduct from "./RowPurChaseOrder";
import { EnhancedTableToolbar, EnhancedTableHead } from "./HeadListPurChaseOrder";

// data list
const rows = [
  {
    id: 1,
    name: "namcute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 12,
    name: "namcute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 100,
    name: "nam1cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 10414140,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 104141410,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 10314110,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 313131,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 10102121313,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 1010,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 101212121310,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 1021210,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 11212010,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 101111110,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 10111110,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 10110,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 10120,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
  {
    id: 101110,
    name: "nam2cute",
    calories: 305,
    fat: 1,
    carbs: 1,
    protein: 1,
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ListPurchaseOrders(props) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);

  console.log(props);

  let {
    page,
    rowsPerPage,
    totalPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = CsUsePagination(0, 10, 4);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

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
            rowCount={rows.length}
          />

          <TableBody sx={{ width: "100%" }}>
            {visibleRows.map((row, index) => {
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
        limitPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
