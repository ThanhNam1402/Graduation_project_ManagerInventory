import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";

import FilterRadio from "../../components/filters/FilterRadio";
import ListSuppliers from "./ListSuppliers/ListSuppliers";
import ActionCustomer from "./ActionSupplier";
import { ListStatus } from "../../utils/constain";
import CsUsePagination from "../../hook/CsUsePagination";
import AddSupplier from "./AddSupplier";
import ModalContent from "../../components/modalContent/modalContent";

import { supplierService } from "../../services/supplier.service";
import csUseQueryString from "../../hook/csUseQueryString";

function Suppliers() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("name");
  const [total, setTotalPage] = useState([]);
  const [filters, setFilters] = useState({
    status: 0,
  });
  const [keyWord, setKeyWord] = useState("");

  const [openModalAdd, setOpenModalAdd] = useState(false);

  const { pagination, setPage, handleChangePage, handleChangeRowsPerPage } =
    CsUsePagination(0, 5);

  const handleSearch = (value) => {
    setPage(0);
    setKeyWord(value);
  };

  const handleSetFilter = (value, id) => {
    setPage(0);
    switch (id) {
      case "status":
        setFilters((state) => ({
          ...state,
          status: value,
        }));
        break;
    }
  };

  // SET MODAL ADD SUPPLIER
  const handleSetModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };

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

  useEffect(() => {
    handleGetAllSuppliers();
  }, [filters, pagination?.page, pagination?.rowsPerPage, keyWord]);

  // handle get all suppliers
  const handleGetAllSuppliers = async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        keyWord,
      });
      const response = await supplierService.handleGetAllSuppliers(
        filterParmas
      );

      console.log(response);

      if (response && response?.status) {
        setData(response.data);
        setTotalPage(response?.pagination?.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle sort by order
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

      <Stack direction="row">
        <Box
          sx={{
            mb: 2,
            mr: 2,
            p: 1,
            height: "83vh",
            width: "300px",
            overflowY: "scroll",
          }}
        >
          <Box>
            <Typography sx={{ mb: 3 }} variant="h5" component={"h5"}>
              Nhà Cung Cấp
            </Typography>

            {/* Status */}
            <FilterRadio
              data={ListStatus}
              handleGetValue={handleSetFilter}
              keyFilter={"status"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ActionCustomer
            handleSearch={handleSearch}
            handleOpenModal={handleSetModalAdd}
          />
          <ListSuppliers
            data={data}
            total={total}
            order={order}
            orderBy={orderBy}
            pagination={pagination}
            handleRequestSort={handleRequestSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            onResetListSupplier={handleGetAllSuppliers}
          />
        </Box>
      </Stack>
    </>
  );
}

export default Suppliers;
