import { useState, useEffect } from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import csUseQueryString from "../../hook/csUseQueryString";
import CsPagination from "../../components/CsPagination";
import RowProduct from "./RowPurChaseOrder";
import {
  EnhancedTableToolbar,
  EnhancedTableHead,
} from "./HeadListPurChaseOrder";

import { purchaseOrderService } from "../../services/purchaseOrder.service";

export default function ListPurchaseOrders(props) {
  let {
    filters,
    keyWord,
    pagination,
    handleChangeRowsPerPage,
    handleChangePage,
  } = props;

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [totalPage, setTotalPage] = useState(0); // total page

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

  console.log(keyWord);

  const fetchData = async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        keyWord,
      });

      console.log(filterParmas);

      const response = await purchaseOrderService.handleGetAllPurchaseorders(
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
  );
}
