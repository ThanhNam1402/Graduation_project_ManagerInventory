import React from "react";

import { TablePagination } from "@mui/material";

function CsPagination(props) {
  let { onPageChange, onRowsPerPageChange, limitPage, totalPage, page } = props;

  return (
    <div>
      <TablePagination
        labelRowsPerPage={"Số Bản Ghi"}

        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        showLastButton
        showFirstButton
        count={totalPage}
        rowsPerPage={limitPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
}

export default CsPagination;
