import { useState, useEffect, useCallback } from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import CsPagination from "../../../components/CsPagination";
import RowSupplier from "./RowSupplier";
import EnhancedTableToolbar, { EnhancedTableHead } from "./HeadListSupplier";
import { supplierService } from "../../../services/supplier.service";
import ModalContent from "../../../components/modalContent/modalContent";
import { toast } from "react-toastify";
import Proptypes from "prop-types";
import csUseQueryString from "../../../hook/csUseQueryString";
import ActionSupplier from "../ActionSupplier/ActionSupplier";
import AddSupplier from "../AddSupplier/AddSuppier";
import TableRowNoData from "../../../components/TableRowNoData/TableRowNoData";

function ListSuppliers({
  filters,
  order,
  onSetPage,
  orderBy,
  pagination,
  handleChangePage,
  handleChangeRowsPerPage,
  handleRequestSort,
}) {
  const [selected, setSelected] = useState([]);

  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState();

  const [keyword, setKeyword] = useState("");

  const [openModalAdd, setOpenModalAdd] = useState(false);

  const handleSearch = useCallback(
    (value) => {
      onSetPage(1);
      setKeyword(value);
    },
    [onSetPage]
  );

  // handle get all suppliers
  const handleGetAllSuppliers = useCallback(async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        keyword,
      });
      const response = await supplierService.handleGetAllSuppliers(
        filterParmas
      );

      console.log(response);

      if (response && response?.status) {
        setData(response.data?.data);
        setLastPage(response?.data?.last_page);
      }
    } catch (err) {
      console.log(err);
    }
  }, [filters, pagination, keyword]);

  useEffect(() => {
    handleGetAllSuppliers();
  }, [handleGetAllSuppliers]);

  // SET MODAL ADD SUPPLIER
  const handleSetModalAdd = useCallback(() => {
    setOpenModalAdd(!openModalAdd);
  }, [openModalAdd]);

  // handle add supplier
  const handleAddSupplier = async (data) => {
    try {
      let res = await supplierService.handleAddSupplier(data);
      if (res && res.status) {
        toast.success(res?.message || "Add supplier success");
        setOpenModalAdd(false);
        handleGetAllSuppliers(data);
      } else {
        toast.error(res?.message || "Add supplier failed");
      }
    } catch (error) {
      toast.error(error?.message || "Add supplier failed");
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log(data);
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
      {/* Modal Add  */}
      <ModalContent
        size="md"
        isOpen={openModalAdd}
        onCloseModal={handleSetModalAdd}
        title="Thêm Nhà Cung Cấp"
      >
        <AddSupplier
          onCloseModalAdd={handleSetModalAdd}
          onAddSupplier={handleAddSupplier}
        />
      </ModalContent>

      <ActionSupplier
        handleSearch={handleSearch}
        handleOpenModal={handleSetModalAdd}
      />

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
              rowCount={data?.length ? data.length : 0}
            />

            <TableBody sx={{ width: "100%" }}>
              {data && data.length > 0 ? (
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
                      onResetListSupplier={handleGetAllSuppliers}
                    />
                  );
                })
              ) : (
                <TableRowNoData colSpan={9} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {data && data.length > 0 && (
          <CsPagination
            totalPage={lastPage}
            limitPage={pagination.limit}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </>
  );
}

ListSuppliers.propTypes = {
  onSetPage: Proptypes.func,
  filters: Proptypes.object,
  order: Proptypes.string,
  orderBy: Proptypes.string,
  pagination: Proptypes.object,
  handleChangePage: Proptypes.func,
  handleChangeRowsPerPage: Proptypes.func,
  handleRequestSort: Proptypes.func,
  onResetListSupplier: Proptypes.func,
};
export default ListSuppliers;
