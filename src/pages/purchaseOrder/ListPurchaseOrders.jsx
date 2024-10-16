import { useState, useEffect, useCallback } from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import csUseQueryString from "../../hook/csUseQueryString";
import CsPagination from "../../components/CsPagination";
import RowProduct from "./RowPurChaseOrder";
import {
  EnhancedTableToolbar,
  EnhancedTableHead,
} from "./HeadListPurChaseOrder";
import PropTypes from "prop-types";

import { purchaseOrderService } from "../../services/purchaseOrder.service";

function ListPurchaseOrders({
  filters,
  sort,
  keyWord,
  pagination,
  handleRequestSort,
  handleChangeRowsPerPage,
  handleChangePage,
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [totalPage, setTotalPage] = useState(0); // total page

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
  const fetchData = useCallback(async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        ...sort,
        keyWord,
      });

      const response = await purchaseOrderService.handleGetAllPurchaseorders(
        filterParmas
      );
      setData(response.data);
      setTotalPage(response?.last_page);
    } catch (err) {
      console.log(err);
    }
  }, [filters, keyWord, pagination, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            order={sort?.order}
            orderBy={sort?.orderBy}
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

      {data && data.length > 0 && (
        <CsPagination
          totalPage={totalPage}
          limitPage={pagination?.limit}
          page={pagination?.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

ListPurchaseOrders.propTypes = {
  sort: PropTypes.object,
  filters: PropTypes.object,
  pagination: PropTypes.object,
  onSetPage: PropTypes.func,
  keyWord: PropTypes.string,
  handleRequestSort: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

export default ListPurchaseOrders;
