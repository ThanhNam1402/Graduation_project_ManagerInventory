import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
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

import SearchProduct from "@/components/admin/filters/SearchProduct";
import PropsTypes from "prop-types";

function ActionProduct({ handleSearch }) {
  const { t } = useTranslation("action");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          component={Link}
          variant="contained"
          startIcon={<AddRoundedIcon />}
          to="new"
          color="success"
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
            variant="contained"
            color="success"
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
}

ActionProduct.propTypes = {
  handleSearch: PropsTypes.func,
};

export default ActionProduct;
