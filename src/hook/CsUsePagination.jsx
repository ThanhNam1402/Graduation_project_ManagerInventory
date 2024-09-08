import { useState } from "react";

function CsUsePagination(curentPage, rowsPerpage) {
  // pagination
  const [page, setPage] = useState(curentPage); // current page
  const [limit, setLimit] = useState(rowsPerpage); // limit = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    pagination: {
      page,
      limit,
    },
    setPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export default CsUsePagination;
