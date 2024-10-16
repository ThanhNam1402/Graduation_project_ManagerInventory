import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Box,
  CircularProgress,
} from "@mui/material";

import RowCustomer from "./RowCustomer";
import AddCustomer from "../AddCustomer/AddCustomer";
import UpdateCustomer from "../UpdateCustomer/UpdateCustomer";
import { customerService } from "../../../services/customer.service";
import EnhancedTableToolbar, { EnhancedTableHead } from "./HeadListCustomer";
import ModalContent from "../../../components/modalContent/modalContent";
import CsPagination from "../../../components/CsPagination";
import csUseQueryString from "../../../hook/csUseQueryString";
import ActionCustomer from "../ActionCustomer/ActionCusomter";
import TableRowNoData from "../../../components/TableRowNoData/TableRowNoData";

function ListCustomers({
  order,
  filters,
  orderBy,
  pagination,
  onSetPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleRequestSort,
}) {
  const [data, setData] = useState([]);
  const [total, setTotalPage] = useState(0);

  const [keyword, setKeyword] = useState([]);

  const [valueEdit, setValueEdit] = useState();
  const idRefUpdate = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [selected, setSelected] = useState([]);

  // func search
  const handleSearch = useCallback(
    (value) => {
      onSetPage(1);
      setKeyword(value);
    },
    [onSetPage]
  );

  // open modal add
  const handleOpenModalAdd = useCallback(() => {
    setOpenModalAdd(true);
  }, []);

  // close modal update
  const handleCloseModalAdd = useCallback(() => {
    setOpenModalAdd(false);
  }, []);

  // get all
  const handleGetAllCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        keyword,
      });
      const response = await customerService.handleGetAllCustomers(
        filterParmas
      );
      if (response && response.status) {
        setData(response?.data?.data);
        setTotalPage(response?.data.last_page);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [filters, keyword, pagination]);

  useEffect(() => {
    handleGetAllCustomers();
  }, [handleGetAllCustomers]);

  // handel update supplier
  const handleUpdateCustomer = async (id, data) => {
    try {
      let res = await customerService.handleUpdateCustomer(id, data);
      toast.success(res?.message || "Add supplier success");
      setOpenModalUpdate(false);
      handleGetAllCustomers();
    } catch (error) {
      console.log(error);
      toast.error("Update supplier Failded");
    }
  };

  // handel close modal update
  const handleCloseModalUpdate = useCallback(() => {
    setOpenModalUpdate(false);
  }, []);

  // handel open modal update
  const handleOpenModalUpdate = useCallback((id) => {
    idRefUpdate.current = id;
    handleGetOneCustomer();
  }, []);

  // handle get one customer
  const handleGetOneCustomer = async () => {
    try {
      let res = await customerService.handleGetOneCustomer(idRefUpdate.current);
      console.log(res);
      setValueEdit(res?.data);
      setOpenModalUpdate(true);
    } catch (error) {
      toast.error("Find supplier failed");
    }
  };

  // handle add customer
  const handelAddCustomer = async (data) => {
    try {
      let res = await customerService.handleAddCustomer(data);
      if (res && res.status) {
        toast.success(res?.message || "Add customer successfully");
        handleCloseModalAdd();
        handleGetAllCustomers();
      } else {
        toast.warning(res?.message || "Add customer Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Add customer Failed");
    }
  };

  // handle get all row checkbox
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
      {/* add modal */}
      <ModalContent
        size="md"
        title="Thêm Khách Hàng"
        isOpen={openModalAdd}
        onCloseModal={handleCloseModalAdd}
      >
        <AddCustomer
          onAddCustomer={handelAddCustomer}
          onCloseModalAdd={handleCloseModalAdd}
        />
      </ModalContent>

      {/* update modal */}
      <ModalContent
        size="md"
        title="Cập Nhật Khách Hàng"
        isOpen={openModalUpdate}
        onCloseModal={handleCloseModalUpdate}
      >
        <UpdateCustomer
          value={valueEdit}
          onCloseModal={handleCloseModalUpdate}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </ModalContent>

      <ActionCustomer
        handleSearch={handleSearch}
        handleOpenModal={handleOpenModalAdd}
      />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />

        {isLoading ? (
          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size="30px" />
          </Box>
        ) : (
          <>
            <TableContainer>
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
                  rowCount={data?.length}
                />

                <TableBody sx={{ width: "100%" }}>
                  {data && data.length > 0 ? (
                    data.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <RowCustomer
                          labelId={labelId}
                          key={index}
                          row={row}
                          isItemSelected={isItemSelected}
                          handleClick={handleSelectRow}
                          onOpenModalUpdate={handleOpenModalUpdate}
                          onResetListCustomers={handleGetAllCustomers}
                        />
                      );
                    })
                  ) : (
                    <TableRowNoData colSpan={9} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <CsPagination
              totalPage={total}
              page={pagination.page}
              limitPage={pagination.limit}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </>
  );
}

ListCustomers.propTypes = {
  order: PropTypes.string,
  filters: PropTypes.object,
  orderBy: PropTypes.string,
  pagination: PropTypes.object,
  onSetPage: PropTypes.func,
  handleRequestSort: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

export default ListCustomers;
