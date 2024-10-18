import React from "react";
import { useTranslation } from "react-i18next";
import { localLng } from "../../../i18n";

import { Button, Menu, MenuItem, Box } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ChangeLanguage() {
  const { i18n } = useTranslation("home");

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ minWidth: 120, textAlign: "right" }}
      >
        <Button
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ textTransform: "none" }}
        >
          {localLng[i18n.language]}
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => handleChangeLng("vi")}
          sx={{
            bgcolor: i18n.language === "vi" ? "primary.main" : "",
          }}
        >
          Tiếng Việt
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLng("en")}
          sx={{
            bgcolor: i18n.language === "en" ? "primary.main" : "",
          }}
        >
          English
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ChangeLanguage;
