import { useState } from "react";

function CsUsePagination(curentPage, limit, total) {
  // pagination
  const [page, setPage] = useState(curentPage); // current page
  const [rowsPerPage, setRowsPerPage] = useState(limit); // limit = 10
  const [totalPage, setTotalPage] = useState(total); // count

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    totalPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export default CsUsePagination;
