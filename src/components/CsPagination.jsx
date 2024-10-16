import {
  Stack,
  Pagination,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";

CsPagination.propTypes = {
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  limitPage: PropTypes.number,
  totalPage: PropTypes.number,
  page: PropTypes.number,
};

function CsPagination({
  onPageChange,
  onRowsPerPageChange,
  limitPage,
  totalPage,
  page,
}) {
  return (
    <>
      <Stack
        sx={{
          p: 2,
        }}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
      >
        <FormControl
          sx={{ m: 1, minWidth: 20 }}
          variant="standard"
          size="small"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <p>Rows per page:</p>
            <Select
              id="demo-select-small"
              value={limitPage}
              label="Age"
              onChange={onRowsPerPageChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Stack>
        </FormControl>
        <Pagination
          color="primary"
          showLastButton
          showFirstButton
          boundaryCount={2}
          count={totalPage}
          page={page}
          onChange={onPageChange}
        />
      </Stack>
    </>
  );
}

export default CsPagination;
