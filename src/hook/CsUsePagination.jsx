import { useState } from "react";

function CsUsePagination(curentPage, limit) {
  // pagination
  const [page, setPage] = useState(curentPage); // current page
  const [rowsPerPage, setRowsPerPage] = useState(limit); // limit = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    pagination: {
      page,
      rowsPerPage,
    },
    setPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export default CsUsePagination;
