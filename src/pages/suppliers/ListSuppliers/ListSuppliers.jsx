import { useState, useMemo, useEffect, useRef } from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import CsPagination from "../../../components/CsPagination";
import RowSupplier from "./RowSupplier";
import { EnhancedTableHead } from "./HeadListSupplier";
import EnhancedTableToolbar from "./HeadListSupplier";
import UpdateSpllier from "../UpdateSupplier/UpdateSupplier";
import { supplierService } from "../../../services/supplier.service";
import ModalContent from "../../../components/modalContent/modalContent";
import { toast } from "react-toastify";

export default function ListSuppliers(props) {
  let {
    data,
    total,
    order,
    orderBy,
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    onResetListSupplier,
  } = props;
  const [selected, setSelected] = useState([]);

  const idRefUpdate = useRef("");
  const [valueEdit, setValueEdit] = useState();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  // open modal Update
  const handleOpenModalUpdate = (id) => {
    idRefUpdate.current = id;
    handleGetOneSupplier();
  };

  // handel update supplier
  const handleUpdateSupplier = async (data) => {
    try {
      let res = await supplierService.handleUpdateSupplier(
        idRefUpdate.current,
        data
      );
      toast.success(res?.message || "Add supplier success");
      setOpenModalUpdate(false);
      onResetListSupplier();
    } catch (error) {
      console.log(error);
      toast.error("Update supplier Failded");
    }
  };

  // handle delete supplier
  const handelDeleteSupplier = async (id) => {
    try {
      let res = await supplierService.handleDeleteSupplier(id);
      console.log(res);
      toast.success("Delete supplier Successful");
      setOpenModalUpdate(false);
      onResetListSupplier();
    } catch (error) {
      toast.error("Delete supplier Failded");
    }
  };

  // handle close modal Update
  const handleClodeModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  // handle get one supplier
  const handleGetOneSupplier = async () => {
    try {
      let res = await supplierService.handleGetOneSupplier(idRefUpdate.current);
      setValueEdit(res?.data);
      setOpenModalUpdate(!openModalUpdate);
    } catch (error) {
      toast.error("Find supplier failed");
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
      {/* modal update supplier */}
      <ModalContent
        size="md"
        isOpen={openModalUpdate}
        onCloseModal={handleClodeModalUpdate}
        title="Cập Nhật Nhà Cung Cấp"
      >
        <UpdateSpllier
          id={idRefUpdate.current}
          value={valueEdit}
          onCloseModal={handleClodeModalUpdate}
          onUpdateSupplier={handleUpdateSupplier}
          onDeleteSupplier={handelDeleteSupplier}
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
              rowCount={data?.length ? data.length : 0}
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
                      handleOpenModalUpdate={handleOpenModalUpdate}
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
          limitPage={pagination.limit}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
