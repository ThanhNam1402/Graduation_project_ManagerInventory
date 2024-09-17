import {
  Checkbox,
  Tooltip,
  IconButton,
  TableRow,
  TableCell,
  Chip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckIcon from "@mui/icons-material/Check";

function RowSupplier(props) {
  const { row, isItemSelected, handleClick, labelId, handleOpenModalUpdate } =
    props;

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            onClick={(event) => handleClick(event, row.id)}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>

        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row?.name}
        </TableCell>
        <TableCell align="right"> {row?.tax_code}</TableCell>
        <TableCell align="right">{row?.email}</TableCell>
        <TableCell align="right">{row?.phone}</TableCell>
        <TableCell align="right">
          {row?.status === 1 ? (
            <Box
              sx={{
                backgroundColor: "primary.light",
                color: "primary.contrastText",
                p: 1,
                display: "inline-block",
                borderRadius: 5,
                minWidth: "117px",
                textAlign: "center",
              }}
            >
              Đang Hoạt Động
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: "error.main",
                color: "error.contrastText",
                p: 1,
                display: "inline-block",
                borderRadius: 5,
                minWidth: "117px",
                textAlign: "center",
              }}
            >
              Ngừng Hoạt Động
            </Box>
          )}
        </TableCell>
        <TableCell align="right">
          <Tooltip title="detail">
            <IconButton onClick={() => handleOpenModalUpdate(row?.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowSupplier;
