import { useState, memo } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Stack,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import SearchProduct from "../../../components/filters/SearchProduct";
import PropTypes from "prop-types";

const ActionCustomer = memo(function ActionCustomer({
  handleSearch,
  handleOpenModal,
}) {
  const { t } = useTranslation("action");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("re-render");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ mb: 2 }}
    >
      <SearchProduct handleSearch={handleSearch} />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<AddRoundedIcon />}
          onClick={() => handleOpenModal()}
        >
          {t("new")}
        </Button>
        <div>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="success"
            variant="contained"
            startIcon={<MoreVertIcon />}
          >
            {t("action")}
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
                <UploadFileOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Import </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Xuất File</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </Stack>
    </Stack>
  );
});

ActionCustomer.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};
export default ActionCustomer;
