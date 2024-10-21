import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Stack,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Box,
  Typography,
  Fade,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import SearchProduct from "@/components/admin/filters/SearchProduct";
import { fileService } from "@/services/file.service";

import PropTypes from "prop-types";

const ActionProduct = memo(function ActionProduct({
  handleSearch,
  handleOpenModal,
}) {
  const { t } = useTranslation("action");

  const [bannerOpen, setBannerOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeBanner = () => {
    setBannerOpen(false);
    setExportFileName(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportAll = async () => {
    try {
      let res = await fileService.handleExportAll("products");
      if (res) {
        setExportFileName(res.data);
        setBannerOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadFile = async () => {
    console.log(exportFileName);

    await fileService.handleDowloadFile(exportFileName).then((response) => {
      console.log(response);
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = exportFileName;
      anchor.href = url;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
    setBannerOpen(false);
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
          variant="contained"
          color="success"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpenModal}
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
            <MenuItem onClick={handleExportAll}>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Xuất File</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </Stack>

      <Fade appear={false} in={bannerOpen}>
        <Paper
          role="dialog"
          aria-modal="false"
          aria-label="Cookie banner"
          square
          variant="outlined"
          tabIndex={-1}
          sx={{
            backgroundColor: "white",
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "420px",
            m: 0,
            p: 3,
            zIndex: 100,
            borderWidth: 1,
            borderTopWidth: 1,
            borderRadius: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            gap={2}
          >
            <Box
              sx={{
                flexShrink: 1,
                alignSelf: { xs: "flex-start", sm: "center" },
              }}
            >
              <Typography fontWeight="bold">
                Xử lý thiết lập xuất file
              </Typography>
              <Typography variant="body2">{exportFileName}</Typography>
            </Box>
            <Stack
              gap={2}
              direction={{
                xs: "row-reverse",
                sm: "row",
              }}
              sx={{
                flexShrink: 0,
                alignSelf: { xs: "flex-end", sm: "center" },
              }}
            >
              <Button
                size="small"
                onClick={handleDownloadFile}
                variant="contained"
              >
                Tải Xuống
              </Button>
              <Button size="small" onClick={closeBanner}>
                Hủy
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </Stack>
  );
});

ActionProduct.propTypes = {
  handleSearch: PropTypes.func,
  handleOpenModal: PropTypes.func,
};

export default ActionProduct;
