import React from "react";
import TablePagination from "@mui/material/TablePagination";

function Pagination({ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, count }) {
  return (
    <>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số bản ghi"
          rowsPerPageOptions={[5, 10, 25]}
        />
    </>
  );
}

export default Pagination;
