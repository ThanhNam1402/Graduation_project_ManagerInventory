import React from "react";

import { TablePagination } from "@mui/material";

function CsPagination(props) {
  console.log(props);

  let { onPageChange, handleChangeRowsPerPage, limitPage, totalPage, page } =
    props;
  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        showLastButton
        showFirstButton
        
        count={totalPage}
        rowsPerPage={limitPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default CsPagination;
