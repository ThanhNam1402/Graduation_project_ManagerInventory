import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import RowCustomer from "./RowCustomer";
import AddCustomer from "../AddCustomer/AddCustomer";
import UpdateCustomer from "../UpdateCustomer/UpdateCustomer";
import { customerService } from "../../../services/customer.service";
import { EnhancedTableHead } from "./HeadListCustomer";
import EnhancedTableToolbar from "./HeadListCustomer";
import ModalContent from "../../../components/modalContent/modalContent";
import CsPagination from "../../../components/CsPagination";
import csUseQueryString from "../../../hook/csUseQueryString";

export default function ListCustomers({
  order,
  filters,
  keyWord,
  orderBy,
  openModalAdd,
  onCloseModalAdd,
  pagination,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const [data, setData] = useState([]);
  const [total, setTotalPage] = useState(0);
  const [valueEdit, setValueEdit] = useState();
  const idRefUpdate = useRef();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    handleGetAllCustomers();
  }, [filters, order, orderBy, pagination?.page, pagination?.limit, keyWord]);

  const handleGetAllCustomers = async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        keyWord,
      });
      const response = await customerService.handleGetAllCustomers(
        filterParmas
      );
      if (response && response.status) {
        setData(response.data);
        setTotalPage(response?.pagination?.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleOpenModalUpdate = (id) => {
    idRefUpdate.current = id;
    handleGetOneCustomer();
  };

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

  const handelAddCustomer = async (data) => {
    try {
      let res = await customerService.handleAddCustomer(data);
      if (res && res.status) {
        toast.success(res?.message || "Add customer successfully");
        onCloseModalAdd();
        handleGetAllCustomers();
      } else {
        toast.warning(res?.message || "Add customer Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Add customer Failed");
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
      {/* add modal */}
      <ModalContent
        size="md"
        title="Thêm Khách Hàng"
        isOpen={openModalAdd}
        onCloseModal={onCloseModalAdd}
      >
        <AddCustomer
          onAddCustomer={handelAddCustomer}
          onCloseModalAdd={onCloseModalAdd}
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
              rowCount={data?.length}
            />

            <TableBody sx={{ width: "100%" }}>
              {data &&
                data.length > 0 &&
                data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <RowCustomer
                      labelId={labelId}
                      key={index}
                      row={row}
                      handleClick={handleSelectRow}
                      isItemSelected={isItemSelected}
                      onOpenModalUpdate={handleOpenModalUpdate}
                      onResetListCustomers={handleGetAllCustomers}
                    />
                  );
                })}
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
      </Paper>
    </>
  );
}
