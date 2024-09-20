import { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  Typography,
  Box,
  Button,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Checkbox,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Delete } from "@mui/icons-material";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "code",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "name",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "category",
  },
  {
    id: "onHand",
    numeric: true,
    disablePadding: false,
    label: "onhand",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "price",
  },
  {
    id: "price_sale",
    numeric: true,
    disablePadding: false,
    label: "sale_price",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "status",
  },
];

export function EnhancedTableHead(props) {
  const { t } = useTranslation("product");

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {t("table.tableHead." + headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export function EnhancedTableToolbar(props) {
  const { t } = useTranslation("product");
  const tAction = useTranslation("action").t;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        borderBottom: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          {t("title")}
        </Typography>
      )}

      {numSelected > 0 && (
        <div>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
            startIcon={<MoreVertIcon />}
          >
            {tAction("action")}
          </Button>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
                p: 0,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Xuất File</ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Xóa </ListItemText>
            </MenuItem>
          </Menu>
        </div>
      )}
    </Toolbar>
  );
}
