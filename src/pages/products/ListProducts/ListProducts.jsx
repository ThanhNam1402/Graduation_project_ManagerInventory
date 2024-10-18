import { useState, useEffect, useCallback } from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import CsPagination from "../../../components/CsPagination";
import csUseQueryString from "../../../hook/csUseQueryString";
import { productService } from "../../../services/product.service";
import RowProduct from "./RowProduct";
import { EnhancedTableToolbar, EnhancedTableHead } from "./HeadListProduct";
import TableRowNoData from "../../../components/TableRowNoData/TableRowNoData";
import { toast } from "react-toastify";
import ActionProduct from "../ActionProduct/ActionProduct";
import PropTypes from "prop-types";
import AddProduct from "../AddProduct";

function ListProducts({
  filters,
  sort,
  onSetPage,
  pagination,
  handleChangeRowsPerPage,
  handleChangePage,
  handleRequestSort,
}) {
  const [data, setData] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0); // total page
  const [selected, setSelected] = useState([]);

  const handleGetAllProduct = useCallback(async () => {
    try {
      let filterParmas = csUseQueryString({
        ...filters,
        ...pagination,
        ...sort,
        keyword,
      });

      const response = await productService.handleGetAllProduct(filterParmas);
      if (response) {
        setData(response.data);
        setTotalPage(response?.last_page);
      }
    } catch (err) {
      console.log(err);
    }
  }, [filters, keyword, pagination, sort]);

  useEffect(() => {
    handleGetAllProduct();
  }, [handleGetAllProduct]);

  const handleDelProduct = async (id) => {
    try {
      let res = await productService.handleDelProducts(id);
      toast.success(res.message);
      handleGetAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // handle search
  const handleSearch = (value) => {
    onSetPage(1);
    setKeyword(value);
  };

  // open modal
  const handleOpenModal = () => {
    setOpenModal(!openModal);
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
      {openModal && (
        <AddProduct
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          onResetListProducts={handleGetAllProduct}
        />
      )}

      <ActionProduct
        handleOpenModal={handleOpenModal}
        handleSearch={handleSearch}
      />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            stickyHeader
            sx={{ width: "100%" }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={sort.order}
              orderBy={sort.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody sx={{ width: "100%" }}>
              {data && data.length > 0 ? (
                data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <RowProduct
                      labelId={labelId}
                      key={index}
                      row={row}
                      handleClick={handleSelectRow}
                      handleDelProduct={handleDelProduct}
                      onResetListProducts={handleGetAllProduct}
                      isItemSelected={isItemSelected}
                    />
                  );
                })
              ) : (
                <>
                  <TableRowNoData colSpan={9} />
                </>
              )}
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
    </>
  );
}

ListProducts.propTypes = {
  sort: PropTypes.object,
  filters: PropTypes.object,
  pagination: PropTypes.object,
  onSetPage: PropTypes.func,
  handleRequestSort: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

export default ListProducts;
